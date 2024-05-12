export type TaskType = {
  id: string
  title: string
  startTime: string
  endTime: string
  color: string
  repeat: string
  icon: string
  isFinished: boolean
}

export type TasksState = {
  tasks: {
    [key: string]: TaskType[]
  }
  setTask: (value: TaskType) => void
  updateTask: (value: TaskType) => void
  updateStatusTask: (id: string) => void
  removeTask: (id: string) => void
  cleanTasks: () => void
}
