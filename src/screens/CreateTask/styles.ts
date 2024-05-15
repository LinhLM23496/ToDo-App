import { StyleSheet } from 'react-native'
import { colorRange, space } from 'themes'

export const styles = StyleSheet.create({
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
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    paddingHorizontal: space.l,
    paddingVertical: space.xs,
    gap: space.xxs
  },
  dashed: {
    flex: 1,
    marginHorizontal: space.xs,
    borderWidth: 1,
    borderStyle: 'dashed'
  },
  button: {
    marginHorizontal: space.m,
    position: 'absolute',
    bottom: space.m
  },
  subButton: {
    flex: 1
  },
  input: {
    flex: 1
  },
  icon: {
    borderRadius: space.xs
  },
  colunm: {
    justifyContent: 'space-between'
  },
  BSList: {
    padding: space.m
  }
})
