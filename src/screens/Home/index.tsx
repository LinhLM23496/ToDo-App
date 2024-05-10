import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationService, Route } from 'navigation'
import { IconArrowLeft } from 'assets'

const Home = () => {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <IconArrowLeft />
      <Button
        title="Go to Create"
        onPress={() => {
          NavigationService.push(Route.CreateTask)
        }}
      />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
