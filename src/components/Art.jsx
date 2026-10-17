// Original SVG artwork in the style of remote.com's 3D "glass cube / crystal" illustrations.
// All shapes are drawn here (no third-party assets), using the brand gradient palette.

let uid = 0
const id = (p) => `${p}-${++uid}`

const palettes = {
  // SKAPS brand: deep navy → logo blue → light tints
  purple: ['#071a28', '#0d2b3e', '#1f8fd0', '#7cc4ec', '#d6ecf8'],
  blue: ['#0d2b3e', '#176f9d', '#2090d0', '#7cc4ec', '#dcedf7'],
  // SKAPS green (logo)
  lime: ['#2a470d', '#558a1b', '#7fbf2a', '#b6dc82', '#e6f2d3'],
  cyan: ['#0d4461', '#1f8fd0', '#3aa6e2', '#c3e1f2', '#f5fafd'],
  // gold (logo arrow)
  orange: ['#7a4a05', '#c07d12', '#f0a92a', '#f7cf7a', '#fdf0d5'],
}

/** Isometric cube with glowing gradient faces + thin wireframe shell (hero / page-hero art). */
export function Cube({ accent = 'blue', glow = 'lime', className = '', style }) {
  const p = palettes[accent] || palettes.blue
  const g = palettes[glow] || palettes.lime
  const a = id('cf'), b = id('cg'), c = id('ch'), d = id('cglow')
  return (
    <svg viewBox="0 0 400 400" className={`art ${className}`} style={style} aria-hidden="true">
      <defs>
        <linearGradient id={a} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={p[3]} /><stop offset="1" stopColor={p[1]} /></linearGradient>
        <linearGradient id={b} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={p[4]} /><stop offset="1" stopColor={p[2]} /></linearGradient>
        <linearGradient id={c} x1="1" y1="0" x2="0" y2="1"><stop offset="0" stopColor={p[2]} /><stop offset="1" stopColor={p[0]} /></linearGradient>
        <radialGradient id={d}><stop offset="0" stopColor={g[3]} /><stop offset=".6" stopColor={g[2]} /><stop offset="1" stopColor={g[2]} stopOpacity="0" /></radialGradient>
      </defs>
      {/* back wireframe cube */}
      <g fill="none" stroke="#fff" strokeOpacity=".7" strokeWidth="1.2">
        <path d="M60 150 200 70l140 80-140 80z" /><path d="M60 150v120l140 80V230M340 150v120L200 350" /><path d="M200 70v160" />
      </g>
      {/* glowing core */}
      <circle cx="200" cy="200" r="120" fill={`url(#${d})`} opacity=".9" />
      {/* main cube */}
      <path d="M110 180 200 128l90 52-90 52z" fill={`url(#${b})`} />
      <path d="M110 180v104l90 52V232z" fill={`url(#${a})`} />
      <path d="M290 180v104l-90 52V232z" fill={`url(#${c})`} />
      {/* highlight edge */}
      <path d="M110 180 200 128l90 52" fill="none" stroke="#fff" strokeOpacity=".8" strokeWidth="1.5" />
      <path d="M200 232v104" fill="none" stroke="#fff" strokeOpacity=".35" strokeWidth="1" />
    </svg>
  )
}

/** Cluster of translucent crystal shards (mega-menu promo, segment cards). */
export function Crystal({ accent = 'purple', className = '', style }) {
  const p = palettes[accent] || palettes.purple
  const a = id('cr'), b = id('cr2')
  return (
    <svg viewBox="0 0 300 300" className={`art ${className}`} style={style} aria-hidden="true">
      <defs>
        <linearGradient id={a} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={p[4]} stopOpacity=".95" /><stop offset="1" stopColor={p[2]} stopOpacity=".6" /></linearGradient>
        <linearGradient id={b} x1="0" y1="1" x2="1" y2="0"><stop offset="0" stopColor={p[1]} /><stop offset="1" stopColor={p[3]} /></linearGradient>
      </defs>
      <g opacity=".95">
        <path d="M150 20 230 120 150 170 70 120z" fill={`url(#${a})`} />
        <path d="M70 120l80 50v110L70 230z" fill={`url(#${b})`} opacity=".9" />
        <path d="M230 120l-80 50v110l80-50z" fill={p[2]} opacity=".55" />
        <path d="M30 200 90 160l40 80-60 40z" fill={p[3]} opacity=".7" />
        <path d="M200 230l70-30 20 60-60 30z" fill={p[4]} opacity=".75" />
        <g fill="none" stroke="#fff" strokeOpacity=".7" strokeWidth="1"><path d="M150 20 230 120 150 170 70 120zM150 170v110M70 120v110l80 50 80-50V120" /></g>
      </g>
    </svg>
  )
}

/** Floating squircle "glass tile" with inner gem (statement section). */
export function Tile({ accent = 'blue', size = 90, className = '', style }) {
  const p = palettes[accent] || palettes.blue
  const a = id('tl'), b = id('tg')
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={`art tile ${className}`} style={style} aria-hidden="true">
      <defs>
        <linearGradient id={a} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={p[4]} /><stop offset=".5" stopColor={p[3]} /><stop offset="1" stopColor={p[1]} /></linearGradient>
        <linearGradient id={b} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#b6dc82" /><stop offset="1" stopColor="#7fbf2a" /></linearGradient>
      </defs>
      <rect x="6" y="6" width="88" height="88" rx="26" fill={`url(#${a})`} />
      <rect x="6" y="6" width="88" height="88" rx="26" fill="none" stroke="#fff" strokeOpacity=".6" />
      <path d="M50 24 76 50 50 76 24 50z" fill={`url(#${b})`} opacity=".95" />
    </svg>
  )
}

/** Small isometric 3D icon used for services in the mega menu & cards. */
export function Iso({ accent = 'blue', className = '' }) {
  const p = palettes[accent] || palettes.blue
  const a = id('iso')
  return (
    <svg viewBox="0 0 32 32" className={`ico-3d ${className}`} aria-hidden="true">
      <defs><linearGradient id={a} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={p[4]} /><stop offset="1" stopColor={p[2]} /></linearGradient></defs>
      <path d="M6 12 16 6l10 6-10 6z" fill={`url(#${a})`} />
      <path d="M6 12v10l10 6V18z" fill={p[2]} />
      <path d="M26 12v10l-10 6V18z" fill={p[1]} />
      <path d="M11 20.5 16 23.5l5-3" fill="none" stroke="#b6dc82" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

/** Giant wordmark used as hero artwork (remote renders its logo huge in pale cyan). */
export function Wordmark({ text = 'skaps', className = '' }) {
  return (
    <div className={`wordmark ${className}`} aria-hidden="true"><span>{text}</span></div>
  )
}

/** Hub diagram: AI tools connected to the SKAPS core (for the AI page). */
export function HubDiagram({ className = '' }) {
  const nodes = [
    ['Candidate matching', 70, 60], ['Payroll checks', 330, 50], ['Compliance alerts', 370, 200], ['Analytics', 320, 330], ['Onboarding', 80, 330], ['Chat assistant', 40, 200],
  ]
  return (
    <svg viewBox="0 0 420 380" className={`art ${className}`} aria-hidden="true">
      <defs><linearGradient id="hubg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#2090d0" /><stop offset="1" stopColor="#0d2b3e" /></linearGradient></defs>
      {nodes.map(([n, x, y], i) => (
        <g key={n}>
          <line x1="210" y1="190" x2={x} y2={y} stroke="#9ad64f" strokeOpacity=".55" strokeWidth="1" strokeDasharray="3 4" />
          <circle cx={(210 + x) / 2} cy={(190 + y) / 2} r="2.5" fill="#9ad64f" />
          <rect x={x - 14} y={y - 14} width="28" height="28" rx="6" fill="#10283a" stroke="#9ad64f" strokeOpacity=".7" />
          <circle cx={x} cy={y} r="3" fill="#9ad64f" />
          <text x={x} y={y + 30} fill="#b9c7d1" fontSize="9" textAnchor="middle" fontFamily="var(--mono)">{n}</text>
        </g>
      ))}
      <path d="M210 150l36 20v40l-36 20-36-20v-40z" fill="url(#hubg)" stroke="#7cc4ec" strokeWidth="1.5" />
      <text x="210" y="196" fill="#fff" fontSize="20" fontWeight="800" textAnchor="middle" fontFamily="var(--font)">S</text>
    </svg>
  )
}
