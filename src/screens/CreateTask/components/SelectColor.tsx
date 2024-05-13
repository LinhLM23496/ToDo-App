import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import React from 'react'
import { color, colorRange, iconSize, space } from 'themes'
import { COLORS } from 'lib'

type Props = {
  value: string
  onChange: (value: string) => void
}

const SelectColor = ({ value, onChange }: Props) => {
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
      <Text style={styles.title}>Màu gì?</Text>
      <FlatList
        scrollEnabled={false}
        horizontal
        data={COLORS}
        renderItem={renderColor}
        style={styles.containerColor}
        contentContainerStyle={styles.subContainerColor}
        ListEmptyComponent={<Text>Không có màu</Text>}
      />
    </View>
  )
}

export default SelectColor

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
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
