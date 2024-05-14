import React, { LegacyRef, forwardRef, useMemo } from 'react'
import { Text as RNText, StyleProp, TextStyle } from 'react-native'
import { TextPropsType } from './types'
import { fontSize as FontSize } from 'themes'

const Text = forwardRef((props: TextPropsType, ref?: LegacyRef<RNText>) => {
  const {
    children,
    fontWeight,
    textAlign,
    size,
    ratio = 1,
    opacity = 1,
    style: styleContainer,
    flex,
    textDecorationLine,
    ...rest
  } = props

  const mergeStyles: StyleProp<TextStyle> = useMemo(() => {
    if (!Array.isArray(styleContainer)) {
      return styleContainer
    }
    const mergedStyle = {}
    styleContainer.forEach((style) => {
      if (style) {
        Object.assign(mergedStyle, style)
      }
    })

    return mergedStyle
  }, [styleContainer])

  const textSize = (mergeStyles?.fontSize || FontSize?.[size ?? 'm']) * ratio

  return (
    <RNText
      ref={ref}
      {...rest}
      style={[
        {
          flex: flex || undefined,
          fontSize: textSize,
          fontWeight,
          textAlign,
          opacity,
          color: props?.color,
          lineHeight: lineHeight(textSize),
          textDecorationLine: textDecorationLine || 'none'
        },
        mergeStyles
      ]}>
      {children}
    </RNText>
  )
})

export default Text

const lineHeight = (size: number) => Number(size * 1.4)
