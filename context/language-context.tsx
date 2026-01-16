"use client"

import { createContext, useContext, useState, type ReactNode, useEffect } from "react"

type Language = "fr" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

// Create translations object
const translations = {
  en: {
    "nav.about": "About",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "button.downloadCV": "Download CV",
    "intro.hello": "Hello, I am Léomyre",
    "intro.bio":
      "A developer passionate about modern technologies and creating web applications. I love taking on technical challenges and learning new skills every day.",
    "section.character": "My Character",
    "section.projects": "Latest Projects",
    "section.techStack": "Tech Stack",
    "section.getInTouch": "Get in Touch",
    "contact.name": "Name",
    "contact.email": "Email",
    "contact.message": "Message",
    "contact.send": "Send Message",
    "contact.sending": "Sending...",
    "footer.rights": "All rights reserved.",
    "footer.terms": "Terms of Service",
    "footer.privacy": "Privacy",

    // Nouvelles traductions pour les projets
    "project.portfolio.title": "Portfolio",
    "project.portfolio.description":
      "This portfolio was created to showcase my skills and some of my ongoing development projects.",
    "project.chika.title": "Chika-chat",
    "project.chika.description":
      "Chika-chat is a lightweight and ephemeral messaging web application. It is secure, easy to use, and designed for seamless communication.",
    "project.event.title": "Event Platform",
    "project.event.description": "This platform allows organizers to announce and manage the events they organize.",
    "project.viewOnGithub": "View",

    // Traductions pour les caractéristiques
    "character.dynamic.title": "Dynamic",
    "character.dynamic.description": "Always ready to take on new challenges with energy and enthusiasm.",
    "character.creative.title": "Creative",
    "character.creative.description": "Turning ideas into concrete solutions to meet specific needs.",
    "character.resultOriented.title": "Result-Oriented",
    "character.resultOriented.description": "An analytical mind, always focused on practical and effective solutions.",
    "character.empathetic.title": "Empathetic",
    "character.empathetic.description": "Understanding others' needs and collaborating effectively within a team.",

    // Messages du formulaire de contact
    "contact.success": "Thanks for your message! I'll get back to you soon.",
    "contact.error": "Something went wrong. Please try again.",
  },
  fr: {
    "nav.about": "À propos",
    "nav.projects": "Projets",
    "nav.contact": "Contact",
    "button.downloadCV": "Télécharger CV",
    "intro.hello": "Bonjour, je suis Léomyre",
    "intro.bio":
      "Un développeur passionné par les technologies modernes et la création d'applications web. J'aime relever des défis techniques et apprendre de nouvelles compétences chaque jour.",
    "section.character": "Mon Caractère",
    "section.projects": "Projets Récents",
    "section.techStack": "Compétences Techniques",
    "section.getInTouch": "Me Contacter",
    "contact.name": "Nom",
    "contact.email": "Email",
    "contact.message": "Message",
    "contact.send": "Envoyer",
    "contact.sending": "Envoi en cours...",
    "footer.rights": "Tous droits réservés.",
    "footer.terms": "Conditions d'utilisation",
    "footer.privacy": "Confidentialité",

    // Nouvelles traductions pour les projets
    "project.portfolio.title": "Portfolio",
    "project.portfolio.description":
      "Ce portfolio a été créé pour présenter mes compétences et certains de mes projets de développement en cours.",
    "project.chika.title": "Chika-chat",
    "project.chika.description":
      "Chika-chat est une application web de messagerie légère et éphémère. Elle est sécurisée, facile à utiliser et conçue pour une communication fluide.",
    "project.event.title": "Plateforme d'Événements",
    "project.event.description":
      "Cette plateforme permet aux organisateurs d'annoncer et de gérer les événements qu'ils organisent.",
    "project.viewOnGithub": "Regarder",

    // Traductions pour les caractéristiques
    "character.dynamic.title": "Dynamique",
    "character.dynamic.description": "Toujours prêt à relever de nouveaux défis avec énergie et enthousiasme.",
    "character.creative.title": "Créatif",
    "character.creative.description":
      "Transformer des idées en solutions concrètes pour répondre à des besoins spécifiques.",
    "character.resultOriented.title": "Orienté Résultats",
    "character.resultOriented.description":
      "Un esprit analytique, toujours concentré sur des solutions pratiques et efficaces.",
    "character.empathetic.title": "Empathique",
    "character.empathetic.description":
      "Comprendre les besoins des autres et collaborer efficacement au sein d'une équipe.",

    // Messages du formulaire de contact
    "contact.success": "Merci pour votre message ! Je vous répondrai bientôt.",
    "contact.error": "Une erreur s'est produite. Veuillez réessayer.",
  },
}

// Valeur par défaut pour le contexte
const defaultContextValue: LanguageContextType = {
  language: "fr",
  setLanguage: () => {},
  t: (key) => key,
}

const LanguageContext = createContext<LanguageContextType>(defaultContextValue)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("fr")
  const [mounted, setMounted] = useState(false)

  // Fonction pour obtenir la langue depuis localStorage
  const getStoredLanguage = (): Language => {
    if (typeof window !== "undefined") {
      const storedLang = localStorage.getItem("portfolio-language")
      if (storedLang === "en" || storedLang === "fr") {
        return storedLang
      }
    }
    return "fr" // Langue par défaut
  }

  // Translation function
  const t = (key: string): string => {
    if (!translations[language] || !translations[language][key as keyof (typeof translations)[typeof language]]) {
      return key
    }
    return translations[language][key as keyof (typeof translations)[typeof language]]
  }

  // Initialiser la langue à partir de localStorage côté client
  useEffect(() => {
    const savedLanguage = getStoredLanguage()
    setLanguage(savedLanguage)
    setMounted(true)
  }, [])

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  return context
}
