import { Moment } from 'moment'

export type RepeatType = 'once' | 'daily' | 'weekly' | 'monthly'
export type IconType = 'work' | 'study' | 'exercise' | 'relax' | 'other'

export type TaskType = {
  id: string
  title: string
  startTime: string | Moment
  endTime: string | Moment
  color: string
  repeat: RepeatType
  icon: IconType
  finishTimes: string[]
}

export type TasksState = {
  tasks: {
    [key: string]: TaskType[]
  }
  setTask: (value: TaskType) => void
  setWeeklyTask: (value: TaskType) => void
  setMonthlyTask: (value: TaskType) => void
  updateTask: (value: TaskType) => void
  updateStatusTask: (id: string, date: string, status: boolean) => void
  removeTask: (id: string) => void
  cleanTasks: () => void
}

export type DailyTasksState = {
  tasks: TaskType[]
  setTask: (value: TaskType) => void
  updateTask: (value: TaskType) => void
  updateStatusTask: (id: string, date: string, status: boolean) => void
  removeTask: (id: string) => void
  cleanTasks: () => void
}
