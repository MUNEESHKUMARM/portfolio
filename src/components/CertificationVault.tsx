import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import CertificateModal from './CertificateModal'

const certificates = [
  {
    id: 'forage',
    title: 'Cybersecurity Analyst Job Simulation',
    issuer: 'Forage × TATA',
    date: 'May 13, 2026',
    topics: ['IAM Fundamentals', 'IAM Strategy', 'Custom IAM Solutions', 'Platform Integration'],
    color: '#00E5FF',
    badge: '🔒',
    certId: 'tTQwsSjQgjBgivtNu',
    file: 'public/Certificates/forage.pdf',
  },
  {
    id: 'tcs-young',
    title: 'TCS iON Career Edge — Young Professional',
    issuer: 'TCS iON',
    date: 'Dec 27, 2025',
    topics: ['Communication Skills', 'Soft Skills', 'AI Overview', 'Business Etiquette'],
    color: '#A855F7',
    badge: '🚀',
    certId: '240640-27761341-1016',
    file: 'public/Certificates/MUNEESHKUMAR_M_5077372.pdf',
  },
  {
    id: 'tcs-it',
    title: 'TCS iON Career Edge — IT Primer',
    issuer: 'TCS iON',
    date: 'Dec 27, 2025',
    topics: ['IT Industry Overview', 'IT Job Tools', 'Trending Technologies', 'Career & Growth'],
    color: '#00E5FF',
    badge: '💡',
    certId: '8739-27761341-1016',
    file: 'public/Certificates/MUNEESHKUMAR_M_28395.pdf',
  },
  {
    id: 'naan',
    title: 'Naan Mudhalvan — EBPL',
    issuer: 'Govt of Tamil Nadu × HCL',
    date: 'Sep 14, 2025',
    topics: ['EBPL Course', 'Skill Development', 'Industry Readiness', 'Career Growth'],
    color: '#A855F7',
    badge: '⭐',
    certId: 'NME2425EAU29315632575',
    file: 'public/Certificates/NM_Certificate.pdf',
  },
]

function CertCard({
  cert,
  index,
  inView,
  onPreview,
}: {
  cert: typeof certificates[0]
  index: number
  inView: boolean
  onPreview: () => void
}) {
  const [hovered, setHovered] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  const onMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -14
    setTilt({ x, y })
  }

  return (
    <motion.div
      ref={cardRef}
      className="cursor-none"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }) }}
      style={{
        transform: `perspective(900px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateY(${hovered ? -6 : 0}px)`,
        transition: hovered ? 'transform 0.12s ease' : 'transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      }}
      onClick={onPreview}
    >
      <div
        className="relative p-6 rounded-2xl overflow-hidden h-full"
        style={{
          background: 'rgba(14,18,38,0.7)',
          border: `1px solid ${hovered ? cert.color + '40' : 'rgba(255,255,255,0.07)'}`,
          backdropFilter: 'blur(20px)',
          boxShadow: hovered ? `0 20px 60px ${cert.color}18, 0 0 30px ${cert.color}12` : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        {/* Hologram pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{
            background: `repeating-linear-gradient(-45deg, transparent, transparent 10px, ${cert.color}06 10px, ${cert.color}06 11px)`,
          }}
        />

        {/* PDF preview thumbnail strip */}
        <div
          className="absolute top-0 right-0 bottom-0 w-16 pointer-events-none overflow-hidden rounded-r-2xl opacity-20"
          style={{
            background: `linear-gradient(135deg, transparent 0%, ${cert.color}15 100%)`,
            borderLeft: `1px solid ${cert.color}15`,
          }}
        >
          {/* Document lines simulation */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="mx-2 rounded-full"
              style={{
                height: '2px',
                background: `rgba(255,255,255,${0.1 + (i % 3) * 0.05})`,
                width: `${60 + Math.sin(i) * 20}%`,
                marginTop: i === 0 ? '20px' : '8px',
              }}
            />
          ))}
        </div>

        {/* Top row */}
        <div className="relative z-10 flex items-start justify-between mb-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-transform duration-300"
            style={{
              background: `${cert.color}15`,
              border: `1px solid ${cert.color}30`,
              transform: hovered ? 'scale(1.1)' : 'scale(1)',
            }}
          >
            {cert.badge}
          </div>

          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
            style={{
              background: `${cert.color}12`,
              border: `1px solid ${cert.color}30`,
            }}
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: cert.color }}
              animate={{ boxShadow: [`0 0 0px ${cert.color}`, `0 0 8px ${cert.color}`, `0 0 0px ${cert.color}`] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-[9px] tracking-[0.2em] uppercase font-medium" style={{ color: cert.color }}>
              Verified
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <h3 className="text-sm font-bold mb-1 leading-snug pr-12" style={{ color: '#FFFFFF' }}>
            {cert.title}
          </h3>
          <div className="text-xs mb-3" style={{ color: 'rgba(255,255,255,0.45)' }}>
            {cert.issuer}
          </div>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {cert.topics.slice(0, 2).map(topic => (
              <span
                key={topic}
                className="px-2 py-0.5 text-[9px] tracking-wide rounded-md"
                style={{
                  background: `${cert.color}10`,
                  border: `1px solid ${cert.color}20`,
                  color: 'rgba(255,255,255,0.5)',
                }}
              >
                {topic}
              </span>
            ))}
            {cert.topics.length > 2 && (
              <span className="px-2 py-0.5 text-[9px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
                +{cert.topics.length - 2}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
              {cert.date}
            </span>
            <motion.span
              className="text-[10px] tracking-wide flex items-center gap-1"
              style={{ color: cert.color }}
              animate={hovered ? { x: [0, 3, 0] } : {}}
              transition={{ duration: 0.6 }}
            >
              Preview
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-2.5 h-2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </motion.span>
          </div>
        </div>

        {/* Bottom scan line on hover */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${cert.color}, transparent)` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.25 }}
        />
      </div>
    </motion.div>
  )
}

export default function CertificationVault() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })
  const [modal, setModal] = useState<{ file: string; title: string; color: string } | null>(null)

  return (
    <>
      <section
        id="certifications"
        ref={sectionRef}
        className="relative py-32 px-6 overflow-hidden"
        style={{ background: '#050505' }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(0,229,255,0.03) 0%, transparent 70%)',
          }}
        />

        <div className="max-w-6xl mx-auto">
          {/* Section title */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="text-xs tracking-[0.5em] uppercase mb-4" style={{ color: 'rgba(0,229,255,0.5)' }}>
              Chapter 06
            </div>
            <h2
              className="font-black leading-none tracking-tight"
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                letterSpacing: '-0.03em',
                background: 'linear-gradient(135deg, #FFFFFF 30%, rgba(255,255,255,0.5))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              PROOF OF EVOLUTION
            </h2>
            <motion.div
              className="h-px w-24 mx-auto mt-6"
              style={{ background: 'linear-gradient(90deg, transparent, #00E5FF, transparent)' }}
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.4 }}
            />
            <p className="mt-4 text-xs tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Click any certificate to preview
            </p>
          </motion.div>

          {/* Cert grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {certificates.map((cert, i) => (
              <CertCard
                key={cert.id}
                cert={cert}
                index={i}
                inView={inView}
                onPreview={() => setModal({ file: cert.file, title: cert.title, color: cert.color })}
              />
            ))}
          </div>
        </div>
      </section>

      <CertificateModal
        open={modal !== null}
        onClose={() => setModal(null)}
        file={modal?.file ?? ''}
        title={modal?.title ?? ''}
        color={modal?.color}
      />
    </>
  )
}
