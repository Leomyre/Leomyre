"use client"

import { Card } from "@/components/ui/card"
import { useEffect, useState } from "react"
import SkillBar from "./skill-bar"

interface Skill {
  name: string
  proficiency: number // 0-100
}

interface TechCategory {
  category: string
  skills: Skill[]
}

const technologies: TechCategory[] = [
  {
    category: "Frontend",
    skills: [
/*       { name: "React", proficiency: 85 }, */
      { name: "Next.js", proficiency: 80 },
/*       { name: "TypeScript", proficiency: 75 }, */
      { name: "TailwindCSS", proficiency: 90 },
/*       { name: "Redux", proficiency: 70 },
      { name: "GraphQL", proficiency: 65 }, */
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Laravel", proficiency: 80 },
/*       { name: "Express", proficiency: 75 }, */
      { name: "Python", proficiency: 90 },
      { name: "Django", proficiency: 70 },
      { name: "PostgreSQL", proficiency: 65 },
/*       { name: "MongoDB", proficiency: 60 }, */
    ],
  },
/*   {
    category: "DevOps",
    skills: [
      { name: "Docker", proficiency: 70 },
      { name: "AWS", proficiency: 65 },
      { name: "CI/CD", proficiency: 60 },
      { name: "Git", proficiency: 85 },
      { name: "Linux", proficiency: 75 },
      { name: "Nginx", proficiency: 60 },
    ],
  }, */
  {
    category: "Languages",
    skills: [
      { name: "JavaScript", proficiency: 80 },
      { name: "Python", proficiency: 85 },
      { name: "PHP", proficiency: 80 },
      /* { name: "TypeScript", proficiency: 75 }, */
      { name: "SQL", proficiency: 70 },
      { name: "HTML/CSS", proficiency: 95 },
    ],
  },
]

export default function TechStack() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {technologies.map((tech) => (
        <Card key={tech.category} className="p-6 border border-border bg-card">
          <h3 className="text-lg font-semibold mb-6 text-neonBlue">{tech.category}</h3>
          <div className="space-y-4">
            {tech.skills.map((skill) => (
              <SkillBar key={skill.name} name={skill.name} proficiency={isVisible ? skill.proficiency : 0} />
            ))}
          </div>
        </Card>
      ))}
    </div>
  )
}
