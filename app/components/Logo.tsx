'use client'

import { useContext } from "react"
import { ThemeContext, useThemeContext } from "../context/ThemeContext"

export default function Logo(){
  const {theme, setTheme} = useThemeContext()
  return <div>Logo</div>
}