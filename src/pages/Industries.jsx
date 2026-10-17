import Icon from '../components/Icon'
import { Crystal } from '../components/Art'
import { usePolarity } from '../components/Layout'
import { PageHero, LogoMarquee, Testimonials, CTABand, SectionHead, DemoButton } from '../components/Sections'
import { industries } from '../data/site'

export default function Industries() {
  usePolarity('default')
  return (
    <>
      <PageHero theme="lime" eyebrow="Industries" title="Supporting Workforce Growth Across Multiple Industries." copy="Flexible expertise for organizations at different stages of growth — from AI-first startups to semiconductor leaders and financial institutions." points={['Industry-specific talent networks', 'Compliance tailored to each sector', 'AI-assisted matching for specialist roles']} art="crystal" />
      <LogoMarquee intro="Trusted By Organizations Managing Modern And Distributed Workforces Across Multiple Industries." />
      <section className="section">
        <div className="container">
          <SectionHead center={false} title="Twelve industries. One accountable workforce partner." />
          <div className="grid grid-3">
            {industries.map(([t, icon, slug, d], i) => (
              <article className="card reveal" id={slug} key={slug} style={{ display: 'grid', gap: 12, overflow: 'hidden', minHeight: 230 }}>
                <span className="ico-box"><Icon name={icon} /></span>
                <h3 className="t-h3">{t}</h3>
                <p className="t-small t-muted" style={{ maxWidth: '78%' }}>{d}</p>
                <DemoButton className="btn btn-secondary btn-sm" >Talk to us</DemoButton>
                <Crystal accent={['blue', 'lime', 'purple', 'cyan', 'orange'][i % 5]} style={{ position: 'absolute', right: -50, top: -20, width: 150, height: 150, opacity: .8 }} />
              </article>
            ))}
          </div>
        </div>
      </section>
      <Testimonials />
      <CTABand />
    </>
  )
}
