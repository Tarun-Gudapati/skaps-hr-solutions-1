import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icon'
import { aiWorkflows } from '../data/site'

const CYCLE_MS = 9000, LOG_MS = 650

const reducedMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

function useCountUp(target, runKey, active) {
  const [n, setN] = useState(reducedMotion() ? target : 0)
  useEffect(() => {
    if (!active) return
    if (reducedMotion()) { setN(target); return }
    let raf, start
    const tick = t => {
      start ??= t
      const p = Math.min(1, (t - start) / 1100)
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    setN(0)
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, runKey, active])
  return n
}

function Stage({ label, count, kind, max, i, runKey, active }) {
  const n = useCountUp(count, runKey, active)
  const width = 10 + 90 * (Math.log(count + 1) / Math.log(max + 1))
  return (
    <li className={`wf-stage ${kind}`} style={{ '--w': `${width}%`, '--i': i }}>
      <span className="wf-label">{label}<em>{kind === 'ai' ? 'AI' : 'Specialist'}</em></span>
      <span className="wf-bar"><i /></span>
      <b>{n.toLocaleString('en-IN')}</b>
    </li>
  )
}

/** Tabbed "AI at work" panel: an illustrative hiring / payroll / compliance run with AI and human stages. */
export default function AIWorkflow() {
  const [idx, setIdx] = useState(0)
  const [runKey, setRunKey] = useState(0)
  const [lines, setLines] = useState(reducedMotion() ? 99 : 0)
  const [active, setActive] = useState(false)
  const root = useRef(null)
  const wf = aiWorkflows[idx]
  const max = Math.max(...wf.stages.map(s => s[1]))

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { threshold: .25 })
    io.observe(root.current)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!active || reducedMotion()) return
    setLines(0)
    const logT = setInterval(() => setLines(l => (l >= wf.log.length ? l : l + 1)), LOG_MS)
    const nextT = setTimeout(() => select((idx + 1) % aiWorkflows.length), CYCLE_MS)
    return () => { clearInterval(logT); clearTimeout(nextT) }
  }, [idx, runKey, active])

  const select = i => { setIdx(i); setRunKey(k => k + 1) }

  return (
    <div className="wf" ref={root}>
      <div className="wf-copy">
        <span className="eyebrow" style={{ color: 'var(--dev-cyan)' }}>SKAPS Intelligence</span>
        <h2 className="t-h2">AI works inside every engagement.</h2>
        <p>Our consultants work alongside an AI layer that sources candidates, checks every payslip and watches the law for you. A SKAPS specialist signs off every decision.</p>
        <div className="wf-tabs" role="tablist" aria-label="AI workflows">
          {aiWorkflows.map((w, i) => (
            <button key={w.key} type="button" role="tab" aria-selected={i === idx} className={i === idx ? 'on' : ''} onClick={() => select(i)}>
              <strong>{w.tab}</strong>
              <span>{w.blurb}</span>
              {i === idx && <i className="wf-progress" key={runKey} style={{ animationPlayState: active ? 'running' : 'paused' }} />}
            </button>
          ))}
        </div>
        <Link className="btn btn-inverse" to="/ai">Explore SKAPS Intelligence <Icon name="arrow" className="arrow" style={{ width: 16, height: 16 }} /></Link>
      </div>

      <div className="wf-panel" role="tabpanel" aria-label={`${wf.tab} workflow`}>
        <div className="wf-bar-top">
          <span><span className="live-dot" />{wf.run}</span>
          <span className="wf-tag">Illustrative run</span>
        </div>
        <ol className="wf-stages" key={`s${runKey}`}>
          {wf.stages.map(([label, count, kind], i) => <Stage key={label} {...{ label, count, kind, max, i, runKey, active }} />)}
        </ol>
        <div className="wf-log" aria-live="polite">
          {wf.log.slice(0, lines).map((l, i) => (
            <p key={`${runKey}-${i}`}><time>{`09:${String(41 + i * 2).padStart(2, '0')}`}</time><Icon name={i >= wf.log.length - 2 ? 'people' : 'ai'} />{l}</p>
          ))}
        </div>
        <div className="wf-kpi">
          <span>{wf.kpi[0]}</span><strong>{wf.kpi[1]}</strong>
          <span className="wf-signoff"><Icon name="check" />Signed off by a SKAPS specialist</span>
        </div>
      </div>
    </div>
  )
}
