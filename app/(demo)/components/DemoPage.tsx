import { ReactNode } from 'react';
import { View, Text, ViewStyle, StyleSheet, Animated } from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import ScrollView = Animated.ScrollView;

const DemoPage = ({
  children,
  title,
  desc,
  style,
}: {
  children: ReactNode;
  title: string;
  desc: string;
  style?: ViewStyle;
}) => {
  return (
    <SafeAreaView style={[styles.container, style]}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.desc}>{desc}</Text>
        </View>

        <View style={styles.body}>{children}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 40,
    paddingTop: 20,
  },
  title: {
    textAlign: 'left',
    fontSize: 20,
    fontWeight: '400',
  },
  desc: {
    marginTop: 4,
    textAlign: 'left',
    fontSize: 14,
  },
  body: {},
});

export default DemoPage;
