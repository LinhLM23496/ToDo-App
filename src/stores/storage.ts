import { objectEmpty } from 'lib'
import { MMKV } from 'react-native-mmkv'
import { StateStorage } from 'zustand/middleware'

const StorageMMKV = new MMKV()

export const Storage: StateStorage = {
  setItem(name: string, value: string) {
    return StorageMMKV.set(name, value)
  },
  getItem(name: string) {
    const value = StorageMMKV.getString(name)
    return value ?? ''
  },
  removeItem(name) {
    return StorageMMKV.delete(name)
  }
}

export const setStorage = (storageKey: string, value: any) => {
  StorageMMKV.set(storageKey, JSON.stringify(value))
}

export const getStorage = (storageKey: string) => {
  if (StorageMMKV.contains(storageKey)) {
    const value = StorageMMKV.getString(storageKey)
    if (!value) return false
    const data = JSON.parse(value)
    // Have object state by Zustand setData create this
    return objectEmpty(data?.state) ? data : data?.state
  }
  return false
}

export const STORAGE_KEY = {
  ONCETASKS: 'todoapp@once-tasks',
  DAILYTASKS: 'todoapp@daily-tasks',
  WEEKLYTASKS: 'todoapp@weekly-tasks',
  MONTHLYTASKS: 'todoapp@monthly-tasks',
  RATIO: 'todoapp@ratio',
  THEME: 'todoapp@theme'
}
