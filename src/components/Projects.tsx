import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const projects = [
  {
    id: 'expense-mate',
    name: 'EXPENSE MATE',
    tagline: 'Smart finance tracking for modern life',
    stack: ['Flutter', 'Firebase', 'SQLite'],
    features: [
      'Finance tracking dashboard',
      'Smart expense alerts',
      'Payment management system',
    ],
    color: '#00E5FF',
    gradient: 'from-[#00E5FF]/20 to-[#0E1226]',
    icon: '◈',
    image: 'https://images.pexels.com/photos/6694543/pexels-photo-6694543.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'nutri-food',
    name: 'NUTRI FOOD',
    tagline: 'AI-powered nutrition intelligence',
    stack: ['Python', 'AI/ML'],
    features: [
      'Real-time food scanning',
      'Calorie intelligence',
      'AI health suggestions',
    ],
    color: '#A855F7',
    gradient: 'from-[#A855F7]/20 to-[#0E1226]',
    icon: '⬡',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'smart-parking',
    name: 'SMART PARKING',
    tagline: 'IoT-driven parking automation',
    stack: ['IoT', 'ESP', 'Sensors'],
    features: [
      'Intelligent detection system',
      'Real-time automation',
      'Space optimization',
    ],
    color: '#00E5FF',
    gradient: 'from-[#00E5FF]/20 to-[#0E1226]',
    icon: '◉',
    image: 'https://images.pexels.com/photos/1004409/pexels-photo-1004409.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
]

function ProjectCard({ project, index, inView }: { project: typeof projects[0]; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  const onMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 15
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -15
    setTilt({ x, y })
  }

  return (
    <motion.div
      ref={cardRef}
      className="relative cursor-none"
      initial={{ opacity: 0, y: 80 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }) }}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateY(${hovered ? -12 : 0}px)`,
        transition: hovered ? 'transform 0.15s ease' : 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      }}
    >
      <div
        className="relative rounded-2xl overflow-hidden h-full"
        style={{
          background: 'rgba(14,18,38,0.7)',
          border: `1px solid ${hovered ? project.color + '40' : 'rgba(255,255,255,0.07)'}`,
          backdropFilter: 'blur(20px)',
          boxShadow: hovered
            ? `0 30px 80px ${project.color}20, 0 0 0 1px ${project.color}20`
            : '0 10px 40px rgba(0,0,0,0.3)',
          transition: 'border-color 0.4s, box-shadow 0.4s',
        }}
      >
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover transition-transform duration-700"
            style={{ transform: hovered ? 'scale(1.08)' : 'scale(1)' }}
          />
          {/* Overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, ${project.color}15 0%, rgba(14,18,38,0.9) 100%)`,
            }}
          />
          {/* Icon */}
          <div
            className="absolute top-4 left-4 w-10 h-10 rounded-xl flex items-center justify-center text-xl"
            style={{
              background: `${project.color}20`,
              border: `1px solid ${project.color}40`,
              color: project.color,
              backdropFilter: 'blur(10px)',
              filter: `drop-shadow(0 0 10px ${project.color})`,
            }}
          >
            {project.icon}
          </div>

          {/* Stack badges */}
          <div className="absolute top-4 right-4 flex flex-wrap gap-1 justify-end max-w-[60%]">
            {project.stack.map(tech => (
              <span
                key={tech}
                className="px-2 py-0.5 text-[9px] tracking-wider uppercase rounded-md"
                style={{
                  background: 'rgba(5,5,5,0.7)',
                  border: `1px solid ${project.color}30`,
                  color: project.color,
                  backdropFilter: 'blur(10px)',
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3
            className="text-lg font-black tracking-wide mb-1"
            style={{
              background: `linear-gradient(135deg, #FFFFFF 40%, ${project.color})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {project.name}
          </h3>
          <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.45)' }}>
            {project.tagline}
          </p>

          <div className="space-y-2">
            {project.features.map((feat, i) => (
              <motion.div
                key={feat}
                className="flex items-center gap-2.5"
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.15 + i * 0.08 + 0.5 }}
              >
                <div
                  className="w-1 h-1 rounded-full flex-shrink-0"
                  style={{ background: project.color, boxShadow: `0 0 4px ${project.color}` }}
                />
                <span className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>{feat}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Hover bottom accent */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5"
          style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050505 0%, #0E1226 50%, #050505 100%)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(168,85,247,0.04) 0%, transparent 70%)',
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
            Chapter 05
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
            CREATIONS
          </h2>
          <motion.div
            className="h-px w-24 mx-auto mt-6"
            style={{ background: 'linear-gradient(90deg, transparent, #00E5FF, transparent)' }}
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
          />
        </motion.div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
