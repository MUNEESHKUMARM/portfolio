import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const contacts = [
  {
    type: 'Email',
    value: 'muneeshkumar.edu@gmail.com',
    href: 'mailto:muneeshkumar.edu@gmail.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    color: '#00E5FF',
    copyable: true,
  },
  {
    type: 'GitHub',
    value: 'MUNEESHKUMARM',
    href: 'https://github.com/MUNEESHKUMARM',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
    color: '#A855F7',
    copyable: false,
  },
  {
    type: 'LinkedIn',
    value: 'muneeshkumar-m-81402429a',
    href: 'https://linkedin.com/in/muneeshkumar-m-81402429a',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    color: '#00E5FF',
    copyable: false,
  },
  {
    type: 'Phone',
    value: '+91 9543572692',
    href: 'tel:+919543572692',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
    color: '#A855F7',
    copyable: true,
  },
]

function ContactCard({ contact, index, inView }: { contact: typeof contacts[0]; index: number; inView: boolean }) {
  const [copied, setCopied] = useState(false)
  const [magnetic, setMagnetic] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  const onMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20
    setMagnetic({ x, y })
  }

  const handleAction = async () => {
    if (contact.copyable) {
      await navigator.clipboard.writeText(contact.value)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } else {
      window.open(contact.href, '_blank')
    }
  }

  return (
    <motion.div
      ref={cardRef}
      className="cursor-none"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={onMouseMove}
      onMouseLeave={() => setMagnetic({ x: 0, y: 0 })}
      onClick={handleAction}
      style={{
        transform: `translate(${magnetic.x * 0.3}px, ${magnetic.y * 0.3}px)`,
        transition: 'transform 0.3s ease',
      }}
    >
      <motion.div
        className="relative p-6 rounded-2xl overflow-hidden group"
        style={{
          background: 'rgba(14,18,38,0.6)',
          border: `1px solid rgba(255,255,255,0.07)`,
          backdropFilter: 'blur(20px)',
        }}
        whileHover={{
          borderColor: contact.color + '40',
          boxShadow: `0 20px 60px ${contact.color}15`,
        }}
      >
        {/* Hover glow bg */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
          style={{
            background: `radial-gradient(ellipse at center, ${contact.color}08 0%, transparent 70%)`,
          }}
        />

        <div className="relative z-10 flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
            style={{
              background: `${contact.color}15`,
              border: `1px solid ${contact.color}30`,
              color: contact.color,
            }}
          >
            {contact.icon}
          </div>

          <div className="flex-1 min-w-0">
            <div className="text-[10px] tracking-[0.3em] uppercase mb-1" style={{ color: 'rgba(255,255,255,0.35)' }}>
              {contact.type}
            </div>
            <div className="text-sm font-medium truncate" style={{ color: 'rgba(255,255,255,0.85)' }}>
              {contact.value}
            </div>
          </div>

          <motion.div
            className="text-xs tracking-wider px-3 py-1.5 rounded-lg flex-shrink-0"
            style={{
              background: copied ? `${contact.color}20` : 'rgba(255,255,255,0.04)',
              border: `1px solid ${copied ? contact.color + '40' : 'rgba(255,255,255,0.06)'}`,
              color: copied ? contact.color : 'rgba(255,255,255,0.3)',
              transition: 'all 0.3s',
            }}
            animate={copied ? { scale: [1, 1.1, 1] } : {}}
          >
            {copied ? '✓ Copied' : contact.copyable ? 'Copy' : 'Open'}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Connect() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section
      id="connect"
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050505 0%, #0E1226 60%, #050505 100%)' }}
    >
      {/* Earth hologram ambient */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,229,255,0.04) 0%, rgba(168,85,247,0.02) 40%, transparent 70%)',
        }}
      />
      {/* Rings */}
      {[200, 280, 360].map((r, i) => (
        <motion.div
          key={r}
          className="absolute top-1/2 left-1/2 rounded-full pointer-events-none"
          style={{
            width: r * 2,
            height: r * 2,
            marginLeft: -r,
            marginTop: -r,
            border: `1px solid rgba(0,229,255,${0.04 - i * 0.01})`,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20 + i * 8, repeat: Infinity, ease: 'linear' }}
        />
      ))}

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Section title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="text-xs tracking-[0.5em] uppercase mb-4" style={{ color: 'rgba(168,85,247,0.6)' }}>
            Chapter 07
          </div>
          <h2
            className="font-black leading-none tracking-tight mb-4"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              letterSpacing: '-0.03em',
              background: 'linear-gradient(135deg, #FFFFFF 30%, rgba(255,255,255,0.5))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            OPEN A PORTAL
          </h2>
          <motion.div
            className="h-px w-24 mx-auto mb-6"
            style={{ background: 'linear-gradient(90deg, transparent, #A855F7, transparent)' }}
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
          />
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Ready to collaborate? Open a channel.
          </p>
        </motion.div>

        {/* Contact cards */}
        <div className="grid sm:grid-cols-2 gap-4">
          {contacts.map((contact, i) => (
            <ContactCard key={contact.type} contact={contact} index={i} inView={inView} />
          ))}
        </div>

        {/* Bottom availability indicator */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
        >
          <div className="inline-flex items-center gap-2.5">
            <motion.div
              className="w-2 h-2 rounded-full bg-emerald-400"
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-xs tracking-[0.2em] uppercase" style={{ color: 'rgba(255,255,255,0.35)' }}>
              Available for opportunities
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
