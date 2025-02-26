import React, {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  Pressable,
  View,
  Modal as NModal,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export interface ModalProps {
  /** 是否显示模态框 */
  open: boolean;
  /** 关闭事件回调 */
  onClose: () => void;
  /** 子组件 */
  children: ReactNode;
  /** 动画时长，默认200ms */
  duration?: number;
  /** 关闭动画结束后的回调 */
  onCloseAnimationEnd?: () => void;
  /** 点击蒙层是否允许关闭，默认true */
  closeOnMaskPress?: boolean;
  /** 蒙层颜色，默认rgba(0, 0, 0, 0.5) */
  maskColor?: string;
  /** 内容区域位置，默认center */
  contentPosition?: 'center' | 'top' | 'bottom';
}

const Modal = ({
  open,
  onClose,
  children,
  onCloseAnimationEnd,
  duration = 200,
  closeOnMaskPress = true,
  contentPosition = 'center',
  maskColor = 'rgba(0, 0, 0, 0.5)',
}: ModalProps) => {
  // 控制组件是否渲染，用于在动画完成后卸载组件
  const [localVisible, setLocalVisible] = useState(open);
  // 内容区域高度，用于滑动动画计算
  const height = useSharedValue(0);
  // 动画进度，0表示完全显示，1表示完全隐藏
  const animationProgress = useSharedValue(1);
  // 标记内容区域高度是否已测量
  const [isContentLayoutMeasured, setIsContentLayoutMeasured] = useState(false);

  // 处理打开/关闭动画
  useEffect(() => {
    if (open) {
      setLocalVisible(true);
      setIsContentLayoutMeasured(false); // 重置测量状态
    } else {
      // 关闭动画：进度从0到1，完成后隐藏组件
      // 计算出剩余时间
      const remainingDuration = duration * (1 - animationProgress.value);
      animationProgress.value = withTiming(
        1,
        { duration: remainingDuration, easing: Easing.linear },
        (isFinished) => {
          if (isFinished) {
            console.log('close animation finished', remainingDuration);
            runOnJS(setLocalVisible)(false);
            onCloseAnimationEnd && runOnJS(onCloseAnimationEnd)();
          }
        },
      );
    }
  }, [duration, onCloseAnimationEnd, open, animationProgress]);

  // 当内容高度测量完成且需要打开时启动动画
  useEffect(() => {
    if (open && isContentLayoutMeasured) {
      // 计算出剩余时间
      const remainingDuration = duration * animationProgress.value;
      animationProgress.value = withTiming(
        0,
        {
          duration: remainingDuration,
          easing: Easing.linear,
        },
        (finished) => {
          if (finished) {
            console.log('open animation finished', remainingDuration);
          }
        },
      );
    }
  }, [open, isContentLayoutMeasured, animationProgress, duration]);

  // 内容区域动画样式
  const contentAnimatedStyle = useAnimatedStyle(() => {
    // 根据位置决定动画类型：居中使用淡入淡出，上下使用滑动
    const isSlide = contentPosition !== 'center';

    if (!isSlide) {
      return { opacity: 1 - animationProgress.value };
    }

    // 滑动距离计算（使用2倍高度保证完全移出屏幕）
    const translateY = animationProgress.value * 2 * height.value;
    return {
      // 防止打开时闪烁,
      opacity: animationProgress.value > 0.8 ? 0 : 1,
      transform: [
        {
          translateY: contentPosition === 'bottom' ? translateY : -translateY,
          // translateY: contentPosition === 'bottom' ? '100%' : '-100%',
          // translateY: `${100}%`,
        },
      ],
    };
  }, [contentPosition, animationProgress, localVisible]);

  // 蒙层动画样式（仅透明度变化）
  const maskAnimatedStyle = useAnimatedStyle(() => ({
    opacity: 1 - animationProgress.value,
  }));

  // 关闭事件处理
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  // 蒙层点击事件
  const onMaskPress = useCallback(() => {
    closeOnMaskPress && handleClose();
  }, [closeOnMaskPress, handleClose]);

  // 容器布局样式
  const wrapperStyle: ViewStyle = useMemo(
    () => ({
      flex: 1,
      justifyContent:
        contentPosition === 'center'
          ? 'center'
          : contentPosition === 'top'
            ? 'flex-start'
            : 'flex-end',
      alignItems: 'center',
      // 安卓优化：防止父容器尺寸变化导致的布局抖动
      overflow: 'hidden',
    }),
    [contentPosition],
  );

  // 动画进行中
  // const isAnimating =
  //   animationProgress.get() > 0 && animationProgress.get() < 1;

  return (
    <NModal
      transparent
      visible={localVisible}
      onRequestClose={handleClose}
      animationType="none" // 禁用原生动画
    >
      <View style={wrapperStyle}>
        {/* 蒙层：半透明背景 */}
        <Animated.View
          style={[
            StyleSheet.absoluteFillObject,
            { backgroundColor: maskColor },
            maskAnimatedStyle,
          ]}
          renderToHardwareTextureAndroid={true} // 提升性能
        >
          <Pressable onPress={onMaskPress} style={{ flex: 1 }} />
        </Animated.View>

        {/* 内容区域 */}
        <Animated.View
          style={[contentAnimatedStyle]}
          onLayout={({ nativeEvent }) => {
            height.value = nativeEvent.layout.height;
            setIsContentLayoutMeasured(true);
          }}
          renderToHardwareTextureAndroid={true} // 提升性能
        >
          {children}
        </Animated.View>
      </View>
    </NModal>
  );
};

// const styles = StyleSheet.create({
//   content: {
//     // 内容样式可根据需要扩展
//   },
// });

export default Modal;
