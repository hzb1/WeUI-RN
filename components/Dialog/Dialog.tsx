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
  // 标题
  title?: string;
  // 内容
  content?: string;
  // 关闭事件
  onClose: () => void;
  // 确认事件，点击确认按钮时触发
  onConfirm: () => void;
  // 取消事件，点击取消按钮时触发
  onCancel: () => void;
  // 点击遮罩层时触发
  onMaskPress?: () => void;
  // 操作栏方向，默认为水平方向
  actionDirection?: 'horizontal' | 'vertical';
}

const Dialog = (props: DialogProps) => {
  const {
    title,
    content,
    actionDirection,
    onClose,
    onMaskPress,
    onCancel,
    onConfirm,
    ...modalProps
  } = props;
  const styles = useStyles();

  return (
    <Modal
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
      {...modalProps}
    >
      <View style={styles.dialogMask}>
        <Mask onPress={onMaskPress}></Mask>
        <View style={styles.dialog}>
          <View style={styles.dialog__hd}>
            <Text style={styles.dialog__title}>{title}</Text>
          </View>

          <View style={styles.dialog__bd}>
            <Text style={styles.dialog__content}>{content}</Text>
          </View>

          <View
            style={[
              styles.dialog__ft,
              {
                flexDirection:
                  actionDirection === 'vertical' ? 'column' : 'row',
              },
            ]}
          >
            <Pressable
              onPress={onCancel}
              style={({ pressed }) => {
                if (pressed) {
                  return [
                    styles.dialog__btn,
                    styles.dialog__btnDefault,
                    styles.dialog__btn_active,
                  ];
                }
                return [styles.dialog__btn, styles.dialog__btnDefault];
              }}
            >
              <Text style={styles.dialog__btnDefaultText}>辅助操作</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => {
                if (pressed) {
                  return [styles.dialog__btn, styles.dialog__btn_active];
                }
                return [styles.dialog__btn];
              }}
              onPress={onConfirm}
            >
              <Text style={styles.dialog__btnPrimaryText}>主操作</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

Dialog.confirm = () => {};

const useStyles = () => {
  const themeStyle = useTheme();

  return StyleSheet.create({
    dialogMask: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },

    dialog: {
      width: 320,
      marginHorizontal: 'auto',
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

    dialog__btn_active: {
      backgroundColor: themeStyle['BG-COLOR-ACTIVE'],
    },

    dialog__btnPrimaryText: {
      fontWeight: '500',
      fontSize: 17,
      textAlign: 'center',
      color: themeStyle['LINK'],
    },

    dialog__btnDefault: {
      borderRightWidth: StyleSheet.hairlineWidth,
      borderRightColor: 'rgba(0, 0, 0, 0.1)',
    },

    dialog__btnDefaultText: {
      fontWeight: '500',
      fontSize: 17,
      color: themeStyle['FG-HALF'],
      textAlign: 'center',
    },
  });
};

export default Dialog;
