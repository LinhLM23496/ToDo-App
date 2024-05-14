import React from 'react'
import { ClipPath, Defs, G, Path, Rect, Svg } from 'react-native-svg'
import { iconSize } from 'themes'

type Props = {
  size?: number
  color?: string
}

const IconSleep = ({ size = iconSize.m, color = '#292D32' }: Props) => {
  return (
    <Svg height={size} width={size} viewBox="0 0 24 24" fill="none">
      <G clip-path="url(#clip0_1_15696)">
        <Path
          d="M9.27 4.48977C7.64 12.0298 13.02 16.8998 16.93 18.2898C15.54 19.3798 13.81 19.9998 12 19.9998C7.59 19.9998 4 16.4098 4 11.9998C4 8.54977 6.2 5.59977 9.27 4.48977ZM11.99 2.00977C6.4 2.00977 2 6.53977 2 11.9998C2 17.5198 6.48 21.9998 12 21.9998C15.71 21.9998 18.93 19.9798 20.66 16.9798C13.15 16.7298 8.57 8.54977 12.34 2.00977C12.22 2.00977 12.11 2.00977 11.99 2.00977Z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1_15696">
          <Rect width="24" height="24" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default IconSleep
