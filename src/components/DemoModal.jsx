import { useEffect } from 'react'
import Icon from './Icon'
import LeadForm from './LeadForm'
import { PHONE, PHONE_TEL, EMAIL, YEARS } from '../data/site'

export default function DemoModal({ onClose }) {
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.classList.add('no-scroll')
    return () => { document.removeEventListener('keydown', onKey); document.body.classList.remove('no-scroll') }
  }, [onClose])

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={e => { if (e.target === e.currentTarget) onClose() }}>
      <section className="modal" role="dialog" aria-modal="true" aria-labelledby="demo-title">
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close" autoFocus><Icon name="close" style={{ width: 18, height: 18 }} /></button>
        <div className="modal-copy">
          <h2 id="demo-title" className="t-h1" style={{ maxWidth: 480 }}>Schedule a consultation, discover SKAPS in action</h2>
          <p className="t-body-lg t-muted" style={{ maxWidth: 440 }}>Whether you are looking to streamline payroll management, expand your workforce, or strengthen compliance operations, our team is ready to support your business with reliable workforce solutions.</p>
          <ul className="checklist">
            <li><Icon name="check" />Step 1: Fill in your details and we will call you back.</li>
            <li><Icon name="check" />Step 2: Join a personalized 30-minute consultation with a SKAPS specialist.</li>
            <li><Icon name="check" />Step 3: Get answers on engagement models, pricing and compliance. No obligation.</li>
          </ul>
          <div className="ratings">
            <span><b>{YEARS}</b> years of industry excellence</span>
            <span><b>99.9%</b> compliance accuracy</span>
            <span><a href={`tel:${PHONE_TEL}`}><b>{PHONE}</b></a></span>
            <span><a href={`mailto:${EMAIL}`}>{EMAIL}</a></span>
          </div>
        </div>
        <LeadForm compact onDone={() => {}} />
      </section>
    </div>
  )
}
