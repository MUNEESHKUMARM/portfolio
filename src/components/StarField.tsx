import { useEffect, useRef, useMemo } from 'react'

interface Star {
  x: number
  y: number
  size: number
  opacity: number
  speed: number
  twinkleSpeed: number
  twinkleOffset: number
}

interface Props {
  count?: number
  interactive?: boolean
}

export default function StarField({ count = 150, interactive = true }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const stars = useMemo<Star[]>(() => {
    return Array.from({ length: count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 2 + 0.3,
      opacity: Math.random() * 0.7 + 0.1,
      speed: Math.random() * 0.3 + 0.05,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinkleOffset: Math.random() * Math.PI * 2,
    }))
  }, [count])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animFrame: number
    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let time = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }
    if (interactive) {
      document.addEventListener('mousemove', onMouseMove)
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 1

      stars.forEach((star) => {
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset)
        const opacity = star.opacity + twinkle * 0.2

        if (interactive) {
          const dx = mouseX - star.x
          const dy = mouseY - star.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const maxDist = 200
          if (dist < maxDist) {
            star.x -= (dx / dist) * star.speed * (1 - dist / maxDist) * 0.5
            star.y -= (dy / dist) * star.speed * (1 - dist / maxDist) * 0.5
          }
        }

        const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 2)
        gradient.addColorStop(0, `rgba(200, 240, 255, ${Math.max(0, Math.min(1, opacity))})`)
        gradient.addColorStop(0.5, `rgba(100, 200, 255, ${Math.max(0, Math.min(1, opacity * 0.5))})`)
        gradient.addColorStop(1, `rgba(0, 229, 255, 0)`)

        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      })

      animFrame = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animFrame)
      window.removeEventListener('resize', resize)
      if (interactive) document.removeEventListener('mousemove', onMouseMove)
    }
  }, [stars, interactive])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  )
}
