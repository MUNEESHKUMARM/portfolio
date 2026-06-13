import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    if (isMobile) return

    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      if (dotRef.current) {
        dotRef.current.style.left = mouseX + 'px'
        dotRef.current.style.top = mouseY + 'px'
      }
    }

    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.12
      cursorY += (mouseY - cursorY) * 0.12

      if (cursorRef.current) {
        cursorRef.current.style.left = cursorX + 'px'
        cursorRef.current.style.top = cursorY + 'px'
      }
      requestAnimationFrame(animate)
    }
    animate()

    const onMouseEnterLink = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = 'translate(-50%, -50%) scale(2.5)'
        cursorRef.current.style.borderColor = 'rgba(168, 85, 247, 0.9)'
        cursorRef.current.style.background = 'rgba(168, 85, 247, 0.1)'
      }
    }
    const onMouseLeaveLink = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = 'translate(-50%, -50%) scale(1)'
        cursorRef.current.style.borderColor = 'rgba(0, 229, 255, 0.8)'
        cursorRef.current.style.background = 'transparent'
      }
    }

    document.addEventListener('mousemove', onMouseMove)

    const addLinkListeners = () => {
      document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
        el.addEventListener('mouseenter', onMouseEnterLink)
        el.addEventListener('mouseleave', onMouseLeaveLink)
      })
    }
    addLinkListeners()

    const observer = new MutationObserver(addLinkListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[99999] w-8 h-8 rounded-full border border-[#00E5FF]/80 -translate-x-1/2 -translate-y-1/2 transition-[border-color,background,transform] duration-200"
        style={{ mixBlendMode: 'normal' }}
      />
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[99999] w-1.5 h-1.5 rounded-full bg-[#00E5FF] -translate-x-1/2 -translate-y-1/2"
      />
    </>
  )
}
