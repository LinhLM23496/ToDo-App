import { STORAGE_KEY, Storage } from 'stores/storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { TasksState } from './types'
import moment from 'moment'

export const useTasksStore = create<TasksState>()(
  persist(
    (set) => ({
      tasks: {},
      setTask(value) {
        const { startTime } = value
        const key = moment(startTime).format('YYYY-MM-DD')
        set((state) => ({
          tasks: {
            ...state.tasks,
            [key]: [value, ...(state.tasks[key] ?? [])]
          }
        }))
      },
      updateTask(value) {
        set((state) => {
          const tasks = { ...state.tasks }
          for (const key in tasks) {
            tasks[key] = tasks[key].map((item) => {
              if (item.id === value.id) {
                return value
              }
              return item
            })
          }
          return { tasks }
        })
      },
      updateStatusTask(id) {
        set((state) => {
          const tasks = { ...state.tasks }
          for (const key in tasks) {
            tasks[key] = tasks[key].map((item) => {
              if (item.id === id) {
                return { ...item, isFinished: !item.isFinished }
              }
              return item
            })
          }
          return { tasks }
        })
      },
      removeTask(id) {
        set((state) => {
          const tasks = { ...state.tasks }
          for (const key in tasks) {
            tasks[key] = tasks[key].filter((item) => item.id !== id)
          }
          return { tasks }
        })
      },
      cleanTasks() {
        set({ tasks: {} })
      }
    }),
    {
      name: STORAGE_KEY.TASKS,
      storage: createJSONStorage(() => Storage)
    }
  )
)
