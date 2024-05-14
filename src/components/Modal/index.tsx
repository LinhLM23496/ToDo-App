import {
  StyleSheet,
  View,
  Modal as RNModal,
  TouchableWithoutFeedback
} from 'react-native'
import React, {
  ReactNode,
  Ref,
  forwardRef,
  useImperativeHandle,
  useState
} from 'react'
import { ModalRef } from './types'
import { space } from 'themes'

type Props = {
  children: ReactNode
}

const Modal = ({ children }: Props, ref: Ref<ModalRef>) => {
  const [modalVisible, setModalVisible] = useState(false)

  useImperativeHandle(ref, () => ({
    show: () => setModalVisible(true),
    hide: () => setModalVisible(false)
  }))

  const handleClose = () => {
    setModalVisible(false)
  }
  return (
    <RNModal
      animationType="fade"
      statusBarTranslucent
      transparent={true}
      visible={modalVisible}
      onRequestClose={handleClose}>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={handleClose}>
          <View style={styles.backDrop} />
        </TouchableWithoutFeedback>
        <View style={styles.body}>{children}</View>
      </View>
    </RNModal>
  )
}

export default forwardRef(Modal)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  backDrop: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  body: {
    position: 'absolute',
    minHeight: 200,
    width: '80%',
    backgroundColor: 'white',
    borderRadius: space.m,
    padding: space.s
  }
})
