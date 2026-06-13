import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { label: 'CGPA', value: '8.20', suffix: '' },
  { label: 'Year', value: '2', suffix: 'nd' },
  { label: 'Projects', value: '3', suffix: '+' },
  { label: 'Certs', value: '4', suffix: '+' },
]

function AnimatedNumber({ value, suffix, inView }: { value: string; suffix: string; inView: boolean }) {
  const num = parseFloat(value)
  const isDecimal = value.includes('.')

  return (
    <motion.span>
      {inView ? (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            {isDecimal ? num.toFixed(2) : num}
          </motion.span>
          {suffix}
        </motion.span>
      ) : '—'}
    </motion.span>
  )
}

export default function Journey() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050505 0%, #0E1226 50%, #050505 100%)' }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,229,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,1) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.04) 0%, transparent 70%)' }}
      />

      <div className="max-w-5xl mx-auto">
        {/* Section title */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="text-xs tracking-[0.5em] uppercase mb-4" style={{ color: 'rgba(0,229,255,0.5)' }}>
            Chapter 01
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
            THE JOURNEY
          </h2>
          <motion.div
            className="h-px w-24 mx-auto mt-6"
            style={{ background: 'linear-gradient(90deg, transparent, #00E5FF, transparent)' }}
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
          />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block"
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,229,255,0.3), transparent)' }} />

          {/* Education card */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
            {/* Left: Date */}
            <motion.div
              className="md:w-1/2 md:text-right md:pr-16"
              initial={{ opacity: 0, x: -60 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="text-xs tracking-[0.3em] uppercase mb-2" style={{ color: 'rgba(0,229,255,0.6)' }}>
                2023 — 2027
              </div>
              <div className="text-5xl font-black" style={{ color: 'rgba(255,255,255,0.08)' }}>
                B.Tech
              </div>
            </motion.div>

            {/* Center dot */}
            <div className="hidden md:flex w-4 h-4 rounded-full mt-2 flex-shrink-0 relative z-10"
              style={{
                background: '#00E5FF',
                boxShadow: '0 0 20px rgba(0,229,255,0.8), 0 0 40px rgba(0,229,255,0.4)',
              }}
            />

            {/* Right: Card */}
            <motion.div
              className="md:w-1/2 md:pl-16 w-full"
              initial={{ opacity: 0, x: 60 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="relative p-8 rounded-2xl overflow-hidden"
                style={{
                  background: 'rgba(14,18,38,0.6)',
                  border: '1px solid rgba(0,229,255,0.15)',
                  backdropFilter: 'blur(20px)',
                }}
              >
                {/* Hologram scanline effect */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,229,255,0.01) 2px, rgba(0,229,255,0.01) 4px)',
                  }}
                />

                <div
                  className="text-xs tracking-[0.3em] uppercase mb-3"
                  style={{ color: 'rgba(0,229,255,0.6)' }}
                >
                  Institution
                </div>
                <h3
                  className="text-xl font-bold mb-1 leading-tight"
                  style={{ color: '#FFFFFF' }}
                >
                  AAA College of Engineering
                </h3>
                <div className="text-base mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  and Technology, Sivakasi
                </div>

                <div className="flex flex-wrap gap-3 mb-6">
                  <span
                    className="px-3 py-1 text-xs tracking-wider rounded-full"
                    style={{
                      background: 'rgba(0,229,255,0.08)',
                      border: '1px solid rgba(0,229,255,0.2)',
                      color: '#00E5FF',
                    }}
                  >
                    B.Tech — Information Technology
                  </span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {stats.map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      className="text-center p-3 rounded-xl"
                      style={{
                        background: 'rgba(0,229,255,0.04)',
                        border: '1px solid rgba(0,229,255,0.08)',
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.7 + i * 0.1 }}
                    >
                      <div
                        className="text-2xl font-black mb-1"
                        style={{
                          background: 'linear-gradient(135deg, #00E5FF, #A855F7)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}
                      >
                        <AnimatedNumber value={stat.value} suffix={stat.suffix} inView={inView} />
                      </div>
                      <div className="text-[10px] tracking-[0.2em] uppercase" style={{ color: 'rgba(255,255,255,0.4)' }}>
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Constellation dots */}
                <div className="absolute top-4 right-4 flex gap-1.5">
                  {[0, 1, 2].map(i => (
                    <motion.div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: i === 0 ? '#00E5FF' : 'rgba(0,229,255,0.3)' }}
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 2, delay: i * 0.4, repeat: Infinity }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
