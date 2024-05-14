import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import React from 'react'
import { color, iconSize } from 'themes'
import { IconOther, IconSleep, IconStudy, IconWakeUp, IconWork } from 'assets'
import { IconType } from 'stores/tasks/types'

type Props = {
  colorIcon: string
  typeIcon: IconType
  style?: StyleProp<ViewStyle>
}

const IconTask = ({ colorIcon, typeIcon, style }: Props) => {
  const props = { size: iconSize.s, color: color.white }
  const icon = {
    work: <IconWork {...props} />,
    study: <IconStudy {...props} />,
    sleep: <IconSleep {...props} />,
    'wake-up': <IconWakeUp {...props} />,
    other: <IconOther {...props} />
  }

  return (
    <View style={[styles.icon, { backgroundColor: colorIcon }, style]}>
      {icon[typeIcon]}
    </View>
  )
}

export default IconTask

const styles = StyleSheet.create({
  icon: {
    height: iconSize.xxl,
    width: 'auto',
    aspectRatio: 1,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
