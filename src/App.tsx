import { useState, useEffect } from 'react'
import { Navbar } from '@/components/Navbar'
import { HeroSection } from '@/components/sections/HeroSection'
import { CompanyHubSection } from '@/components/sections/CompanyHubSection'
import { ToolingExcellenceSection } from '@/components/sections/ToolingExcellenceSection'
import { ManufacturingJourneySection } from '@/components/sections/ManufacturingJourneySection'
import { MachinerySection } from '@/components/sections/MachinerySection'
import { ProductsSection } from '@/components/sections/ProductsSection'
import { RoadmapSection } from '@/components/sections/RoadmapSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { Footer } from '@/components/Footer'
import { ExperienceOverlay } from '@/components/sections/ExperienceOverlay'

export default function App() {
  const [experienceOpen, setExperienceOpen] = useState(false)
  const [hubTab, setHubTab] = useState<'about' | 'capabilities' | 'quality'>('about')

  // Listen to hash changes or section clicks
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash === '#about') setHubTab('about')
      else if (hash === '#capabilities') setHubTab('capabilities')
      else if (hash === '#quality') setHubTab('quality')
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  // Reset scroll position when returning from 3D experience
  useEffect(() => {
    if (!experienceOpen) {
      document.body.style.overflow = ''
    }
  }, [experienceOpen])

  if (experienceOpen) {
    return <ExperienceOverlay onClose={() => setExperienceOpen(false)} />
  }

  return (
    <>
      <Navbar onTabSelect={(tab) => setHubTab(tab)} />
      <main>
        <section id="home">
          <HeroSection />
        </section>

        {/* UNIFIED MASTER SECTION: About Us + Capabilities + Quality */}
        <section id="company-overview">
          <div id="about" style={{ scrollMarginTop: '80px' }} />
          <div id="capabilities" style={{ scrollMarginTop: '80px' }} />
          <div id="quality" style={{ scrollMarginTop: '80px' }} />
          <CompanyHubSection initialTab={hubTab} />
        </section>

        <section id="tooling-excellence">
          <ToolingExcellenceSection />
        </section>

        <section id="manufacturing-journey">
          <ManufacturingJourneySection onLaunch={() => setExperienceOpen(true)} />
        </section>

        <section id="machinery">
          <MachinerySection />
        </section>

        <section id="products">
          <ProductsSection />
        </section>

        <section id="roadmap">
          <RoadmapSection />
        </section>

        <section id="contact">
          <ContactSection />
        </section>
      </main>
      <Footer />
    </>
  )
}
