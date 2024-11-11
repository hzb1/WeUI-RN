import { Stack } from 'expo-router';

import Provider from '@/components/Provider/Provider';

export default function RootLayout() {
  return (
    <Provider>
      <Stack>
        <Stack.Screen
          name="(home)/index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(demo)/button/index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(demo)/dialog/index"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </Provider>
  );
}
