import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import { Crystal } from '../components/Art'
import { usePolarity } from '../components/Layout'
import { Arrow, PageHero, Testimonials, CTABand, FAQ, SectionHead, DemoButton } from '../components/Sections'
import { needs, benefits, useCases, advantages, pains } from '../data/site'

const needDetail = {
  'contract-staffing': ['Defined project timelines and workloads', 'SKAPS handles payroll, documentation and compliance', 'Scale teams up or down as needs change'],
  'temporary-staffing': ['Seasonal peaks and short-term demand', 'No long-term overhead', 'Role-ready professionals within days'],
  'dedicated-teams': ['Long-term teams aligned to operational goals', 'A dedicated on-site or remote HR partner', 'Customized strategies aligned with business goals'],
  'payroll-outsourcing': ['Accurate, timely and fully compliant processing', 'Reduced administrative overhead and statutory risk', 'Secure ERP access to payslips and leave information'],
}

export default function Solutions() {
  usePolarity('inverse')
  return (
    <>
      <PageHero theme="blue" eyebrow="Tailored solutions" title="Workforce Solutions Designed Around Your Business Needs." copy="Choose the engagement model that fits how your organization scales. A practical model that keeps your teams agile, cost-efficient and compliant." points={['Contract, temporary and dedicated teams', 'Payroll outsourcing for India and the US', 'One accountable partner across regions']} />

      <section className="section">
        <div className="container">
          <SectionHead center={false} eyebrow="By engagement model" title="Four ways to build and pay your workforce." />
          <div className="grid grid-2">
            {needs.map(([t, d, icon, slug], i) => (
              <article className="card reveal need-card" id={slug} key={slug}>
                <div className="need-card-body">
                  <span className="ico-box"><Icon name={icon} /></span>
                  <h3 className="t-h3" style={{ fontSize: 24 }}>{t}</h3>
                  <p className="t-muted">{d}</p>
                  <ul className="checklist">{needDetail[slug].map(p => <li key={p}><Icon name="check" />{p}</li>)}</ul>
                  <DemoButton className="btn btn-secondary btn-sm">Discuss {t.toLowerCase()}</DemoButton>
                </div>
                <div className={`media-panel need-card-art ${['purple', 'blue', 'lime', 'cyan'][i]}`}><Crystal accent={['purple', 'blue', 'lime', 'cyan'][i]} style={{ width: 120, height: 120 }} /></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--grey-50)' }}>
        <div className="container">
          <SectionHead center={false} eyebrow="By use case" title="Whatever you are trying to do, there is a SKAPS solution for it." />
          <div className="usecase-grid">
            {useCases.map(([t, d, icon, to]) => <Link to={to} className="usecase reveal" key={t}><span className="ico-box"><Icon name={icon} /></span><div><strong>{t}</strong><p>{d}</p></div><span className="card-link">Explore <Arrow style={{ width: 14, height: 14 }} /></span></Link>)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Why SKAPS" title="The Smart Way to Build a Flexible Workforce." copy="A practical model that keeps your teams agile, cost-efficient and compliant." />
          <div className="grid grid-4">
            {benefits.map(([t, icon, d]) => <div className="card reveal" key={t} style={{ display: 'grid', gap: 12 }}><span className="ico-box"><Icon name={icon} /></span><h3 className="t-h3">{t}</h3><p className="t-small t-muted">{d}</p></div>)}
          </div>
        </div>
      </section>

      <section className="section pain-section" style={{ background: 'var(--cyan-50)' }}>
        <div className="container pa-grid">
          <article className="card reveal pa-pains"><h3 className="t-h3">Common HR Pain Points</h3><ul className="pa-list">{pains.map(p => <li key={p}><span className="ico-box pain"><Icon name="alert" /></span>{p}</li>)}</ul></article>
          <article className="card card-dark reveal pa-adv"><h3 className="t-h3">The SKAPS Advantage</h3><ul className="adv-grid">{advantages.map(([t, d]) => <li key={t}><span className="ico-box"><Icon name="check" /></span><div><strong>{t}</strong><p className="t-small">{d}</p></div></li>)}</ul></article>
        </div>
      </section>

      <Testimonials />
      <CTABand />
      <FAQ limit={4} />
    </>
  )
}
