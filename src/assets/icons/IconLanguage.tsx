import React from 'react'
import { ClipPath, Defs, G, Path, Rect, Svg } from 'react-native-svg'
import { iconSize } from 'themes'

type Props = {
  size?: number
  color?: string
}

const IconLanguage = ({ size = iconSize.m, color = '#292D32' }: Props) => {
  return (
    <Svg height={size} width={size} viewBox="0 0 24 24" fill="none">
      <G clip-path="url(#clip0_1_13152)">
        <Path
          d="M19 8L15 12H18C18 15.31 15.31 18 12 18C10.99 18 10.03 17.75 9.2 17.3L7.74 18.76C8.97 19.54 10.43 20 12 20C16.42 20 20 16.42 20 12H23L19 8ZM6 12C6 8.69 8.69 6 12 6C13.01 6 13.97 6.25 14.8 6.7L16.26 5.24C15.03 4.46 13.57 4 12 4C7.58 4 4 7.58 4 12H1L5 16L9 12H6Z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1_13152">
          <Rect width="24" height="24" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default IconLanguage
