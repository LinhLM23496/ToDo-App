import { STORAGE_KEY, Storage } from 'stores/storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { DailyTasksState, TasksState } from './types'
import { formatDate, formatDay, formatDayOfWeek } from 'lib'
import { useMemo } from 'react'
import moment, { Moment } from 'moment'

export const useOnceTasksStore = create<TasksState>()(
  persist(
    (set) => ({
      tasks: {},
      setTask(value) {
        const key = formatDate(value.startTime)
        set((state) => ({
          tasks: {
            ...state.tasks,
            [key]: [value, ...(state.tasks[key] ?? [])]
          }
        }))
      },
      setWeeklyTask(value) {
        const key = formatDayOfWeek(value.startTime)
        set((state) => ({
          tasks: {
            ...state.tasks,
            [key]: [value, ...(state.tasks[key] ?? [])]
          }
        }))
      },
      setMonthlyTask(value) {
        const key = formatDay(value.startTime)
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
      updateStatusTask(id, date, status) {
        set((state) => {
          const tasks = { ...state.tasks }
          for (const key in tasks) {
            tasks[key] = tasks[key].map((item) => {
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
      name: STORAGE_KEY.ONCETASKS,
      storage: createJSONStorage(() => Storage)
    }
  )
)

export const useDailyTasksStore = create<DailyTasksState>()(
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
      name: STORAGE_KEY.DAILYTASKS,
      storage: createJSONStorage(() => Storage)
    }
  )
)

export const useTasks = (selectedDate: Moment) => {
  const { tasks } = useOnceTasksStore()
  const { tasks: dailyTasks } = useDailyTasksStore()

  const dataTasks = useMemo(() => {
    const formatDateSelected = formatDate(selectedDate)
    const formatDayOfWeekSelected = formatDayOfWeek(selectedDate)
    const formatDaySelected = formatDay(selectedDate)

    const data = [
      ...(tasks[formatDateSelected] ?? []),
      ...(tasks[formatDayOfWeekSelected] ?? []),
      ...(tasks[formatDaySelected] ?? []),
      ...dailyTasks
    ]
    return data.sort((a, b) => {
      return moment(a.startTime).diff(moment(b.startTime))
    })
  }, [tasks, dailyTasks, selectedDate])

  return dataTasks
}

export const useMarkedDates = () => {
  const { tasks } = useOnceTasksStore()
  const { tasks: dailyTasks } = useDailyTasksStore()

  const getTaskDots = (taskArray: any[]) => {
    return taskArray.flatMap((item) => {
      return item
        ? [
            {
              color: item.color,
              selectedColor: item.color
            }
          ]
        : []
    })
  }

  const markedDates = useMemo(() => {
    return (date: Moment) => {
      const formatDateSelected = formatDate(date)
      const formatDayOfWeekSelected = formatDayOfWeek(date)
      const formatDaySelected = formatDay(date)

      const dots = [
        ...getTaskDots(dailyTasks),
        ...getTaskDots(tasks[formatDateSelected] || []),
        ...getTaskDots(tasks[formatDayOfWeekSelected] || []),
        ...getTaskDots(tasks[formatDaySelected] || [])
      ]

      return { dots }
    }
  }, [dailyTasks.length, tasks])

  return markedDates
}
