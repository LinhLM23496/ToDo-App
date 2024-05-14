import {
  FlatList,
  Image,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native'
import React, { useRef, useState } from 'react'
import ReactNativeCalendarStrip from 'react-native-calendar-strip'
import moment, { Moment } from 'moment'
import { colorRange, iconSize, space } from 'themes'
import { Button, Text } from 'components'
import { formatDate } from 'lib'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { NavigationService, Route } from 'navigation'
import { useTasksStore, useMarkedDates, useTasks, useThemeStore } from 'stores'
import { TaskType } from 'stores/tasks/types'
import TaskCard from './components/TaskCard'
import 'moment/locale/vi'
import { IconPlus, IconSetting, images } from 'assets'
import DatePicker from 'react-native-date-picker'
import { useFocusEffect } from '@react-navigation/native'
import { styles } from './styles'

const Home = () => {
  const ref = useRef<ReactNativeCalendarStrip>(null)
  const { top, bottom } = useSafeAreaInsets()
  const { theme } = useThemeStore()
  const { removeTask, updateStatusTask } = useTasksStore()
  const markedDates = useMarkedDates()

  const [selectedDate, setSelectedDate] = useState(moment())
  const selectedDateFormatDate = new Date(formatDate(selectedDate))
  const data = useTasks(selectedDate)
  const formatDateSelected = formatDate(selectedDate)
  const [open, setOpen] = useState(false)

  const styleTheme: ViewStyle = { backgroundColor: theme, borderColor: theme }

  useFocusEffect(() => {
    ref.current?.forceUpdate()
  })

  const onDateSelected = (date: Moment) => {
    if (selectedDate.isSame(date, 'dates')) return
    setSelectedDate(date)
  }

  const onHeaderSelected = () => {
    setOpen(!open)
  }

  const handlePicker = (date: Date) => {
    setSelectedDate(moment(date))
    setOpen(false)
  }

  const handleCancel = () => {
    setOpen(false)
  }

  const renderItem = ({ item }: { item: TaskType }) => {
    const { id } = item
    const handleUpdate = () => {
      NavigationService.push(Route.CreateTask, { data: item, selectedDate })
    }

    const handleRemove = () => {
      removeTask(id)
      ref.current?.forceUpdate()
    }

    const handleUpdateStatus = (status: boolean) => {
      updateStatusTask(id, formatDateSelected, status)
    }

    return (
      <TaskCard
        key={id}
        data={item}
        selectedDate={formatDateSelected}
        onUpdate={handleUpdate}
        onRemove={handleRemove}
        onUpdateStatus={handleUpdateStatus}
      />
    )
  }

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <ReactNativeCalendarStrip
        ref={ref}
        locale={{ name: 'vi', config: { week: { dow: 1 } } }}
        scrollable
        selectedDate={selectedDate}
        onDateSelected={onDateSelected}
        markedDates={markedDates}
        onHeaderSelected={onHeaderSelected}
        calendarAnimation={{ type: 'sequence', duration: 30 }}
        daySelectionAnimation={{
          type: 'background',
          duration: 50,
          highlightColor: theme
        }}
        style={styles.containerCalendar}
        calendarHeaderStyle={styles.headerStyle}
        calendarColor={colorRange.gray[200]}
        dateNumberStyle={styles.date}
        dateNameStyle={styles.date}
        highlightDateNumberStyle={styles.highlight}
        highlightDateNameStyle={styles.highlight}
        iconContainer={styles.iconContainer}
        scrollToOnSetSelectedDate
      />
      <FlatList
        extraData={selectedDate}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<EmptyView />}
        style={styles.containerList}
        contentContainerStyle={[
          styles.list,
          { paddingBottom: space.m + bottom }
        ]}
      />
      <DatePicker
        modal
        mode="date"
        locale="vi-VN"
        open={open}
        date={selectedDateFormatDate}
        onConfirm={handlePicker}
        onCancel={handleCancel}
        title={'Chọn ngày'}
        confirmText="Chọn"
        cancelText="Hủy"
      />
      <Button
        ElementLeft={<IconPlus />}
        onPress={() =>
          NavigationService.push(Route.CreateTask, { selectedDate })
        }
        style={[styles.button, styleTheme]}
      />
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => NavigationService.push(Route.Setting)}
        style={[styles.buttonSetting, { top: top + space.xs }]}>
        <IconSetting size={iconSize.l} color={theme} />
      </TouchableOpacity>
    </View>
  )
}

export default Home

const EmptyView = () => {
  return (
    <View>
      <Text textAlign="center">Chưa có tác vụ nào</Text>
      <Image source={images.empty} style={styles.empty} />
    </View>
  )
}
