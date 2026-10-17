import { useState } from 'react'
import Icon from './Icon'
import { EMAIL } from '../data/site'

// The site is static (no backend), so requests are handed to the visitor's email client.
const submitLead = data => {
  const lines = [`Name: ${data.name}`, `Company: ${data.company}`, `Email: ${data.email}`, `Phone: ${data.phone}`]
  if (data.size) lines.push(`Company size: ${data.size}`)
  if (data.interest) lines.push(`Interested in: ${data.interest}`)
  lines.push('', data.message)
  const subject = `Consultation request — ${data.company}`
  window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`
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

export default function LeadForm({ compact = false }) {
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const submit = e => {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))
    const next = {}
    if (!data.name.trim()) next.name = 'Please enter your name.'
    if (!data.company.trim()) next.company = 'Please enter your company.'
    if (!/^\S+@\S+\.\S+$/.test(data.email)) next.email = 'Enter a valid email address.'
    if (!/^[+\d][\d\s()-]{7,}$/.test(data.phone)) next.phone = 'Enter a valid phone number.'
    if ((data.message || '').trim().length < 10) next.message = 'Tell us a little more about your requirements.'
    setErrors(next)
    if (Object.keys(next).length) return
    submitLead(data); setSent(true); form.reset()
  }

  return (
    <form className="form-card" onSubmit={submit} noValidate>
      {sent && <div className="success" role="status"><Icon name="check" style={{ width: 18, height: 18 }} /><div><strong>Almost done — press send in your email app</strong><span>Your request has been drafted to <a href={`mailto:${EMAIL}`}>{EMAIL}</a>. If no email window opened, write to us there directly.</span></div></div>}
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
      <label className="form-consent"><input type="checkbox" name="consent" /><span>By submitting this form, you agree to receive communications from SKAPS about our HR, payroll and workforce solutions. You can opt out at any time.</span></label>
      <button className="btn btn-block">Send Message <Icon name="arrow" className="arrow" style={{ width: 16, height: 16 }} /></button>
      <p className="form-note">Submitting opens your email app with these details addressed to {EMAIL}.</p>
    </form>
  )
}
