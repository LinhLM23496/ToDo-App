import { RepeatType } from 'stores/tasks/types'

export type DataRepeat = {
  value: RepeatType
  label: string
}

export type IFormInput = {
  title: string
  startTime: string
  endTime: string
  color: string
  repeat: DataRepeat
}

export type RenderColorType = {
  item: string
  value: string
  onChange: (value: string) => void
}

export type RenderRepeatType = {
  item: DataRepeat
  value: DataRepeat
  onChange: (value: DataRepeat) => void
}
