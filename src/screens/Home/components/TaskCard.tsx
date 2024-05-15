import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { ReactNode, useCallback, useRef } from 'react'
import { TaskType } from 'stores/tasks/types'
import { color, colorRange, iconSize, space } from 'themes'
import { IconDelete, IconEdit, IconRepeat, IconTick } from 'assets'
import { formatTime, periodTime } from 'lib'
import { IconTask, Row, Text } from 'components'
import {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetModal
} from '@gorhom/bottom-sheet'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useRatioStore } from 'stores'

type Props = {
  data: TaskType
  selectedDate: string
  onUpdate: () => void
  onRemove: () => void
  onUpdateStatus: (status: boolean) => void
}

type TickBoxProps = {
  isActive: boolean
  colorIcon: string
}

type DataOptionsType = {
  key: string
  label: string
  Icon: ReactNode
  color: string
}

const DATA_OPTIONS = [
  {
    key: 'edit',
    label: 'Chỉnh sửa tác vụ',
    Icon: <IconEdit />,
    color: color.black
  },
  {
    key: 'delete',
    label: 'Xóa tác vụ',
    Icon: <IconDelete color={color.danger} />,
    color: color.danger
  }
]

const TaskCard = (props: Props) => {
  const { data, selectedDate, onUpdate, onUpdateStatus, onRemove } = props
  const {
    title,
    startTime,
    endTime,
    color: colorIcon,
    finishTimes,
    icon: typeIcon,
    repeat
  } = data
  const { ratio } = useRatioStore()
  const isFinished = !!finishTimes?.includes(selectedDate)
  const { bottom } = useSafeAreaInsets()
  const bottomSheetRef = useRef<BottomSheetModal>(null)

  const handleOptions = () => {
    bottomSheetRef.current?.present()
  }

  const onConfirm = () => {
    const subText =
      repeat === 'once'
        ? 'Bạn có muốn xóa tác vụ này?'
        : 'Bạn có chắc chắn muốn xóa tác vụ này? Đây là tác vụ lặp lại.'
    Alert.alert('Xóa tác vụ', subText, [
      {
        text: 'Không',
        style: 'cancel'
      },
      {
        text: 'Xóa',
        onPress: onRemove
      }
    ])
  }

  const renderItem = ({ item }: { item: DataOptionsType }) => {
    const { key, label, Icon, color } = item

    const handleOption = () => {
      bottomSheetRef.current?.close()
      if (key === 'delete') {
        return onConfirm()
      }

      return onUpdate()
    }

    return (
      <TouchableOpacity
        key={key}
        activeOpacity={0.8}
        style={[styles.option, { borderColor: color }]}
        onPress={handleOption}>
        {Icon}
        <Text fontWeight="500" color={color}>
          {label}
        </Text>
      </TouchableOpacity>
    )
  }

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        {...props}
      />
    ),
    []
  )

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handleOptions}
      style={styles.container}>
      <Row gap="s" flex={1} alignItems="flex-start">
        <Text
          size="s"
          fontWeight="500"
          color={colorRange.gray[700]}
          style={styles.time}>
          {formatTime(startTime)}
        </Text>
        <IconTask colorIcon={colorIcon} typeIcon={typeIcon} />
        <View style={styles.content}>
          <Row gap={'xs'}>
            <Text size="s" fontWeight="500" color={colorRange.gray[700]}>
              {periodTime(startTime, endTime)}
            </Text>
            {repeat !== 'once' && (
              <IconRepeat size={iconSize.xs} color={colorRange.gray[700]} />
            )}
          </Row>
          <Text
            flex={1}
            fontWeight={isFinished ? '400' : '500'}
            color={isFinished ? color.gray : color.black}
            size="l"
            ratio={ratio}
            textDecorationLine={isFinished ? 'line-through' : 'none'}>
            {title}
          </Text>
        </View>
      </Row>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onUpdateStatus(isFinished)}
        style={styles.containerTick}>
        <TickBox isActive={isFinished} colorIcon={colorIcon} />
      </TouchableOpacity>
      <BottomSheetModal
        ref={bottomSheetRef}
        enableDynamicSizing
        backdropComponent={renderBackdrop}>
        <BottomSheetFlatList
          data={DATA_OPTIONS}
          renderItem={renderItem}
          contentContainerStyle={[
            styles.BSList,
            {
              paddingBottom: bottom + space.m
            }
          ]}
        />
      </BottomSheetModal>
    </TouchableOpacity>
  )
}

export default React.memo(TaskCard)

const TickBox = ({ isActive, colorIcon }: TickBoxProps) => {
  return (
    <View
      style={[
        styles.tick,
        {
          borderColor: colorIcon
        }
      ]}>
      {isActive ? <IconTick size={iconSize.m} color={colorIcon} /> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingLeft: space.m,
    flex: 1
  },
  time: {
    marginTop: space.xs
  },
  content: {
    flex: 1
  },
  containerTick: {
    alignSelf: 'flex-start',
    paddingVertical: space.xs,
    paddingHorizontal: space.m
  },
  tick: {
    height: iconSize.m,
    width: 'auto',
    aspectRatio: 1,
    borderRadius: 100,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: space.xs,
    padding: space.s,
    marginHorizontal: space.m,
    gap: space.xs
  },
  BSList: {
    paddingTop: space.xs,
    gap: space.m
  }
})
