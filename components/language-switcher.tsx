"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/context/language-context"

interface LanguageSwitcherProps {
  className?: string
}

export default function LanguageSwitcher({ className = "" }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    // Basculer la langue
    const newLanguage = language === "fr" ? "en" : "fr"

    // Stocker dans localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolio-language", newLanguage)
    }

    // Recharger la page
    window.location.reload()
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className={`border-neonBlue text-neonBlue hover:bg-neonBlue/10 font-medium ${className}`}
    >
      {language === "fr" ? "EN" : "FR"}
    </Button>
  )
}
