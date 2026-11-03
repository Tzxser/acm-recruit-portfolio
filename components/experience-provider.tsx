'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { MotionConfig, useReducedMotion } from 'motion/react'

type Theme = 'dark' | 'light'
const ExperienceContext = createContext({
  motionEnabled: true,
  toggleMotion: () => {},
  accepted: false,
  setAccepted: (_value: boolean) => {},
  theme: 'dark' as Theme,
  toggleTheme: () => {},
})
export function ExperienceProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion()
  const [paused, setPaused] = useState(false)
  const [accepted, setAccepted] = useState(false)
  const [theme, setTheme] = useState<Theme>('dark')
  const motionEnabled = !reduced && !paused
  useEffect(() => {
    document.documentElement.dataset.motion = motionEnabled ? 'on' : 'off'
    return () => { delete document.documentElement.dataset.motion }
  }, [motionEnabled])
  useEffect(() => {
    setTheme(document.documentElement.classList.contains('light') ? 'light' : 'dark')
  }, [])
  const toggleTheme = () => setTheme(prev => {
    const next: Theme = prev === 'dark' ? 'light' : 'dark'
    const root = document.documentElement
    if (!reduced) {
      root.classList.add('theme-anim')
      window.setTimeout(() => root.classList.remove('theme-anim'), 480)
    }
    root.classList.toggle('dark', next === 'dark')
    root.classList.toggle('light', next === 'light')
    root.style.colorScheme = next
    try { localStorage.setItem('acm-theme', next) } catch {}
    return next
  })
  return <ExperienceContext.Provider value={{ motionEnabled, toggleMotion: () => setPaused(v => !v), accepted, setAccepted, theme, toggleTheme }}>
    <MotionConfig reducedMotion={motionEnabled ? 'user' : 'always'}>{children}</MotionConfig>
  </ExperienceContext.Provider>
}
export const useExperience = () => useContext(ExperienceContext)
