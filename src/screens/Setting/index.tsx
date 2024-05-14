import {
  Alert,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'
import React, { useRef } from 'react'
import { NavigationBar, Row, Text } from 'components'
import SelectColor from 'components/SelectColor'
import { color, colorRange, space } from 'themes'
import { useRatioStore, useTasksStore, useThemeStore } from 'stores'
import { ThemeType } from 'stores/themes/types'
import { COLORS_THEME } from 'lib'
import { IconDelete, IconLanguage, IconNoti, IconTheme } from 'assets'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import SliderRatio from './components/SliderRatio'
import { SliderRatioRef } from './components/types'

type Option = {
  key: string
  title: string
  content: string
  Icon: React.ReactNode
}
const Setting = () => {
  const { bottom } = useSafeAreaInsets()
  const sliderRef = useRef<SliderRatioRef>(null)
  const { theme, setTheme, clearTheme } = useThemeStore()
  const { cleanTasks } = useTasksStore()
  const { setRatio, clearRatio } = useRatioStore()

  const OPTIONS: Option[] = [
    {
      key: 'noti',
      title: 'Thông báo',
      content: 'Tắt',
      Icon: <IconNoti color={theme} />
    },
    {
      key: 'language',
      title: 'Ngôn ngữ',
      content: 'Tiếng Việt',
      Icon: <IconLanguage color={theme} />
    }
  ]

  const onChangeTheme = (value: string) => {
    setTheme(value as ThemeType)
  }

  const renderItem = ({ item }: { item: Option }) => {
    const { key, title, content, Icon } = item
    return (
      <View key={key}>
        <Row gap="xxs" style={styles.title}>
          {Icon}
          <Text fontWeight="500">{title}</Text>
        </Row>
        <View style={styles.option}>
          <Text>{content}</Text>
        </View>
      </View>
    )
  }

  const onConfirm = () => {
    Alert.alert(
      'Thông báo',
      'Bạn có chắc chắn muốn xóa tất cả dữ liệu bao gồm tất cả các tác vụ?',
      [
        {
          text: 'Hủy',
          style: 'cancel'
        },
        {
          text: 'Xóa',
          style: 'destructive',
          onPress: onClearCache
        }
      ]
    )
  }

  const onClearCache = () => {
    cleanTasks()
    clearTheme()
    clearRatio()
    sliderRef.current?.reset()
  }

  return (
    <View style={[styles.container, { paddingBottom: bottom + space.m }]}>
      <NavigationBar title="Cài đặt" />
      <View style={styles.body}>
        <SelectColor
          Label={
            <Row gap="xxs">
              <IconTheme color={theme} />
              <Text fontWeight="500">Giao diện</Text>
            </Row>
          }
          data={COLORS_THEME}
          value={theme}
          onChange={onChangeTheme}
          style={styles.optionTheme}
        />

        <SliderRatio ref={sliderRef} onFinishChange={setRatio} />
        <FlatList
          scrollEnabled={false}
          data={OPTIONS}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onConfirm}
          style={styles.optionDelete}>
          <IconDelete color={color.danger} />
          <Text fontWeight="bold" color={color.danger}>
            Đặt lại ứng dụng
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Setting

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  body: {
    flex: 1,
    paddingHorizontal: space.m
  },
  optionTheme: {
    backgroundColor: color.white,
    borderRadius: space.s,
    borderWidth: 1,
    borderColor: colorRange.gray[400]
  },
  list: {
    paddingTop: space.m,
    gap: space.m
  },
  title: {
    marginLeft: space.s,
    marginBottom: space.xxs
  },
  option: {
    padding: space.s,
    borderRadius: space.s,
    borderWidth: 1,
    borderColor: colorRange.gray[400]
  },
  optionDelete: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.xs,
    padding: space.s,
    borderRadius: space.s,
    borderWidth: 1,
    borderColor: colorRange.danger[200]
  }
})
