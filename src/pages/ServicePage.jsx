import { Link, useParams, Navigate } from 'react-router-dom'
import Icon from '../components/Icon'
import { Crystal } from '../components/Art'
import { usePolarity } from '../components/Layout'
import { Arrow, DemoButton, LogoMarquee, Testimonials, FAQ, CTABand, SectionHead, MoreServices, Steps } from '../components/Sections'
import { getService, stats, complianceBadges, faqs } from '../data/site'

const heroTheme = { blue: 'blue', lime: 'lime', purple: 'purple', cyan: 'cyan' }
const statementFor = {
  'executive-search': ['Leaders who deliver, not just résumés.', 'in days'],
  'recruitment-process': ['Hire in days, not months.', 'in days'],
  'staffing-solutions': ['Scale your team, your way.', 'your way'],
  'interview-support': ['Better interviews, better hires.', 'better hires'],
  'hr-consulting': ['HR strategy that moves the business.', 'moves'],
  'payroll-management-india': ['Payroll, one partner.', 'one partner'],
  'us-payroll-services': ['US payroll, handled end to end.', 'end to end'],
  'training-development': ['Skills that stay with your team.', 'stay'],
  'compliance-legal': ['Compliance by design, not by chance.', 'by design'],
  'hr-technology': ['Built in-house, not stitched together.', 'in-house'],
  'global-workforce': ['Enter India in days, not months.', 'in days'],
  'coe-coworking': ['Your Center of Excellence, ready to run.', 'ready'],
}

function Highlight({ text, word }) {
  const i = text.indexOf(word)
  if (i < 0) return text
  return <>{text.slice(0, i)}<span className="hl">{word}</span>{text.slice(i + word.length)}</>
}

export default function ServicePage() {
  const { slug } = useParams()
  const s = getService(slug)
  usePolarity('default')
  if (!s) return <Navigate to="/services" replace />
  const [statement, word] = statementFor[s.slug] || ['Built for growing businesses.', 'growing']

  return (
    <>
      <section className={`page-hero ${heroTheme[s.accent]}`}>
        <div className="container page-hero-grid">
          <div className="page-hero-copy">
            <span className="eyebrow">{s.group} · SKAPS HR SOLUTIONS</span>
            <h1 className="t-h1">{s.title}.</h1>
            <p className="t-body-lg">{s.summary}</p>
            <ul className="checklist">{s.points.slice(0, 3).map(p => <li key={p}><Icon name="check" />{p}</li>)}</ul>
            <div className="actions"><DemoButton /><Link className="btn btn-secondary" to="/contact">Contact our team</Link></div>
          </div>
          <div className="page-hero-art"><Crystal accent={s.accent} style={{ right: -60, width: 560, height: 560 }} /></div>
        </div>
      </section>
      <LogoMarquee />

      <section className="section">
        <div className="container">
          <SectionHead title={<Highlight text={statement} word={word} />} copy={s.detail} />
          <div className="feature-grid">
            {s.points.map((p, i) => (
              <article className="feature-card reveal" key={p}>
                <div className={`media-panel ${['blue', 'lime', 'cyan', 'purple'][i % 4]}`}><Crystal accent={['blue', 'lime', 'cyan', 'purple'][i % 4]} style={{ width: 110, height: 110 }} /></div>
                <h3 className="t-h3">{p}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--grey-50)' }}>
        <div className="container">
          <SectionHead title={`One partner for ${s.title.toLowerCase().replace(' (india)', '')}, compliance and payroll.`} copy="SKAPS combines deep local expertise with a structured, confidential process so your team can move quickly and confidently." />
          <ul className="checklist inline reveal" style={{ marginBottom: 48 }}>{complianceBadges.map(b => <li key={b}><Icon name="check" />{b}</li>)}</ul>
          <div className="stat-row reveal">{stats.slice(0, 4).map(([n, l]) => <div key={l}><strong className="t-stat">{n}</strong><p>{l}</p></div>)}</div>
          <div className="t-center" style={{ marginTop: 40 }}><DemoButton className="btn btn-secondary" /></div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead center={false} title={`What companies use ${s.title.replace(' (India)', '')} for`} copy={s.summary} />
          <div className="usecase-grid">
            {s.points.map((p, i) => <div className="usecase reveal" key={p}><span className="ico-box"><Icon name={['globe', 'people', 'doc', 'chart', 'shield', 'spark'][i % 6]} /></span><p>{p}</p></div>)}
            <div className="usecase reveal"><span className="ico-box"><Icon name="ai" /></span><p>SKAPS Intelligence assists with matching, anomaly detection and compliance monitoring across this service.</p></div>
            <div className="usecase reveal"><span className="ico-box"><Icon name="lock" /></span><p>Strict employee-data confidentiality and audit-ready documentation on every engagement.</p></div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--cyan-25)' }}>
        <div className="container pricing-teaser">
          <div>
            <h2 className="t-h2 reveal">Transparent engagement, no hidden fees.</h2>
            <p className="t-muted reveal" style={{ marginTop: 16, maxWidth: 440 }}>SKAPS scopes everything upfront, so the engagement you are quoted is the engagement you get. Choose the model that fits how your organization scales.</p>
            <ul className="checklist reveal" style={{ marginTop: 24 }}>{['Dedicated personal manager', 'Onboarding with a SKAPS specialist', 'Compliance protections built in', 'Month-to-month flexibility', 'Secure employee self-service included'].map(p => <li key={p}><Icon name="check" />{p}</li>)}</ul>
          </div>
          <div className={`price-card ${s.accent === 'blue' || s.accent === 'cyan' ? 'blue' : 'lime'} reveal`}>
            <h3 className="t-h3">{s.title}</h3>
            <p className="t-small">{s.summary}</p>
            <div className="inner"><span className="t-small t-muted">Engagement</span><strong>Custom</strong><span className="t-small t-muted">scoped to your headcount and regions</span></div>
            <DemoButton className={s.accent === 'blue' || s.accent === 'cyan' ? 'btn btn-inverse' : 'btn'}>Get a quote</DemoButton>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead title="How the engagement works." copy="A focused process keeps every engagement transparent, efficient and aligned." />
          <Steps />
        </div>
      </section>

      <Testimonials />
      <MoreServices exclude={s.slug} />
      <CTABand title={<>{s.title} <b>without the overhead.</b></>} secondary="See all services" secondaryTo="/services" />
      <FAQ items={faqs} />
    </>
  )
}
