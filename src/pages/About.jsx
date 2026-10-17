import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import { HubDiagram } from '../components/Art'
import { usePolarity } from '../components/Layout'
import { Arrow, PageHero, StatsStair, CloseLine, SectionHead } from '../components/Sections'
import { story, storyAI, values, aiPillars, REGIONS, YEARS } from '../data/site'
import aboutTeam from '../assets/about-team.jpg'
import worldMap from '../assets/world-map.png'

export default function About() {
  usePolarity('default')
  return (
    <>
      <PageHero theme="purple" eyebrow="About SKAPS" title="Talent is everywhere. Great teams are built together." copy="SKAPS HR Solutions is a trusted workforce management and recruitment solutions provider helping organizations streamline hiring, payroll, compliance, and employee management across multiple industries." points={[`${YEARS} years of industry excellence`, 'Headquartered in Hyderabad, India', 'Supporting teams in India, the United States and Australia']}>
        <Link className="btn" to="/contact">Talk to our team <Arrow /></Link>
        <Link className="btn btn-secondary" to="/how-it-works">Discover our approach</Link>
      </PageHero>

      <section className="section" id="story">
        <div className="container split">
          <div className="split-visual reveal">
            <img src={aboutTeam} alt="SKAPS leadership team in a strategy meeting" loading="lazy" />
            <div className="experience"><strong>{YEARS}</strong><span>Years of<br />Industry Excellence</span></div>
          </div>
          <div className="prose reveal">
            <span className="eyebrow muted">Our Story</span>
            <h2 className="t-h2">Our Story.</h2>
            {story.map(p => <p key={p.slice(0, 30)}>{p}</p>)}
          </div>
        </div>
      </section>

      <section className="section ai-block" id="ai">
        <div className="container ai-grid">
          <div className="prose">
            <span className="eyebrow" style={{ color: 'var(--dev-cyan)' }}>OUR STORY, CONTINUED · AI AT SKAPS</span>
            <h2 className="t-h2" style={{ color: '#fff' }}>Building an AI-native HR partner.</h2>
            {storyAI.map(p => <p key={p.slice(0, 30)} style={{ color: 'var(--on-dark-3)' }}>{p}</p>)}
            <div className="actions"><Link className="btn btn-inverse" to="/ai">Explore SKAPS Intelligence <Arrow /></Link></div>
          </div>
          <div style={{ display: 'grid', gap: 16 }}>
            <HubDiagram />
            <div className="ai-pillars">{aiPillars.slice(0, 4).map(([t, d, icon]) => <div className="ai-pillar" key={t}><span className="ico-box"><Icon name={icon} /></span><div><strong>{t}</strong><p className="t-small">{d}</p></div></div>)}</div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead title="Our values guide our service." copy="Precision, integrity and strategic value in every engagement." />
          <div className="values-grid">{values.map(([t, d]) => <div className="value-tile reveal" key={t}><Icon name="check" /><strong>{t}</strong><p className="t-small t-muted">{d}</p></div>)}</div>
        </div>
      </section>

      <StatsStair title="Our distributed team supports businesses around the world." copy="Local attention backed by the perspective needed to support modern and distributed teams." />

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

      <CloseLine>Want to work with this team?</CloseLine>
    </>
  )
}
