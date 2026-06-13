import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  open: boolean
  onClose: () => void
  file: string
  title: string
  color?: string
}

export default function CertificateModal({ open, onClose, file, title, color = '#00E5FF' }: Props) {
  const [iframeError, setIframeError] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (open) {
      setIframeError(false)
      setLoading(true)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const handleIframeLoad = () => {
    setLoading(false)
  }

  const handleIframeError = () => {
    setIframeError(true)
    setLoading(false)
  }

  return (
    <AnimatePresence>
      {open && (
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
              background: 'rgba(5, 5, 5, 0.92)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
            }}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Ambient glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${color}0A 0%, transparent 70%)`,
            }}
          />

          {/* Modal container */}
          <motion.div
            className="relative z-10 flex flex-col w-full max-w-5xl mx-4 rounded-2xl overflow-hidden"
            style={{
              height: 'min(85vh, 800px)',
              background: 'rgba(14, 18, 38, 0.95)',
              border: `1px solid ${color}25`,
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
              boxShadow: `0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px ${color}18`,
            }}
            initial={{ scale: 0.88, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.88, y: 40, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-4 flex-shrink-0"
              style={{
                borderBottom: `1px solid ${color}15`,
                background: 'rgba(14,18,38,0.8)',
              }}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: color, boxShadow: `0 0 8px ${color}` }}
                />
                <div className="min-w-0">
                  <div
                    className="text-[10px] tracking-[0.3em] uppercase mb-0.5"
                    style={{ color: `${color}90` }}
                  >
                    Certificate Preview
                  </div>
                  <div
                    className="text-sm font-semibold truncate"
                    style={{ color: 'rgba(255,255,255,0.9)' }}
                  >
                    {title}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                {/* Open in new tab */}
                <motion.a
                  href={file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs tracking-wide"
                  style={{
                    background: `${color}12`,
                    border: `1px solid ${color}25`,
                    color: color,
                    textDecoration: 'none',
                    cursor: 'none',
                  }}
                  whileHover={{ scale: 1.04, background: `${color}20` }}
                  whileTap={{ scale: 0.97 }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Open
                </motion.a>

                {/* Download */}
                <motion.a
                  href={file}
                  download
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs tracking-wide"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'rgba(255,255,255,0.6)',
                    textDecoration: 'none',
                    cursor: 'none',
                  }}
                  whileHover={{ scale: 1.04, color: '#FFFFFF' }}
                  whileTap={{ scale: 0.97 }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Save
                </motion.a>

                {/* Close */}
                <motion.button
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'rgba(255,255,255,0.5)',
                    cursor: 'none',
                  }}
                  whileHover={{ scale: 1.08, color: '#FFFFFF', background: 'rgba(255,255,255,0.08)' }}
                  whileTap={{ scale: 0.94 }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>
            </div>

            {/* Content area */}
            <div className="relative flex-1 overflow-hidden">
              {/* Loading state */}
              <AnimatePresence>
                {loading && !iframeError && (
                  <motion.div
                    className="absolute inset-0 flex flex-col items-center justify-center z-10"
                    exit={{ opacity: 0 }}
                    style={{ background: 'rgba(14,18,38,0.8)' }}
                  >
                    <motion.div
                      className="w-10 h-10 rounded-full mb-4"
                      style={{
                        border: `2px solid ${color}30`,
                        borderTopColor: color,
                      }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                    />
                    <div className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
                      Loading certificate...
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* PDF iframe */}
              {!iframeError && (
                <iframe
                  src={`${file}#toolbar=1&navpanes=0&scrollbar=1&view=FitH`}
                  className="w-full h-full"
                  style={{
                    border: 'none',
                    display: iframeError ? 'none' : 'block',
                    background: '#FFFFFF',
                  }}
                  onLoad={handleIframeLoad}
                  onError={handleIframeError}
                  title={title}
                />
              )}

              {/* Fallback UI */}
              {iframeError && (
                <motion.div
                  className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-8"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                    style={{
                      background: `${color}12`,
                      border: `1px solid ${color}25`,
                    }}
                  >
                    📄
                  </div>

                  <div className="text-center">
                    <div
                      className="text-base font-semibold mb-2"
                      style={{ color: 'rgba(255,255,255,0.8)' }}
                    >
                      Preview unavailable
                    </div>
                    <div
                      className="text-sm max-w-sm"
                      style={{ color: 'rgba(255,255,255,0.4)' }}
                    >
                      Place your PDF at{' '}
                      <code
                        className="px-1.5 py-0.5 rounded text-[11px]"
                        style={{ background: `${color}15`, color }}
                      >
                        public{file}
                      </code>
                      {' '}then reload, or open in a new tab below.
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <motion.a
                      href={file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium"
                      style={{
                        background: `${color}18`,
                        border: `1px solid ${color}35`,
                        color: color,
                        textDecoration: 'none',
                        cursor: 'none',
                      }}
                      whileHover={{ scale: 1.04, background: `${color}25` }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Open in New Tab
                    </motion.a>

                    <motion.a
                      href={file}
                      download
                      className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium"
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: 'rgba(255,255,255,0.7)',
                        textDecoration: 'none',
                        cursor: 'none',
                      }}
                      whileHover={{ scale: 1.04, color: '#FFFFFF' }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download
                    </motion.a>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Corner decorations */}
            {['top-3 left-3', 'top-3 right-3', 'bottom-3 left-3', 'bottom-3 right-3'].map((pos, i) => (
              <div
                key={i}
                className={`absolute ${pos} w-3 h-3 pointer-events-none`}
                style={{
                  borderTop: i < 2 ? `1px solid ${color}40` : 'none',
                  borderBottom: i >= 2 ? `1px solid ${color}40` : 'none',
                  borderLeft: i % 2 === 0 ? `1px solid ${color}40` : 'none',
                  borderRight: i % 2 === 1 ? `1px solid ${color}40` : 'none',
                }}
              />
            ))}
          </motion.div>

          {/* ESC hint */}
          <motion.div
            className="absolute bottom-6 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div
              className="text-[10px] tracking-[0.3em] uppercase"
              style={{ color: 'rgba(255,255,255,0.2)' }}
            >
              Press ESC to close
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
