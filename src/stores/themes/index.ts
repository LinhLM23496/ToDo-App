import { STORAGE_KEY, Storage } from 'stores/storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { SizeState, ThemeState, ThemeSwitchType, ThemeType } from './types'

const initialRatio = {
  ratio: 1
}

export const useRatioStore = create<SizeState>()(
  persist(
    (set) => ({
      ...initialRatio,
      setRatio: (number) => set({ ratio: number })
    }),
    {
      name: STORAGE_KEY.RATIO,
      storage: createJSONStorage(() => Storage)
    }
  )
)

const initialTheme = {
  theme: 'light' as ThemeType,
  themeSwitch: 'light' as ThemeSwitchType
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      ...initialTheme,
      setTheme: (value) => set({ theme: value }),
      setThemeSwitch: (value) => set({ themeSwitch: value })
    }),
    {
      name: STORAGE_KEY.THEME,
      storage: createJSONStorage(() => Storage)
    }
  )
)
