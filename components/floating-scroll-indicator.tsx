"use client"

import { useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"

export default function FloatingScrollIndicator() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY < 200)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 pointer-events-none">
      <div className="animate-bounce">
        <ChevronDown className="h-6 w-6 text-neonRed/60" />
      </div>
    </div>
  )
}
