import {
  IconVariant,
  IconName as IconNameType
} from 'components/Icon/IconValue'
import { ReactNode, Ref } from 'react'
import {
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  ViewStyle
} from 'react-native'
import { TextProps } from 'react-native'
import { SizeType } from 'themes'

export type InputRef = Ref<TextInput>

export type InputProps = TextInputProps & {
  label?: string
  iconName?: IconNameType
  labelProps?: TextProps
  labelStyle?: StyleProp<TextStyle>
  contentStyle?: ViewStyle
  style?: ViewStyle
  inputStyle?: ViewStyle
  iconColor?: string
  iconSize?: SizeType
  iconVariant?: IconVariant
  notice?: string
  noticeColor?: string
  noticeStyle?: TextStyle
  ElementRight?: ReactNode
  ElementLeft?: ReactNode
  showClear?: boolean
  onClear?: () => void
  focusChange?: (value: boolean) => void
  maxLength?: number
}
