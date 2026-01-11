import { Cog, Heart, Lightbulb, Rocket } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface CharacterTrait {
  icon: string
  title: string
  description: string
  color: string
  translationKey: string
}

interface CharacterTraitsProps {
  t?: (key: string) => string
}

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case "FaRocket":
      return Rocket
    case "FaLightbulb":
      return Lightbulb
    case "FaCogs":
      return Cog
    case "FaHeart":
      return Heart
    default:
      return Rocket
  }
}

const caractereData = [
  {
    icon: "FaRocket",
    title: "Dynamic",
    description: "Always ready to take on new challenges with energy and enthusiasm.",
    color: "text-neonRed",
    translationKey: "dynamic",
  },
  {
    icon: "FaLightbulb",
    title: "Creative",
    description: "Turning ideas into concrete solutions to meet specific needs.",
    color: "text-yellow-500",
    translationKey: "creative",
  },
  {
    icon: "FaCogs",
    title: "Result-Oriented",
    description: "An analytical mind, always focused on practical and effective solutions.",
    color: "text-neonBlue",
    translationKey: "resultOriented",
  },
  {
    icon: "FaHeart",
    title: "Empathetic",
    description: "Understanding others' needs and collaborating effectively within a team.",
    color: "text-pink-500",
    translationKey: "empathetic",
  },
]

export default function CharacterTraits({ t = (key) => key }: CharacterTraitsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {caractereData.map((trait, index) => {
        const IconComponent = getIconComponent(trait.icon)
        const title = t ? t(`character.${trait.translationKey}.title`) : trait.title
        const description = t ? t(`character.${trait.translationKey}.description`) : trait.description

        return (
          <Card
            key={index}
            className="overflow-hidden border border-border bg-card hover:shadow-neon transition-all duration-300"
          >
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div
                className={`p-3 rounded-full mb-4 ${trait.color === "text-neonRed" ? "text-neonRed" : trait.color === "text-neonBlue" ? "text-neonBlue" : trait.color}`}
              >
                <IconComponent className="h-8 w-8" />
              </div>
              <h3
                className={`font-bold text-xl mb-2 ${trait.color === "text-neonRed" ? "text-neonRed" : trait.color === "text-neonBlue" ? "text-neonBlue" : trait.color}`}
              >
                {title}
              </h3>
              <p className="text-gray-400 text-sm">{description}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
