/**
 * @file Root layout
 * @description Navigation structure for the playground app
 */

import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.flex}>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#1a1a2e' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: '700' },
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Ultra Carousel' }} />
        <Stack.Screen name="preset/[name]" options={{ title: 'Preset Demo' }} />
        <Stack.Screen name="playground" options={{ title: 'Playground' }} />
        <Stack.Screen name="benchmarks" options={{ title: 'Benchmarks' }} />
        <Stack.Screen name="custom" options={{ title: 'Custom Builder' }} />
      </Stack>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
});
