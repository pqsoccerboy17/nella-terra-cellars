import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'ntc-theme'
const MEDIA_QUERY = '(prefers-color-scheme: dark)'

function resolveEffective(pref) {
  if (pref === 'system') {
    return window.matchMedia(MEDIA_QUERY).matches ? 'dark' : 'light'
  }
  return pref
}

export default function useTheme() {
  const [preference, setPreference] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) || 'dark'
  })

  const theme = resolveEffective(preference)

  useEffect(() => {
    const root = document.documentElement
    const effective = resolveEffective(preference)

    if (effective === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem(STORAGE_KEY, preference)

    if (preference === 'system') {
      const mql = window.matchMedia(MEDIA_QUERY)
      const handler = (e) => {
        if (e.matches) {
          root.classList.add('dark')
        } else {
          root.classList.remove('dark')
        }
      }
      mql.addEventListener('change', handler)
      return () => mql.removeEventListener('change', handler)
    }
  }, [preference])

  const cycleTheme = useCallback(() => {
    setPreference(prev => {
      if (prev === 'dark') return 'light'
      if (prev === 'light') return 'system'
      return 'dark'
    })
  }, [])

  return { preference, theme, cycleTheme }
}
