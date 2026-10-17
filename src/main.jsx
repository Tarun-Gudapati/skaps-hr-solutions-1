import React from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import './styles/index.css'
import Layout from './components/Layout'
import Home from './pages/Home'
import Services from './pages/Services'
import ServicePage from './pages/ServicePage'
import Solutions from './pages/Solutions'
import Industries from './pages/Industries'
import About from './pages/About'
import AI from './pages/AI'
import { HowItWorks, Compliance, Clients, FAQPage, Contact, NotFound } from './pages/Misc'

// HashRouter keeps deep links working on GitHub Pages without server rewrites.
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="services/:slug" element={<ServicePage />} />
          <Route path="solutions" element={<Solutions />} />
          <Route path="industries" element={<Industries />} />
          <Route path="about" element={<About />} />
          <Route path="ai" element={<AI />} />
          <Route path="how-it-works" element={<HowItWorks />} />
          <Route path="compliance" element={<Compliance />} />
          <Route path="clients" element={<Clients />} />
          <Route path="faq" element={<FAQPage />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>
)
