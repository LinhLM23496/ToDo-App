import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useMemo, useState } from 'react'
import { color, colorRange, space } from 'themes'
import { Text } from 'components'
import { useThemeStore } from 'stores'
import moment from 'moment'

type Props = {
  startTime: string
  onChange: (value: number) => void
}

const convertIndexToTime = (index: number) => {
  if (index <= 0) {
    return '1p'
  }

  if (index < 4) {
    return index * 15 + 'p'
  } else {
    let hours = Math.floor(index / 4)
    let minutes = (index % 4) * 15
    if (minutes === 0) {
      return hours + 'h'
    } else {
      return hours + 'h' + minutes + 'p'
    }
  }
}

const TimePicker = ({ startTime, onChange }: Props) => {
  const [select, setSelect] = useState(1)
  const { theme } = useThemeStore()

  const diffTime = useMemo(() => {
    const diff = moment(startTime).endOf('date').diff(startTime, 'minutes')
    return Math.floor(diff / 15)
  }, [startTime])

  const renderTime = ({ index }: { index: number }) => {
    const isActive = index === select

    const handleSelected = () => {
      setSelect(index)
      onChange(!index ? 1 : index * 15)
    }
    return (
      <TouchableOpacity
        key={index}
        activeOpacity={0.8}
        onPress={handleSelected}
        style={[
          styles.item,
          {
            backgroundColor: isActive ? theme : color.transparent
          }
        ]}>
        <Text>{convertIndexToTime(index)}</Text>
      </TouchableOpacity>
    )
  }
  return (
    <View>
      <Text style={styles.title}>Kéo dài?</Text>
      <View style={styles.body}>
        <FlatList
          extraData={startTime}
          horizontal
          data={new Array(!diffTime ? 1 : diffTime).fill(0)}
          renderItem={renderTime}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  )
}

export default TimePicker

const styles = StyleSheet.create({
  body: {
    backgroundColor: colorRange.gray[100],
    borderRadius: space.s
  },
  title: {
    fontWeight: 'bold',
    marginLeft: space.s,
    marginBottom: space.xxs
  },
  item: {
    padding: space.m,
    borderRadius: space.s
  }
})
