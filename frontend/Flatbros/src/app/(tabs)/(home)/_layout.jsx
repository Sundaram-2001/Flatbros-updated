import { Stack } from 'expo-router'

export default function HomeStack() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="properties" options={{ headerShown: false }} />
      <Stack.Screen name="property-details" options={{ title: 'Property details' }} />
    </Stack>
  )
}
