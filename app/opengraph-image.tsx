import { ImageResponse } from 'next/og';
import { SITE_NAME } from '@/lib/site';

export const alt = `${SITE_NAME} — a zero business-income-tax zone for Portland's Old Town`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0a0a0a',
          padding: '80px',
          color: '#F5F5F5',
        }}
      >
        <div
          style={{
            fontSize: 26,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#F59E0B',
            fontWeight: 700,
          }}
        >
          Portland · Old Town / Chinatown
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              fontSize: 76,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
            }}
          >
            <div>Old Town Free</div>
            <div>Enterprise District</div>
          </div>
          <div style={{ fontSize: 32, color: '#A3A3A3', lineHeight: 1.3, maxWidth: 900 }}>
            A zero local business-income-tax zone for ten years.
          </div>
        </div>
        <div style={{ fontSize: 24, color: '#A3A3A3' }}>oldtownfreedistpdx.org</div>
      </div>
    ),
    { ...size }
  );
}
