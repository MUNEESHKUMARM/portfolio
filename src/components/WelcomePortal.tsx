import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const greetings = [
  { text: 'Hello', lang: 'English' },
  { text: 'Vanakkam', lang: 'Tamil' },
  { text: 'Bonjour', lang: 'French' },
  { text: 'Hola', lang: 'Spanish' },
  { text: 'こんにちは', lang: 'Japanese' },
  { text: 'مرحبا', lang: 'Arabic' },
]

interface Props {
  onEnter: () => void
}

export default function WelcomePortal({ onEnter }: Props) {
  const [phase, setPhase] = useState<'silence' | 'greeting' | 'final' | 'button' | 'warping'>('silence')
  const [greetingIndex, setGreetingIndex] = useState(0)
  const [warping, setWarping] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<{ x: number; y: number; vx: number; vy: number; size: number; opacity: number; twinkle: number }[]>([])
  const animFrameRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    particlesRef.current = Array.from({ length: 300 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      size: Math.random() * 1.8 + 0.2,
      opacity: Math.random() * 0.8 + 0.1,
      twinkle: Math.random() * Math.PI * 2,
    }))

    let t = 0
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      t += 0.01

      particlesRef.current.forEach(p => {
        p.twinkle += 0.02
        const opacity = p.opacity * (0.5 + 0.5 * Math.sin(p.twinkle))

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2.5)
        grad.addColorStop(0, `rgba(200, 240, 255, ${opacity})`)
        grad.addColorStop(1, `rgba(0, 229, 255, 0)`)

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()

        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
      })

      animFrameRef.current = requestAnimationFrame(draw)
    }
    draw()

    const onResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animFrameRef.current)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('greeting'), 1000)
    return () => clearTimeout(t1)
  }, [])

  useEffect(() => {
    if (phase !== 'greeting') return

    let idx = 0
    const cycle = () => {
      if (idx < greetings.length - 1) {
        idx++
        setGreetingIndex(idx)
        const delay = idx === greetings.length - 1 ? 0 : 600
        setTimeout(cycle, delay === 0 ? 0 : 600 + delay)
      } else {
        setTimeout(() => setPhase('final'), 800)
      }
    }

    const t = setTimeout(cycle, 600)
    return () => clearTimeout(t)
  }, [phase])

  useEffect(() => {
    if (phase !== 'final') return
    const t = setTimeout(() => setPhase('button'), 1200)
    return () => clearTimeout(t)
  }, [phase])

  const handleEnter = () => {
    setWarping(true)
    setPhase('warping')
    setTimeout(onEnter, 1400)
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{ background: '#050505' }}
      animate={warping ? { scale: 1 } : {}}
    >
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Breathing background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(ellipse at 50% 50%, rgba(14,18,38,0.8) 0%, #050505 70%)',
            'radial-gradient(ellipse at 50% 50%, rgba(14,18,38,1) 0%, #050505 70%)',
          ]
        }}
        transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
      />

      {/* Warp effect overlay */}
      <AnimatePresence>
        {warping && (
          <motion.div
            className="absolute inset-0 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.3, 1] }}
            transition={{ duration: 1.2 }}
            style={{
              background: 'radial-gradient(circle at center, rgba(0,229,255,0.3) 0%, rgba(168,85,247,0.2) 30%, transparent 70%)',
            }}
          />
        )}
      </AnimatePresence>

      {/* Warp lines */}
      <AnimatePresence>
        {warping && (
          <motion.div
            className="absolute inset-0 z-10 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {Array.from({ length: 24 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute left-1/2 top-1/2 origin-center"
                style={{
                  width: '2px',
                  height: '60vh',
                  background: `linear-gradient(to bottom, transparent, rgba(0,229,255,${0.3 + Math.random() * 0.5}), transparent)`,
                  transform: `rotate(${i * 15}deg) translateX(-50%)`,
                }}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: [0, 1, 3], opacity: [0, 0.8, 0] }}
                transition={{ duration: 1.2, delay: i * 0.03, ease: 'easeIn' }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="relative z-20 text-center select-none">
        <AnimatePresence mode="wait">
          {phase === 'greeting' && (
            <motion.div
              key={`greeting-${greetingIndex}`}
              initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -30, filter: 'blur(10px)' }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-bold tracking-[-0.02em]"
              style={{
                fontSize: 'clamp(4rem, 15vw, 10rem)',
                letterSpacing: '-0.03em',
                color: 'rgba(255,255,255,0.9)',
              }}
            >
              {greetings[greetingIndex].text}
            </motion.div>
          )}

          {(phase === 'final' || phase === 'button' || phase === 'warping') && (
            <motion.div
              key="final"
              initial={{ opacity: 0, scale: 0.8, filter: 'blur(20px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-8"
            >
              <div
                className="font-display font-black tracking-tight leading-none"
                style={{
                  fontSize: 'clamp(5rem, 18vw, 14rem)',
                  letterSpacing: '-0.04em',
                  background: 'linear-gradient(135deg, #FFFFFF 30%, #00E5FF 70%, #A855F7)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: 'none',
                  filter: 'drop-shadow(0 0 40px rgba(0,229,255,0.3))',
                }}
              >
                HELLO.
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enter button */}
        <AnimatePresence>
          {phase === 'button' && !warping && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mt-16"
            >
              <motion.button
                onClick={handleEnter}
                className="group relative px-12 py-5 text-lg font-medium tracking-[0.2em] uppercase overflow-hidden"
                style={{
                  background: 'rgba(14, 18, 38, 0.3)',
                  border: '1px solid rgba(0, 229, 255, 0.4)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '4px',
                  color: '#00E5FF',
                  cursor: 'none',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'radial-gradient(ellipse at center, rgba(0,229,255,0.15) 0%, transparent 70%)',
                  }}
                />
                <span className="relative z-10 flex items-center gap-3">
                  ENTER
                  <motion.span
                    animate={{ x: [0, 6, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    →
                  </motion.span>
                </span>

                {/* Shimmer */}
                <motion.div
                  className="absolute top-0 -left-full w-1/3 h-full skew-x-12"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.3), transparent)' }}
                  animate={{ left: ['−100%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                />
              </motion.button>

              <motion.p
                className="mt-6 text-[11px] tracking-[0.3em] uppercase"
                style={{ color: 'rgba(255,255,255,0.25)' }}
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Click to enter the universe
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.04) 0%, transparent 70%)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.04) 0%, transparent 70%)' }} />
    </motion.div>
  )
}
