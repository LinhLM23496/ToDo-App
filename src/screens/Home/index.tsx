import { Button, FlatList, StyleSheet, View } from 'react-native'
import React, { useMemo, useState } from 'react'
import ReactNativeCalendarStrip from 'react-native-calendar-strip'
import moment from 'moment'
import { space } from 'themes'
import { Text } from 'components'
import { formatDate } from 'lib'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { NavigationService, Route } from 'navigation'
import { useTasksStore } from 'stores'
import { TaskType } from 'stores/tasks/types'
import TaskCard from './components/TaskCard'

moment.locale('vi')

const Home = () => {
  const { top, bottom } = useSafeAreaInsets()
  const { tasks } = useTasksStore()
  const [selectedDate, setSelectedDate] = useState(moment())
  const dataTasks = useMemo(() => {
    const data = [...(tasks[formatDate(selectedDate.toString())] ?? [])]

    return data.sort((a, b) => {
      return moment(a.startTime).diff(moment(b.startTime))
    })
  }, [tasks, selectedDate])

  const renderItem = ({ item }: { item: TaskType }) => {
    return <TaskCard key={item.id} data={item} />
  }
  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <ReactNativeCalendarStrip
        scrollable
        selectedDate={selectedDate}
        onDateSelected={setSelectedDate}
        calendarAnimation={{ type: 'sequence', duration: 30 }}
        daySelectionAnimation={{
          type: 'border',
          duration: 50,
          borderWidth: 1,
          borderHighlightColor: 'white'
        }}
        style={styles.containerCalendar}
        calendarHeaderStyle={{ color: 'white' }}
        calendarColor={'#7743CE'}
        dateNumberStyle={{ color: 'white' }}
        dateNameStyle={{ color: 'white' }}
        highlightDateNumberStyle={{ color: 'yellow' }}
        highlightDateNameStyle={{ color: 'yellow' }}
        iconContainer={{ flex: 0.1 }}
      />
      <FlatList
        extraData={selectedDate}
        data={dataTasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text>No event</Text>}
        contentContainerStyle={[
          styles.list,
          { paddingBottom: space.m + bottom }
        ]}
      />
      <Button
        title="Add event"
        onPress={() => NavigationService.push(Route.CreateTask)}
      />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerCalendar: {
    height: 100,
    paddingTop: space.m,
    paddingBottom: space.xs
  },
  list: {
    gap: space.m,
    paddingTop: space.s
  }
})
