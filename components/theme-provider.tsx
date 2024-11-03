"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { useTheme } from "next-themes"

const ThemeProviderContext = createContext<{ theme: string | undefined }>({ theme: undefined })

export function ThemeProvider({
  children,
  ...props
}: {
  children: React.ReactNode
  attribute?: string
  defaultTheme?: string
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
}) {
  const [theme, setTheme] = useState<string>()
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    setTheme(resolvedTheme)
  }, [resolvedTheme])

  return (
    <ThemeProviderContext.Provider value={{ theme }}>
      <div {...props}>{children}</div>
    </ThemeProviderContext.Provider>
  )
}

export const useThemeContext = () => {
  const context = useContext(ThemeProviderContext)
  if (context === undefined)
    throw new Error("useThemeContext must be used within a ThemeProvider")
  return context
}