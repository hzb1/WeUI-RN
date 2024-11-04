import React, { useEffect } from 'react';
import { View, ColorValue } from 'react-native';
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import Svg, {
  Circle,
  Defs,
  LinearGradient,
  Stop,
  G,
  Path,
  SvgProps,
} from 'react-native-svg';

// svg组件 https://react-svgr.com/playground/?dimensions=false&native=true&svgo=false&typescript=true
const Loading = (props: SvgProps) => (
  <Svg
    viewBox="0 0 80 80"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <Defs>
      <LinearGradient
        x1="94.0869141%"
        y1="0%"
        x2="94.0869141%"
        y2="90.559082%"
        id="linearGradient-1"
      >
        <Stop stopColor={props.color} stopOpacity={0} offset="0%" />
        <Stop stopColor={props.color} stopOpacity={0.3} offset="100%" />
      </LinearGradient>
      <LinearGradient
        x1="100%"
        y1="8.67370605%"
        x2="100%"
        y2="90.6286621%"
        id="linearGradient-2"
      >
        <Stop stopColor={props.color} offset="0%" />
        <Stop stopColor={props.color} stopOpacity={0.3} offset="100%" />
      </LinearGradient>
    </Defs>
    <G
      stroke="none"
      strokeWidth={1}
      fill="none"
      fillRule="evenodd"
      opacity={0.9}
    >
      <G>
        <Path
          d="M40,0 C62.09139,0 80,17.90861 80,40 C80,62.09139 62.09139,80 40,80 L40,73 C58.2253967,73 73,58.2253967 73,40 C73,21.7746033 58.2253967,7 40,7 L40,0 Z"
          fill="url(#linearGradient-1)"
        />
        <Path
          d="M40,0 L40,7 C21.7746033,7 7,21.7746033 7,40 C7,58.2253967 21.7746033,73 40,73 L40,80 C17.90861,80 0,62.09139 0,40 C0,17.90861 17.90861,0 40,0 Z"
          fill="url(#linearGradient-2)"
        />
        <Circle id="Oval" fill={props.color} cx={40.5} cy={3.5} r={3.5} />
      </G>
    </G>
  </Svg>
);

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

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Animated.View style={[animatedStyle]}>
        <Loading height={size} width={size} color={color} />
      </Animated.View>
    </View>
  );
};

export default LoadingSpinner;
