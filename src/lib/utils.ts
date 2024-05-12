import moment, { Moment } from 'moment'

const TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

export const objectEmpty = (object: any) => {
  if (!object) return true
  if (object && Object.keys(object).length <= 0) return true

  return false
}

export const formatDateTime = (time: string) => {
  return moment(time).format(TIME_FORMAT)
}

export const formatDate = (time: string) => {
  return moment(time).format('YYYY-MM-DD')
}

export const formatTime = (time: string) => {
  return moment(time).format('HH:mm')
}

export const periodTime = (startTime: string, endTime: string) => {
  const period = `${formatTime(startTime)} - ${formatTime(endTime)}`
  const total = moment(endTime).diff(moment(startTime), 'minutes')

  if (total > 60) {
    const hours = Math.floor(total / 60)
    const minutes = total % 60
    return `${period} - ${hours} giờ${minutes ? ` ${minutes} phút` : ''}`
  }

  return `${period} - ${total} phút`
}

export const generateTimeList = (): string[] => {
  const timeList = []

  const startTime = moment().startOf('day')
  const endTime = moment().endOf('day').subtract(15, 'minutes')

  while (startTime.isSameOrBefore(endTime)) {
    timeList.push(nearestRoundedTime(startTime))

    startTime.add(15, 'minutes')
  }

  return timeList
}

// Tính toán thời gian gần nhất trước hoặc sau để làm tròn
export const nearestRoundedTime = (time: Moment): string => {
  const remainder = time.minutes() % 15
  const roundedTime = time
    .clone()
    .startOf('hour')
    .add(Math.round(time.minutes() / 15) * 15, 'minutes')
  const resTime = remainder < 7.5 ? roundedTime.add(15, 'minutes') : roundedTime
  return resTime.format(TIME_FORMAT).toString()
}
