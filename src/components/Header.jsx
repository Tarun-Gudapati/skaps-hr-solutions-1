import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Icon from './Icon'
import { Crystal, Iso } from './Art'
import { menus, topLinks } from '../data/nav'
import { BRAND, PHONE, PHONE_TEL } from '../data/site'
import { useUI } from './Layout'
import skapsMark from '../assets/skaps-mark.png'

export function Brand({ className = '' }) {
  return (
    <Link to="/" className={`brand ${className}`} aria-label="SKAPS HR SOLUTIONS home">
      <img src={skapsMark} alt="" />
      <span className="brand-text"><span>{BRAND}</span><small>HR SOLUTIONS</small></span>
    </Link>
  )
}

function MenuItem({ item, onNavigate }) {
  const { openDemo } = useUI()
  const inner = (
    <>
      {item.iso ? <Iso accent={item.iso} /> : item.icon ? <Icon name={item.icon} /> : null}
      <span>
        <strong>{item.title}{item.badge && <span className="badge-new">{item.badge}</span>}</strong>
        {item.desc && <span className="desc">{item.desc}</span>}
      </span>
    </>
  )
  const cls = `mega-item${item.desc ? '' : ' plain'}`
  if (item.action === 'demo') return <button type="button" className={cls} onClick={() => { onNavigate(); openDemo() }}>{inner}</button>
  return <Link className={cls} to={item.to} onClick={onNavigate}>{inner}</Link>
}

function Promo({ promo, onNavigate }) {
  return (
    <aside className={`mega-promo ${promo.theme}`}>
      <span className="eyebrow">{promo.eyebrow}</span>
      {promo.title && <h4>{promo.title}</h4>}
      {promo.text && <p>{promo.text}</p>}
      {promo.list && (
        <div className="promo-list">{promo.list.map(l => <Link key={l.title} to={l.to} onClick={onNavigate}>{l.title}<Icon name="arrow" /></Link>)}</div>
      )}
      <Link className="link" to={promo.to} onClick={onNavigate}>{promo.cta} <Icon name="arrow" className="arrow" style={{ width: 14, height: 14 }} /></Link>
      {promo.art === 'crystal' && <Crystal accent={promo.accent} />}
    </aside>
  )
}

export default function Header({ polarity }) {
  const [open, setOpen] = useState(null)          // desktop mega menu label
  const [drawer, setDrawer] = useState(false)     // mobile drawer
  const [sub, setSub] = useState(null)            // mobile sub-panel label
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const { openDemo } = useUI()
  const closeTimer = useRef()

  useEffect(() => { setOpen(null); setDrawer(false); setSub(null) }, [pathname])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => {
    document.body.classList.toggle('no-scroll', drawer)
    const onKey = e => { if (e.key === 'Escape') { setOpen(null); setDrawer(false) } }
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('keydown', onKey); document.body.classList.remove('no-scroll') }
  }, [drawer])

  // Any page scroll while a mega menu is open dismisses it, so users never feel "stuck" inside the panel.
  useEffect(() => {
    if (!open) return
    // wheel/touch inside the panel itself is allowed (it may need to scroll on short screens)
    const dismiss = e => { if (e.type !== 'scroll' && e.target.closest && e.target.closest('.mega')) return; setOpen(null) }
    window.addEventListener('scroll', dismiss, { passive: true })
    window.addEventListener('wheel', dismiss, { passive: true })
    window.addEventListener('touchmove', dismiss, { passive: true })
    return () => { window.removeEventListener('scroll', dismiss); window.removeEventListener('wheel', dismiss); window.removeEventListener('touchmove', dismiss) }
  }, [open])

  const enter = label => { clearTimeout(closeTimer.current); setOpen(label) }
  const leave = () => { closeTimer.current = setTimeout(() => setOpen(null), 160) }
  const close = () => { clearTimeout(closeTimer.current); setOpen(null) }
  const barClass = `nav-bar${scrolled ? ' scrolled' : ''}${open ? ' menu-open' : ''}`
  const active = menus.find(m => m.label === open)

  return (
    <header className="site-header" onMouseLeave={leave}>
      <div className={barClass} data-polarity={polarity}>
        <Brand />
        <ul className="nav-list">
          {menus.map(m => (
            <li className="nav-item" key={m.label} onMouseEnter={() => enter(m.label)}>
              <button type="button" aria-expanded={open === m.label} aria-haspopup="true" onClick={() => setOpen(open === m.label ? null : m.label)}>
                {m.label}<Icon name="chevron" className="chev" />
              </button>
            </li>
          ))}
          {topLinks.map(l => <li className="nav-item" key={l.to} onMouseEnter={() => enter(null)}><Link to={l.to}>{l.label}{l.badge && <span className="nav-badge">{l.badge}</span>}</Link></li>)}
        </ul>
        <div className="nav-right" onMouseEnter={() => enter(null)}>
          <a className="nav-phone" href={`tel:${PHONE_TEL}`}><Icon name="phone" />{PHONE}</a>
          <button type="button" className="btn btn-primary-nav" onClick={openDemo}>Schedule a consultation <Icon name="arrow" className="arrow" style={{ width: 16, height: 16 }} /></button>
        </div>
        <button type="button" className="burger" aria-label="Open menu" aria-expanded={drawer} onClick={() => setDrawer(true)}><Icon name="menu" /></button>
      </div>

      {active && <div className="mega-backdrop" onClick={close} onMouseEnter={leave} aria-hidden="true" />}
      {active && (
        <div className="mega" onMouseEnter={() => enter(active.label)} role="region" aria-label={`${active.label} menu`}>
          <button type="button" className="mega-close" aria-label="Close menu" onClick={close}><Icon name="close" /></button>
          <div className="mega-groups">
            {active.groups.map(g => (
              <div className="mega-group" key={g.heading}>
                <span className="eyebrow">{g.heading}</span>
                <div className="mega-items">{g.items.map(it => <MenuItem key={it.title} item={it} onNavigate={close} />)}</div>
              </div>
            ))}
          </div>
          <Promo promo={active.promo} onNavigate={close} />
        </div>
      )}

      {drawer && (
        <div className="drawer" role="dialog" aria-modal="true" aria-label="Site menu">
          <div className="drawer-top">
            <Brand />
            <button type="button" className="drawer-close" aria-label="Close menu" onClick={() => setDrawer(false)}><Icon name="close" /></button>
          </div>
          <div className="drawer-body">
            {!sub ? (
              <ul className="drawer-root">
                {menus.map(m => <li key={m.label}><button type="button" onClick={() => setSub(m.label)}>{m.label}<Icon name="chevronRight" /></button></li>)}
                {topLinks.map(l => <li key={l.to}><Link to={l.to}>{l.label}{l.badge && <span className="nav-badge">{l.badge}</span>}</Link></li>)}
              </ul>
            ) : (
              <div className="drawer-sub">
                <button type="button" className="drawer-sub-head" onClick={() => setSub(null)}><Icon name="arrowLeft" />{sub}</button>
                {menus.find(m => m.label === sub).groups.map(g => (
                  <div key={g.heading}>
                    <span className="eyebrow">{g.heading}</span>
                    {g.items.map(it => <MenuItem key={it.title} item={it} onNavigate={() => setDrawer(false)} />)}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="drawer-foot">
            <a className="tag" href={`tel:${PHONE_TEL}`}><span style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}><Icon name="phone" style={{ width: 18, height: 18 }} />{PHONE}</span><Icon name="chevronRight" style={{ width: 16, height: 16 }} /></a>
            <div className="row">
              <Link className="btn btn-secondary" to="/contact" onClick={() => setDrawer(false)}>Contact</Link>
              <button type="button" className="btn" onClick={() => { setDrawer(false); openDemo() }}>Schedule <Icon name="arrow" className="arrow" style={{ width: 16, height: 16 }} /></button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
