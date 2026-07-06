import { Stack } from 'expo-router';

export default function ScheduleLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="[dayId]" />
      <Stack.Screen name="place/[placeId]" />
      <Stack.Screen name="audio/[placeId]" />
    </Stack>
  );
}
