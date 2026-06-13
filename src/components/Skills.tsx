import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const skillCategories = [
  {
    title: 'LANGUAGES',
    icon: '⬡',
    color: '#00E5FF',
    skills: ['Python', 'Java', 'SQL', 'HTML', 'CSS', 'JavaScript', 'C'],
  },
  {
    title: 'FRAMEWORKS',
    icon: '◈',
    color: '#A855F7',
    skills: ['React', 'Flask', 'FastAPI', 'NumPy', 'Pandas'],
  },
  {
    title: 'AI TOOLS',
    icon: '◉',
    color: '#00E5FF',
    skills: ['ChatGPT', 'Claude', 'N8N', 'Figma AI', 'Canva AI'],
  },
  {
    title: 'TOOLS',
    icon: '◆',
    color: '#A855F7',
    skills: ['Power BI', 'Docker', 'GitHub', 'MySQL', 'VS Code', 'Android Studio'],
  },
]

function SkillNode({ skill, color, index }: { skill: string; color: string; index: number }) {
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  return (
    <motion.div
      className="relative cursor-none"
      initial={{ opacity: 0, scale: 0, rotate: -10 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ delay: index * 0.05 + 0.3, type: 'spring', stiffness: 200, damping: 15 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => { setClicked(true); setTimeout(() => setClicked(false), 600) }}
    >
      <motion.div
        className="px-4 py-2.5 rounded-full text-sm font-medium tracking-wide select-none"
        style={{
          background: hovered
            ? `rgba(${color === '#00E5FF' ? '0,229,255' : '168,85,247'}, 0.15)`
            : 'rgba(14,18,38,0.6)',
          border: `1px solid ${hovered || clicked ? color : 'rgba(255,255,255,0.08)'}`,
          color: hovered ? color : 'rgba(255,255,255,0.7)',
          backdropFilter: 'blur(10px)',
          boxShadow: hovered
            ? `0 0 20px ${color}33, 0 0 40px ${color}1A`
            : 'none',
          transition: 'all 0.3s ease',
        }}
        animate={clicked ? {
          scale: [1, 1.2, 1],
          boxShadow: [`0 0 0px ${color}00`, `0 0 40px ${color}AA`, `0 0 20px ${color}33`],
        } : {}}
        transition={{ duration: 0.5 }}
        whileHover={{ y: -3 }}
      >
        {skill}

        {/* Energy pulse on hover */}
        {hovered && (
          <motion.span
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{ border: `2px solid ${color}` }}
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ scale: 1.6, opacity: 0 }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
        )}
      </motion.div>
    </motion.div>
  )
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden"
      style={{ background: '#050505' }}
    >
      {/* Background effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 20% 50%, rgba(0,229,255,0.04) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(168,85,247,0.04) 0%, transparent 60%)',
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
          <div className="text-xs tracking-[0.5em] uppercase mb-4" style={{ color: 'rgba(168,85,247,0.6)' }}>
            Chapter 02
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
            POWERS ACQUIRED
          </h2>
          <motion.div
            className="h-px w-24 mx-auto mt-6"
            style={{ background: 'linear-gradient(90deg, transparent, #A855F7, transparent)' }}
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
          />
          <p className="mt-4 text-sm tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Hover to activate · Click to pulse
          </p>
        </motion.div>

        {/* Skill grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((cat, catIdx) => (
            <motion.div
              key={cat.title}
              className="relative p-8 rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(14,18,38,0.5)',
                border: `1px solid ${cat.color}18`,
                backdropFilter: 'blur(20px)',
              }}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: catIdx * 0.15, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ borderColor: `${cat.color}30` }}
            >
              {/* Category glow */}
              <div
                className="absolute top-0 left-0 w-40 h-40 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2"
                style={{ background: `radial-gradient(circle, ${cat.color}08 0%, transparent 70%)` }}
              />

              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="text-2xl"
                  style={{
                    color: cat.color,
                    filter: `drop-shadow(0 0 8px ${cat.color})`,
                  }}
                >
                  {cat.icon}
                </div>
                <div>
                  <div
                    className="text-[10px] tracking-[0.4em] uppercase font-bold"
                    style={{ color: cat.color }}
                  >
                    {cat.title}
                  </div>
                  <div className="w-8 h-px mt-1" style={{ background: cat.color }} />
                </div>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2.5">
                {cat.skills.map((skill, i) => (
                  <SkillNode
                    key={skill}
                    skill={skill}
                    color={cat.color}
                    index={catIdx * 10 + i}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
