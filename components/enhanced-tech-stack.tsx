"use client"

import { Card } from "@/components/ui/card"
import { useEffect, useState } from "react"
import SkillBar from "./skill-bar"

interface Skill {
  name: string
  proficiency: number
}

interface TechCategory {
  category: string
  skills: Skill[]
  color: string
  icon?: string
}

const technologies: TechCategory[] = [
  {
    category: "Frontend",
    color: "from-neonRed/20 to-neonRed/5",
    icon: "🎨",
    skills: [
      { name: "Next.js", proficiency: 80 },
      { name: "TailwindCSS", proficiency: 90 },
    ],
  },
  {
    category: "Backend",
    color: "from-neonBlue/20 to-neonBlue/5",
    icon: "⚙️",
    skills: [
      { name: "Laravel", proficiency: 80 },
      { name: "Python", proficiency: 90 },
      { name: "Django", proficiency: 70 },
      { name: "PostgreSQL", proficiency: 65 },
    ],
  },
  {
    category: "Languages",
    color: "from-yellow-500/20 to-yellow-500/5",
    icon: "💻",
    skills: [
      { name: "JavaScript", proficiency: 80 },
      { name: "Python", proficiency: 85 },
      { name: "PHP", proficiency: 80 },
      { name: "SQL", proficiency: 70 },
      { name: "HTML/CSS", proficiency: 95 },
    ],
  },
]

export default function EnhancedTechStack() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {technologies.map((tech, index) => (
        <Card
          key={tech.category}
          className={`p-6 border border-border/50 bg-gradient-to-br ${tech.color} backdrop-blur transition-all duration-500 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          } ${
            hoveredIndex === index
              ? "border-border hover:shadow-neon scale-105"
              : hoveredIndex !== null
                ? "opacity-60 scale-95"
                : "hover:border-border hover:shadow-lg"
          } group cursor-pointer`}
          style={{ transitionDelay: `${index * 100}ms` }}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">{tech.icon}</span>
            <h3 className="text-lg font-semibold text-neonBlue group-hover:text-neonRed transition-colors duration-300">
              {tech.category}
            </h3>
          </div>

          <div className="space-y-4">
            {tech.skills.map((skill, skillIdx) => (
              <div
                key={skill.name}
                className="transition-all duration-300"
                style={{
                  opacity: hoveredIndex === index ? 1 : 0.7,
                  transform: hoveredIndex === index ? `translateX(0)` : "translateX(-4px)",
                  transitionDelay: `${skillIdx * 30}ms`,
                }}
              >
                <SkillBar name={skill.name} proficiency={isVisible ? skill.proficiency : 0} />
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  )
}
