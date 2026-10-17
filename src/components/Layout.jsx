import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import DemoModal from './DemoModal'
import { getService } from '../data/site'

const UI = createContext({ openDemo: () => {}, setPolarity: () => {} })
export const useUI = () => useContext(UI)

/** Pages with a dark/colored hero call this so the header renders in "inverse" (light text) polarity. */
export function usePolarity(p = 'inverse') {
  const { setPolarity } = useUI()
  useLayoutEffect(() => { setPolarity(p); return () => setPolarity('default') }, [p, setPolarity])
}

const SUFFIX = 'SKAPS HR SOLUTIONS'
const titles = {
  '/': `${SUFFIX} | AI-Powered HR, Payroll & Staffing`,
  '/services': 'HR, Payroll & Staffing Services',
  '/solutions': 'Workforce Solutions & Engagement Models',
  '/industries': 'Industries We Serve',
  '/about': 'Our Story',
  '/ai': 'SKAPS Intelligence — AI for Hiring, Payroll & Compliance',
  '/how-it-works': 'How It Works',
  '/compliance': 'Compliance',
  '/clients': 'Client Stories',
  '/faq': 'FAQ',
  '/contact': 'Contact Us',
}

function TitleManager() {
  const { pathname } = useLocation()
  useEffect(() => {
    if (pathname === '/') { document.title = titles['/']; return }
    const service = pathname.startsWith('/services/') && getService(pathname.split('/')[2])
    const page = service ? service.title : titles[pathname] || 'Page not found'
    document.title = `${page} | ${SUFFIX}`
  }, [pathname])
  return null
}

function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) { setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60); return }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash])
  // reveal-on-scroll
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target) } }), { threshold: .1 })
    const scan = () => document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
      // Anything already on-screen (or scrolled past) should never stay hidden.
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('visible')
      else io.observe(el)
    })
    scan()
    const mo = new MutationObserver(scan)
    mo.observe(document.body, { childList: true, subtree: true })
    return () => { io.disconnect(); mo.disconnect() }
  }, [pathname])
  return null
}

export default function Layout() {
  const [demo, setDemo] = useState(false)
  const [polarity, setPolarityState] = useState('default')
  const setPolarity = useCallback(p => setPolarityState(p), [])
  const openDemo = useCallback(() => setDemo(true), [])
  return (
    <UI.Provider value={{ openDemo, setPolarity }}>
      <ScrollManager />
      <TitleManager />
      <Header polarity={polarity} />
      <main id="main"><Outlet /></main>
      <Footer />
      {demo && <DemoModal onClose={() => setDemo(false)} />}
    </UI.Provider>
  )
}
