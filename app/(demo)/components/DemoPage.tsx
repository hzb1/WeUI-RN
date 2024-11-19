import { ReactNode } from 'react';
import { View, Text, ViewStyle, StyleSheet, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import useTheme from '@/components/style/theme/useTheme';

const ScrollView = Animated.ScrollView;

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
  const styles = useStyles();
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

const useStyles = () => {
  const theme = useTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme['BG-0'],
    },
    header: {
      padding: 40,
      paddingTop: 20,
    },
    title: {
      textAlign: 'left',
      fontSize: 20,
      fontWeight: '400',
      color: theme['FG-0'],
    },
    desc: {
      marginTop: 4,
      textAlign: 'left',
      fontSize: 14,
      color: theme['FG-1'],
    },
    body: {},
  });
};

export default DemoPage;
