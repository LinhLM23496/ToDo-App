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
