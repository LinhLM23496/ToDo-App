import { FlatList, StyleSheet, View } from 'react-native'
import React, { useRef, useState } from 'react'
import ReactNativeCalendarStrip from 'react-native-calendar-strip'
import moment, { Moment } from 'moment'
import { color, colorRange, fontSize, space } from 'themes'
import { Button, Text } from 'components'
import { formatDate } from 'lib'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { NavigationService, Route } from 'navigation'
import {
  useDailyTasksStore,
  useMarkedDates,
  useOnceTasksStore,
  useTasks
} from 'stores'
import { TaskType } from 'stores/tasks/types'
import TaskCard from './components/TaskCard'
import 'moment/locale/vi'
import { IconPlus } from 'assets'
import DatePicker from 'react-native-date-picker'
import { useFocusEffect } from '@react-navigation/native'

const Home = () => {
  const ref = useRef<ReactNativeCalendarStrip>(null)
  const { top, bottom } = useSafeAreaInsets()
  const { removeTask, updateStatusTask } = useOnceTasksStore()
  const {
    removeTask: removeDailyTask,
    updateStatusTask: updateStatusDailyTask
  } = useDailyTasksStore()
  const markedDates = useMarkedDates()

  const [selectedDate, setSelectedDate] = useState(moment())
  const selectedDateFormatDate = new Date(formatDate(selectedDate))
  const data = useTasks(selectedDate)
  const formatDateSelected = formatDate(selectedDate)
  const [open, setOpen] = useState(false)

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
    const { id, repeat } = item
    const handleUpdate = () => {
      NavigationService.push(Route.CreateTask, { data: item })
    }

    const handleRemove = () => {
      if (repeat === 'daily') {
        removeDailyTask(id)
      } else {
        removeTask(id)
      }
      ref.current?.forceUpdate()
    }

    const handleUpdateStatus = (status: boolean) => {
      if (repeat === 'daily') {
        return updateStatusDailyTask(id, formatDateSelected, status)
      }
      return updateStatusTask(id, formatDateSelected, status)
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
        locale={{ name: 'vi', config: { week: { dow: 1 } } }}
        scrollable
        ref={ref}
        selectedDate={selectedDate}
        onDateSelected={onDateSelected}
        markedDates={markedDates}
        onHeaderSelected={onHeaderSelected}
        calendarAnimation={{ type: 'sequence', duration: 30 }}
        daySelectionAnimation={{
          type: 'background',
          duration: 50,
          highlightColor: color.black
        }}
        style={styles.containerCalendar}
        calendarHeaderStyle={styles.headerStyle}
        calendarColor={colorRange.gray[200]}
        dateNumberStyle={styles.date}
        dateNameStyle={styles.date}
        highlightDateNumberStyle={styles.highlight}
        highlightDateNameStyle={styles.highlight}
        iconContainer={styles.iconContainer}
      />
      <FlatList
        extraData={selectedDate}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text>No event</Text>}
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
        onPress={() => NavigationService.push(Route.CreateTask)}
        style={styles.button}
      />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorRange.gray[200]
  },
  containerCalendar: {
    height: 100,
    paddingTop: space.m,
    paddingBottom: space.xs
  },
  containerList: {
    backgroundColor: color.white,
    borderTopLeftRadius: space.l,
    borderTopRightRadius: space.l
  },
  list: {
    gap: space.m,
    paddingTop: space.m
  },
  iconContainer: {
    paddingHorizontal: space.xxs
  },
  headerStyle: {
    color: color.danger,
    fontSize: fontSize.l
  },
  highlight: {
    color: color.white
  },
  date: {
    color: color.black
  },
  button: {
    position: 'absolute',
    right: space.m,
    bottom: space.xxl
  }
})
