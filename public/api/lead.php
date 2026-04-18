<?php
/**
 * /api/lead — приёмник заявок с лендинга НПК «Оборон-Экран».
 *
 * Как работает:
 *   1) Принимает POST application/json (отдельно поддержан application/x-www-form-urlencoded).
 *   2) Проверяет honeypot, rate-limit (по IP, лимиты в ENV).
 *   3) Валидирует обязательные поля (organization, full_name, phone, email).
 *   4) Пишет заявку в JSONL-журнал /var/log/gisprof/leads.jsonl (приватный).
 *   5) Пересылает в Telegram (если задан TG_BOT_TOKEN + TG_CHAT_ID).
 *   6) Пересылает e-mail на LEAD_TO_EMAIL (через PHP mail() → msmtp/sendmail).
 *   7) Отдаёт JSON {"ok": true}.
 *
 * Настройка: /etc/gisprof-lead.env (см. scripts/server/server-setup-forms.sh).
 *   LEAD_TO_EMAIL=mail@oboron-it.ru
 *   LEAD_FROM_EMAIL=leads@gisprof.ru
 *   TG_BOT_TOKEN=
 *   TG_CHAT_ID=
 *   RATE_LIMIT_WINDOW=600      # сек
 *   RATE_LIMIT_MAX=8           # заявок с одного IP за окно
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Robots-Tag: noindex, nofollow');

function json_response(int $code, array $payload): void
{
    http_response_code($code);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(405, ['ok' => false, 'error' => 'method_not_allowed']);
}

// ---------- ENV ----------
$envPath = '/etc/gisprof-lead.env';
$env = [];
if (is_readable($envPath)) {
    foreach (file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
        $line = trim($line);
        if ($line === '' || str_starts_with($line, '#') || !str_contains($line, '=')) {
            continue;
        }
        [$k, $v] = explode('=', $line, 2);
        $env[trim($k)] = trim($v, " \t\"'");
    }
}
$cfg = [
    'to_email'    => $env['LEAD_TO_EMAIL']    ?? 'mail@oboron-it.ru',
    'from_email'  => $env['LEAD_FROM_EMAIL']  ?? 'leads@gisprof.ru',
    'from_name'   => $env['LEAD_FROM_NAME']   ?? 'gisprof.ru',
    'tg_token'    => $env['TG_BOT_TOKEN']     ?? '',
    'tg_chat'     => $env['TG_CHAT_ID']       ?? '',
    'rate_window' => (int)($env['RATE_LIMIT_WINDOW'] ?? 600),
    'rate_max'    => (int)($env['RATE_LIMIT_MAX']    ?? 8),
    'log_dir'     => $env['LEAD_LOG_DIR']     ?? '/var/log/gisprof',
];

// ---------- Rate limit (простой, по файлу) ----------
$rawIp = $_SERVER['HTTP_X_REAL_IP'] ?? $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
$rawIp = trim(explode(',', $rawIp)[0]);
$ip = filter_var($rawIp, FILTER_VALIDATE_IP) ?: '0.0.0.0';
$rateDir = $cfg['log_dir'] . '/rl';
if (!is_dir($rateDir)) {
    @mkdir($rateDir, 0770, true);
}
$rateFile = $rateDir . '/' . preg_replace('/[^a-f0-9:.]/i', '_', $ip) . '.log';
$now = time();
$windowStart = $now - $cfg['rate_window'];
$stamps = [];
if (is_readable($rateFile)) {
    foreach (file($rateFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $ts) {
        if ((int)$ts >= $windowStart) {
            $stamps[] = (int)$ts;
        }
    }
}
if (count($stamps) >= $cfg['rate_max']) {
    json_response(429, ['ok' => false, 'error' => 'rate_limited']);
}
$stamps[] = $now;
@file_put_contents($rateFile, implode("\n", $stamps));

// ---------- Тело запроса ----------
$raw = file_get_contents('php://input') ?: '';
$data = [];
if ($raw !== '' && str_contains((string)($_SERVER['CONTENT_TYPE'] ?? ''), 'application/json')) {
    $decoded = json_decode($raw, true);
    if (is_array($decoded)) {
        $data = $decoded;
    }
}
if (empty($data) && !empty($_POST)) {
    $data = $_POST;
}
if (empty($data)) {
    json_response(400, ['ok' => false, 'error' => 'empty_body']);
}

// Honeypot — скрытое поле, заполняется только ботами.
if (!empty($data['_hp']) || !empty($data['website'])) {
    // Делаем вид что всё ок, но ничего не отправляем.
    json_response(200, ['ok' => true]);
}

// Time-to-fill honeypot — человек не заполняет форму быстрее 1.5 сек.
$fillMs = isset($data['fill_ms']) ? (int)$data['fill_ms'] : 0;
if ($fillMs > 0 && $fillMs < 1500) {
    json_response(200, ['ok' => true]);
}

$pick = static function (string $k, int $max = 500) use ($data): string {
    $v = $data[$k] ?? '';
    if (!is_scalar($v)) {
        return '';
    }
    $v = trim((string)$v);
    return mb_substr($v, 0, $max);
};

// Вариант домена — определяем по Origin/Referer/HTTP_HOST (что пришло в заголовках),
// не доверяя тому что клиент прислал в payload.variant.
$originHost = '';
foreach (['HTTP_ORIGIN', 'HTTP_REFERER'] as $h) {
    if (!empty($_SERVER[$h])) {
        $u = parse_url($_SERVER[$h]);
        if (!empty($u['host'])) {
            $originHost = strtolower($u['host']);
            break;
        }
    }
}
if ($originHost === '' && !empty($_SERVER['HTTP_HOST'])) {
    $originHost = strtolower((string)$_SERVER['HTTP_HOST']);
}

// UTM — из payload.utm (массив) либо отдельных ключей.
$utm = [];
if (!empty($data['utm']) && is_array($data['utm'])) {
    foreach ($data['utm'] as $k => $v) {
        if (!is_scalar($v)) continue;
        $k = preg_replace('/[^a-z_]/', '', strtolower((string)$k));
        if ($k === '') continue;
        $utm[$k] = mb_substr(trim((string)$v), 0, 200);
    }
}
foreach (['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'yclid', 'gclid'] as $k) {
    if (!isset($utm[$k]) && !empty($data[$k])) {
        $utm[$k] = mb_substr(trim((string)$data[$k]), 0, 200);
    }
}

$lead = [
    'organization' => $pick('organization') ?: $pick('org'),
    'full_name'    => $pick('full_name')    ?: $pick('name'),
    'role'         => $pick('role'),
    'phone'        => $pick('phone'),
    'email'        => $pick('email'),
    'region'       => $pick('region'),
    'message'      => $pick('message', 2000),
    'subject'      => $pick('subject', 200),
    'source'       => $pick('source', 300),
    'variant'      => $originHost,
    'referrer'     => $pick('referrer', 300),
    'utm'          => $utm,
    'fill_ms'      => $fillMs,
    'user_agent'   => mb_substr((string)($_SERVER['HTTP_USER_AGENT'] ?? ''), 0, 300),
    'ip'           => $ip,
    'ts'           => gmdate('c'),
];

// Валидация
$errors = [];
if (mb_strlen($lead['organization']) < 2) $errors[] = 'organization';
if (mb_strlen($lead['full_name'])    < 2) $errors[] = 'full_name';
$digits = preg_replace('/\D/', '', $lead['phone']);
if (strlen((string)$digits) < 11)     $errors[] = 'phone';
if (!filter_var($lead['email'], FILTER_VALIDATE_EMAIL)) $errors[] = 'email';
if ($errors) {
    json_response(422, ['ok' => false, 'error' => 'validation', 'fields' => $errors]);
}

// ---------- Журнал (JSONL) ----------
if (!is_dir($cfg['log_dir'])) {
    @mkdir($cfg['log_dir'], 0770, true);
}
$logFile = $cfg['log_dir'] . '/leads.jsonl';
@file_put_contents(
    $logFile,
    json_encode($lead, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) . "\n",
    FILE_APPEND | LOCK_EX
);

// ---------- Email (через sendmail/msmtp) ----------
$variantLabel = $lead['variant'] !== '' ? $lead['variant'] : 'gisprof.ru';
$subject = $lead['subject'] !== ''
    ? $lead['subject']
    : ('Заявка (' . $variantLabel . ') — ' . $lead['organization']);
$utmBlock = [];
foreach ($lead['utm'] as $k => $v) {
    $utmBlock[] = $k . '=' . $v;
}
$bodyLines = [
    'Организация: ' . $lead['organization'],
    'ФИО: '         . $lead['full_name'],
    'Должность: '   . ($lead['role']   ?: '—'),
    'Телефон: '     . $lead['phone'],
    'E-mail: '      . $lead['email'],
    'Регион: '      . ($lead['region'] ?: '—'),
    '',
    'Сообщение:',
    $lead['message'] !== '' ? $lead['message'] : '—',
    '',
    '— — —',
    'Вариант:  ' . $variantLabel,
    'Источник: ' . ($lead['source']   ?: '—'),
    'Реферер:  ' . ($lead['referrer'] ?: '—'),
    'UTM:      ' . ($utmBlock ? implode(' · ', $utmBlock) : '—'),
    'Заполнено за: ' . ($lead['fill_ms'] ? round($lead['fill_ms'] / 1000, 1) . ' сек' : '—'),
    'IP: '       . $lead['ip'],
    'UA: '       . $lead['user_agent'],
    'Время: '    . $lead['ts'],
];
$body = implode("\n", $bodyLines);
// Защита от email header injection: режем \r\n\0 во всех заголовках.
$stripHeader = static fn (string $s): string => preg_replace('/[\r\n\0]+/', '', $s);
$safeReplyTo = filter_var($lead['email'], FILTER_VALIDATE_EMAIL) ? $lead['email'] : $cfg['from_email'];
$mailHeaders = [
    'From: ' . sprintf('%s <%s>', mb_encode_mimeheader($cfg['from_name']), $stripHeader($cfg['from_email'])),
    'Reply-To: ' . $stripHeader($safeReplyTo),
    'X-Mailer: gisprof-lead/1.0',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=utf-8',
];
$encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
@mail($cfg['to_email'], $encodedSubject, $body, implode("\r\n", $mailHeaders));

// ---------- Telegram ----------
if ($cfg['tg_token'] !== '' && $cfg['tg_chat'] !== '') {
    $utmLine = '';
    foreach ($lead['utm'] as $k => $v) {
        $utmLine .= htmlspecialchars($k) . '=<code>' . htmlspecialchars($v) . '</code> ';
    }
    $tgText = '<b>Новая заявка — ' . htmlspecialchars($variantLabel) . "</b>\n"
        . 'Организация: ' . htmlspecialchars($lead['organization']) . "\n"
        . 'ФИО: '         . htmlspecialchars($lead['full_name'])   . "\n"
        . 'Должность: '   . htmlspecialchars($lead['role'] ?: '—') . "\n"
        . 'Телефон: <code>' . htmlspecialchars($lead['phone'])     . "</code>\n"
        . 'E-mail: <code>'  . htmlspecialchars($lead['email'])     . "</code>\n"
        . 'Регион: '       . htmlspecialchars($lead['region'] ?: '—') . "\n"
        . 'Источник: '     . htmlspecialchars($lead['source'] ?: '—') . "\n"
        . ($utmLine ? ('UTM: ' . $utmLine . "\n") : '')
        . "\n"
        . ($lead['message'] !== '' ? ('<i>' . htmlspecialchars($lead['message']) . '</i>') : '');

    $url = 'https://api.telegram.org/bot' . rawurlencode($cfg['tg_token']) . '/sendMessage';
    $payload = http_build_query([
        'chat_id'    => $cfg['tg_chat'],
        'text'       => $tgText,
        'parse_mode' => 'HTML',
        'disable_web_page_preview' => 'true',
    ]);
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => $payload,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 5,
        CURLOPT_CONNECTTIMEOUT => 3,
    ]);
    curl_exec($ch);
    curl_close($ch);
}

json_response(200, ['ok' => true]);
