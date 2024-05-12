import {
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'
import React, { FC } from 'react'
import { Input, NavigationBar, Text } from 'components'
import { color, colorRange, iconSize, space } from 'themes'
import {
  formatDateTime,
  formatTime,
  generateTimeList,
  nearestRoundedTime,
  validateTitle
} from 'lib'
import ScrollPicker from 'react-native-wheel-scrollview-picker'
import moment from 'moment'
import { Controller, useForm } from 'react-hook-form'
import {
  DataRepeat,
  IFormInput,
  RenderColorType,
  RenderRepeatType
} from './types'
import { useTasksStore } from 'stores'
import { NavigationService, ScreenProps } from 'navigation'

const DATA_REPEAT: DataRepeat[] = [
  { value: 'once', label: 'Một lần' },
  { value: 'daily', label: 'Hàng ngày' },
  { value: 'weekly', label: 'Hàng tuần' },
  { value: 'monthly', label: 'Hàng tháng' }
]

const COLORS = [
  '#CD3645',
  '#3369C4',
  '#CE9F40',
  '#678983',
  '#3F979B',
  '#6F1AB6'
]

const CreateTask: FC<ScreenProps<'CreateTask'>> = ({ route }) => {
  const data = route.params?.data
  const dataList = generateTimeList()
  const innitialStartTime = data?.startTime
    ? formatDateTime(data?.startTime)
    : nearestRoundedTime(moment())
  const innitialEndTime = data?.endTime
    ? formatDateTime(data?.endTime)
    : nearestRoundedTime(moment().add(15, 'minutes'))
  const selectedIndexStart = dataList.findIndex(
    (item) => item === innitialStartTime
  )
  const selectedIndexEnd = dataList.findIndex(
    (item) => item === innitialEndTime
  )

  const { setTask, updateTask } = useTasksStore()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormInput>({
    defaultValues: {
      title: data?.title ?? '',
      startTime: innitialStartTime,
      endTime: innitialEndTime,
      color: data?.color ?? COLORS[0],
      repeat: data?.repeat
        ? DATA_REPEAT.find((item) => item.value === data?.repeat)
        : DATA_REPEAT[0]
    }
  })

  const renderColor = ({ item, value, onChange }: RenderColorType) => {
    const isActive = item === value

    const handleSelect = () => {
      onChange(item)
    }
    return (
      <TouchableOpacity
        onPress={handleSelect}
        activeOpacity={0.8}
        key={item}
        style={styles.itemColor}>
        <View
          style={[
            styles.subItemColor,
            {
              borderColor: isActive ? item : color.transparent
            }
          ]}>
          <View
            style={[
              styles.color,
              {
                backgroundColor: item
              }
            ]}
          />
        </View>
      </TouchableOpacity>
    )
  }

  const renderRepeat = ({ item, value, onChange }: RenderRepeatType) => {
    const isActive = item.value === value.value

    const handleSelect = () => {
      onChange(item)
    }
    return (
      <TouchableOpacity
        key={item.value}
        activeOpacity={0.8}
        onPress={handleSelect}
        style={[
          styles.itemRepeat,
          { backgroundColor: isActive ? color.info : color.transparent }
        ]}>
        <Text fontWeight="500" color={isActive ? color.white : color.black}>
          {item.label}
        </Text>
      </TouchableOpacity>
    )
  }

  const onSubmit = (dataForm: IFormInput) => {
    const dataTask = {
      ...data,
      ...dataForm,
      id: data?.id ?? moment().valueOf().toString(),
      repeat: dataForm.repeat.value,
      icon: 'work',
      isFinished: data?.isFinished ?? false
    }
    data?.id ? updateTask(dataTask) : setTask(dataTask)
    NavigationService.goBack()
  }

  return (
    <View style={styles.container}>
      <NavigationBar title={data?.id ? 'Chỉnh sửa tác vụ' : 'Tác vụ mới'} />
      <ScrollView
        keyboardDismissMode="on-drag"
        style={styles.scroll}
        contentContainerStyle={styles.subList}>
        <Controller
          name="title"
          control={control}
          rules={{
            required: 'Hãy nhập điều bạn muốn làm',
            validate: validateTitle()
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              label="Bạn muốn làm gì?"
              value={value}
              onChangeText={onChange}
              notice={errors?.title?.message}
            />
          )}
        />
        <Controller
          name="startTime"
          control={control}
          render={({ field: { onChange } }) => (
            <View>
              <Text style={styles.title}>Bắt đầu khi nào?</Text>
              <View style={styles.border}>
                <ScrollPicker
                  dataSource={dataList}
                  selectedIndex={selectedIndexStart}
                  renderItem={(valuePicker, index) => {
                    return (
                      <View key={`picker-${index}`}>
                        <Text>{formatTime(valuePicker)}</Text>
                      </View>
                    )
                  }}
                  onValueChange={(valuePicker) => onChange(valuePicker)}
                  wrapperHeight={iconSize['3xl'] * 3}
                  wrapperBackground={colorRange.gray[100]}
                  itemHeight={iconSize['3xl']}
                  highlightColor={color.white}
                  highlightBorderWidth={1}
                />
              </View>
            </View>
          )}
        />
        <Controller
          name="endTime"
          control={control}
          render={({ field: { onChange } }) => (
            <View>
              <Text style={styles.title}>Bao lâu?</Text>
              <View style={styles.border}>
                <ScrollPicker
                  dataSource={dataList}
                  selectedIndex={selectedIndexEnd}
                  renderItem={(valuePicker, index) => {
                    return (
                      <View key={`picker-${index}`}>
                        <Text>{formatTime(valuePicker)}</Text>
                      </View>
                    )
                  }}
                  onValueChange={(valuePicker) => onChange(valuePicker)}
                  wrapperHeight={iconSize['3xl'] * 3}
                  wrapperBackground={colorRange.gray[100]}
                  itemHeight={iconSize['3xl']}
                  highlightColor={color.white}
                  highlightBorderWidth={1}
                />
              </View>
            </View>
          )}
        />
        <Controller
          name="color"
          control={control}
          render={({ field: { onChange, value } }) => (
            <View>
              <Text style={styles.title}>Màu gì?</Text>
              <FlatList
                scrollEnabled={false}
                horizontal
                data={COLORS}
                renderItem={({ item }) =>
                  renderColor({ item, value, onChange })
                }
                style={styles.containerColor}
                contentContainerStyle={styles.subContainerColor}
              />
            </View>
          )}
        />
        <Controller
          name="repeat"
          control={control}
          render={({ field: { onChange, value } }) => (
            <View>
              <Text style={styles.title}>Thường xuyên thế nào?</Text>
              <FlatList
                scrollEnabled={false}
                horizontal
                data={DATA_REPEAT}
                renderItem={({ item }) =>
                  renderRepeat({ item, value, onChange })
                }
                style={styles.repeat}
                contentContainerStyle={styles.subRepeat}
              />
            </View>
          )}
        />
      </ScrollView>
      <Button title="Lưu" onPress={handleSubmit(onSubmit)} />
    </View>
  )
}

export default CreateTask

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scroll: {
    marginHorizontal: space.m
  },
  subList: {
    gap: space.m
  },
  title: {
    fontWeight: 'bold',
    marginLeft: space.s,
    marginBottom: space.xxs
  },
  subContainerColor: {
    flex: 1,
    justifyContent: 'center',
    gap: space.m
  },
  containerColor: {
    flex: 1,
    borderRadius: space.xs,
    backgroundColor: colorRange.gray[100]
  },
  itemColor: {
    paddingVertical: space.xs
  },
  subItemColor: {
    borderRadius: 100,
    borderWidth: 2
  },
  color: {
    width: iconSize.s,
    height: 'auto',
    aspectRatio: 1,
    borderRadius: 100,
    margin: 2
  },
  repeat: {
    borderRadius: space.xs,
    backgroundColor: colorRange.gray[100]
  },
  subRepeat: {
    flex: 1,
    justifyContent: 'space-between'
  },
  itemRepeat: {
    padding: space.s,
    borderRadius: space.xs,
    backgroundColor: colorRange.info[100]
  },
  border: {
    borderRadius: space.xs,
    overflow: 'hidden'
  }
})
