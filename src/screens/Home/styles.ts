import { StyleSheet } from 'react-native'
import { avatarSize, color, colorRange, fontSize, space } from 'themes'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorRange.gray[200]
  },
  containerCalendar: {
    height: 100,
    paddingTop: space.m,
    paddingBottom: space.xs
  },
  containerList: {
    backgroundColor: color.white,
    borderTopLeftRadius: space.l,
    borderTopRightRadius: space.l
  },
  list: {
    gap: space.m,
    paddingTop: space.m
  },
  iconContainer: {
    paddingHorizontal: space.xxs
  },
  headerStyle: {
    color: color.black,
    fontSize: fontSize.l
  },
  highlight: {
    color: color.white
  },
  date: {
    color: color.black
  },
  button: {
    position: 'absolute',
    right: space.m,
    bottom: space.xxl
  },
  buttonSetting: {
    position: 'absolute',
    right: space.m,
    padding: space.xxs
  },
  empty: {
    width: avatarSize.xxl,
    height: 'auto',
    aspectRatio: 1,
    alignSelf: 'flex-end'
  }
})
