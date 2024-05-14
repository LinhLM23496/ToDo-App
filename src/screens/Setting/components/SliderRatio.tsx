import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { IconRatio, IconRepeat } from 'assets'
import { Row, Text } from 'components'
import Slider from '@react-native-community/slider'
import { useRatioStore, useThemeStore } from 'stores'
import { color, colorRange, iconSize, space } from 'themes'

type Props = {
  onFinishChange: (value: number) => void
}

const SliderRatio = ({ onFinishChange }: Props) => {
  const { ratio } = useRatioStore()
  const { theme } = useThemeStore()
  const [data, setData] = useState(ratio)

  const onSlidingComplete = (value: number) => {
    setData(value)
    onFinishChange(value)
  }
  return (
    <View style={styles.container}>
      <Row justifyContent="space-between" style={styles.title}>
        <Row gap="xxs">
          <IconRatio color={theme} />
          <Text fontWeight="500">Kích cỡ chữ</Text>
        </Row>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onSlidingComplete(1)}
          style={styles.reset}>
          <IconRepeat size={iconSize.s} />
        </TouchableOpacity>
      </Row>
      <Row style={styles.body}>
        <Slider
          style={{ width: '80%', height: 20 }}
          minimumValue={0.7}
          maximumValue={1.5}
          minimumTrackTintColor={theme}
          maximumTrackTintColor={color.black}
          value={data}
          onValueChange={setData}
          onSlidingComplete={onSlidingComplete}
        />
        <Text
          fontWeight="500"
          size="l"
          textAlign="center"
          flex={1}
          ratio={data}>
          Aa
        </Text>
      </Row>
    </View>
  )
}

export default SliderRatio

const styles = StyleSheet.create({
  container: {
    marginTop: space.m,
    gap: space.xxs
  },
  title: {
    marginLeft: space.s
  },
  body: {
    height: iconSize['3xl'],
    borderRadius: space.s,
    borderWidth: 1,
    borderColor: colorRange.gray[400]
  },
  reset: {
    padding: space.s,
    position: 'absolute',
    right: 0,
    top: -space.xs
  }
})
