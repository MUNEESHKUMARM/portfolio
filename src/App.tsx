import { useState, useEffect, useRef } from 'react'
import Lenis from 'lenis'
import WelcomePortal from './components/WelcomePortal'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Journey from './components/Journey'
import Skills from './components/Skills'
import Experience from './components/Experience'
import KnowledgeArchive from './components/KnowledgeArchive'
import Projects from './components/Projects'
import CertificationVault from './components/CertificationVault'
import Connect from './components/Connect'
import FinalSection from './components/FinalSection'
import StarField from './components/StarField'
import CustomCursor from './components/CustomCursor'

export default function App() {
  const [entered, setEntered] = useState(false)
  const [showNav, setShowNav] = useState(false)
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    if (!entered) return

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    lenisRef.current = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    const timer = setTimeout(() => setShowNav(true), 800)

    return () => {
      lenis.destroy()
      clearTimeout(timer)
    }
  }, [entered])

  return (
    <div className="relative bg-universe-black overflow-x-hidden">
      <CustomCursor />

      {!entered && (
        <WelcomePortal onEnter={() => setEntered(true)} />
      )}

      {entered && (
        <>
          <StarField count={200} />
          {showNav && <Navigation />}
          <main>
            <Hero />
            <Journey />
            <Skills />
            <Experience />
            <KnowledgeArchive />
            <Projects />
            <CertificationVault />
            <Connect />
            <FinalSection />
          </main>
        </>
      )}
    </div>
  )
}
