'use client'

import { Dispatch, SetStateAction, useContext, useState } from "react";
import { createContext } from "react";

type ThemeContext = {
  theme: 'light' | 'dark',
  setTheme: Dispatch<SetStateAction<ThemeContext['theme']>>
}
export const ThemeContext = createContext<
  ThemeContext | null
>(
  null)
export default function ThemeContextProvider({
  children
}: {
  children: React.ReactNode;
}) {

  const [theme, setTheme] = useState<ThemeContext['theme']>('light' )

  return <ThemeContext.Provider value={{ theme, setTheme }}>
    {children}
  </ThemeContext.Provider>
}

export function useThemeContext() {

  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeContextProvider')
  }

  return context
}