import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Mesh, NeedArt, needAccents } from '../components/Art'
import { usePolarity } from '../components/Layout'
import { Arrow, DemoButton, LogoMarquee, StatsStair, FAQ, CTABand, SectionHead } from '../components/Sections'
import AIWorkflow from '../components/AIWorkflow'
import { needs, testimonials } from '../data/site'

const heroRoles = ['Software Engineer', 'Data Scientist', 'Finance Controller', 'HR Business Partner', 'Sales Team', 'Support Team']

function RoleRotator() {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => setI(n => (n + 1) % heroRoles.length), 2400)
    return () => clearInterval(t)
  }, [])
  return (
    <span className="rotator">
      <span className="sr-only">next hire</span>
      <span className="rotator-words" aria-hidden="true">
        {heroRoles.map((r, n) => <span key={r} className={n === i ? 'on' : n === (i - 1 + heroRoles.length) % heroRoles.length ? 'out' : ''}>{r}</span>)}
      </span>
    </span>
  )
}

function Hero() {
  return (
    <section className="home-hero">
      <Mesh />
      <div className="container home-hero-copy">
        <h1 className="t-h1">Hire your <RoleRotator /><span className="hero-line2">We’ll handle the rest.</span></h1>
        <p className="t-body-lg">AI-assisted hiring, payroll and compliance, with one accountable partner from your first hire to your hundredth.</p>
        <div className="actions">
          <DemoButton>Schedule a consultation</DemoButton>
          <button type="button" className="btn btn-secondary" onClick={() => document.getElementById('models')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>See engagement models</button>
        </div>
      </div>
    </section>
  )
}

function Models() {
  return (
    <section className="section" id="models">
      <div className="container">
        <SectionHead center={false} eyebrow="What we do" title="Four ways to build and pay your workforce." copy="Pick the engagement that fits how you scale. SKAPS runs the hiring, the payroll and the compliance." />
        <div className="model-grid">
          {needs.map(([t, d, , slug], i) => (
            <article className="model reveal" key={slug}>
              <div className="model-art"><NeedArt kind={slug} accent={needAccents[i]} /></div>
              <div>
                <h3>{t}</h3>
                <p>{d}</p>
                <Link className="card-link" to="/solutions">Learn more <Arrow style={{ width: 14, height: 14 }} /></Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function AIBlock() {
  return (
    <section className="section ai-block">
      <div className="container"><AIWorkflow /></div>
    </section>
  )
}

function Proof() {
  return (
    <section className="section">
      <div className="container">
        <SectionHead center={false} title="What clients say." cta={<Link className="card-link" to="/clients">All client stories <Arrow style={{ width: 14, height: 14 }} /></Link>} />
        <div className="proof-row">
          {testimonials.slice(0, 3).map(([q, n, r]) => {
            const [role, org] = r.split(', ')
            return (
              <figure className="proof reveal" key={n}>
                <blockquote>“{q}”</blockquote>
                <figcaption>{n}<small>{role}{org ? ` · ${org}` : ''}</small></figcaption>
              </figure>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  usePolarity('default')
  return (
    <>
      <Hero />
      <LogoMarquee intro="Trusted by teams in technology, semiconductors, finance and services" />
      <Models />
      <AIBlock />
      <StatsStair />
      <Proof />
      <FAQ limit={4} />
      <CTABand title={<>Your next hire, <b>handled end to end.</b></>} />
    </>
  )
}
