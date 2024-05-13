import { color, iconSize, space } from 'themes'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto',
    borderWidth: 1,
    gap: space.xs
  },
  icon: {
    width: iconSize.m,
    height: 'auto',
    aspectRatio: 1
  },
  containerSplit: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    gap: space.xxs,
    marginLeft: space.xs
  },
  line: {
    width: 1,
    height: iconSize.m,
    backgroundColor: color.white
  }
})
