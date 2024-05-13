import { ReactNode } from 'react'
import {
  StyleProp,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle
} from 'react-native'

type ButtonVariantType = 'filled' | 'outline' | 'ghost'

export interface IButtonProps extends TouchableOpacityProps {
  variant?: ButtonVariantType
  onPress?: () => void
  title?: string
  style?: StyleProp<ViewStyle>
  styleContent?: StyleProp<TextStyle>
  loading?: boolean
  ElementLeft?: ReactNode
  ElementRight?: ReactNode
  spacing?: number
  borderRadius?: number
  isFullWidth?: boolean
}
