"use client"

import type React from "react"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Github, ExternalLink, ArrowUpRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useRef } from "react"

interface ModernProjectCardProps {
  title: string
  description: string
  image: string
  link: string
  tags: string[]
  translationKey?: string
  t?: (key: string) => string
}

export default function ModernProjectCard({
  title,
  description,
  image,
  link,
  tags,
  translationKey,
  t = (key) => key,
}: ModernProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const displayTitle = translationKey && t ? t(`project.${translationKey}.title`) : title
  const displayDescription = translationKey && t ? t(`project.${translationKey}.description`) : description
  const viewOnGithub = t ? t("project.viewOnGithub") : "View on GitHub"

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    setMousePos({ x, y })
  }

  const { x, y } = mousePos
  const rotationX = (y - 0.5) * 10
  const rotationY = (x - 0.5) * -10

  return (
    <div
      className="h-full transition-all duration-500"
      style={{
        transform: isHovered ? `perspective(1000px) rotateX(${rotationX}deg) rotateY(${rotationY}deg)` : "none",
      }}
    >
      <Card
        ref={cardRef}
        className="overflow-hidden border border-border/50 bg-card/30 backdrop-blur transition-all duration-300 hover:border-neonRed/50 hover:bg-card/60 group h-full flex flex-col shadow-lg hover:shadow-neon"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false)
          setMousePos({ x: 0, y: 0 })
        }}
        onMouseMove={handleMouseMove}
      >
        <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-neonRed/10 to-neonBlue/10">
          <Image
            src={image || "/placeholder.svg"}
            alt={displayTitle}
            fill
            className={`object-cover transition-all duration-500 ${
              isHovered ? "scale-125 blur-sm" : "scale-100 blur-0"
            }`}
          />
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-50"
            }`}
          />

          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ArrowUpRight className="w-6 h-6 text-neonRed animate-bounce" />
          </div>
        </div>

        <CardContent className="p-6 relative z-10 flex-grow">
          <h3 className="font-semibold text-xl mb-2 text-neonRed group-hover:text-neonRed/80 transition-colors duration-300">
            {displayTitle}
          </h3>
          <p className="text-sm text-gray-400 mb-4 group-hover:text-gray-300 transition-colors duration-300">
            {displayDescription}
          </p>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag, idx) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-gradient-to-r from-neonBlue/20 to-neonBlue/10 px-3 py-1 text-xs font-medium text-neonBlue ring-1 ring-inset ring-neonBlue/30 transition-all duration-300 hover:bg-neonBlue/30 hover:ring-neonBlue/60 hover:shadow-lg hover:shadow-neonBlue/20"
                style={{
                  transitionDelay: isHovered ? `${idx * 50}ms` : "0ms",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </CardContent>

        <CardFooter className="p-6 pt-0 flex items-center justify-between">
          <Link
            href={link}
            target="_blank"
            className="inline-flex items-center gap-2 text-sm text-neonRed hover:text-neonRed/80 transition-colors duration-300 group/link"
          >
            <Github className="h-4 w-4 transition-transform group-hover/link:rotate-12" />
            {viewOnGithub}
          </Link>
          <ExternalLink
            className={`h-4 w-4 text-neonRed/50 transition-all duration-300 ${
              isHovered ? "opacity-100 translate-x-1 translate-y-1" : "opacity-0 -translate-x-1 translate-y-1"
            }`}
          />
        </CardFooter>
      </Card>
    </div>
  )
}
