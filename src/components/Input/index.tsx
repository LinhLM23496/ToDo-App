import { StyleSheet, TextInput, View } from 'react-native'
import React, { forwardRef } from 'react'
import { Row, Text } from 'components'
import { color, colorRange, iconSize, space } from 'themes'
import { InputProps, InputRef } from './types'
import { useThemeStore } from 'stores'
import { IconInformation } from 'assets'

const Input = forwardRef((props: InputProps, ref: InputRef) => {
  const {
    label,
    labelProps,
    labelStyle,
    contentStyle,
    style,
    inputStyle,
    ElementLeft,
    ElementRight,
    notice,
    noticeColor = color.danger,
    noticeStyle,
    maxLength,
    multiline,
    ...rest
  } = props

  const { theme } = useThemeStore()

  return (
    <View style={[styles.container, style]}>
      {label ? (
        <Text
          fontWeight="600"
          style={[styles.label, labelStyle]}
          {...labelProps}>
          {label}
        </Text>
      ) : null}
      <Row
        style={[
          styles.content,
          {
            backgroundColor:
              theme === 'dark' ? colorRange.gray[400] : colorRange.gray[100],
            alignItems: multiline ? 'flex-start' : 'center'
          },
          contentStyle
        ]}>
        {ElementLeft ? ElementLeft : null}
        <TextInput
          ref={ref}
          multiline={multiline}
          numberOfLines={multiline ? 5 : 1}
          {...rest}
          textAlignVertical={multiline ? 'top' : 'center'}
          maxLength={maxLength}
          style={[
            styles.inputStyle,
            { paddingVertical: multiline ? space.xxs : 0 },
            inputStyle
          ]}
        />
        {ElementRight ? ElementRight : null}
      </Row>
      {notice ? (
        <Row gap={'xxs'}>
          <IconInformation size={iconSize.s} color={color.danger} />
          <Text
            size="s"
            color={noticeColor}
            fontWeight="500"
            style={noticeStyle}>
            {notice}
          </Text>
        </Row>
      ) : null}
    </View>
  )
})

export default Input

const styles = StyleSheet.create({
  container: {
    gap: space.xxs
  },
  label: {
    marginLeft: space.s
  },
  content: {
    paddingHorizontal: space.xxs,
    paddingVertical: space.xxs,
    borderRadius: space.xs
  },
  inputStyle: {
    flex: 1
  },
  notice: {
    marginLeft: space.s
  },
  iconRight: {
    paddingLeft: space.s
  }
})
