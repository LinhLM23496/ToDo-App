import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useRef } from 'react'
import { TaskType } from 'stores/tasks/types'
import { color, iconSize, space } from 'themes'
import { IconArrowLeft, IconTick } from 'assets'
import { formatTime, periodTime } from 'lib'
import { Text } from 'components'
import { useTasksStore } from 'stores'
import {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetModal
} from '@gorhom/bottom-sheet'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { NavigationService, Route } from 'navigation'

type Props = {
  data: TaskType
}

type TickBoxProps = {
  isActive: boolean
  colorIcon: string
}

type DataOptionsType = {
  label: string
  icon: string
}

const DATA_OPTIONS = [
  { label: 'Edit', icon: 'edit' },
  { label: 'Delete', icon: 'delete' }
]

const TaskCard = ({ data }: Props) => {
  const { id, title, startTime, endTime, color: colorIcon, isFinished } = data
  const { bottom } = useSafeAreaInsets()
  const { updateStatusTask, removeTask } = useTasksStore()
  const bottomSheetRef = useRef<BottomSheetModal>(null)

  const handleOptions = () => {
    bottomSheetRef.current?.present()
  }

  const onConfirm = () => {
    Alert.alert('Xóa tác vụ', 'Bạn có muốn xóa tác vụ này?', [
      {
        text: 'Không',
        style: 'cancel'
      },
      {
        text: 'Xóa',
        onPress: () => removeTask(id)
      }
    ])
  }

  const renderItem = ({ item }: { item: DataOptionsType }) => {
    const { label } = item

    const handleOption = () => {
      bottomSheetRef.current?.close()
      if (label === 'Delete') {
        return onConfirm()
      }
      if (label === 'Edit') {
        return NavigationService.navigate(Route.CreateTask, { data })
      }
    }

    return (
      <TouchableOpacity
        key={label}
        activeOpacity={0.8}
        style={styles.option}
        onPress={handleOption}>
        <Text>{label}</Text>
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
      <Text fontWeight="500">{formatTime(startTime)}</Text>
      <View style={[styles.icon, { backgroundColor: colorIcon }]}>
        <IconArrowLeft />
      </View>
      <View style={styles.content}>
        <Text flex={1} size="s" color={isFinished ? color.gray : color.black}>
          {periodTime(startTime, endTime)}
        </Text>
        <Text
          flex={1}
          fontWeight={isFinished ? '400' : '500'}
          color={isFinished ? color.gray : color.black}
          size="l"
          textDecorationLine={isFinished ? 'line-through' : 'none'}>
          {title}
        </Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => updateStatusTask(id)}
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
    paddingLeft: space.xs,
    paddingRight: space.m,
    alignItems: 'center',
    gap: space.s,
    flex: 1
  },
  icon: {
    height: iconSize.xl,
    width: 'auto',
    aspectRatio: 1,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    flex: 1
  },
  containerTick: {
    height: '100%',
    width: 'auto',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center'
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
    borderWidth: 1,
    borderRadius: space.xs,
    padding: space.s,
    marginHorizontal: space.m
  },
  BSList: {
    paddingTop: space.xs,
    gap: space.m
  }
})
