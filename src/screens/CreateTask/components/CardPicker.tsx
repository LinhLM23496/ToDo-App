import { Keyboard, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { formatDateTime, formatTime } from 'lib'
import { Text } from 'components'
import DatePicker from 'react-native-date-picker'
import { color, space } from 'themes'
import { useThemeStore } from 'stores'
import moment from 'moment'

type Props = {
  startTime: string
  diffTime: number
  onChange: (value: string) => void
  minimumDate?: Date
}

const CardPicker = ({ startTime, diffTime, onChange, minimumDate }: Props) => {
  const { theme } = useThemeStore()
  const [open, setOpen] = useState(false)
  const endTime = moment(startTime).add(diffTime, 'minutes')

  const onConfirm = (date: Date) => {
    onChange(formatDateTime(date.toISOString()))
    setOpen(false)
  }

  const handleShow = () => {
    Keyboard.dismiss()
    setOpen(true)
  }
  const handleCancel = () => {
    setOpen(false)
  }
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handleShow}
      style={[styles.card, { backgroundColor: theme }]}>
      <Text textAlign="center" fontWeight="500" color={color.white}>
        {formatTime(startTime)} - {formatTime(endTime)}
      </Text>

      <DatePicker
        modal
        mode="time"
        locale="vi-VN"
        open={open}
        date={new Date(startTime)}
        onConfirm={onConfirm}
        onCancel={handleCancel}
        minimumDate={minimumDate}
        title={'Chọn giờ'}
        confirmText="Chọn"
        cancelText="Hủy"
      />
    </TouchableOpacity>
  )
}
export default CardPicker

const styles = StyleSheet.create({
  card: {
    alignSelf: 'center',
    paddingHorizontal: space.l,
    paddingVertical: space.xs,
    borderRadius: space.xs
  }
})
