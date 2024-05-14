import React from 'react'
import { ClipPath, Defs, G, Path, Rect, Svg } from 'react-native-svg'
import { iconSize } from 'themes'

type Props = {
  size?: number
  color?: string
}

const IconStudy = ({ size = iconSize.m, color = '#292D32' }: Props) => {
  return (
    <Svg height={size} width={size} viewBox="0 0 24 24" fill="none">
      <G clip-path="url(#clip0_1_16569)">
        <Path
          d="M21 5C19.89 4.65 18.67 4.5 17.5 4.5C15.55 4.5 13.45 4.9 12 6C10.55 4.9 8.45 4.5 6.5 4.5C4.55 4.5 2.45 4.9 1 6V20.65C1 20.9 1.25 21.15 1.5 21.15C1.6 21.15 1.65 21.1 1.75 21.1C3.1 20.45 5.05 20 6.5 20C8.45 20 10.55 20.4 12 21.5C13.35 20.65 15.8 20 17.5 20C19.15 20 20.85 20.3 22.25 21.05C22.35 21.1 22.4 21.1 22.5 21.1C22.75 21.1 23 20.85 23 20.6V6C22.4 5.55 21.75 5.25 21 5ZM21 18.5C19.9 18.15 18.7 18 17.5 18C15.8 18 13.35 18.65 12 19.5V8C13.35 7.15 15.8 6.5 17.5 6.5C18.7 6.5 19.9 6.65 21 7V18.5Z"
          fill={color}
        />
        <Path
          d="M17.5 10.5C18.38 10.5 19.23 10.59 20 10.76V9.24C19.21 9.09 18.36 9 17.5 9C15.8 9 14.26 9.29 13 9.83V11.49C14.13 10.85 15.7 10.5 17.5 10.5Z"
          fill={color}
        />
        <Path
          d="M13 12.4899V14.1499C14.13 13.5099 15.7 13.1599 17.5 13.1599C18.38 13.1599 19.23 13.2499 20 13.4199V11.8999C19.21 11.7499 18.36 11.6599 17.5 11.6599C15.8 11.6599 14.26 11.9599 13 12.4899Z"
          fill={color}
        />
        <Path
          d="M17.5 14.3301C15.8 14.3301 14.26 14.6201 13 15.1601V16.8201C14.13 16.1801 15.7 15.8301 17.5 15.8301C18.38 15.8301 19.23 15.9201 20 16.0901V14.5701C19.21 14.4101 18.36 14.3301 17.5 14.3301Z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1_16569">
          <Rect width="24" height="24" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default IconStudy