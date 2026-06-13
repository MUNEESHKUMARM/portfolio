import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const videos = [
  { title: 'Python', embed: 'https://www.youtube.com/embed/m67-bOpOoPU', hours: '12', color: '#00E5FF' },
  { title: 'Java', embed: 'https://www.youtube.com/embed/kGxSyqKbzsc', hours: '15', color: '#A855F7' },
  { title: 'HTML', embed: 'https://www.youtube.com/embed/FYErehuSuuw', hours: '8', color: '#00E5FF' },
  { title: 'CSS', embed: 'https://www.youtube.com/embed/vfs1wBDoqBY', hours: '10', color: '#A855F7' },
  { title: 'JavaScript', embed: 'https://www.youtube.com/embed/poo0BXryffI', hours: '20', color: '#00E5FF' },
  { title: 'SQL', embed: 'https://www.youtube.com/embed/JtaOmwnR6AM', hours: '9', color: '#A855F7' },
  { title: 'React', embed: 'https://www.youtube.com/embed/01bEb7R-F4s', hours: '18', color: '#00E5FF' },
  { title: 'Angular', embed: 'https://www.youtube.com/embed/D1RHBY0unzA', hours: '14', color: '#A855F7' },
]

function VideoCard({ video, index, inView }: { video: typeof videos[0]; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  const onMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12
    setTilt({ x, y })
  }

  const onMouseLeave = () => {
    setHovered(false)
    setTilt({ x: 0, y: 0 })
  }

  return (
    <motion.div
      ref={cardRef}
      className="relative video-card"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onMouseLeave}
      style={{
        transform: `perspective(800px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale(${hovered ? 1.03 : 1})`,
        transition: hovered ? 'transform 0.1s ease' : 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      }}
    >
      <div
        className="relative rounded-xl overflow-hidden"
        style={{
          background: 'rgba(14,18,38,0.7)',
          border: `1px solid ${hovered ? video.color + '40' : 'rgba(255,255,255,0.06)'}`,
          backdropFilter: 'blur(20px)',
          boxShadow: hovered ? `0 20px 60px ${video.color}18, 0 0 30px ${video.color}15` : 'none',
          transition: 'border-color 0.3s, box-shadow 0.3s',
        }}
      >
        {/* Video embed */}
        <div className="relative aspect-video w-full overflow-hidden">
          <iframe
            src={video.embed}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
            style={{ border: 'none' }}
          />

          {/* Glow overlay */}
          {hovered && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                background: `linear-gradient(to bottom, ${video.color}08, transparent 60%)`,
              }}
            />
          )}
        </div>

        {/* Card info */}
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  background: video.color,
                  boxShadow: `0 0 6px ${video.color}`,
                }}
              />
              <span
                className="text-sm font-semibold tracking-wide"
                style={{ color: '#FFFFFF' }}
              >
                {video.title}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <div className="text-[10px] tracking-wider" style={{ color: 'rgba(255,255,255,0.4)' }}>
                {video.hours}h absorbed
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-3 h-0.5 w-full rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: `linear-gradient(90deg, ${video.color}, ${video.color}80)` }}
              initial={{ width: 0 }}
              animate={inView ? { width: '100%' } : {}}
              transition={{ duration: 1.5, delay: index * 0.08 + 0.5 }}
            />
          </div>
          <div className="mt-1 flex justify-between">
            <span className="text-[9px] tracking-wider uppercase" style={{ color: 'rgba(255,255,255,0.25)' }}>
              Progress
            </span>
            <span className="text-[9px]" style={{ color: video.color }}>Completed</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function KnowledgeArchive() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-60px' })
  const totalHours = videos.reduce((sum, v) => sum + parseInt(v.hours), 0)

  return (
    <section
      id="knowledge"
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden"
      style={{ background: '#050505' }}
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 100%, rgba(14,18,38,0.6) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Section title */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="text-xs tracking-[0.5em] uppercase mb-4" style={{ color: 'rgba(168,85,247,0.6)' }}>
            Chapter 04
          </div>
          <h2
            className="font-black leading-none tracking-tight mb-4"
            style={{
              fontSize: 'clamp(2rem, 5vw, 4.5rem)',
              letterSpacing: '-0.03em',
              background: 'linear-gradient(135deg, #FFFFFF 30%, rgba(255,255,255,0.5))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            THE KNOWLEDGE I ABSORBED
          </h2>
          <motion.div
            className="h-px w-24 mx-auto mb-6"
            style={{ background: 'linear-gradient(90deg, transparent, #A855F7, transparent)' }}
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
          />

          {/* Total hours stat */}
          <motion.div
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full"
            style={{
              background: 'rgba(168,85,247,0.1)',
              border: '1px solid rgba(168,85,247,0.2)',
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.6 }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#A855F7]" />
            <span className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
              <span className="font-bold text-[#A855F7]">{totalHours}+</span> hours of learning absorbed
            </span>
          </motion.div>
        </motion.div>

        {/* Video grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
          {videos.map((video, i) => (
            <VideoCard key={video.title} video={video} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
