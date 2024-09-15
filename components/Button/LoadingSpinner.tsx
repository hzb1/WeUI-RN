import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing, ColorValue } from 'react-native';
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
  const spinValue = useRef(new Animated.Value(0)).current;

  // 动画效果
  useEffect(() => {
    const spinAnimation = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
    );
    spinAnimation.start();

    return () => spinAnimation.stop();
  }, [spinValue, duration]);

  // 将 Animated 值转换为旋转动画
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // 半径和线宽根据大小动态调整
  const strokeWidth = 2; // 线宽可以根据需要进行调整
  const radius = size / 2 - strokeWidth; // 调整为合适的半径

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
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
