import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'claude-nextjs-starter — claude-nextjs-config applied to a clean Next.js scaffold'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          background: '#09090b',
          color: '#fafafa',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 24,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#a1a1aa',
          }}
        >
          claude-nextjs-starter
        </div>

        <div
          style={{
            fontSize: 64,
            fontWeight: 600,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            maxWidth: '900px',
          }}
        >
          The claude-nextjs-config overlay, applied to a clean Next.js 16 scaffold.
        </div>

        <div
          style={{
            display: 'flex',
            gap: '48px',
            fontSize: 24,
            color: '#d4d4d8',
          }}
        >
          <div>5 agents</div>
          <div>·</div>
          <div>5 commands</div>
          <div>·</div>
          <div>3 hooks</div>
          <div>·</div>
          <div>4 MCP servers</div>
        </div>
      </div>
    ),
    size,
  )
}
