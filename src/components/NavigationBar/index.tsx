import React, { FC, useCallback } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'components'
import { space, fontSize as FontSize, color } from 'themes'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { NavigationService } from 'navigation'
import { NavigationBarProps } from './types'
import { IconArrowLeft } from 'assets'

const NavigationBar: FC<NavigationBarProps> = (props) => {
  const {
    style: containerStyle,
    onBackPress,
    title = '',
    subTitle,
    subTitleStyle,
    ElementLeft,
    ElementRight,
    buttonStyle,
    hideBack = false,
    titleStyle,
    numberOfLines = 1,
    backgroundColor,
    fontSize = 'l',
    adjustsFontSizeToFit,
    absolute,
    onPressTitle,
    transparent
  } = props

  const { top } = useSafeAreaInsets()
  const renderTitle = useCallback(() => {
    switch (typeof title) {
      case 'string':
        return (
          <Text
            adjustsFontSizeToFit={adjustsFontSizeToFit}
            numberOfLines={numberOfLines}
            size={fontSize}
            type="title"
            onPress={onPressTitle}
            style={[styles.title, titleStyle]}>
            {title}
          </Text>
        )
      case 'function':
        return title()
      default:
        return null
    }
  }, [
    adjustsFontSizeToFit,
    fontSize,
    numberOfLines,
    onPressTitle,
    title,
    titleStyle
  ])

  return (
    <View
      style={[
        styles.container,
        { backgroundColor, paddingTop: top + space.s },
        containerStyle,
        absolute ? styles.absolute : {},
        transparent ? styles.transparent : {}
      ]}>
      <View style={styles.accessory}>
        {ElementLeft ? (
          ElementLeft
        ) : !hideBack ? (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onBackPress ?? NavigationService.goBack}
            style={[styles.buttonAccessory, buttonStyle]}>
            <IconArrowLeft />
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={styles.center}>
        {renderTitle()}
        {subTitle ? (
          <Text
            type="subTitle"
            numberOfLines={1}
            style={[styles.subTitle, subTitleStyle]}>
            {subTitle}
          </Text>
        ) : null}
      </View>

      <View style={[styles.accessory, styles.accessoryRight]}>
        {ElementRight ? ElementRight : undefined}
      </View>
    </View>
  )
}

export default NavigationBar

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: space.s
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center'
  },
  accessory: {
    flex: 3
  },
  center: {
    flex: 6
  },
  accessoryRight: {
    alignItems: 'flex-end'
  },
  subTitle: {
    marginTop: -space.xxs,
    textAlign: 'center',
    fontSize: FontSize.s
  },
  absolute: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    zIndex: 1
  },
  transparent: {
    backgroundColor: color.transparent
  },
  buttonAccessory: {
    paddingLeft: space.m
  }
})
