import { StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { formatDateTime, formatTime } from 'lib'
import { Text } from 'components'
import DatePicker from 'react-native-date-picker'
import { color, space } from 'themes'

type Props = {
  value: string
  onChange: (value: string) => void
  minimumDate?: Date
}

const CardPicker = ({ value, onChange, minimumDate }: Props) => {
  const [open, setOpen] = useState(false)

  const onConfirm = (date: Date) => {
    onChange(formatDateTime(date.toISOString()))
    setOpen(false)
  }

  const handleShow = () => {
    setOpen(true)
  }
  const handleCancel = () => {
    setOpen(false)
  }
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handleShow}
      style={styles.card}>
      <Text textAlign="center">{formatTime(value)}</Text>

      <DatePicker
        modal
        mode="time"
        locale="vi-VN"
        open={open}
        date={new Date(value)}
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
    backgroundColor: color.info,
    alignSelf: 'center',
    paddingHorizontal: space.l,
    paddingVertical: space.xs,
    borderRadius: space.xs
  }
})
