import { STORAGE_KEY, Storage } from 'stores/storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { TasksState } from './types'
import { formatDate, formatDay, formatDayOfWeek } from 'lib'
import { useMemo } from 'react'
import moment, { Moment } from 'moment'

export const useTasksStore = create<TasksState>()(
  persist(
    (set) => ({
      tasks: [],
      setTask(value) {
        set((state) => ({
          tasks: [value, ...state.tasks]
        }))
      },
      updateTask(value) {
        set((state) => {
          const tasks = state.tasks.map((item) => {
            if (item.id === value.id) {
              return value
            }
            return item
          })
          return { tasks }
        })
      },
      updateStatusTask(id, date, status) {
        set((state) => {
          const tasks = state.tasks.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                finishTimes: status
                  ? item.finishTimes?.filter((i) => i !== date)
                  : [...item.finishTimes, date]
              }
            }
            return item
          })
          return { tasks }
        })
      },
      removeTask(id) {
        set((state) => ({
          tasks: state.tasks.filter((item) => item.id !== id)
        }))
      },
      cleanTasks() {
        set({ tasks: [] })
      }
    }),
    {
      name: STORAGE_KEY.TASKS,
      storage: createJSONStorage(() => Storage)
    }
  )
)

export const useTasks = (selectedDate: Moment) => {
  const { tasks } = useTasksStore()

  const dataTasks = useMemo(() => {
    const formatDateSelected = formatDate(selectedDate)
    const formatDayOfWeekSelected = formatDayOfWeek(selectedDate)
    const formatDaySelected = formatDay(selectedDate)

    const filteredTasks = tasks.filter((task) => {
      switch (task.repeat) {
        case 'daily':
          return true
        case 'once':
          return formatDate(task.startTime) === formatDateSelected
        case 'weekly':
          return formatDayOfWeek(task.startTime) === formatDayOfWeekSelected
        case 'monthly':
          return formatDay(task.startTime) === formatDaySelected
        default:
          return false
      }
    })

    return filteredTasks.sort((a, b) =>
      moment(a.startTime).diff(moment(b.startTime))
    )
  }, [tasks, selectedDate])

  return dataTasks
}

export const useMarkedDates = () => {
  const { tasks } = useTasksStore()

  const markedDates = useMemo(() => {
    return (date: Moment) => {
      const formatDayOfWeekSelected = formatDayOfWeek(date)
      const formatDaySelected = formatDay(date)

      const dots = tasks.flatMap((task) => {
        switch (task.repeat) {
          case 'daily':
            return [{ color: task.color, selectedColor: task.color }]
          case 'once':
            if (moment(task.startTime).isSame(date, 'day')) {
              return [{ color: task.color, selectedColor: task.color }]
            }
            return []
          case 'weekly':
            if (formatDayOfWeek(task.startTime) === formatDayOfWeekSelected) {
              return [{ color: task.color, selectedColor: task.color }]
            }
            return []
          case 'monthly':
            if (formatDay(task.startTime) === formatDaySelected) {
              return [{ color: task.color, selectedColor: task.color }]
            }
            return []
          default:
            return []
        }
      })

      return { dots: dots.slice(0, 4) }
    }
  }, [tasks])

  return markedDates
}
