import { Link } from 'react-router-dom'
import Icon from './Icon'
import { Brand } from './Header'
import { services, needs, industries, socials, footerIntro, PHONE, PHONE_TEL, EMAIL, ADDRESS, BRAND_FULL } from '../data/site'

export default function Footer({ footnote }) {
  return (
    <footer className="site-footer">
      <div className="container-wide">
        <div className="footnotes">{footnote || 'ISO-certified payroll. Compliance accuracy measured across all active engagements. *Subject to local statutory requirements in each region.'}</div>
        <div className="footer-card">
          <div className="footer-grid">
            <div className="footer-brand">
              <Brand />
              <p>{footerIntro}</p>
              {socials.some(([, , href]) => href) && <div className="socials">{socials.filter(([, , href]) => href).map(([l, i, href]) => <a key={i} href={href} target="_blank" rel="noopener noreferrer" aria-label={`${BRAND_FULL} on ${l}`}><Icon name={i} /></a>)}</div>}
            </div>
            <div className="footer-col">
              <h4>Services</h4>
              <ul>{services.slice(0, 7).map(s => <li key={s.slug}><Link to={`/services/${s.slug}`}>{s.title}</Link></li>)}<li><Link to="/services">All services</Link></li></ul>
            </div>
            <div className="footer-col">
              <h4>Solutions</h4>
              <ul>{needs.map(([t, , , slug]) => <li key={slug}><Link to={`/solutions#${slug}`}>{t}</Link></li>)}<li><Link to="/ai">SKAPS Intelligence (AI)</Link></li><li><Link to="/compliance">Compliance</Link></li></ul>
            </div>
            <div className="footer-col">
              <h4>Industries</h4>
              <ul>{industries.slice(0, 7).map(([t, , slug]) => <li key={slug}><Link to={`/industries#${slug}`}>{t}</Link></li>)}<li><Link to="/industries">All industries</Link></li></ul>
            </div>
            <div className="footer-col">
              <h4>Company</h4>
              <ul>
                <li><Link to="/about">Our Story</Link></li><li><Link to="/how-it-works">How It Works</Link></li><li><Link to="/clients">Clients</Link></li><li><Link to="/faq">FAQ</Link></li><li><Link to="/contact">Contact</Link></li>
              </ul>
              <h4 style={{ marginTop: 24 }}>Contact</h4>
              <ul className="footer-contact">
                <li><Icon name="phone" /><a href={`tel:${PHONE_TEL}`}>{PHONE}</a></li>
                <li><Icon name="mail" /><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
                <li><Icon name="pin" /><span>{ADDRESS}</span></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 SKAPS HR Solutions. All rights reserved.</span>
            <div className="links"><Link to="/compliance">Compliance</Link><Link to="/faq">FAQ</Link><Link to="/contact">Contact</Link><span>India · United States · Australia</span></div>
          </div>
        </div>
      </div>
    </footer>
  )
}
