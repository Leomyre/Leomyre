"use client"

import { useEffect, useState } from "react"

interface TypedTextProps {
  text: string
  typingSpeed?: number
  startDelay?: number
  className?: string
  cursorClassName?: string
  showCursor?: boolean
}

export default function TypedText({
  text,
  typingSpeed = 50,
  startDelay = 0,
  className = "",
  cursorClassName = "animate-pulse",
  showCursor = true,
}: TypedTextProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const startTyping = setTimeout(() => {
      setIsTyping(true)
    }, startDelay)

    return () => clearTimeout(startTyping)
  }, [startDelay])

  useEffect(() => {
    if (!isTyping) return

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, typingSpeed)

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, isTyping, text, typingSpeed])

  return (
    <span className={className}>
      {displayedText}
      {showCursor && currentIndex < text.length && (
        <span className={`inline-block w-[2px] h-[1em] bg-neonRed ml-[1px] ${cursorClassName}`}>&nbsp;</span>
      )}
      {showCursor && currentIndex >= text.length && (
        <span className={`inline-block w-[2px] h-[1em] bg-neonRed ml-[1px] ${cursorClassName}`}>&nbsp;</span>
      )}
    </span>
  )
}
