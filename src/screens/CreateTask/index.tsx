import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationService } from 'navigation'

const CreateTask = () => {
  return (
    <View style={styles.container}>
      <Text onPress={NavigationService.goBack}>Home</Text>
      <Text>CreateTask</Text>
    </View>
  )
}

export default CreateTask

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
