export const validateTextMinLength = (text: string, length: number) =>
  text?.trim()?.length >= length

export const validateTextMaxLength = (text: string, length: number) =>
  text?.trim()?.length <= length

const lengthWrong_2 = 'Chỉ từ 6 đến 100 ký tự'

export const validateTitle = () => ({
  checkMinValue: (v: string) => validateTextMinLength(v, 6) || lengthWrong_2,
  checkMaxValue: (v: string) => validateTextMaxLength(v, 100) || lengthWrong_2
})
