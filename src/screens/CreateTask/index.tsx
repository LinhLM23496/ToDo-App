import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { FC, useState } from 'react'
import { Button, Input, NavigationBar, Row, Text } from 'components'
import { color, colorRange, space } from 'themes'
import {
  COLORS,
  DATA_REPEAT,
  formatDate,
  formatDateTime,
  nearestRoundedTime,
  validateTitle
} from 'lib'
import moment from 'moment'
import { Controller, useForm } from 'react-hook-form'
import { IFormInput } from './types'
import { useDailyTasksStore, useOnceTasksStore } from 'stores'
import { NavigationService, ScreenProps } from 'navigation'
import { TaskType } from 'stores/tasks/types'
import CardPicker from './components/CardPicker'
import SelectColor from './components/SelectColor'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import SelectRepeat from './components/SelectRepeat'
import DatePicker from 'react-native-date-picker'

const CreateTask: FC<ScreenProps<'CreateTask'>> = ({ route }) => {
  const { bottom } = useSafeAreaInsets()
  const data = route.params?.data
  const innitialStartTime = data?.startTime
    ? formatDateTime(data?.startTime)
    : nearestRoundedTime(moment())
  const innitialEndTime = data?.endTime
    ? formatDateTime(data?.endTime)
    : nearestRoundedTime(moment().add(15, 'minutes'))

  const {
    setTask: setOnceTask,
    setWeeklyTask,
    setMonthlyTask,
    updateTask
  } = useOnceTasksStore()
  const { setTask: setDailyTask, updateTask: updateDailyTask } =
    useDailyTasksStore()

  const {
    control,
    handleSubmit,
    watch,
    getValues,
    setValue,
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

  const startTime = watch('startTime')

  const [open, setOpen] = useState(false)

  const onConfirm = (date: Date) => {
    const newDate = moment(date.toISOString())
    const start = moment(getValues('startTime'))
    const end = moment(getValues('endTime'))

    // update start and end date
    start.set({
      year: newDate.year(),
      month: newDate.month(),
      date: newDate.date()
    })
    end.set({
      year: newDate.year(),
      month: newDate.month(),
      date: newDate.date()
    })

    setValue('startTime', formatDateTime(start))
    setValue('endTime', formatDateTime(end))
    setOpen(false)
  }

  const handleShow = () => {
    setOpen(true)
  }
  const handleCancel = () => {
    setOpen(false)
  }

  const onSubmit = (dataForm: IFormInput) => {
    const dataTask: TaskType = {
      ...data,
      ...dataForm,
      id: data?.id ?? moment().valueOf().toString(),
      repeat: dataForm.repeat.value,
      icon: 'work',
      finishTimes: data?.finishTimes ?? []
    }

    switch (dataForm.repeat.value) {
      case 'daily':
        data?.id ? updateDailyTask(dataTask) : setDailyTask(dataTask)
        break

      case 'weekly':
        data?.id ? updateTask(dataTask) : setWeeklyTask(dataTask)
        break

      case 'monthly':
        data?.id ? updateTask(dataTask) : setMonthlyTask(dataTask)
        break

      default:
        data?.id ? updateTask(dataTask) : setOnceTask(dataTask)
        break
    }

    NavigationService.goBack()
  }

  return (
    <View style={styles.container}>
      <NavigationBar title={data?.id ? 'Chỉnh sửa tác vụ' : 'Tác vụ mới'} />
      <View style={styles.body}>
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
        <View>
          <Text style={styles.title}>Thời gian tác vụ</Text>
          <View style={styles.containerTime}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleShow}
              style={styles.date}>
              <Text
                textAlign="center"
                fontWeight="bold"
                size="l"
                color={color.info}>
                {formatDate(startTime)}
              </Text>
            </TouchableOpacity>
            <Row>
              <Controller
                name="startTime"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <CardPicker onChange={onChange} value={value} />
                )}
              />
              <View style={styles.dashed} />
              <Controller
                name="endTime"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <CardPicker
                    onChange={onChange}
                    value={value}
                    minimumDate={new Date(startTime)}
                  />
                )}
              />
            </Row>
          </View>
        </View>
        <Controller
          name="color"
          control={control}
          render={({ field: { onChange, value } }) => (
            <SelectColor value={value} onChange={onChange} />
          )}
        />
        <Controller
          name="repeat"
          control={control}
          render={({ field: { onChange, value } }) => (
            <SelectRepeat value={value} onChange={onChange} />
          )}
        />
      </View>

      <DatePicker
        modal
        mode="date"
        locale="vi-VN"
        open={open}
        date={new Date(startTime)}
        onConfirm={onConfirm}
        onCancel={handleCancel}
        title={'Chọn giờ'}
        confirmText="Chọn"
        cancelText="Hủy"
      />
      <Button
        title="Lưu"
        onPress={handleSubmit(onSubmit)}
        style={[
          styles.button,
          {
            marginBottom: bottom + space.m
          }
        ]}
        styleContent={styles.subButton}
      />
    </View>
  )
}

export default CreateTask

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  body: {
    flex: 1,
    marginHorizontal: space.m,
    gap: space.m
  },
  title: {
    fontWeight: 'bold',
    marginLeft: space.s,
    marginBottom: space.xxs
  },
  border: {
    borderRadius: space.xs,
    overflow: 'hidden'
  },
  containerTime: {
    backgroundColor: colorRange.gray[100],
    borderRadius: space.xs,
    paddingVertical: space.m,
    paddingHorizontal: space.xxl
  },
  date: {
    alignSelf: 'center',
    paddingHorizontal: space.l,
    paddingVertical: space.xs
  },
  dashed: {
    flex: 1,
    marginHorizontal: space.xs,
    borderWidth: 1,
    borderStyle: 'dashed'
  },
  button: {
    marginHorizontal: space.m
  },
  subButton: {
    flex: 1
  }
})
