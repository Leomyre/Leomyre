"use client"

import { useEffect, useState } from "react"

export default function DebugLanguage() {
  const [language, setLanguage] = useState<string>("")

  useEffect(() => {
    // Sécurité pour s'assurer que localStorage est disponible
    if (typeof window !== "undefined") {
      const storedLang = localStorage.getItem("portfolio-language") || "fr"
      setLanguage(storedLang)

      // Mettre à jour quand localStorage change
      const handleStorageChange = () => {
        setLanguage(localStorage.getItem("portfolio-language") || "fr")
      }

      window.addEventListener("storage", handleStorageChange)
      return () => window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  if (!language) return null

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-2 rounded text-xs z-50">
      Current language: {language}
    </div>
  )
}
