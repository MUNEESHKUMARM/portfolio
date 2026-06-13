import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import ResumeDownloadButton from './ResumeDownloadButton'

const roles = ['Developer', 'Creator', 'Problem Solver']

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animFrame: number
    let mouseX = 0
    let mouseY = 0
    let t = 0

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = (e.clientX - rect.left) / canvas.width - 0.5
      mouseY = (e.clientY - rect.top) / canvas.height - 0.5
    }
    window.addEventListener('mousemove', onMouseMove)

    // Orbit rings
    const rings = [
      { radius: 180, speed: 0.003, color: 'rgba(0,229,255,0.12)', width: 1, nodes: 3 },
      { radius: 260, speed: -0.002, color: 'rgba(168,85,247,0.10)', width: 1, nodes: 5 },
      { radius: 340, speed: 0.0015, color: 'rgba(0,229,255,0.07)', width: 1, nodes: 4 },
    ]

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      t += 1

      const cx = canvas.width / 2 + mouseX * 30
      const cy = canvas.height / 2 + mouseY * 30

      // Background nebula
      const nebula = ctx.createRadialGradient(cx, cy, 0, cx, cy, canvas.width * 0.5)
      nebula.addColorStop(0, 'rgba(14,18,38,0.3)')
      nebula.addColorStop(0.4, 'rgba(0,229,255,0.03)')
      nebula.addColorStop(0.7, 'rgba(168,85,247,0.02)')
      nebula.addColorStop(1, 'transparent')
      ctx.fillStyle = nebula
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw orbit rings
      rings.forEach(ring => {
        const angle = t * ring.speed
        ctx.beginPath()
        ctx.ellipse(cx, cy, ring.radius, ring.radius * 0.35, angle, 0, Math.PI * 2)
        ctx.strokeStyle = ring.color
        ctx.lineWidth = ring.width
        ctx.stroke()

        // Nodes on rings
        for (let n = 0; n < ring.nodes; n++) {
          const nodeAngle = angle + (n / ring.nodes) * Math.PI * 2
          const nx = cx + Math.cos(nodeAngle) * ring.radius
          const ny = cy + Math.sin(nodeAngle) * ring.radius * 0.35
          const pulse = 0.5 + 0.5 * Math.sin(t * 0.05 + n)

          const nodeGrad = ctx.createRadialGradient(nx, ny, 0, nx, ny, 4 * pulse)
          nodeGrad.addColorStop(0, 'rgba(0,229,255,0.9)')
          nodeGrad.addColorStop(1, 'rgba(0,229,255,0)')

          ctx.beginPath()
          ctx.arc(nx, ny, 2.5 * pulse, 0, Math.PI * 2)
          ctx.fillStyle = nodeGrad
          ctx.fill()
        }
      })

      // Central hologram glow
      const holoGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 120)
      holoGrad.addColorStop(0, `rgba(0,229,255,${0.08 + 0.04 * Math.sin(t * 0.03)})`)
      holoGrad.addColorStop(0.5, `rgba(168,85,247,${0.04 + 0.02 * Math.sin(t * 0.02)})`)
      holoGrad.addColorStop(1, 'transparent')
      ctx.fillStyle = holoGrad
      ctx.beginPath()
      ctx.arc(cx, cy, 120, 0, Math.PI * 2)
      ctx.fill()

      // Floating glass panel hints
      const panels = [
        { x: cx - 280, y: cy - 80, w: 120, h: 50 },
        { x: cx + 200, y: cy - 60, w: 100, h: 45 },
        { x: cx - 200, y: cy + 80, w: 90, h: 40 },
      ]
      panels.forEach((p, i) => {
        const fadeIn = Math.max(0, Math.min(1, (t - 60 - i * 20) / 40))
        if (fadeIn <= 0) return

        ctx.globalAlpha = fadeIn * (0.3 + 0.1 * Math.sin(t * 0.02 + i))
        ctx.strokeStyle = 'rgba(0,229,255,0.3)'
        ctx.lineWidth = 1
        ctx.strokeRect(p.x + Math.sin(t * 0.01 + i) * 3, p.y + Math.cos(t * 0.01 + i) * 3, p.w, p.h)

        ctx.fillStyle = 'rgba(14,18,38,0.3)'
        ctx.fillRect(p.x + Math.sin(t * 0.01 + i) * 3, p.y + Math.cos(t * 0.01 + i) * 3, p.w, p.h)
        ctx.globalAlpha = 1
      })

      animFrame = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animFrame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050505 0%, #0E1226 50%, #050505 100%)' }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-20 text-center">
        {/* Main heading */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1
            className="font-black leading-none tracking-tight mb-6"
            style={{
              fontSize: 'clamp(2.5rem, 7vw, 6.5rem)',
              letterSpacing: '-0.03em',
            }}
            initial={{ opacity: 0, y: 60, filter: 'blur(20px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <span style={{ color: 'rgba(255,255,255,0.95)' }}>I DON'T BUILD</span>
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #00E5FF 20%, #A855F7 80%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 40px rgba(0,229,255,0.4))',
              }}
            >
              WEBSITES.
            </span>
            <br />
            <span style={{ color: 'rgba(255,255,255,0.95)' }}>I BUILD</span>
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #A855F7 20%, #00E5FF 80%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 40px rgba(168,85,247,0.4))',
              }}
            >
              EXPERIENCES.
            </span>
          </motion.h1>
        </motion.div>

        {/* Name */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="inline-block text-sm tracking-[0.4em] uppercase mb-3"
            style={{ color: 'rgba(0,229,255,0.6)' }}
          >
            — crafted by —
          </div>
          <div
            className="font-black tracking-[0.1em] uppercase"
            style={{
              fontSize: 'clamp(1.5rem, 4vw, 3rem)',
              background: 'linear-gradient(135deg, #FFFFFF 40%, rgba(255,255,255,0.7))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            MUNEESHKUMAR M
          </div>
        </motion.div>

        {/* Roles */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {roles.map((role, i) => (
            <motion.span
              key={role}
              className="px-4 py-1.5 text-sm tracking-[0.15em] uppercase rounded-full"
              style={{
                background: 'rgba(14,18,38,0.6)',
                border: `1px solid ${i % 2 === 0 ? 'rgba(0,229,255,0.3)' : 'rgba(168,85,247,0.3)'}`,
                color: i % 2 === 0 ? 'rgba(0,229,255,0.9)' : 'rgba(168,85,247,0.9)',
                backdropFilter: 'blur(10px)',
              }}
              whileHover={{ scale: 1.05, y: -2 }}
            >
              {role}
            </motion.span>
          ))}
        </motion.div>

        {/* Description */}
        <motion.p
          className="max-w-2xl mx-auto text-base md:text-lg leading-relaxed mb-12"
          style={{ color: 'rgba(255,255,255,0.55)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          Creative and fast-learning IT student focused on building real-world digital products
          using modern technologies, AI workflows and premium user experiences.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.button
            onClick={() => document.querySelector('#journey')?.scrollIntoView({ behavior: 'smooth' })}
            className="relative px-8 py-4 text-sm font-medium tracking-[0.15em] uppercase overflow-hidden rounded-md"
            style={{
              background: 'linear-gradient(135deg, rgba(0,229,255,0.15), rgba(168,85,247,0.15))',
              border: '1px solid rgba(0,229,255,0.4)',
              color: '#00E5FF',
              cursor: 'none',
            }}
            whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(0,229,255,0.2)' }}
            whileTap={{ scale: 0.98 }}
          >
            Explore Journey
          </motion.button>

          <ResumeDownloadButton />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <div className="text-[10px] tracking-[0.3em] uppercase" style={{ color: 'rgba(255,255,255,0.25)' }}>
            Scroll
          </div>
          <motion.div
            className="w-px h-12"
            style={{ background: 'linear-gradient(to bottom, rgba(0,229,255,0.6), transparent)' }}
            animate={{ scaleY: [0.5, 1, 0.5], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </section>
  )
}
