import React, { useState, useCallback, type ReactNode, useEffect } from 'react';
import { Modal, View, StyleSheet, Pressable, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  runOnJS,
} from 'react-native-reanimated';

export interface BottomSheetProps {
  // 是否打开
  open: boolean;
  // 打开状态变化时触发
  onOpenChange: (open: boolean) => void;
  // children
  children: ReactNode;
  // 动画时长, 默认200ms
  duration?: number;
  // 点击蒙层是否关闭，默认true
  closeOnMaskPress?: boolean;
  // 关闭事件，在动画结束后触发
  onCloseAnimationEnd?: () => void;
}

const BottomSheet = ({
  open,
  onOpenChange,
  children,
  duration = 200,
  closeOnMaskPress = true,
  onCloseAnimationEnd,
}: BottomSheetProps) => {
  const [localVisible, setLocalVisible] = useState(open);
  const height = useSharedValue(0);
  const progress = useSharedValue(1); // 初始值设为1，对应关闭状态

  useEffect(() => {
    if (open) {
      // 打开Modal并启动动画
      setLocalVisible(true);
      progress.value = withTiming(0, { duration, easing: Easing.linear });
    } else {
      // 关闭动画，完成后隐藏Modal
      progress.value = withTiming(
        1,
        { duration, easing: Easing.linear },
        (isFinished) => {
          if (isFinished) {
            runOnJS(setLocalVisible)(false);
            if (onCloseAnimationEnd) {
              runOnJS(onCloseAnimationEnd)();
            }
          }
        },
      );
    }
  }, [open, duration, progress, onCloseAnimationEnd]);

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: progress.value * 2 * height.value }],
  }));

  const maskAnimatedStyle = useAnimatedStyle(() => ({
    opacity: 1 - progress.value,
  }));

  const handleClose = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  const onMaskPress = useCallback(() => {
    if (closeOnMaskPress) {
      handleClose();
    }
  }, [closeOnMaskPress, handleClose]);

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={localVisible}
      onRequestClose={handleClose}
    >
      {/*<Animated.View style={[styles.mask, maskAnimatedStyle]}>*/}
      {/*  <Pressable onPress={onMaskPress} style={{ flex: 1 }} />*/}
      {/*</Animated.View>*/}
      <Pressable
        onPress={onMaskPress}
        style={[styles.mask, maskAnimatedStyle]}
      />
      <Animated.View
        style={[styles.bottomSheet, sheetStyle]}
        onLayout={(e) => {
          height.value = e.nativeEvent.layout.height;
        }}
      >
        {children}
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  mask: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  bottomSheet: {
    zIndex: 1001,
    width: '100%',
    // backgroundColor: 'white',
    // borderTopLeftRadius: 12,
    // borderTopRightRadius: 12,
    // padding: 16,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default BottomSheet;
