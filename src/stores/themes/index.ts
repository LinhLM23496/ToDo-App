import { STORAGE_KEY, Storage } from 'stores/storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { SizeState, ThemeState } from './types'
import { COLORS_THEME } from 'lib'

const initialRatio = {
  ratio: 1
}

export const useRatioStore = create<SizeState>()(
  persist(
    (set) => ({
      ...initialRatio,
      setRatio: (number) => set({ ratio: number }),
      clearRatio: () => set({ ratio: initialRatio.ratio })
    }),
    {
      name: STORAGE_KEY.RATIO,
      storage: createJSONStorage(() => Storage)
    }
  )
)

const initialTheme = {
  theme: COLORS_THEME[0]
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      ...initialTheme,
      setTheme: (value) => set({ theme: value }),
      clearTheme: () => set({ theme: initialTheme.theme })
    }),
    {
      name: STORAGE_KEY.THEME,
      storage: createJSONStorage(() => Storage)
    }
  )
)
