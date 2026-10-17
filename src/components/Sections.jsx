import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icon'
import { Cube, Crystal, Iso } from './Art'
import { useUI } from './Layout'
import { clientLogos, stats, testimonials, faqs, services, complianceBadges, steps } from '../data/site'

export const Arrow = (props) => <Icon name="arrow" className="arrow" style={{ width: 16, height: 16 }} {...props} />

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

export function StatsStair({ title = 'A single partner for people, payroll and compliance.', copy = 'It is hard to stay compliant when labor laws, statutory rules and payroll requirements keep changing. SKAPS makes it simple.', badges = complianceBadges }) {
  return (
    <section className="section stats-section">
      <div className="container">
        <SectionHead title={title} copy={copy} />
        <ul className="checklist inline reveal" style={{ marginBottom: 48 }}>{badges.map(b => <li key={b}><Icon name="check" />{b}</li>)}</ul>
        <div className="stair-wrap reveal">
          <div className="stair">
            {stats.map(([n, l]) => <div className="step" key={l}><strong className="t-stat">{n}</strong><p>{l}</p></div>)}
          </div>
        </div>
      </div>
    </section>
  )
}

export function Testimonials({ title = 'Companies across industries are building stronger workforces with SKAPS.' }) {
  const track = useRef(null)
  const [idx, setIdx] = useState(0)
  const go = d => {
    const el = track.current; if (!el) return
    const card = el.querySelector('.quote-card'); const w = card ? card.getBoundingClientRect().width + 24 : 500
    const next = Math.max(0, Math.min(testimonials.length - 1, idx + d))
    el.scrollTo({ left: next * w, behavior: 'smooth' }); setIdx(next)
  }
  useEffect(() => {
    const el = track.current; if (!el) return
    const onScroll = () => { const card = el.querySelector('.quote-card'); const w = card ? card.getBoundingClientRect().width + 24 : 500; setIdx(Math.round(el.scrollLeft / w)) }
    el.addEventListener('scroll', onScroll, { passive: true }); return () => el.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <section className="section testimonials">
      <div className="container">
        <SectionHead center={false} title={title} cta={<Link className="btn btn-secondary" to="/clients">See all <Arrow /></Link>} />
        <div className="carousel reveal">
          <div className="carousel-track" ref={track}>
            {testimonials.map(([q, n, r, m, ml]) => (
              <figure className="card quote-card" key={n}>
                <div className="brand-line"><span className="mark" aria-hidden="true">{r.split(', ')[1].charAt(0)}</span>{r.split(', ')[1]}</div>
                <blockquote>“{q}”</blockquote>
                <figcaption className="who">{n}<small>{r.split(', ')[0]}</small></figcaption>
                <div className="metric"><strong>{m}</strong><span>{ml}</span></div>
              </figure>
            ))}
          </div>
          <div className="carousel-controls">
            <div className="carousel-dots">{testimonials.map((_, i) => <i key={i} className={i === idx ? 'on' : ''} />)}</div>
            <div className="carousel-arrows">
              <button type="button" aria-label="Previous" onClick={() => go(-1)}><Icon name="arrowLeft" style={{ width: 16, height: 16 }} /></button>
              <button type="button" aria-label="Next" onClick={() => go(1)}><Icon name="arrow" style={{ width: 16, height: 16 }} /></button>
            </div>
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
          <h2 className="t-h2">{title}</h2>
          <div className="actions">
            <button type="button" className="btn btn-inverse" onClick={openDemo}>{primary} <Arrow /></button>
            <Link className="btn btn-ghost" to={secondaryTo}>{secondary}</Link>
          </div>
          <Cube accent="purple" glow="purple" />
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
              <div className={`media-panel ${s.accent}`} style={{ minHeight: 150 }}><Crystal accent={s.accent} style={{ width: 120, height: 120 }} /></div>
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

export function PageHero({ eyebrow, title, copy, points = [], theme = 'blue', art = 'cube', children, center = false }) {
  return (
    <section className={`page-hero ${theme}${center ? ' center' : ''}`}>
      <div className="container page-hero-grid">
        <div className="page-hero-copy">
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h1 className={center ? 't-h1-center' : 't-h1'}>{title}</h1>
          {copy && <p className="t-body-lg">{copy}</p>}
          {points.length > 0 && <ul className="checklist">{points.map(p => <li key={p}><Icon name="check" />{p}</li>)}</ul>}
          <div className="actions">{children || <DemoButton />}</div>
        </div>
        {!center && (
          <div className="page-hero-art" aria-hidden="true">
            {art === 'cube' ? <Cube accent={theme === 'purple' ? 'purple' : theme === 'lime' ? 'lime' : 'blue'} glow={theme === 'lime' ? 'blue' : 'lime'} /> : <Crystal accent={theme === 'purple' ? 'purple' : 'blue'} />}
          </div>
        )}
      </div>
    </section>
  )
}
