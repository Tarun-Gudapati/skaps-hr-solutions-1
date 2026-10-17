import { useState } from 'react'
import Icon from './Icon'
import { EMAIL } from '../data/site'

// Set VITE_LEAD_ENDPOINT (Formspree / Web3Forms URL) at build time to post leads to a form service.
// Without it, the visitor's email app opens with the request pre-filled, so no lead is silently dropped.
const ENDPOINT = import.meta.env.VITE_LEAD_ENDPOINT
const ACCESS_KEY = import.meta.env.VITE_LEAD_ACCESS_KEY

const FIELD_LABELS = { name: 'Name', company: 'Company', email: 'Email', phone: 'Phone', size: 'Company size', interest: 'Interested in', message: 'Message' }

async function submitLead(data) {
  const subject = `Consultation request — ${data.company} (${data.name})`
  if (ENDPOINT) {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ ...data, subject, ...(ACCESS_KEY ? { access_key: ACCESS_KEY } : {}) }),
    })
    return { ok: res.ok, via: 'endpoint' }
  }
  const body = Object.entries(FIELD_LABELS).filter(([k]) => data[k]).map(([k, l]) => `${l}: ${data[k]}`).join('\n')
  window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  return { ok: true, via: 'email' }
}

function Field({ name, label, error, as = 'input', required, ...props }) {
  const El = as
  return (
    <label className="field">
      <span>{label}{required && <span aria-hidden="true" style={{ color: '#ff2d19' }}> *</span>}</span>
      <El name={name} aria-invalid={!!error} {...props} />
      {error && <small className="error">{error}</small>}
    </label>
  )
}

export default function LeadForm({ compact = false, onDone }) {
  const [errors, setErrors] = useState({})
  const [result, setResult] = useState(null)
  const [busy, setBusy] = useState(false)

  const submit = async e => {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))
    const next = {}
    if (!data.name.trim()) next.name = 'Please enter your name.'
    if (!data.company.trim()) next.company = 'Please enter your company.'
    if (!/^\S+@\S+\.\S+$/.test(data.email)) next.email = 'Enter a valid email address.'
    if (!/^[+\d][\d\s()-]{7,}$/.test(data.phone)) next.phone = 'Enter a valid phone number.'
    if ((data.message || '').trim().length < 10) next.message = 'Tell us a little more about your requirements.'
    if (!data.consent) next.consent = 'Please agree to be contacted so we can respond.'
    setErrors(next)
    if (Object.keys(next).length) return
    delete data.consent
    setBusy(true)
    try {
      const r = await submitLead(data)
      setResult(r.ok ? r.via : 'error')
      if (r.ok) { form.reset(); onDone?.() }
    } catch {
      setResult('error')
    } finally {
      setBusy(false)
    }
  }

  return (
    <form className="form-card" onSubmit={submit} noValidate>
      {result === 'endpoint' && <div className="success" role="status"><Icon name="check" style={{ width: 18, height: 18 }} /><div><strong>Request received</strong><span>A SKAPS specialist will contact you within one business day.</span></div></div>}
      {result === 'email' && <div className="success" role="status"><Icon name="mail" style={{ width: 18, height: 18 }} /><div><strong>Almost done — press send</strong><span>Your email app opened with your details filled in. If it didn’t, write to <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.</span></div></div>}
      {result === 'error' && <div className="success error-box" role="alert"><Icon name="alert" style={{ width: 18, height: 18 }} /><div><strong>Something went wrong</strong><span>Please try again, or email us at <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.</span></div></div>}
      <div className="form-row">
        <Field name="name" label="Full name" placeholder="Your name" error={errors.name} required />
        <Field name="company" label="Company name" placeholder="Your organization name" error={errors.company} required />
      </div>
      <div className="form-row">
        <Field name="email" type="email" label="Work email" placeholder="your@email.com" error={errors.email} required />
        <Field name="phone" type="tel" label="Phone number" placeholder="Best number to reach you" error={errors.phone} required />
      </div>
      {!compact && (
        <div className="form-row">
          <label className="field"><span>Company size</span><select name="size" defaultValue=""><option value="" disabled>Please select</option><option>1–50</option><option>51–200</option><option>201–1,000</option><option>1,000+</option></select></label>
          <label className="field"><span>Interested in</span><select name="interest" defaultValue=""><option value="" disabled>Please select</option><option>Payroll Outsourcing</option><option>Contract / Temporary Staffing</option><option>Dedicated Teams</option><option>Executive Search</option><option>Compliance & Legal</option><option>Global Workforce / COE in India</option><option>SKAPS Intelligence (AI)</option></select></label>
        </div>
      )}
      <Field name="message" as="textarea" label="How can we help you?" placeholder="Tell us about your requirements" error={errors.message} required />
      <label className="form-consent"><input type="checkbox" name="consent" aria-invalid={!!errors.consent} /><span>By submitting this form, you agree to receive communications from SKAPS about our HR, payroll and workforce solutions. You can opt out at any time.</span></label>
      {errors.consent && <small className="error" style={{ marginTop: -8 }}>{errors.consent}</small>}
      <button className="btn btn-block" disabled={busy}>{busy ? 'Sending…' : 'Send Message'} <Icon name="arrow" className="arrow" style={{ width: 16, height: 16 }} /></button>
      <p className="form-note">We use your details only to respond to this request. No spam, ever.</p>
    </form>
  )
}
