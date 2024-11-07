import { forwardRef, ReactNode, useEffect, useCallback } from 'react';
import {
  GestureResponderEvent,
  Pressable,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const Mask = ({
  children,
  onPress,
  style,
}: {
  children?: ReactNode;
  onPress?: (e: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
}) => {
  const opacity = useSharedValue(1);

  const fadeIn = useCallback(() => {
    opacity.value = withTiming(1, { duration: 10200 });
  }, [opacity]);

  const fadeOut = useCallback(() => {
    opacity.value = withTiming(0, { duration: 10200 });
  }, [opacity]);

  // useEffect(() => {
  //   fadeIn();
  //   return () => {
  //     fadeOut();
  //   };
  // }, [fadeIn, fadeOut]);

  // const animatedStyles = useAnimatedStyle(() => ({
  //   opacity: opacity.value,
  // }));

  return (
    <Animated.View
      style={[
        {
          flex: 1,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1000,
        },
        // animatedStyles,
      ]}
    >
      <Pressable
        onPress={onPress}
        style={[
          {
            flex: 1,
          },
        ]}
      ></Pressable>
    </Animated.View>
  );
};

export default Mask;
