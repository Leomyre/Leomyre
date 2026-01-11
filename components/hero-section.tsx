"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/context/language-context"

export default function HeroSection() {
  const { language } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const heroText = {
    en: {
      greeting: "Hello, I'm",
      name: "Léomyre",
      title: "Full Stack Developer",
      subtitle: "Crafting beautiful digital experiences with modern technologies",
    },
    fr: {
      greeting: "Bonjour, je suis",
      name: "Léomyre",
      title: "Développeur Full Stack",
      subtitle: "Créer des expériences numériques magnifiques avec les technologies modernes",
    },
  }

  const text = heroText[language as keyof typeof heroText]

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4">
      <div
        className={`text-center space-y-6 transform transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <p className="text-xl text-neutral-400 font-light tracking-wide">{text.greeting}</p>

        <h1 className="text-7xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-blue-600 animate-pulse">
          {text.name}
        </h1>

        <h2 className="text-3xl md:text-4xl font-semibold text-neutral-200">{text.title}</h2>

        <p className="text-lg text-neutral-500 max-w-2xl mx-auto">{text.subtitle}</p>

        <div className="pt-8 flex gap-4 justify-center">
          <button className="px-8 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-semibold transition-colors">
            View My Work
          </button>
          <button className="px-8 py-3 border border-blue-600 text-blue-600 hover:bg-blue-600/10 rounded-lg font-semibold transition-colors">
            Get in Touch
          </button>
        </div>
      </div>
    </section>
  )
}
