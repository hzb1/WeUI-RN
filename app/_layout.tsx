import { Stack } from 'expo-router';

import Provider from '@/components/Provider/Provider';

export default function RootLayout() {
  return (
    <Provider>
      <Stack screenOptions={{ headerShown: false, animation: 'ios' }}>
        <Stack.Screen name="(home)/index" />
        <Stack.Screen name="(demo)/button/index" />
        <Stack.Screen name="(demo)/dialog/index" />
        <Stack.Screen
          name="sourceCode/index"
          options={{
            headerShown: true,
            headerBackTitle: '返回',
            title: '代码演示',
            animation: 'slide_from_bottom',
          }}
        />
      </Stack>
    </Provider>
  );
}
