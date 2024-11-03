"use client"

import { ThemeProvider as NextThemeProvider } from "next-themes"
import { ThemeProvider } from "@/components/theme-provider"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ThemeProvider>{children}</ThemeProvider>
    </NextThemeProvider>
  )
}