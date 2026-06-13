import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { label: 'Hero', href: '#hero' },
  { label: 'Journey', href: '#journey' },
  { label: 'Powers', href: '#skills' },
  { label: 'Missions', href: '#experience' },
  { label: 'Knowledge', href: '#knowledge' },
  { label: 'Creations', href: '#projects' },
  { label: 'Vault', href: '#certifications' },
  { label: 'Connect', href: '#connect' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 }
    )

    navItems.forEach(item => {
      const el = document.querySelector(item.href)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
    setMenuOpen(false)
  }

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-40 px-6 py-4"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3 rounded-xl"
        style={{
          background: scrolled ? 'rgba(5, 5, 5, 0.8)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          border: scrolled ? '1px solid rgba(0, 229, 255, 0.08)' : 'none',
          transition: 'all 0.4s ease',
        }}
      >
        {/* Logo */}
        <motion.div
          className="font-black text-xl tracking-[0.15em] cursor-pointer"
          style={{
            background: 'linear-gradient(135deg, #00E5FF, #A855F7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          MK
        </motion.div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map(item => (
            <motion.button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className="relative text-[11px] tracking-[0.15em] uppercase transition-colors duration-200"
              style={{
                color: activeSection === item.href.slice(1)
                  ? '#00E5FF'
                  : 'rgba(255,255,255,0.5)',
                background: 'none',
                border: 'none',
                cursor: 'none',
              }}
              whileHover={{ color: '#00E5FF' }}
            >
              {item.label}
              {activeSection === item.href.slice(1) && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-px bg-[#00E5FF]"
                  style={{ boxShadow: '0 0 8px rgba(0,229,255,0.8)' }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ cursor: 'none' }}
        >
          {[0, 1, 2].map(i => (
            <motion.span
              key={i}
              className="block w-5 h-px bg-[#00E5FF]"
              animate={{
                rotate: menuOpen && i !== 1 ? (i === 0 ? 45 : -45) : 0,
                translateY: menuOpen && i === 0 ? 6 : menuOpen && i === 2 ? -6 : 0,
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden mt-2 mx-4 rounded-xl overflow-hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              background: 'rgba(14, 18, 38, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(0, 229, 255, 0.1)',
            }}
          >
            {navItems.map((item, i) => (
              <motion.button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="w-full text-left px-6 py-4 text-sm tracking-[0.1em] uppercase border-b last:border-b-0"
                style={{
                  color: 'rgba(255,255,255,0.7)',
                  borderColor: 'rgba(0,229,255,0.08)',
                  background: 'none',
                  cursor: 'none',
                }}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ color: '#00E5FF', paddingLeft: 32 }}
              >
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
