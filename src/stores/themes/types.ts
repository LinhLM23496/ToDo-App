export type SizeState = {
  ratio: number
  setRatio: (number: number) => void
  clearRatio: () => void
}

export type ThemeType =
  | '#f3c300'
  | '#dd2423'
  | '#a856dc'
  | '#ff8da1'
  | '#3F979B'
  | '#51cc56'
  | '#46BFF8'

export type ThemeState = {
  theme: ThemeType
  setTheme: (value: ThemeType) => void
  clearTheme: () => void
}
