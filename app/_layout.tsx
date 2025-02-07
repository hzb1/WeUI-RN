import { NativeStackNavigationOptions } from '@react-navigation/native-stack/src/types';
import { Stack } from 'expo-router';
import { useMemo } from 'react';

import Provider from '@/components/Provider/Provider';
import useTheme from '@/components/style/theme/useTheme';

export default function RootLayout() {
  return (
    <Provider>
      <StackComponent />
    </Provider>
  );
}

const StackComponent = () => {
  const themeStyles = useTheme();

  const screenOptions: NativeStackNavigationOptions = useMemo(() => {
    return {
      headerShown: false,
      statusBarBackgroundColor: themeStyles['BG-0'],
      animation: 'ios_from_right',
      // statusBarStyle: theme === 'dark' ? 'light' : 'dark',
    };
  }, [themeStyles]);

  return (
    <>
      <Stack screenOptions={screenOptions}>
        <Stack.Screen name="(home)/index" />
        <Stack.Screen name="(demo)/button/index" />
        <Stack.Screen name="(demo)/dialog/index" />
        <Stack.Screen name="(demo)/input/index" />
        <Stack.Screen name="(demo)/list/index" />
        <Stack.Screen
          name="sourceCode/index"
          options={{
            headerShown: false,
            headerBackTitle: '返回',
            title: '代码演示',
            presentation: 'modal',
          }}
        />
      </Stack>
    </>
  );
};
