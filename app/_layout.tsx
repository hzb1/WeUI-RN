import { type NativeStackNavigationOptions } from '@react-navigation/native-stack/src/types';
import { Stack } from 'expo-router';
import { useMemo } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Provider from '@/components/Provider/Provider';

export default function RootLayout() {
  return (
    <Provider>
      <SafeAreaProvider>
        <StackComponent />
      </SafeAreaProvider>
    </Provider>
  );
}

const StackComponent = () => {
  // const themeStyles = useTheme();

  const screenOptions: NativeStackNavigationOptions = useMemo(() => {
    return {
      headerShown: false,
      // statusBarBackgroundColor: themeStyles['BG-0'],
      statusBarBackgroundColor: 'transparent',
      statusBarTranslucent: true,
      animation: 'ios_from_right',
      // statusBarStyle: theme === 'dark' ? 'light' : 'dark',
    };
  }, []);

  return (
    <>
      <Stack screenOptions={screenOptions}>
        <Stack.Screen name="(home)/index" />
        <Stack.Screen name="(demo)/button/index" />
        <Stack.Screen name="(demo)/model/index" />
        <Stack.Screen name="(demo)/dialog/index" />
        <Stack.Screen name="(demo)/half-screen-dialog/index" />
        <Stack.Screen name="(demo)/input/index" />
        <Stack.Screen name="(demo)/list/index" />
        <Stack.Screen name="(demo)/actionSheet/index" />
        <Stack.Screen
          name="sourceCode/index"
          options={
            {
              // headerShown: false,
              // headerBackTitle: '返回',
              // title: '代码演示',
              // presentation: 'modal',
            }
          }
        />
      </Stack>
    </>
  );
};
