import React from 'react'
import { DarkTheme, NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import NavigationService, { RootStackParamList } from './NavigationService'
import Route from './Route'
import { color } from 'themes'
import { useThemeStore } from 'stores'

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>()

const Main = () => {
  const { theme } = useThemeStore()

  return (
    <NavigationContainer
      ref={NavigationService.navigationRef}
      theme={theme === 'dark' ? DarkTheme : undefined}>
      <Navigator
        initialRouteName={'Home'}
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          contentStyle: {
            backgroundColor: theme === 'dark' ? color.black : color.white
          }
        }}>
        <Screen {...Route.Home} />
        <Screen {...Route.CreateTask} />
      </Navigator>
    </NavigationContainer>
  )
}

export default Main
