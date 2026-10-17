import { useRef } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import { Cube, Crystal, Tile, Wordmark, Iso } from '../components/Art'
import card1 from '../assets/cards/card-1.svg'
import card2 from '../assets/cards/card-2.svg'
import card3 from '../assets/cards/card-3.svg'
import card4 from '../assets/cards/card-4.svg'
import { usePolarity, useUI } from '../components/Layout'
import { Arrow, DemoButton, LogoMarquee, StatsStair, Testimonials, FAQ, CTABand, SectionHead, Steps } from '../components/Sections'
import { services, pains, advantages, industries, needs, benefits, aiPillars, REGIONS, YEARS } from '../data/site'
import worldMap from '../assets/world-map.png'

// AI card leads — it is the headline capability of the redesigned site.
const valueCards = [
  ['Workforce intelligence powered by AI', 'SKAPS Intelligence assists with candidate matching, payroll anomaly detection and compliance monitoring.', card4, true],
  ['Efficient Payroll Management', 'Rely on our ISO-certified, automated payroll to make sure your team gets paid accurately, on time, in India and the US.', card1],
  ['Access to Qualified Talent Networks', 'Extensive professional and industry networks with proactive, targeted candidate outreach.', card2],
  ['Reliable Compliance Solutions', 'A dedicated compliance team that stays current with labor laws and statutory requirements.', card3],
]

// Floating glass tiles around the statement headline. [className, accent, parallax multiplier]
const skewTop = [['sk1', 'blue', 1.9], ['sk2', 'cyan', 2.75], ['sk3', 'blue', 2.3], ['sk4', 'cyan', 2.9]]
const skewBottom = [['sk5', 'blue', 2.6], ['sk6', 'cyan', 2.2], ['sk7', 'blue', 2.5]]

function Hero() {
  return (
    <section className="hero">
      <div className="hero-glow" aria-hidden="true" />
      <Wordmark text="SKAPS" />
      <div className="container hero-copy">
        <Link to="/ai" className="hero-ai"><span className="dot" /><Icon name="ai" />New · SKAPS Intelligence — AI-assisted hiring, payroll &amp; compliance <Arrow style={{ width: 14, height: 14 }} /></Link>
        <h1 className="t-h1-center">Scale Your Workforce with Reliable HR Solutions.</h1>
        <p className="t-muted measure-sm">SKAPS HR Solutions helps growing businesses manage payroll, hire skilled professionals, and stay fully compliant with labor regulations. Our team handles the complexity of workforce management so you can focus on building and expanding your business.</p>
        <div className="actions hero-actions">
          <DemoButton>Schedule a Consultation</DemoButton>
          <Link className="btn btn-secondary" to="/services">Explore Our Services</Link>
        </div>
        <span className="eyebrow hero-eyebrow">Trusted HR Partner · {YEARS} years of industry excellence</span>
        <div className="hero-floats" aria-hidden="true">
          <div className="float f1"><Icon name="ai" /><span>AI candidate match<strong>94% role fit</strong></span></div>
          <div className="float f2"><Icon name="alert" /><span>Payroll anomaly caught<strong>Before cycle closed</strong></span></div>
          <div className="float f3"><Icon name="shield" /><span>Compliance watchtower<strong>PF filing due · tracked</strong></span></div>
        </div>
      </div>
    </section>
  )
}

function ValueCards() {
  return (
    <section className="value-strip">
      <div className="container grid grid-4">
        {valueCards.map(([t, d, accent, ai], i) => (
          <article className={`card card-frost value-card reveal${ai ? ' value-card-ai' : ''}`} key={t} style={{ transitionDelay: `${i * 60}ms` }}>
            {ai && <span className="ai-tag"><Icon name="ai" />AI</span>}
            <h2 className="t-h3">{t}</h2>
            <p className="t-small t-muted">{d}</p>
            <img className="value-art" src={accent} alt="" aria-hidden="true" loading="lazy" />
          </article>
        ))}
      </div>
    </section>
  )
}

/**
 * Statement block with remote.com-style 3D "skew" effect: the whole block tilts
 * in perspective toward the cursor (±11°) and each floating tile tilts a bit
 * more (parallax multiplier), so the text appears to move in 3D on hover.
 */
function Statement() {
  const art = useRef(null)
  const MAX = 11
  const onMove = e => {
    const el = art.current; if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - .5
    const py = (e.clientY - r.top) / r.height - .5
    el.style.setProperty('--tilt-y', `${(px * 2 * MAX).toFixed(2)}deg`)
    el.style.setProperty('--tilt-x', `${(-py * 2 * MAX).toFixed(2)}deg`)
  }
  const onEnter = () => art.current && art.current.setAttribute('data-armed', '')
  const onLeave = () => {
    const el = art.current; if (!el) return
    el.removeAttribute('data-armed')
    el.style.setProperty('--tilt-x', '0deg'); el.style.setProperty('--tilt-y', '0deg')
  }
  return (
    <section className="statement" onMouseMove={onMove} onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <div className="container skew-art" ref={art}>
        <div className="skew-row skew-top" aria-hidden="true">
          {skewTop.map(([c, a, m]) => <Tile key={c} accent={a} className={`sk ${c}`} style={{ '--m': m }} />)}
        </div>
        <h2 className="t-display t-center reveal">Great achievements in business are the result of teamwork, not individual effort.</h2>
        <div className="skew-row skew-bottom" aria-hidden="true">
          {skewBottom.map(([c, a, m]) => <Tile key={c} accent={a} className={`sk ${c}`} style={{ '--m': m }} />)}
        </div>
        <div className="t-center reveal"><Link to="/how-it-works" className="link">Discover our approach <Arrow style={{ width: 14, height: 14 }} /></Link></div>
      </div>
    </section>
  )
}

function Mock({ variant }) {
  if (variant === 'bars') return (
    <div className="mock">
      <div className="mock-row"><span className="avatar" /><div><strong>Sakura Rao</strong><div className="sub">Hyderabad · Payroll</div></div><span className="pill">Paid</span></div>
      <div className="mock-row"><div><strong>Monthly payroll</strong><div className="sub">₹ 42,60,000 · 128 employees</div></div><div className="mock-bars">{[12, 20, 16, 28, 22, 34, 30].map((h, i) => <i key={i} style={{ height: h }} />)}</div></div>
    </div>
  )
  if (variant === 'hires') return (
    <div className="mock">
      <div className="mock-row"><span className="avatar a2" /><div><strong>Arjun Mehta</strong><div className="sub">Senior Data Engineer</div></div><span className="pill blue">Shortlisted</span></div>
      <div className="mock-row"><span className="avatar a3" /><div><strong>Priya Nair</strong><div className="sub">HR Business Partner</div></div><span className="pill">Offer sent</span></div>
      <div className="mock-row"><span className="avatar" /><div><strong>Daniel Brooks</strong><div className="sub">Finance Controller · US</div></div><span className="pill grey">Interview</span></div>
    </div>
  )
  if (variant === 'compliance') return (
    <div className="mock">
      <div className="mock-row"><div><strong>PF & ESI filings</strong><div className="sub">Due Oct 15</div></div><span className="pill">Filed</span></div>
      <div className="mock-row"><div><strong>Professional tax</strong><div className="sub">Telangana</div></div><span className="pill">Filed</span></div>
      <div className="mock-row"><div><strong>Form 941 · US</strong><div className="sub">Quarterly</div></div><span className="pill blue">Scheduled</span></div>
    </div>
  )
  return (
    <div className="mock">
      <div className="mock-row"><span className="avatar" /><div><strong>Rohit Sharma</strong><div className="sub">United States</div></div><strong>$9,700</strong><span className="pill">Paid</span></div>
      <div className="mock-row"><span className="avatar a2" /><div><strong>Nari Kim</strong><div className="sub">India</div></div><strong>₹1,80,000</strong><span className="pill">Paid</span></div>
      <div className="mock-row"><span className="avatar a3" /><div><strong>Yuki Tanaka</strong><div className="sub">Australia</div></div><strong>A$8,000</strong><span className="pill">Paid</span></div>
    </div>
  )
}

function ServicesBento() {
  const lead = services.find(s => s.slug === 'payroll-management-india')
  const rest = services.filter(s => s.slug !== lead.slug)
  return (
    <section className="section" id="services">
      <div className="container">
        <SectionHead title="Comprehensive Workforce Solutions for Growing Businesses." copy="Practical HR services that help teams move faster, operate confidently and stay focused on growth. Pay, hire and manage your people through one accountable partner — whether they are on your payroll, placed by SKAPS, or part of a dedicated team." />
        <div className="bento">
          <article className="card bento-lead reveal">
            <div>
              <h3 className="t-h2" style={{ fontSize: 28 }}>{lead.title}</h3>
              <p className="t-muted" style={{ marginTop: 10 }}>{lead.summary}</p>
              <ul className="checklist" style={{ marginTop: 28 }}>{lead.points.map(p => <li key={p}><Icon name="check" />{p}</li>)}</ul>
              <Link className="btn" to={`/services/${lead.slug}`} style={{ marginTop: 28 }}>Explore {lead.title.split(' (')[0]} <Arrow /></Link>
            </div>
            <div className="media-panel blue"><Mock variant="payroll" /></div>
          </article>
          {rest.slice(0, 5).map((s, i) => (
            <Link key={s.slug} to={`/services/${s.slug}`} className="card clickable bento-card reveal">
              <div className={`media-panel ${s.accent}`} style={{ minHeight: 160 }}>{i === 0 ? <Mock variant="hires" /> : i === 3 ? <Mock variant="compliance" /> : i === 1 ? <Mock variant="bars" /> : <Crystal accent={s.accent} style={{ width: 120, height: 120 }} />}</div>
              <div className="bento-card-body">
                <h3 className="t-h3">{s.title}</h3>
                <p className="t-small t-muted">{s.summary}</p>
                <span className="btn btn-secondary btn-sm bento-arrow" aria-hidden="true"><Arrow /></span>
              </div>
            </Link>
          ))}
        </div>
        <div className="t-center" style={{ marginTop: 32 }}><Link className="btn btn-secondary" to="/services">View all 12 services <Arrow /></Link></div>
      </div>
    </section>
  )
}

function PainAdvantage() {
  return (
    <section className="section pain-section">
      <div className="container">
        <SectionHead center={false} title="The HR infrastructure growing businesses build on." copy="Common HR pain points, and how SKAPS removes them." />
        <div className="pa-grid">
          <article className="card reveal pa-pains">
            <h3 className="t-h3">Common HR Pain Points</h3>
            <ul className="pa-list">{pains.map(p => <li key={p}><span className="ico-box pain"><Icon name="alert" /></span>{p}</li>)}</ul>
          </article>
          <article className="card card-dark reveal pa-adv">
            <div className="pa-adv-head"><h3 className="t-h3">The SKAPS Advantage</h3><Link to="/solutions" className="btn btn-inverse btn-sm">Why SKAPS <Arrow /></Link></div>
            <ul className="adv-grid">{advantages.map(([t, d]) => <li key={t}><span className="ico-box"><Icon name="check" /></span><div><strong>{t}</strong><p className="t-small">{d}</p></div></li>)}</ul>
          </article>
        </div>
      </div>
    </section>
  )
}

function Segments() {
  return (
    <section className="section">
      <div className="container">
        <SectionHead center={false} title="Workforce Solutions Designed Around Your Business Needs." copy="Choose the engagement model that fits how your organization scales." />
        <div className="grid grid-4 segments">
          {needs.map(([t, d, icon, slug], i) => (
            <Link key={slug} to={`/solutions#${slug}`} className="card clickable segment-card reveal">
              <h3 className="t-h3">{t}</h3>
              <p className="t-small t-muted">{d}</p>
              <span className="card-link">Learn more <Arrow style={{ width: 14, height: 14 }} /></span>
              <Crystal accent={['purple', 'blue', 'lime', 'cyan'][i]} className="segment-art" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function IndustriesRow() {
  return (
    <section className="section industries-strip">
      <div className="container">
        <SectionHead center={false} title="Supporting Workforce Growth Across Multiple Industries." copy="Flexible expertise for organizations at different stages of growth." cta={<Link className="btn btn-secondary" to="/industries">All industries <Arrow /></Link>} />
        <div className="industry-grid">
          {industries.slice(0, 8).map(([t, icon, slug]) => (
            <Link to={`/industries#${slug}`} className="industry reveal" key={slug}><span className="ico-box"><Icon name={icon} /></span><span>{t}</span></Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function AIBlock() {
  return (
    <section className="section ai-block">
      <div className="container ai-grid">
        <div>
          <span className="eyebrow" style={{ color: 'var(--dev-cyan)' }}>SKAPS INTELLIGENCE</span>
          <h2 className="t-h2 reveal" style={{ color: '#fff', marginTop: 12 }}>Workforce intelligence <span className="hl-blue">powered by AI.</span></h2>
          <p className="reveal" style={{ color: 'var(--on-dark-3)', marginTop: 16, maxWidth: 480 }}>Our in-house AI layer works alongside SKAPS consultants to match candidates, catch payroll anomalies before a cycle closes and track statutory changes across India, the US and Australia — with every recommendation reviewed by a human expert.</p>
          <div className="ai-stats reveal">
            <div><strong>&lt;30 mins</strong><span>to a role-ready shortlist</span></div>
            <div><strong>99.9%</strong><span>payroll accuracy with anomaly checks</span></div>
            <div><strong>1</strong><span>human expert reviews every recommendation</span></div>
          </div>
          <div className="actions" style={{ marginTop: 28 }}>
            <Link className="btn btn-inverse" to="/ai">Explore SKAPS Intelligence <Arrow /></Link>
            <Link className="btn btn-ghost" to="/about#ai">How we build with AI</Link>
          </div>
        </div>
        <div className="ai-pillars">
          {aiPillars.map(([t, d, icon]) => (
            <div className="ai-pillar reveal" key={t}><span className="ico-box"><Icon name={icon} /></span><div><strong>{t}</strong><p className="t-small">{d}</p></div></div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Process() {
  return (
    <section className="section" id="process">
      <div className="container">
        <SectionHead title="A Structured Approach to Workforce Management." copy="A focused process keeps every engagement transparent, efficient and aligned." />
        <Steps />
        <div className="t-center" style={{ marginTop: 32 }}><Link className="btn btn-secondary" to="/how-it-works">See how it works <Arrow /></Link></div>
      </div>
    </section>
  )
}

function Global() {
  return (
    <section className="section global" id="global">
      <div className="container global-grid">
        <div>
          <span className="eyebrow muted">Global reach</span>
          <h2 className="t-h2 reveal" style={{ marginTop: 12 }}>Supporting Organizations Across Global Markets.</h2>
          <p className="t-muted reveal" style={{ marginTop: 16, maxWidth: 420 }}>Local attention backed by the perspective needed to support modern and distributed teams.</p>
          <div className="region-tags reveal">{REGIONS.map(r => <span className="tag" key={r}><Icon name="pin" style={{ width: 14, height: 14 }} />{r}</span>)}</div>
        </div>
        <div className="map reveal" aria-label="World map showing SKAPS presence">
          <img className="map-img" src={worldMap} alt="World map outline" loading="lazy" />
          <span className="map-pin p1"><i /><b>United States</b></span>
          <span className="map-pin p2"><i /><b>India (Headquarters)</b></span>
          <span className="map-pin p3"><i /><b>Australia</b></span>
        </div>
      </div>
    </section>
  )
}

function WhySkaps() {
  return (
    <section className="section why">
      <div className="container why-grid">
        <div>
          <h2 className="t-h2 reveal">The Smart Way to Build a Flexible Workforce.</h2>
          <p className="t-muted reveal" style={{ marginTop: 16, maxWidth: 380 }}>A practical model that keeps your teams agile, cost-efficient and compliant.</p>
          <div className="reveal" style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 12 }}><Iso accent="lime" /><span className="t-small"><b>{YEARS}</b> Years of Industry Excellence</span></div>
          <div className="reveal" style={{ marginTop: 28 }}><Link to="/contact#form" className="btn">Talk to a specialist <Arrow /></Link></div>
        </div>
        <ul className="why-rows reveal">
          {benefits.map(([t, icon, d]) => <li key={t}><strong className="t-h3" style={{ fontSize: 24 }}>{t}</strong><span className="why-right"><Icon name={icon} />{d}</span></li>)}
        </ul>
      </div>
    </section>
  )
}

export default function Home() {
  usePolarity('inverse')
  return (
    <>
      <Hero />
      <LogoMarquee intro={<>Trusted By Organizations Managing <b>Modern And Distributed Workforces</b> Across Multiple Industries.</>} />
      <ValueCards />
      <AIBlock />
      <Statement />
      <ServicesBento />
      <StatsStair title="Reliable Compliance for a Secure Workforce." copy="Managing workforce compliance is essential for protecting both organizations and employees. SKAPS ensures that all workforce operations follow the latest labor regulations and statutory requirements." />
      <PainAdvantage />
      <Segments />
      <IndustriesRow />
      <Process />
      <Global />
      <Testimonials />
      <WhySkaps />
      <FAQ limit={5} />
      <CTABand />
    </>
  )
}
