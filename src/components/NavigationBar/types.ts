import { ReactNode } from 'react'
import { StyleProp, TextStyle, ViewStyle } from 'react-native'
import { SizeType } from 'themes'

export type NavigationBarProps = {
  style?: StyleProp<ViewStyle>
  onBackPress?: () => void
  title?: string | Function
  onPressTitle?: () => void
  subTitle?: string
  subTitleStyle?: StyleProp<TextStyle>
  ElementLeft?: ReactNode
  ElementRight?: ReactNode
  buttonStyle?: StyleProp<ViewStyle>
  hideBack?: boolean
  titleStyle?: StyleProp<TextStyle>
  numberOfLines?: number
  backgroundColor?: string
  isModal?: boolean
  fontSize?: SizeType
  adjustsFontSizeToFit?: boolean
  absolute?: boolean
  [key: string]: any
}
