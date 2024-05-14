import { StyleProp, TextProps, TextStyle } from 'react-native'
import { SizeType } from 'themes'

export type FontWeight =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'

export type TextPropsType = TextProps & {
  size?: SizeType
  fontWeight?: FontWeight
  ratio?: number
  opacity?: number
  color?: string
  style?: StyleProp<TextStyle>
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify'
  flex?: number
  textDecorationLine?:
    | 'none'
    | 'underline'
    | 'line-through'
    | 'underline line-through'
}
