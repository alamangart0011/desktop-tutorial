// Converts Next.js absolute asset paths to relative paths in out/
// so the static export can be served from any nested URL (e.g. raw.githack.com/<user>/<repo>/site/).
import { promises as fs } from 'fs';
import path from 'path';

const root = path.resolve('out');

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...(await walk(p)));
    else files.push(p);
  }
  return files;
}

function relFromFileToRoot(file) {
  const dir = path.dirname(path.relative(root, file));
  if (dir === '' || dir === '.') return '';
  const depth = dir.split(path.sep).length;
  return '../'.repeat(depth);
}

function rewriteHtml(html, rel) {
  // href="/foo" -> href="<rel>foo",  src="/foo" -> src="<rel>foo" (skip protocol-relative //, data:, mailto:, tel:)
  return html
    .replace(/(href|src|action)="\/([^"\/][^"]*)"/g, (_m, attr, rest) => `${attr}="${rel}${rest}"`)
    .replace(/content="\/([^"\/][^"]*\.(?:svg|png|webmanifest|xml|txt|ico|jpg|jpeg|webp))"/g,
      (_m, rest) => `content="${rel}${rest}"`);
}

function rewriteCss(css, rel) {
  // url(/_next/...) -> url(<rel>_next/...)
  return css.replace(/url\(\/([^)"'][^)]*)\)/g, (_m, rest) => `url(${rel}${rest})`);
}

const files = await walk(root);
let htmlCount = 0, cssCount = 0;
for (const f of files) {
  const rel = relFromFileToRoot(f);
  if (f.endsWith('.html')) {
    const before = await fs.readFile(f, 'utf8');
    const after = rewriteHtml(before, rel);
    if (after !== before) { await fs.writeFile(f, after); htmlCount++; }
  } else if (f.endsWith('.css')) {
    const before = await fs.readFile(f, 'utf8');
    const after = rewriteCss(before, rel);
    if (after !== before) { await fs.writeFile(f, after); cssCount++; }
  }
}
console.log(`rewrote ${htmlCount} html files, ${cssCount} css files`);
