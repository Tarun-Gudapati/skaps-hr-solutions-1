import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import DemoModal from './DemoModal'

const UI = createContext({ openDemo: () => {}, setPolarity: () => {} })
export const useUI = () => useContext(UI)

/** Pages with a dark/colored hero call this so the header renders in "inverse" (light text) polarity. */
export function usePolarity(p = 'inverse') {
  const { setPolarity } = useUI()
  useLayoutEffect(() => { setPolarity(p); return () => setPolarity('default') }, [p, setPolarity])
}

function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) { setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60); return }
    }
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
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
      <Header polarity={polarity} />
      <main id="main"><Outlet /></main>
      <Footer />
      {demo && <DemoModal onClose={() => setDemo(false)} />}
    </UI.Provider>
  )
}
