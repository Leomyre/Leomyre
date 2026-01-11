"use server"

import { cookies } from "next/headers"

export async function submitContactForm(formData: FormData) {
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const name = formData.get("name")
  const email = formData.get("email")
  const message = formData.get("message")

  // Here you would typically send an email or save to a database
  console.log("Form submission:", { name, email, message })

  // Get the current language from cookies
  const cookieStore = cookies()
  const language = cookieStore.get("language")?.value || "fr"

  return {
    message:
      language === "fr"
        ? "Merci pour votre message ! Je vous répondrai bientôt."
        : "Thanks for your message! I'll get back to you soon.",
  }
}
