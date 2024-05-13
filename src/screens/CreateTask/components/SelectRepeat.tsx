import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Text } from 'components'
import { DATA_REPEAT } from 'lib'
import { DataRepeat } from '../types'
import { color, colorRange, space } from 'themes'

type Props = {
  value: DataRepeat
  onChange: (value: DataRepeat) => void
}

const SelectRepeat = ({ value, onChange }: Props) => {
  const renderRepeat = ({ item }: { item: DataRepeat }) => {
    const isActive = item.value === value.value

    const handleSelect = () => {
      onChange(item)
    }
    return (
      <TouchableOpacity
        key={item.value}
        activeOpacity={0.8}
        onPress={handleSelect}
        style={[
          styles.itemRepeat,
          { backgroundColor: isActive ? color.info : color.transparent }
        ]}>
        <Text fontWeight="500" color={isActive ? color.white : color.black}>
          {item.label}
        </Text>
      </TouchableOpacity>
    )
  }
  return (
    <View>
      <Text style={styles.title}>Thường xuyên thế nào?</Text>
      <FlatList
        scrollEnabled={false}
        horizontal
        data={DATA_REPEAT}
        renderItem={renderRepeat}
        style={styles.repeat}
        contentContainerStyle={styles.subRepeat}
      />
    </View>
  )
}

export default SelectRepeat

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    marginLeft: space.s,
    marginBottom: space.xxs
  },
  repeat: {
    borderRadius: space.xs,
    backgroundColor: colorRange.gray[100]
  },
  subRepeat: {
    flex: 1,
    justifyContent: 'space-between'
  },
  itemRepeat: {
    padding: space.s,
    borderRadius: space.xs,
    backgroundColor: colorRange.info[100]
  }
})
