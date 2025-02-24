import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  GestureResponderEvent,
  Dimensions,
} from 'react-native';
import Animated, {
  Easing,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface MaskProps {
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
  zIndex?: number;
  closeOnPress?: boolean;
  children?: React.ReactNode;
  onPress?: (e: GestureResponderEvent) => void;
  style?: object;
  animationDuration?: number;
}

const { height, width } = Dimensions.get('window');

const Mask: React.FC<MaskProps> = ({
  visible,
  onVisibleChange,
  zIndex = 1000,
  closeOnPress = true,
  children,
  onPress,
  style,
  animationDuration = 200,
}) => {
  const opacity = useSharedValue(0); // 动画的透明度值

  // 监听 `visible` 变化，进行淡入或淡出
  useEffect(() => {
    if (visible) {
      console.log('显示mask');
      opacity.value = withTiming(1, {
        duration: animationDuration,
        easing: Easing.linear,
      });
    } else {
      console.log('隐藏mask');
      opacity.value = withTiming(0, {
        duration: animationDuration,
        easing: Easing.linear,
      });
    }

    return () => {
      opacity.value = withTiming(0, {
        duration: animationDuration,
        easing: Easing.linear,
      });
    };
  }, [visible, animationDuration, opacity]);

  // 生成透明度变化的动画样式
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      zIndex,
      // 当透明度为0时，完全移除视图
      display: opacity.value === 0 ? 'none' : 'flex',
    };
  });

  // 处理点击事件
  const handlePress = (e: GestureResponderEvent) => {
    if (closeOnPress) {
      onVisibleChange?.(false);
    }
    if (onPress) {
      onPress(e);
    }
  };

  return (
    // 使用条件渲染避免遮罩层占用空间
    visible || opacity.value > 0 ? (
      <Animated.View style={[styles.mask, animatedStyle, style]}>
        {children && <View style={styles.content}>{children}</View>}
        <TouchableWithoutFeedback onPress={handlePress}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      </Animated.View>
    ) : null
  );
};

const styles = StyleSheet.create({
  mask: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 透明的遮罩层
  },
  content: {
    zIndex: 1,
  },
});

export default Mask;
