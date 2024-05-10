import { RootStackParamList } from './NavigationService'
import Home from 'screens/Home'
import CreateTask from 'screens/CreateTask'

type RouteConfig = {
  [key in keyof RootStackParamList]: {
    name: key
    component: React.ComponentType<any>
  }
}

const Route: RouteConfig = {
  Home: {
    name: 'Home',
    component: Home
  },
  CreateTask: {
    name: 'CreateTask',
    component: CreateTask
  }
}
export default Route
