import type { PropsWithChildren, ReactElement } from 'react';
import { useState } from 'react';
import { StyleSheet, View, LayoutChangeEvent } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  useAnimatedScrollHandler,
  Extrapolation,
} from 'react-native-reanimated';

type Props = PropsWithChildren<{
  headerImage: ReactElement;
}>;

export default function ParallaxScrollView({ children, headerImage }: Props) {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useSharedValue(0);
  const [headerHeight, setHeaderHeight] = useState(0);

  const onLayoutHeader = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setHeaderHeight(height);
  };

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollOffset.value = event.contentOffset.y;
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    if (headerHeight === 0) return {}; // Ensure headerHeight is set

    const translateY = interpolate(
      scrollOffset.value,
      [-headerHeight, 0, headerHeight],
      [-headerHeight / 2, 0, headerHeight * 0.75],
      Extrapolation.EXTEND, // Ensure the values do not exceed the expected range
    );

    const scale = interpolate(
      scrollOffset.value,
      [-headerHeight, 0, headerHeight],
      [2, 1, 1],
      Extrapolation.EXTEND, // Ensure the values do not exceed the expected range
    );

    return {
      transform: [{ translateY }, { scale }],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        bounces={true}
        overScrollMode="always"
      >
        <Animated.View
          onLayout={onLayoutHeader}
          style={[styles.header, headerAnimatedStyle]}
        >
          {headerImage}
        </Animated.View>
        <View style={styles.content}>{children}</View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    // No fixed height
  },
  content: {
    overflow: 'hidden',
  },
});
