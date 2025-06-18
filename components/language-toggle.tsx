"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setLanguage(language === "en" ? "kr" : "en")}
      className="flex items-center gap-2 border-amber-200 text-amber-700 hover:bg-amber-50"
    >
      <Globe className="h-4 w-4" />
      {language === "en" ? "한국어" : "English"}
    </Button>
  )
}
