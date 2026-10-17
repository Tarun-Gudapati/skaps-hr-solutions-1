import { SpotArt } from '../components/Art'
import { usePolarity } from '../components/Layout'
import { PageHero, CloseLine, SectionHead, DemoButton } from '../components/Sections'
import { industries } from '../data/site'

const accents = ['blue', 'lime', 'purple', 'cyan']

export default function Industries() {
  usePolarity('default')
  return (
    <>
      <PageHero theme="lime" eyebrow="Industries" title="Supporting Workforce Growth Across Multiple Industries." copy="Flexible expertise for organizations at different stages of growth — from AI-first startups to semiconductor leaders and financial institutions." points={['Industry-specific talent networks', 'Compliance tailored to each sector', 'AI-assisted matching for specialist roles']} art="crystal" />
      <section className="section">
        <div className="container">
          <SectionHead center={false} title="Twelve industries. One accountable workforce partner." copy="Every industry gets talent networks, compliance know-how and SKAPS Intelligence tuned to its roles." />
          <div className="grid grid-3">
            {industries.map(([t, icon, slug, d], i) => (
              <article className="card reveal industry-card" id={slug} key={slug}>
                <div className={`media-panel ${accents[i % accents.length]}`}><SpotArt icon={icon} accent={accents[i % accents.length]} style={{ maxWidth: 240 }} /></div>
                <div className="industry-card-body">
                  <h3 className="t-h3">{t}</h3>
                  <p className="t-small t-muted">{d}</p>
                  <DemoButton className="btn btn-secondary btn-sm">Talk to us</DemoButton>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CloseLine>Work in an industry we should know about?</CloseLine>
    </>
  )
}
