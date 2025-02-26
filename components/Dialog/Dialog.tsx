import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';

import Modal, { ModalProps } from '@/components/Modal/Modal';
import useTheme from '@/components/style/theme/useTheme';

interface DialogProps extends Omit<ModalProps, 'contentPosition'> {
  // 标题
  title?: string;
  // 内容
  content?: string;
  // 确认事件，点击确认按钮时触发
  onConfirm: () => void;
  // 取消事件，点击取消按钮时触发
  onCancel: () => void;
  // 点击遮罩层时触发
  // onMaskPress?: () => void;
  // 垂直操作栏
  verticalAction?: boolean;
  // 确认按钮类型 primary | warn
  confirmType?: 'primary' | 'warn';
}

const Dialog = (props: DialogProps) => {
  const {
    title,
    content,
    confirmType,
    onCancel,
    onConfirm,
    verticalAction = false,
    ...modalProps
  } = props;
  const styles = useStyles();

  return (
    <Modal {...modalProps} contentPosition={'center'}>
      <View style={styles.dialog}>
        {title && content ? (
          <>
            <View style={styles.dialog__hd}>
              <Text style={styles.dialog__title}>{title}</Text>
            </View>

            <View style={styles.dialog__bd}>
              <Text style={styles.dialog__content}>{content}</Text>
            </View>
          </>
        ) : (
          <View
            style={[styles.dialog__hd, { paddingBottom: 0, marginBottom: 32 }]}
          >
            <Text style={styles.dialog__title}>{content}</Text>
          </View>
        )}

        <View
          style={[
            styles.dialog__ft,
            {
              flexDirection: verticalAction ? 'column-reverse' : 'row',
            },
          ]}
        >
          <Pressable
            onPress={onCancel}
            style={({ pressed }) => {
              const s: StyleProp<ViewStyle> = {
                borderTopWidth: styles.dialog__ft.borderTopWidth,
                borderTopColor: styles.dialog__ft.borderTopColor,
              };
              if (pressed) {
                return [
                  styles.dialog__btn,
                  styles.dialog__btnDefault,
                  styles.dialog__btn_active,
                  verticalAction && s,
                ];
              }
              return [
                styles.dialog__btn,
                styles.dialog__btnDefault,
                verticalAction && s,
              ];
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
            <Text
              style={[
                styles.dialog__btnPrimaryText,
                confirmType === 'warn' && styles.dialog__btnWarnText,
              ]}
            >
              主操作
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const useStyles = () => {
  const themeStyle = useTheme();

  return StyleSheet.create({
    // container: {
    //   flex: 1,
    //   justifyContent: 'center',
    //   alignItems: 'center',
    // },
    // dialogMask: {
    //   position: 'absolute',
    //   top: 0,
    //   left: 0,
    //   right: 0,
    //   bottom: 0,
    //   backgroundColor: 'rgba(0, 0, 0, 0.5)', // 透明的遮罩层
    // },

    dialog: {
      width: 320,
      marginHorizontal: 'auto',
      zIndex: 5000,
      backgroundColor: themeStyle['BG-2'],
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
      borderTopColor: themeStyle['DIALOG-LINE-COLOR'],
      // borderTopColor: 'rgba(0, 0, 0, 0.1)',
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
      // backgroundColor: '#fff',
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
      userSelect: 'none',
    },

    dialog__btnWarnText: {
      color: themeStyle['RED'],
    },

    dialog__btnDefault: {
      borderRightWidth: StyleSheet.hairlineWidth,
      borderRightColor: themeStyle['DIALOG-LINE-COLOR'],
    },

    dialog__btnDefaultText: {
      fontWeight: '500',
      fontSize: 17,
      color: themeStyle['FG-HALF'],
      textAlign: 'center',
      userSelect: 'none',
    },
  });
};

export default Dialog;
