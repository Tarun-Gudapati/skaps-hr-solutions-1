import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icon'
import { Mesh, SpotArt } from './Art'
import { useUI } from './Layout'
import { clientLogos, testimonials, faqs, services, steps, statYears, statSeries } from '../data/site'

export const Arrow = (props) => <Icon name="arrow" className="arrow" style={{ width: 16, height: 16 }} {...props} />

export const AIChip = ({ children, className = '' }) => <span className={`ai-chip ${className}`}><Icon name="ai" />{children}</span>

export function DemoButton({ className = 'btn', children = 'Schedule a consultation' }) {
  const { openDemo } = useUI()
  return <button type="button" className={className} onClick={openDemo}>{children} <Arrow /></button>
}

export function SectionHead({ eyebrow, title, copy, center = true, cta, className = '' }) {
  return (
    <div className={`section-head ${center ? 'center' : ''} ${cta ? 'row' : ''} ${className}`}>
      <div style={{ display: 'grid', gap: 16, justifyItems: center ? 'center' : 'start' }}>
        {eyebrow && <span className="eyebrow muted">{eyebrow}</span>}
        <h2 className="t-h2 measure reveal">{title}</h2>
        {copy && <p className="t-muted measure-sm reveal">{copy}</p>}
      </div>
      {cta}
    </div>
  )
}

export function LogoMarquee({ intro }) {
  const items = [...clientLogos, ...clientLogos]
  return (
    <section className="section-sm logos">
      {intro && <p className="container t-center t-small t-muted" style={{ marginBottom: 28 }}>{intro}</p>}
      <div className="marquee" aria-label="Client organizations">
        <div className="marquee-track">{items.map(([src, name], i) => <span className="logo-tile" key={name + i} aria-hidden={i >= clientLogos.length}><img src={src} alt={i < clientLogos.length ? name : ''} loading="lazy" /></span>)}</div>
      </div>
    </section>
  )
}

// ---------- "By the numbers": one card and one chart type per headline stat ----------
const smoothPath = pts => pts.reduce((d, p, i) => {
  if (!i) return `M${p[0]} ${p[1]}`
  const p0 = pts[i - 2] || pts[i - 1], p1 = pts[i - 1], p3 = pts[i + 1] || p
  const c1 = [p1[0] + (p[0] - p0[0]) / 6, p1[1] + (p[1] - p0[1]) / 6]
  const c2 = [p[0] - (p3[0] - p1[0]) / 6, p[1] - (p3[1] - p1[1]) / 6]
  return `${d} C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p[0]} ${p[1]}`
}, '')
const growthPct = arr => Math.round(((arr.at(-1) - arr.at(-2)) / arr.at(-2)) * 100)

function useInView(ref) {
  const [on, setOn] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect() } }, { threshold: .35 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [ref])
  return on
}

function CountUp({ to, format, on }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!on) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setN(to); return }
    let raf, start
    const tick = t => {
      start ??= t
      const p = Math.min(1, (t - start) / 1400)
      setN(to * (1 - Math.pow(1 - p, 3)))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [on, to])
  return format(n)
}

function StatCard({ className = '', label, to, format, delta, caption, children }) {
  const ref = useRef(null)
  const on = useInView(ref)
  return (
    <article ref={ref} className={`stat-card ${className}${on ? ' on' : ''}`}>
      <div className="stat-head">
        <span className="stat-label">{label}</span>
        {delta && <span className="stat-delta"><Icon name="arrow" />{delta}</span>}
      </div>
      <strong className="stat-num"><CountUp to={to} format={format} on={on} /></strong>
      <div className="stat-chart">{children}</div>
      {caption && <p className="stat-caption">{caption}</p>}
    </article>
  )
}

function BarChart({ values }) {
  const max = Math.max(...values)
  return (
    <div className="bars" aria-hidden="true">
      {values.map((v, i) => (
        <div key={statYears[i]} className={`bar${i === values.length - 1 ? ' last' : ''}`} style={{ '--h': `${(v / max) * 100}%`, '--i': i }}>
          {i === values.length - 1 && <b>{v}+</b>}<i /><span>{`'${statYears[i].slice(2)}`}</span>
        </div>
      ))}
    </div>
  )
}

function AreaChart({ values }) {
  const W = 400, H = 150, max = Math.max(...values)
  const pts = values.map((v, i) => [Math.round((i / (values.length - 1)) * W), Math.round(H - 12 - (v / max) * (H - 30))])
  const d = smoothPath(pts)
  return (
    <svg className="area" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">
      <defs><linearGradient id="stat-area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#7ed6e6" stopOpacity=".45" /><stop offset="1" stopColor="#7ed6e6" stopOpacity="0" /></linearGradient></defs>
      {[40, 80, 120].map(y => <line key={y} x1="0" x2={W} y1={y} y2={y} className="grid" />)}
      <path className="fill" d={`${d} L${W} ${H} L0 ${H} Z`} fill="url(#stat-area)" />
      <path className="line" d={d} pathLength="1" fill="none" />
    </svg>
  )
}

function DotGrid({ total, per }) {
  return <div className="dots" aria-hidden="true">{Array.from({ length: total / per }, (_, i) => <i key={i} style={{ '--i': i }} />)}</div>
}

function HBars({ values }) {
  const rows = values.slice(-5), years = statYears.slice(-5), max = Math.max(...rows)
  return (
    <ul className="hbars" aria-hidden="true">
      {rows.map((v, i) => <li key={years[i]} style={{ '--w': `${(v / max) * 100}%`, '--i': i }}><span>{years[i]}</span><i /><b>₹{v} Cr</b></li>)}
    </ul>
  )
}

function Donut({ pct }) {
  const r = 52, c = 2 * Math.PI * r
  return (
    <svg className="donut" viewBox="0 0 140 140" aria-hidden="true" style={{ '--c': c, '--off': c * (1 - pct / 100) }}>
      <circle cx="70" cy="70" r={r} className="track" />
      <circle cx="70" cy="70" r={r} className="val" transform="rotate(-90 70 70)" />
      <path d="M57 71l9 9 18-19" className="tick" pathLength="1" />
    </svg>
  )
}

const k = n => (n >= 1000 ? '1K+' : Math.round(n).toLocaleString('en-IN'))

function StatsShowcase() {
  const { clients, workforce, placements, payrollCr } = statSeries
  const grid = useRef(null)
  const [slide, setSlide] = useState(0)
  const onScroll = () => {
    const el = grid.current
    const card = el.firstElementChild
    if (card) setSlide(Math.round(el.scrollLeft / (card.getBoundingClientRect().width + 12)))
  }
  return (
    <>
    <div className="stat-grid" ref={grid} onScroll={onScroll}>
      <StatCard className="span-3" label="Clients supported" to={50} format={n => `${Math.round(n)}+`} delta={`${growthPct(clients)}% YoY`} caption="Organizations across technology, semiconductors, finance and services.">
        <BarChart values={clients} />
      </StatCard>
      <StatCard className="span-3" label="Workforce managed" to={1000} format={k} delta={`${Math.round(workforce.at(-1) / workforce[0])}x since 2020`} caption="People on SKAPS-run payroll, contracts and dedicated teams.">
        <AreaChart values={workforce} />
      </StatCard>
      <StatCard className="span-2" label="Successful placements" to={1500} format={n => `${Math.round(n).toLocaleString('en-IN')}+`} delta={`${growthPct(placements)}% YoY`} caption="Each dot is 10 people placed. Green dots: placed this year.">
        <DotGrid total={1500} per={10} />
      </StatCard>
      <StatCard className="span-2" label="Payroll processed" to={25} format={n => `₹${Math.round(n)} Cr+`} delta={`${Math.round(payrollCr.at(-1) / payrollCr[0])}x since 2020`}>
        <HBars values={payrollCr} />
      </StatCard>
      <StatCard className="span-2 donut-card" label="Compliance accuracy" to={99.9} format={n => `${n.toFixed(1)}%`} caption="Filings accurate and on time, across every engagement.">
        <Donut pct={99.9} />
      </StatCard>
    </div>
    <div className="stat-dots" aria-hidden="true">{[0, 1, 2, 3, 4].map(i => <i key={i} className={i === slide ? 'on' : ''} />)}</div>
    </>
  )
}

export function StatsStair({ title = 'SKAPS, by the numbers.', copy = 'A decade of hiring, paying and protecting teams — and still accelerating.' }) {
  return (
    <section className="section stats-section">
      <div className="container">
        <SectionHead eyebrow="Since 2015" title={title} copy={copy} />
        <StatsShowcase />
        <p className="stat-foot">Headline figures as of 2026. Year-on-year trends are indicative.</p>
      </div>
    </section>
  )
}

export function CloseLine({ children = 'Tell us what you need to hire, pay or stay compliant.' }) {
  return (
    <section className="close-line">
      <div className="container">
        <p>{children} <Link className="link" to="/contact">Talk to SKAPS <Arrow style={{ width: 14, height: 14 }} /></Link></p>
      </div>
    </section>
  )
}

export function Testimonials({ title = 'Teams that trust SKAPS with their people.' }) {
  const [idx, setIdx] = useState(0)
  const [q, n, r, m, ml] = testimonials[idx]
  const [role, org] = r.split(', ')
  return (
    <section className="section testimonials">
      <div className="container">
        <SectionHead center={false} title={title} cta={<Link className="btn btn-secondary" to="/clients">All client stories <Arrow /></Link>} />
        <div className="reveal">
          <figure className="feature-quote" key={n}>
            <div>
              <blockquote>“{q}”</blockquote>
              <figcaption className="who"><span className="avatar-initials" aria-hidden="true">{n.split(' ').map(w => w[0]).join('')}</span><span>{n}<small>{role} · {org}</small></span></figcaption>
            </div>
            <div className="metric"><strong>{m}</strong><span>{ml}</span></div>
          </figure>
          <div className="quote-tabs" role="tablist" aria-label="Client stories">
            {testimonials.map(([, name, rr], i) => <button key={name} type="button" role="tab" aria-selected={i === idx} onClick={() => setIdx(i)}>{rr.split(', ')[1]}</button>)}
          </div>
        </div>
      </div>
    </section>
  )
}

export function FAQ({ items = faqs, title = 'Frequently asked questions', eyebrow, limit }) {
  const [open, setOpen] = useState(0)
  const list = limit ? items.slice(0, limit) : items
  const { openDemo } = useUI()
  return (
    <section className="section faq-section" id="faq">
      <div className="container faq-grid">
        <div>
          {eyebrow && <span className="eyebrow muted">{eyebrow}</span>}
          <h2 className="t-h2 reveal" style={{ maxWidth: 360 }}>{title}</h2>
          <p className="t-muted reveal" style={{ marginTop: 16, maxWidth: 340 }}>Still have questions? <button type="button" className="link" onClick={openDemo}>Chat with our experts <Arrow style={{ width: 14, height: 14 }} /></button></p>
        </div>
        <div className="faq reveal">
          {list.map(([q, a], i) => (
            <div className={`faq-item${open === i ? ' open' : ''}`} key={q}>
              <button type="button" className="faq-q" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}><span>{q}</span><Icon name={open === i ? 'minus' : 'plus'} /></button>
              <div className="faq-a"><div><p>{a}</p></div></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function CTABand({ title = <>Build a <b>Stronger Workforce</b> with Expert HR Support.</>, primary = 'Schedule Consultation', secondaryTo = '/contact', secondary = 'Contact Our Team' }) {
  const { openDemo } = useUI()
  return (
    <section className="cta-band">
      <div className="container">
        <div className="cta-card reveal">
          <Mesh />
          <h2 className="t-h2">{title}</h2>
          <div className="actions">
            <button type="button" className="btn btn-inverse" onClick={openDemo}>{primary} <Arrow /></button>
            <Link className="btn btn-ghost" to={secondaryTo}>{secondary}</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export function MoreServices({ exclude, title = 'More ways to strengthen your workforce.' }) {
  const list = services.filter(s => s.slug !== exclude).slice(0, 3)
  return (
    <section className="section">
      <div className="container">
        <SectionHead center={false} title={title} />
        <div className="grid grid-3">
          {list.map(s => (
            <Link key={s.slug} to={`/services/${s.slug}`} className="card clickable reveal more-card">
              <div className={`media-panel ${s.accent}`} style={{ minHeight: 150 }}><SpotArt icon={s.icon} accent={s.accent} style={{ maxWidth: 200 }} /></div>
              <h3 className="t-h3" style={{ marginTop: 20 }}>{s.title}</h3>
              <p className="t-small t-muted" style={{ marginTop: 8 }}>{s.summary}</p>
              <span className="card-link" style={{ marginTop: 16 }}>Explore <Arrow style={{ width: 14, height: 14 }} /></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Steps({ compact = false }) {
  return (
    <div className={`steps${compact ? ' compact' : ''}`}>
      {steps.map(([n, t, d]) => (
        <article className="step-card reveal" key={n}>
          <b className="step-num">{n}</b>
          <h3 className="t-h3">{t}</h3>
          <p className="t-small t-muted">{d}</p>
        </article>
      ))}
    </div>
  )
}

export function PageHero({ eyebrow, title, copy, points = [], children, center = false, aside }) {
  return (
    <section className={`page-hero${center ? ' center' : ''}`}>
      <Mesh />
      <div className="container page-hero-grid">
        <div className="page-hero-copy">
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h1 className={center ? 't-h1-center' : 't-h1'}>{title}</h1>
          {copy && <p className="t-body-lg">{copy}</p>}
          <div className="actions">{children || <DemoButton />}</div>
        </div>
        {!center && (aside || points.length > 0) && (
          <div className="page-hero-aside reveal">
            {aside || (
              <div className="glance-card">
                <span className="eyebrow muted">At a glance</span>
                <ul className="checklist">{points.map(p => <li key={p}><Icon name="check" />{p}</li>)}</ul>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
