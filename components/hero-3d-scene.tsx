"use client"

import { useEffect, useRef, useState } from "react"

export default function Hero3DScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resizeCanvas()

    // Particles for 3D effect
    const particles: Array<{
      x: number
      y: number
      z: number
      vx: number
      vy: number
      vz: number
      size: number
    }> = []

    // Create particles
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width - canvas.width / 2,
        y: Math.random() * canvas.height - canvas.height / 2,
        z: Math.random() * 1000 - 500,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        vz: Math.random() * 3 - 1,
        size: Math.random() * 2 + 1,
      })
    }

    let animationId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.z += particle.vz

        // Wrap around
        if (particle.x > canvas.width / 2) particle.x = -canvas.width / 2
        if (particle.x < -canvas.width / 2) particle.x = canvas.width / 2
        if (particle.y > canvas.height / 2) particle.y = -canvas.height / 2
        if (particle.y < -canvas.height / 2) particle.y = canvas.height / 2

        // Perspective
        const scale = 1000 / (1000 + particle.z)
        const x2d = particle.x * scale + canvas.width / 2
        const y2d = particle.y * scale + canvas.height / 2

        if (x2d < 0 || x2d > canvas.width || y2d < 0 || y2d > canvas.height) {
          return
        }

        // Mouse influence
        const dx = x2d - mousePos.x
        const dy = y2d - mousePos.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        if (distance < 150) {
          const angle = Math.atan2(dy, dx)
          particle.vx += Math.cos(angle) * 0.3
          particle.vy += Math.sin(angle) * 0.3
        }

        // Draw particle
        const radius = Math.max(0.5, particle.size * scale)
        ctx.fillStyle = `rgba(239, 68, 68, ${Math.max(0, 1 - Math.abs(particle.z) / 500)})`
        ctx.beginPath()
        ctx.arc(x2d, y2d, radius, 0, Math.PI * 2)
        ctx.fill()

        // Draw connections
        particles.forEach((other) => {
          const dx2 = other.x - particle.x
          const dy2 = other.y - particle.y
          const dz2 = other.z - particle.z
          const d = Math.sqrt(dx2 * dx2 + dy2 * dy2 + dz2 * dz2)

          if (d < 200) {
            const x2d_other = other.x * (1000 / (1000 + other.z)) + canvas.width / 2
            const y2d_other = other.y * (1000 / (1000 + other.z)) + canvas.height / 2

            ctx.strokeStyle = `rgba(239, 68, 68, ${0.2 * (1 - d / 200)})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(x2d, y2d)
            ctx.lineTo(x2d_other, y2d_other)
            ctx.stroke()
          }
        })
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX - canvas.getBoundingClientRect().left,
        y: e.clientY - canvas.getBoundingClientRect().top,
      })
    }

    window.addEventListener("resize", resizeCanvas)
    canvas.addEventListener("mousemove", handleMouseMove)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resizeCanvas)
      canvas.removeEventListener("mousemove", handleMouseMove)
    }
  }, [mousePos])

  return <canvas ref={canvasRef} className="w-full h-full absolute inset-0" />
}
