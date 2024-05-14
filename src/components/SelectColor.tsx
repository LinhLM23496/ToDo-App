import {
  FlatList,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native'
import React, { ReactNode } from 'react'
import { color, colorRange, iconSize, space } from 'themes'
import { COLORS } from 'lib'
import { Text } from 'components'

type Props = {
  Label?: ReactNode
  data?: string[]
  value: string
  onChange: (value: string) => void
  style?: StyleProp<ViewStyle>
}

const SelectColor = ({ Label, data, value, onChange, style }: Props) => {
  const renderColor = ({ item }: { item: string }) => {
    const isActive = item === value

    const handleSelect = () => {
      onChange(item)
    }
    return (
      <TouchableOpacity
        onPress={handleSelect}
        activeOpacity={0.8}
        key={item}
        style={styles.itemColor}>
        <View
          style={[
            styles.subItemColor,
            {
              borderColor: isActive ? item : color.transparent
            }
          ]}>
          <View
            style={[
              styles.color,
              {
                backgroundColor: item
              }
            ]}
          />
        </View>
      </TouchableOpacity>
    )
  }
  return (
    <View>
      <View style={styles.title}>
        {Label || <Text fontWeight="bold">Màu gì?</Text>}
      </View>
      <FlatList
        scrollEnabled={false}
        horizontal
        data={data ?? COLORS}
        renderItem={renderColor}
        style={[styles.containerColor, style]}
        contentContainerStyle={styles.subContainerColor}
      />
    </View>
  )
}

export default SelectColor

const styles = StyleSheet.create({
  title: {
    marginLeft: space.s,
    marginBottom: space.xxs
  },
  subContainerColor: {
    flex: 1,
    justifyContent: 'center',
    gap: space.m
  },
  containerColor: {
    borderRadius: space.xs,
    backgroundColor: colorRange.gray[100]
  },
  itemColor: {
    paddingVertical: space.xs
  },
  subItemColor: {
    borderRadius: 100,
    borderWidth: 2
  },
  color: {
    height: iconSize.s,
    width: 'auto',
    aspectRatio: 1,
    borderRadius: 100,
    margin: 2
  }
})
