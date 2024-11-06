import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
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
  );
}
