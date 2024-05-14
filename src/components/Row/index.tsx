import { View } from 'react-native'
import React, { Ref, forwardRef } from 'react'
import { ViewCustomProps } from './types'
import { space } from 'themes'

const Row = forwardRef((props: ViewCustomProps, ref: Ref<any>) => {
  const {
    children,
    style,
    flex,
    flexDirection,
    alignItems,
    alignContent,
    alignSelf,
    justifyContent,
    gap
  } = props

  const gapSize = gap ? space?.[gap] : 0
  return (
    <View
      ref={ref}
      style={[
        {
          flex: flex ?? undefined,
          flexDirection: flexDirection ?? 'row',
          alignItems: alignItems ?? 'center',
          alignContent: alignContent ?? undefined,
          alignSelf: alignSelf ?? undefined,
          justifyContent: justifyContent ?? undefined,
          gap: gapSize || undefined
        },
        style
      ]}>
      {children}
    </View>
  )
})

export default Row
