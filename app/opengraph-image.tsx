import { ImageResponse } from 'next/og';
import { BRAND } from '@/components/constants';
import { VARIANT } from '@/lib/variants';

export const dynamic = 'force-static';

// OG image уникален по вариантам, чтобы Яндекс и соцсети видели разные превью на каждый домен.
const plainH1 = `${VARIANT.h1} ${VARIANT.h1Accent}`.replace(/\u00a0/g, ' ').trim();

export const alt = `${plainH1} — ${BRAND.name}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const hostPretty = VARIANT.host.startsWith('xn--')
    ? 'гис-411.рф'
    : VARIANT.host;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px',
          background:
            'linear-gradient(135deg, #071332 0%, #0b3b8c 60%, #1e6bd6 100%)',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 64,
              height: 64,
              background: 'white',
              color: '#0b3b8c',
              borderRadius: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 40,
              fontWeight: 800,
            }}
          >
            О
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 28, fontWeight: 800 }}>{BRAND.shortName}</div>
            <div style={{ fontSize: 18, opacity: 0.8 }}>{VARIANT.regionBadge}</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div
            style={{
              display: 'flex',
              alignSelf: 'flex-start',
              background: 'rgba(16,185,129,0.2)',
              color: '#a7f3d0',
              padding: '8px 16px',
              borderRadius: 999,
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            ПП РФ № 411 · ФСТЭК № 21 · УЗ2
          </div>
          <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.05 }}>
            {plainH1}
          </div>
          <div style={{ fontSize: 26, opacity: 0.85, maxWidth: 980 }}>
            {VARIANT.heroSubtitle}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 22,
            opacity: 0.9,
          }}
        >
          <div>{BRAND.phone}</div>
          <div>{BRAND.email}</div>
          <div>{hostPretty}</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
