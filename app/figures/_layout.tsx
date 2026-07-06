import { Stack } from 'expo-router';

export default function FiguresLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="[figureId]" />
    </Stack>
  );
}
