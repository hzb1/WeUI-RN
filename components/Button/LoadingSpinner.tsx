import React, { useEffect } from 'react';
import { View, ColorValue } from 'react-native';
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';

// 定义组件并添加 props 支持
const LoadingSpinner = ({
  size = 20,
  color = 'rgba(255, 255, 255, 1)',
  duration = 1000,
}: {
  size?: number;
  color?: ColorValue;
  duration?: number;
}) => {
  // 初始化旋转角度值
  const rotation = useSharedValue(0);

  // 组件挂载时启动动画
  useEffect(() => {
    // 使用 withRepeat 和 withTiming 创建无限循环的动画
    rotation.value = withRepeat(
      withTiming(360, { duration, easing: Easing.linear }),
      -1, // -1 表示无限次循环
      false, // 不在每次循环中反向旋转
    );
  }, [duration, rotation]);

  // 创建旋转样式
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  // 半径和线宽根据大小动态调整
  const strokeWidth = 2; // 线宽可以根据需要进行调整
  const radius = size / 2 - strokeWidth; // 调整为合适的半径

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Animated.View style={[animatedStyle]}>
        <Svg height={size} width={size} viewBox={`0 0 ${size} ${size}`}>
          <Defs>
            <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor={color} stopOpacity="0.8" />
              <Stop offset="100%" stopColor={color} stopOpacity="0" />
            </LinearGradient>
          </Defs>
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="url(#grad)"
            strokeWidth={strokeWidth}
            fill="none"
          />
        </Svg>
      </Animated.View>
    </View>
  );
};

export default LoadingSpinner;
