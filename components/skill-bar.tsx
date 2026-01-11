"use client"

import { useEffect, useState } from "react"

interface SkillBarProps {
  name: string
  proficiency: number
}

export default function SkillBar({ name, proficiency }: SkillBarProps) {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    // Animate the progress bar after component mounts
    const timer = setTimeout(() => {
      setWidth(proficiency)
    }, 100)

    return () => clearTimeout(timer)
  }, [proficiency])

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-neonRed">{name}</span>
        <span className="text-xs text-gray-400">{proficiency}%</span>
      </div>
      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-neonRed rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${width}%`,
            boxShadow: "0 0 8px #ff003c",
          }}
        ></div>
      </div>
    </div>
  )
}
