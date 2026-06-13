import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function FinalSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-32 overflow-hidden"
      style={{ background: '#050505' }}
    >
      {/* Zooming-out universe effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ scale: 2, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(14,18,38,0.8) 0%, #050505 70%)',
        }}
      />

      {/* Expanding rings (universe zoom out) */}
      {[100, 200, 300, 400, 500].map((r, i) => (
        <motion.div
          key={r}
          className="absolute top-1/2 left-1/2 rounded-full pointer-events-none"
          style={{
            width: r * 2,
            height: r * 2,
            marginLeft: -r,
            marginTop: -r,
            border: `1px solid rgba(0,229,255,${0.06 - i * 0.01})`,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 1.5, delay: i * 0.1 + 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}

      {/* Stars fade in */}
      {Array.from({ length: 80 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: Math.random() * 2 + 0.5,
            height: Math.random() * 2 + 0.5,
            background: 'rgba(200,240,255,0.8)',
          }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: Math.random() * 0.7 + 0.1 } : {}}
          transition={{ delay: i * 0.02 + 0.5 + Math.random() }}
        />
      ))}

      {/* Main text */}
      <div className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5, filter: 'blur(30px)' }}
          animate={inView ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
          transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="font-black leading-none mb-2"
            style={{
              fontSize: 'clamp(3rem, 10vw, 8rem)',
              letterSpacing: '-0.04em',
              background: 'linear-gradient(135deg, #FFFFFF 20%, rgba(255,255,255,0.4))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            THANK YOU
          </div>
          <motion.div
            className="font-bold leading-none mb-2"
            style={{
              fontSize: 'clamp(1.5rem, 5vw, 4rem)',
              letterSpacing: '-0.02em',
              color: 'rgba(255,255,255,0.4)',
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1.2 }}
          >
            FOR VISITING
          </motion.div>
          <motion.div
            className="font-black leading-none"
            style={{
              fontSize: 'clamp(2rem, 7vw, 6rem)',
              letterSpacing: '-0.03em',
              background: 'linear-gradient(135deg, #00E5FF 20%, #A855F7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 40px rgba(0,229,255,0.3))',
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1.6 }}
          >
            MY PORTFOLIO
          </motion.div>
        </motion.div>

        {/* See you again */}
        <motion.div
          className="mt-16 mb-20"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 2.4 }}
        >
          <motion.div
            className="text-sm tracking-[0.4em] uppercase"
            style={{ color: 'rgba(255,255,255,0.3)' }}
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            SEE YOU AGAIN
          </motion.div>

          {/* Fading stars line */}
          <motion.div
            className="mt-8 flex justify-center gap-3"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 3 }}
          >
            {[0, 1, 2, 3, 4].map(i => (
              <motion.div
                key={i}
                className="w-1 h-1 rounded-full"
                style={{ background: 'rgba(0,229,255,0.5)' }}
                animate={{
                  opacity: [0.5, 0, 0.5],
                  scale: [1, 0.3, 1],
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.4 + 3.2,
                  repeat: Infinity,
                }}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Built by */}
        <motion.div
          className="absolute bottom-8 left-0 right-0"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1.5, delay: 2.8 }}
        >
          <div
            className="text-[11px] tracking-[0.3em] uppercase"
            style={{ color: 'rgba(255,255,255,0.2)' }}
          >
            Built by{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #00E5FF, #A855F7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              MUNEESHKUMAR M
            </span>
          </div>
        </motion.div>
      </div>

      {/* Scroll to top */}
      <motion.button
        className="absolute bottom-20 right-8 w-10 h-10 rounded-full flex items-center justify-center"
        style={{
          background: 'rgba(14,18,38,0.8)',
          border: '1px solid rgba(0,229,255,0.2)',
          color: '#00E5FF',
          cursor: 'none',
        }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 2.5 }}
        whileHover={{ scale: 1.1, borderColor: 'rgba(0,229,255,0.5)' }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      </motion.button>
    </section>
  )
}
