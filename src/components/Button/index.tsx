import React from 'react'
import { TouchableOpacity, ActivityIndicator, ViewStyle } from 'react-native'
import { IButtonProps } from './types'
import { styles } from './styles'
import { color, colorRange, space } from 'themes'
import { Text } from 'components'

export default function Button(props: IButtonProps) {
  const {
    title,
    onPress,
    variant = 'filled',
    style,
    styleContent,
    disabled,
    loading,
    ElementLeft,
    ElementRight,
    spacing = space.s,
    borderRadius = 100,
    isFullWidth,
    ...rest
  } = props

  const isFull = ['filled', 'split'].includes(variant)
  const isGhost = variant === 'ghost'
  const colorText = disabled
    ? colorRange.gray[100]
    : isFull
    ? color.white
    : color.primary
  const styleConatiner: ViewStyle = {
    borderRadius,
    paddingVertical: spacing,
    paddingHorizontal: title ? space.l : space.s,
    aspectRatio: !title ? 1 : undefined,
    backgroundColor: !isFull
      ? color.white
      : disabled
      ? colorRange.gray[500]
      : color.primary,
    borderColor: isGhost
      ? color.white
      : disabled
      ? colorRange.gray[500]
      : color.primary,
    width: isFullWidth ? '100%' : 'auto'
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.container, styleConatiner, style]}
      disabled={disabled || loading}
      onPress={onPress}
      {...rest}>
      {loading ? (
        <ActivityIndicator
          color={isFull ? color.white : color.primary}
          style={styles.icon}
        />
      ) : ElementLeft ? (
        ElementLeft
      ) : null}
      {title && (
        <Text
          color={colorText}
          textAlign="center"
          fontWeight="600"
          numberOfLines={1}
          style={styleContent}>
          {title}
        </Text>
      )}
      {ElementRight ? ElementRight : null}
    </TouchableOpacity>
  )
}
