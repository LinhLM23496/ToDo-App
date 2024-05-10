export const objectEmpty = (object: any) => {
  if (!object) return true
  if (object && Object.keys(object).length <= 0) return true

  return false
}
