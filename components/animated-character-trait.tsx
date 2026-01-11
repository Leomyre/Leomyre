"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"
import { useEffect, useState, useRef } from "react"

interface AnimatedCharacterTraitProps {
  icon: LucideIcon
  title: string
  description: string
  color: string
  delay?: number
}

export default function AnimatedCharacterTrait({
  icon: Icon,
  title,
  description,
  color,
  delay = 0,
}: AnimatedCharacterTraitProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setMousePos({ x, y })
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setMousePos({ x: 0, y: 0 })
  }

  const rotationX = isHovered ? (mousePos.y - 100) * 0.1 : 0
  const rotationY = isHovered ? (mousePos.x - 100) * -0.1 : 0

  return (
    <div
      className={`h-full transition-all duration-500 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      style={{
        transform: `perspective(1000px) rotateX(${rotationX}deg) rotateY(${rotationY}deg)`,
      }}
    >
      <Card
        ref={cardRef}
        className={`overflow-hidden border border-border bg-gradient-to-br from-card/80 to-card/40 backdrop-blur hover:shadow-2xl transition-all duration-300 transform ${
          isHovered ? "scale-105" : "scale-100"
        } hover:border-neonRed/50 group cursor-pointer h-full`}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <CardContent className="p-6 flex flex-col items-center text-center h-full">
          <div
            className={`p-4 rounded-full mb-4 ${color} transition-all duration-300 group-hover:scale-125 shadow-lg relative`}
          >
            <div className="absolute inset-0 rounded-full bg-current opacity-20 blur-xl animate-pulse" />
            <Icon className="h-8 w-8 relative z-10" />
          </div>

          <h3 className={`font-bold text-xl mb-2 ${color} transition-colors duration-300 group-hover:scale-110`}>
            {title}
          </h3>
          <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300 flex-grow">
            {description}
          </p>

          <div className="w-0 h-1 bg-gradient-to-r from-neonRed to-neonBlue group-hover:w-12 transition-all duration-300 mt-4 rounded-full" />
        </CardContent>
      </Card>
    </div>
  )
}
