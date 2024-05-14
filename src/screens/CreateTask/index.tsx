import { TouchableOpacity, View } from 'react-native'
import React, { FC, useCallback, useRef, useState } from 'react'
import {
  Button,
  IconTask,
  Input,
  NavigationBar,
  Row,
  SelectColor,
  Text
} from 'components'
import { space } from 'themes'
import {
  COLORS,
  DATA_REPEAT,
  formatDate,
  formatDateTime,
  generateUniqueId,
  nearestRoundedTime,
  validateTitle
} from 'lib'
import moment from 'moment'
import { Controller, useForm } from 'react-hook-form'
import { IFormInput } from './types'
import { useTasksStore, useThemeStore } from 'stores'
import { NavigationService, ScreenProps } from 'navigation'
import { IconType, TaskType } from 'stores/tasks/types'
import CardPicker from './components/CardPicker'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import SelectRepeat from './components/SelectRepeat'
import DatePicker from 'react-native-date-picker'
import {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetModal
} from '@gorhom/bottom-sheet'
import { styles } from './styles'

const DATA_ICONS: IconType[] = ['work', 'study', 'sleep', 'wake-up', 'other']

const CreateTask: FC<ScreenProps<'CreateTask'>> = ({ route }) => {
  const { bottom } = useSafeAreaInsets()
  const { theme } = useThemeStore()
  const bottomSheetRef = useRef<BottomSheetModal>(null)
  const data = route.params?.data
  const innitialStartTime = data?.startTime
    ? formatDateTime(data?.startTime)
    : nearestRoundedTime(moment())
  const innitialEndTime = data?.endTime
    ? formatDateTime(data?.endTime)
    : nearestRoundedTime(moment().add(15, 'minutes'))

  const { setTask, updateTask } = useTasksStore()
  const [open, setOpen] = useState(false)

  const {
    control,
    handleSubmit,
    watch,
    getValues,
    setValue,
    formState: { errors }
  } = useForm<IFormInput>({
    defaultValues: {
      ...data,
      startTime: innitialStartTime,
      endTime: innitialEndTime,
      color: data?.color ?? COLORS[0],
      icon: data?.icon ?? 'work',
      repeat: data?.repeat
        ? DATA_REPEAT.find((item) => item.value === data?.repeat)
        : DATA_REPEAT[0]
    }
  })

  const startTime = watch('startTime')
  const dataColor = watch('color')

  const onConfirm = (date: Date) => {
    const newDate = moment(date)
    const start = moment(getValues('startTime')).set({
      year: newDate.year(),
      month: newDate.month(),
      date: newDate.date()
    })
    const end = moment(getValues('endTime')).set({
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

  const handleIcon = () => {
    bottomSheetRef.current?.present()
  }

  const onSubmit = (dataForm: IFormInput) => {
    const dataTask: TaskType = {
      ...data,
      ...dataForm,
      id: data?.id ?? generateUniqueId(),
      repeat: dataForm.repeat.value,
      finishTimes: data?.finishTimes ?? []
    }

    data?.id ? updateTask(dataTask) : setTask(dataTask)
    NavigationService.goBack()
  }

  const renderItem = ({ item }: { item: IconType }) => {
    const handleSelected = () => {
      setValue('icon', item)
      bottomSheetRef.current?.close()
    }
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={handleSelected}>
        <IconTask colorIcon={dataColor} typeIcon={item} style={styles.icon} />
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
    <View style={styles.container}>
      <NavigationBar title={data?.id ? 'Chỉnh sửa tác vụ' : 'Tác vụ mới'} />
      <View style={styles.body}>
        <View>
          <Text style={styles.title}>Bạn muốn làm gi?</Text>
          <Row gap="xs">
            <Controller
              name="icon"
              control={control}
              render={({ field: { value } }) => (
                <TouchableOpacity activeOpacity={0.8} onPress={handleIcon}>
                  <IconTask
                    colorIcon={dataColor}
                    typeIcon={value}
                    style={styles.icon}
                  />
                </TouchableOpacity>
              )}
            />
            <Controller
              name="title"
              control={control}
              rules={{
                required: 'Hãy nhập điều bạn muốn làm',
                validate: validateTitle()
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Hãy nhập điều bạn muốn làm"
                  value={value}
                  onChangeText={onChange}
                  notice={errors?.title?.message}
                  style={styles.input}
                />
              )}
            />
          </Row>
        </View>
        <View>
          <Text style={styles.title}>Thời gian tác vụ</Text>
          <View style={styles.containerTime}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleShow}
              style={styles.date}>
              <Text textAlign="center" fontWeight="bold" size="l" color={theme}>
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
      <BottomSheetModal
        ref={bottomSheetRef}
        enableDynamicSizing
        backdropComponent={renderBackdrop}>
        <BottomSheetFlatList
          numColumns={5}
          data={DATA_ICONS}
          renderItem={renderItem}
          columnWrapperStyle={styles.colunm}
          contentContainerStyle={[
            styles.BSList,
            { paddingBottom: bottom + space.m }
          ]}
        />
      </BottomSheetModal>
      <Button
        title={data?.id ? 'Lưu thay đổi' : 'Tạo tác vụ'}
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
