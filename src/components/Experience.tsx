import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const missions = [
  {
    number: '01',
    company: 'AB Technologies',
    role: 'WEB DEVELOPMENT',
    duration: 'Nov 2025 — Dec 2025',
    achievements: [
      'Responsive UI development',
      'Multi-page systems architecture',
      'Frontend performance optimization',
    ],
    color: '#00E5FF',
    status: 'COMPLETED',
  },
  {
    number: '02',
    company: 'CODTECH IT SOLUTIONS',
    role: 'FULL STACK WEB DEVELOPMENT',
    duration: 'Jul 2025 — Aug 2025',
    achievements: [
      'MERN stack implementation',
      'MEAN stack development',
      'Full stack architecture',
      'Modern development practices',
    ],
    color: '#A855F7',
    status: 'COMPLETED',
  },
]

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050505 0%, #0E1226 50%, #050505 100%)' }}
    >
      {/* Stars bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(14,18,38,0.8) 0%, transparent 70%)',
        }}
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
            Chapter 03
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
            MISSIONS COMPLETED
          </h2>
          <motion.div
            className="h-px w-24 mx-auto mt-6"
            style={{ background: 'linear-gradient(90deg, transparent, #00E5FF, transparent)' }}
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
          />
        </motion.div>

        {/* Mission cards */}
        <div className="space-y-8">
          {missions.map((mission, i) => (
            <motion.div
              key={mission.number}
              className="relative"
              initial={{ opacity: 0, y: 60, x: i % 2 === 0 ? -40 : 40 }}
              animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
              transition={{ duration: 0.9, delay: i * 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="relative p-8 md:p-10 rounded-2xl overflow-hidden group"
                style={{
                  background: 'rgba(14,18,38,0.6)',
                  border: `1px solid ${mission.color}20`,
                  backdropFilter: 'blur(20px)',
                }}
              >
                {/* Hover glow */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(ellipse at 0% 50%, ${mission.color}08 0%, transparent 60%)`,
                  }}
                />

                {/* Scan line */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-20"
                  style={{
                    background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.008) 3px, rgba(255,255,255,0.008) 4px)',
                  }}
                />

                <div className="relative z-10 flex flex-col md:flex-row md:items-start gap-8">
                  {/* Mission number */}
                  <div className="flex-shrink-0">
                    <div
                      className="text-7xl font-black leading-none select-none"
                      style={{
                        color: `${mission.color}12`,
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    >
                      {mission.number}
                    </div>
                    <div
                      className="mt-2 text-[10px] tracking-[0.3em] uppercase"
                      style={{ color: mission.color }}
                    >
                      MISSION
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <h3
                          className="text-xl md:text-2xl font-bold mb-1"
                          style={{ color: '#FFFFFF' }}
                        >
                          {mission.company}
                        </h3>
                        <div
                          className="text-xs tracking-[0.3em] uppercase"
                          style={{ color: mission.color }}
                        >
                          {mission.role}
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <span
                          className="px-3 py-1 text-[10px] tracking-[0.2em] uppercase rounded-full"
                          style={{
                            background: `${mission.color}15`,
                            border: `1px solid ${mission.color}40`,
                            color: mission.color,
                          }}
                        >
                          {mission.status}
                        </span>
                        <span
                          className="text-xs"
                          style={{ color: 'rgba(255,255,255,0.4)' }}
                        >
                          {mission.duration}
                        </span>
                      </div>
                    </div>

                    {/* Achievements */}
                    <div className="space-y-2.5">
                      {mission.achievements.map((ach, j) => (
                        <motion.div
                          key={ach}
                          className="flex items-center gap-3"
                          initial={{ opacity: 0, x: -20 }}
                          animate={inView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: i * 0.2 + j * 0.08 + 0.6 }}
                        >
                          <div
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{
                              background: mission.color,
                              boxShadow: `0 0 6px ${mission.color}`,
                            }}
                          />
                          <span
                            className="text-sm"
                            style={{ color: 'rgba(255,255,255,0.65)' }}
                          >
                            {ach}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom bar */}
                <motion.div
                  className="absolute bottom-0 left-0 h-px"
                  style={{ background: `linear-gradient(90deg, ${mission.color}, transparent)` }}
                  initial={{ width: 0 }}
                  animate={inView ? { width: '100%' } : {}}
                  transition={{ duration: 1.5, delay: i * 0.2 + 0.5 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
