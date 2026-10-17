import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import { Iso } from '../components/Art'
import { usePolarity } from '../components/Layout'
import { Arrow, PageHero, LogoMarquee, Testimonials, CTABand, FAQ, SectionHead } from '../components/Sections'
import { services, serviceGroups } from '../data/site'

export default function Services() {
  usePolarity('default')
  return (
    <>
      <PageHero theme="purple" eyebrow="What we do" title="Comprehensive Workforce Solutions for Growing Businesses." copy="Practical HR services that help teams move faster, operate confidently and stay focused on growth." points={['Talent: search, recruitment, staffing and interview support', 'Payroll & compliance across India and the US', 'Advisory, training, HR technology and India entry']} />
      <LogoMarquee />
      {serviceGroups.map((g, gi) => (
        <section className="section" key={g} id={g.toLowerCase().replace(/[^a-z]+/g, '-')} style={{ background: gi % 2 ? 'var(--grey-50)' : '#fff' }}>
          <div className="container">
            <SectionHead center={false} eyebrow={`0${gi + 1}`} title={g} />
            <div className="grid grid-3">
              {services.filter(s => s.group === g).map((s, i) => (
                <Link to={`/services/${s.slug}`} className="card clickable reveal" key={s.slug} style={{ display: 'grid', gap: 12 }}>
                  <span className="eyebrow muted">{String(services.indexOf(s) + 1).padStart(2, '0')}</span>
                  <Iso accent={s.accent} className="" />
                  <h3 className="t-h3">{s.title}</h3>
                  <p className="t-small t-muted">{s.summary}</p>
                  <span className="card-link">Learn more <Arrow style={{ width: 14, height: 14 }} /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}
      <Testimonials />
      <CTABand />
      <FAQ limit={4} />
    </>
  )
}
