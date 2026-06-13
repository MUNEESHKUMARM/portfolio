import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const RESUME_PATH = 'public/Resume/MUNEESHKUMAR M RESUME.pdf'

function ResumeModal({ onClose }: { onClose: () => void }) {
  const [loading, setLoading] = useState(true)
  const [iframeError, setIframeError] = useState(false)

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 cursor-none"
          style={{
            background: 'rgba(5, 5, 5, 0.93)',
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
          }}
          onClick={onClose}
        />

        {/* Ambient glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(0,229,255,0.07) 0%, rgba(168,85,247,0.04) 50%, transparent 70%)',
          }}
        />

        {/* Modal */}
        <motion.div
          className="relative z-10 flex flex-col w-full mx-4"
          style={{
            maxWidth: '900px',
            height: 'min(90vh, 860px)',
            background: 'rgba(14, 18, 38, 0.96)',
            border: '1px solid rgba(0,229,255,0.2)',
            borderRadius: '20px',
            backdropFilter: 'blur(40px)',
            boxShadow: '0 50px 120px rgba(0,0,0,0.7), 0 0 0 1px rgba(0,229,255,0.1), 0 0 60px rgba(0,229,255,0.08)',
          }}
          initial={{ scale: 0.88, y: 50, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.88, y: 50, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 280, damping: 26 }}
          onClick={e => e.stopPropagation()}
        >
          {/* Header bar */}
          <div
            className="flex items-center justify-between px-6 py-4 flex-shrink-0 rounded-t-[20px]"
            style={{
              borderBottom: '1px solid rgba(0,229,255,0.1)',
              background: 'rgba(14,18,38,0.8)',
            }}
          >
            {/* Left: title */}
            <div className="flex items-center gap-3">
              <motion.div
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: '#00E5FF' }}
                animate={{ boxShadow: ['0 0 0px #00E5FF', '0 0 12px #00E5FF', '0 0 0px #00E5FF'] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
              <div>
                <div
                  className="text-[9px] tracking-[0.4em] uppercase"
                  style={{ color: 'rgba(0,229,255,0.55)' }}
                >
                  Document Preview
                </div>
                <div
                  className="text-sm font-bold tracking-wide"
                  style={{ color: 'rgba(255,255,255,0.9)' }}
                >
                  RESUME PREVIEW
                </div>
              </div>
            </div>

            {/* Right: actions */}
            <div className="flex items-center gap-2">
              <motion.a
                href={RESUME_PATH}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium tracking-wide"
                style={{
                  background: 'rgba(0,229,255,0.1)',
                  border: '1px solid rgba(0,229,255,0.25)',
                  color: '#00E5FF',
                  textDecoration: 'none',
                  cursor: 'none',
                }}
                whileHover={{ scale: 1.04, background: 'rgba(0,229,255,0.18)' }}
                whileTap={{ scale: 0.97 }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Open New Tab
              </motion.a>

              <motion.button
                onClick={onClose}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium tracking-wide"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'rgba(255,255,255,0.55)',
                  cursor: 'none',
                }}
                whileHover={{ scale: 1.04, color: '#FFFFFF', background: 'rgba(255,255,255,0.08)' }}
                whileTap={{ scale: 0.97 }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Close
              </motion.button>
            </div>
          </div>

          {/* PDF viewer */}
          <div className="relative flex-1 overflow-hidden rounded-b-[20px]">
            {/* Loading */}
            <AnimatePresence>
              {loading && !iframeError && (
                <motion.div
                  className="absolute inset-0 flex flex-col items-center justify-center z-10"
                  style={{ background: 'rgba(14,18,38,0.9)' }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    className="w-10 h-10 rounded-full mb-4"
                    style={{ border: '2px solid rgba(0,229,255,0.2)', borderTopColor: '#00E5FF' }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                  />
                  <div className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>Loading resume...</div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* iframe PDF viewer */}
            {!iframeError && (
              <iframe
                src={`${RESUME_PATH}#toolbar=1&navpanes=0&view=FitH`}
                className="w-full h-full"
                style={{ border: 'none', background: '#FFFFFF' }}
                onLoad={() => setLoading(false)}
                onError={() => { setIframeError(true); setLoading(false) }}
                title="Resume Preview"
              />
            )}

            {/* Fallback */}
            {iframeError && (
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center gap-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                  style={{ background: 'rgba(0,229,255,0.1)', border: '1px solid rgba(0,229,255,0.2)' }}
                >
                  📄
                </div>
                <div className="text-center">
                  <div className="text-base font-semibold mb-2" style={{ color: 'rgba(255,255,255,0.8)' }}>
                    Preview unavailable
                  </div>
                  <div className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    Place your PDF at <code className="px-1.5 py-0.5 rounded text-[11px]" style={{ background: 'rgba(0,229,255,0.1)', color: '#00E5FF' }}>public/Resume/MUNEESHKUMAR_RESUME.pdf</code>
                  </div>
                </div>
                <motion.a
                  href={RESUME_PATH}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium"
                  style={{
                    background: 'rgba(0,229,255,0.12)',
                    border: '1px solid rgba(0,229,255,0.3)',
                    color: '#00E5FF',
                    textDecoration: 'none',
                    cursor: 'none',
                  }}
                  whileHover={{ scale: 1.04 }}
                >
                  Open in New Tab
                </motion.a>
              </motion.div>
            )}
          </div>

          {/* Corner accents */}
          {[
            'top-3 left-3 border-t border-l',
            'top-3 right-3 border-t border-r',
            'bottom-3 left-3 border-b border-l',
            'bottom-3 right-3 border-b border-r',
          ].map((cls, i) => (
            <div key={i} className={`absolute ${cls} w-3 h-3 pointer-events-none`} style={{ borderColor: 'rgba(0,229,255,0.3)' }} />
          ))}
        </motion.div>

        {/* ESC hint */}
        <motion.div
          className="absolute bottom-5 left-1/2 -translate-x-1/2 pointer-events-none"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="text-[10px] tracking-[0.3em] uppercase" style={{ color: 'rgba(255,255,255,0.18)' }}>
            Press ESC or click outside to close
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default function ResumeDownloadButton() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        className="relative flex items-center gap-2.5 px-8 py-4 text-sm font-medium tracking-[0.15em] uppercase overflow-hidden rounded-md"
        style={{
          background: 'rgba(14,18,38,0.5)',
          border: '1px solid rgba(0,229,255,0.25)',
          color: 'rgba(0,229,255,0.9)',
          cursor: 'none',
          backdropFilter: 'blur(10px)',
        }}
        whileHover={{
          scale: 1.04,
          borderColor: 'rgba(0,229,255,0.5)',
          boxShadow: '0 0 30px rgba(0,229,255,0.15), 0 0 60px rgba(0,229,255,0.06)',
        }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Shimmer */}
        <motion.div
          className="absolute top-0 -left-full w-1/2 h-full skew-x-12 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.12), transparent)' }}
          animate={{ left: ['-50%', '150%'] }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
        />

        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        Preview Resume
      </motion.button>

      <AnimatePresence>
        {open && <ResumeModal onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  )
}
