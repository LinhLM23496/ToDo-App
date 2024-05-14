import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import NavigationService, { RootStackParamList } from './NavigationService'
import Route from './Route'

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>()

const Main = () => {
  return (
    <NavigationContainer ref={NavigationService.navigationRef}>
      <Navigator
        initialRouteName={'Home'}
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right'
        }}>
        <Screen {...Route.Home} />
        <Screen {...Route.CreateTask} />
        <Screen {...Route.Setting} />
      </Navigator>
    </NavigationContainer>
  )
}

export default Main
