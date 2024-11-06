// import { createPortal } from 'react-dom';

import {
  Modal,
  ModalProps,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Mask from '@/components/Mask';
import useTheme from '@/components/style/theme/useTheme';

interface DialogProps extends ModalProps {
  onMaskPress?: () => void;
}

const Dialog = ({ visible, onMaskPress }: DialogProps) => {
  const styles = useStyles();

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      // onRequestClose={() => {
      //   setModalVisible(!modalVisible);
      // }}
    >
      <Mask style={styles.dialogMask} onPress={onMaskPress}>
        <View style={styles.dialog}>
          <View style={styles.dialog__hd}>
            <Text style={styles.dialog__title}>弹窗标题</Text>
          </View>

          <View style={styles.dialog__bd}>
            <Text style={styles.dialog__content}>
              弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内
            </Text>
          </View>

          <View style={styles.dialog__ft}>
            <Pressable
              style={({ pressed }) => {
                return [styles.dialog__btn, styles.dialog__btnDefault];
              }}
            >
              <Text style={styles.dialog__btnDefaultText}>辅助操作</Text>
            </Pressable>
            <Pressable style={[styles.dialog__btn, styles.dialog__btnPrimary]}>
              <Text style={styles.dialog__btnPrimaryText}>主操作</Text>
            </Pressable>
          </View>
        </View>
      </Mask>
    </Modal>
  );
};

const useStyles = () => {
  const themeStyle = useTheme();

  return StyleSheet.create({
    dialogMask: {
      justifyContent: 'center',
      alignItems: 'center',
    },

    dialog: {
      width: 320,
      marginHorizontal: 'auto',
      // backgroundColor: '#fff',
      zIndex: 5000,
      backgroundColor: '#fff',
      borderRadius: 12,
      overflow: 'scroll',
    },
    dialog__hd: {
      paddingTop: 32,
      paddingBottom: 16,
      paddingHorizontal: 24,
      justifyContent: 'center',
    },
    dialog__title: {
      fontWeight: 'bold',
      fontSize: 17,
      lineHeight: 17 * 1.4,
      color: themeStyle['FG-0'],
      textAlign: 'center',
    },
    dialog__bd: {
      paddingHorizontal: 24,
      marginBottom: 32,
    },
    dialog__content: {
      fontSize: 17,
      lineHeight: 17 * 1.4,
      color: themeStyle['FG-1'],
    },
    dialog__ft: {
      borderTopWidth: StyleSheet.hairlineWidth,
      // borderTopColor: themeStyle['DIALOG-LINE-COLOR'],
      borderTopColor: 'rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'row',
    },

    dialog__btn: {
      flex: 1,
      width: 'auto',
      // borderRadius: 0,
      paddingVertical: 20,
      paddingHorizontal: 8,
      textAlign: 'center',
      borderWidth: 0,
      backgroundColor: '#fff',
      overflow: 'hidden',
    },

    dialog__btnPrimary: {},

    dialog__btnPrimaryText: {
      fontWeight: 'bold',
      fontSize: 17,
      textAlign: 'center',
      color: themeStyle['LINK'],
    },

    dialog__btnDefault: {
      borderRightWidth: StyleSheet.hairlineWidth,
      borderRightColor: 'rgba(0, 0, 0, 0.1)',
    },

    dialog__btnDefaultText: {
      fontWeight: 'bold',
      fontSize: 17,
      color: themeStyle['FG-HALF'],
      textAlign: 'center',
    },
  });
};

export default Dialog;
