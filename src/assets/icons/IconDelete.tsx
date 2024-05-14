import React from 'react'
import { ClipPath, Defs, G, Path, Rect, Svg } from 'react-native-svg'
import { iconSize } from 'themes'

type Props = {
  size?: number
  color?: string
}

const IconDelete = ({ size = iconSize.m, color = '#292D32' }: Props) => {
  return (
    <Svg height={size} width={size} viewBox="0 0 24 24" fill="none">
      <G clip-path="url(#clip0_1_13244)">
        <Path
          d="M14.12 10.47L12 12.59L9.87 10.47L8.46 11.88L10.59 14L8.47 16.12L9.88 17.53L12 15.41L14.12 17.53L15.53 16.12L13.41 14L15.53 11.88L14.12 10.47ZM15.5 4L14.5 3H9.5L8.5 4H5V6H19V4H15.5ZM6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM8 9H16V19H8V9Z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1_13244">
          <Rect width="24" height="24" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default IconDelete
