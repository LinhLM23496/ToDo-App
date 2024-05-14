import { DataRepeat } from 'screens/CreateTask/types'
import { ThemeType } from 'stores/themes/types'

export const COLORS = [
  '#CD3645',
  '#3369C4',
  '#CE9F40',
  '#678983',
  '#3F979B',
  '#6F1AB6'
]

export const COLORS_THEME: ThemeType[] = [
  '#f3c300',
  '#dd2423',
  '#a856dc',
  '#ff8da1',
  '#3F979B',
  '#51cc56',
  '#46BFF8'
]

export const DATA_REPEAT: DataRepeat[] = [
  { value: 'once', label: 'Một lần' },
  { value: 'daily', label: 'Hàng ngày' },
  { value: 'weekly', label: 'Hàng tuần' },
  { value: 'monthly', label: 'Hàng tháng' }
]
