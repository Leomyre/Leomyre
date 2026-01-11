import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Github } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface ProjectCardProps {
  title: string
  description: string
  image: string
  link: string
  tags: string[]
  translationKey?: string
  t?: (key: string) => string
}

export default function ProjectCard({
  title,
  description,
  image,
  link,
  tags,
  translationKey,
  t = (key) => key, // Valeur par défaut pour t
}: ProjectCardProps) {
  // Si une clé de traduction est fournie et que t est disponible, utiliser les traductions
  const displayTitle = translationKey && t ? t(`project.${translationKey}.title`) : title
  const displayDescription = translationKey && t ? t(`project.${translationKey}.description`) : description
  const viewOnGithub = t ? t("project.viewOnGithub") : "View on GitHub"

  return (
    <Card className="overflow-hidden border border-border bg-card">
      <div className="relative aspect-video">
        <Image
          src={image || "/placeholder.svg"}
          alt={displayTitle}
          fill
          className="object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-xl mb-2 text-neonRed">{displayTitle}</h3>
        <p className="text-sm text-gray-400 mb-4">{displayDescription}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-md bg-neonBlue/10 px-2 py-1 text-xs font-medium text-neonBlue ring-1 ring-inset ring-neonBlue/20"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link
          href={link}
          target="_blank"
          className="inline-flex items-center gap-2 text-sm text-neonRed hover:underline"
        >
          <Github className="h-4 w-4" />
          {viewOnGithub}
        </Link>
      </CardFooter>
    </Card>
  )
}
