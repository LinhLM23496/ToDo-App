import {
  StackActions,
  CommonActions,
  createNavigationContainerRef
} from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Moment } from 'moment'
import { TaskType } from 'stores/tasks/types'

export type RootStackParamList = {
  Home: undefined
  CreateTask: { data?: TaskType; selectedDate: Moment }
  Setting: undefined
}

export type ScreenProps<
  T extends keyof RootStackParamList = keyof RootStackParamList
> = NativeStackScreenProps<RootStackParamList, T>

type RouteType = keyof RootStackParamList | { name: keyof RootStackParamList }

const logStyle =
  'color: black; font-weight: bold; font-size:12px; background-color: #FFC60F;color: #515E63; padding: 4px; border-radius: 2px'

const navigationRef = createNavigationContainerRef<RootStackParamList>()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const checkEnableNavigate = (name: keyof RootStackParamList, params?: any) => {
  if (!navigationRef?.isReady()) return false

  const { routes } = navigationRef.getState() || {}
  const prevRouteName = routes && routes[routes?.length - 1].name

  if (name === prevRouteName) return false

  return true
}

const parseRoute = (route: RouteType, params?: any) => {
  const name = typeof route === 'string' ? route : route?.name ?? ''
  const enabled = checkEnableNavigate(name, params)

  if (__DEV__ && enabled && name) {
    console.log(`%c${name} \n`, logStyle, params ? params : '')
  }

  return { name, enabled }
}

const navigate = (route: RouteType, params?: any) => {
  const { name, enabled } = parseRoute(route, params)
  if (enabled) {
    navigationRef?.navigate(name, params)
  }
}

const push = (route: RouteType, params?: any) => {
  const { name, enabled } = parseRoute(route, params)
  if (enabled) {
    navigationRef?.dispatch(StackActions.push(name, params))
  }
}

const replace = (route: RouteType, params?: any) => {
  const { name, enabled } = parseRoute(route, params)
  if (enabled) {
    navigationRef?.dispatch(StackActions.replace(name, params))
  }
}

const resetMain = (route: RouteType, params?: any) => {
  const { name, enabled } = parseRoute(route, params)
  if (enabled) {
    navigationRef?.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Main' }, { name, params }]
      })
    )
  }
}

const goBack = () => {
  navigationRef?.dispatch(CommonActions.goBack())
}

const pop = (step: number) => {
  const popAction = StackActions.pop(step)
  navigationRef?.dispatch(popAction)
}

export const getRoute = () => {
  if (!navigationRef?.isReady()) {
    return false
  }

  return navigationRef?.getCurrentRoute()
}

// add other navigation functions that you need and export them

export default {
  goBack,
  push,
  replace,
  resetMain,
  navigate,
  pop,
  getRoute,
  navigationRef
}
