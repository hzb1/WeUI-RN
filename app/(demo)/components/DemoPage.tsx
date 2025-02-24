import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { ReactNode } from 'react';
import {
  View,
  Text,
  ViewStyle,
  StyleSheet,
  Animated,
  Pressable,
  TouchableOpacity,
} from 'react-native';
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
  const router = useRouter();

  const onCodePress = () => {
    router.push(`/sourceCode?title=${String(title).trim().toLowerCase()}`);
  };

  return (
    <SafeAreaView style={[styles.container, style]}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.desc}>{desc}</Text>

          <TouchableOpacity style={styles.code} onPress={onCodePress}>
            <MaterialIcons name={'code'} size={30} color={styles.code.color} />
          </TouchableOpacity>
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
    body: {
      position: 'static',
    },
    code: {
      position: 'absolute',
      right: 40,
      top: 20,
      // color: 'red',
      color: theme['FG-1'],
    },
  });
};

export default DemoPage;
