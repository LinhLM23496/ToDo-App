import React from 'react'
import { ClipPath, Defs, G, Path, Rect, Svg } from 'react-native-svg'
import { iconSize } from 'themes'

type Props = {
  size?: number
  color?: string
}

const IconPlus = ({ size = iconSize.m, color = '#292D32' }: Props) => {
  return (
    <Svg height={size} width={size} viewBox="0 0 24 24" fill="none">
      <G clip-path="url(#clip0_1_8081)">
        <Path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill={color} />
      </G>
      <Defs>
        <ClipPath id="clip0_1_8081">
          <Rect width="24" height="24" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default IconPlus
