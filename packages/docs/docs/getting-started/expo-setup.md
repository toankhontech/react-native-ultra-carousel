---
sidebar_position: 3
title: Expo Setup
---

# Expo Setup

Ultra Carousel works with Expo SDK 49+ using the Expo development build or prebuild workflow.

## Installation

```bash
npx expo install react-native-ultra-carousel react-native-reanimated react-native-gesture-handler
```

Using `npx expo install` ensures compatible versions are installed for your Expo SDK.

## Babel Configuration

Add the Reanimated plugin to your `babel.config.js`:

```js title="babel.config.js"
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-reanimated/plugin'], // Must be last
  };
};
```

After changing the Babel config, clear the bundler cache:

```bash
npx expo start --clear
```

## App Entry Point

Wrap your app with `GestureHandlerRootView`:

```tsx title="App.tsx"
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* Your app content */}
    </GestureHandlerRootView>
  );
}
```

If you are using Expo Router, wrap the root layout:

```tsx title="app/_layout.tsx"
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack />
    </GestureHandlerRootView>
  );
}
```

## Expo Go Limitations

:::caution
Expo Go does **not** support custom native modules. You need a **development build** to use Ultra Carousel.
:::

Create a development build:

```bash
# iOS
npx expo run:ios

# Android
npx expo run:android
```

Or use EAS Build:

```bash
eas build --profile development --platform ios
eas build --profile development --platform android
```

## Using with Expo Router

Ultra Carousel integrates seamlessly with Expo Router. No additional configuration is required beyond the gesture handler setup shown above.

```tsx title="app/index.tsx"
import { UltraCarousel } from 'react-native-ultra-carousel';

export default function HomeScreen() {
  return (
    <UltraCarousel
      data={items}
      preset="coverflow"
      renderItem={({ item }) => <Card item={item} />}
    />
  );
}
```

## Troubleshooting

### "Reanimated plugin not found"

Clear the Metro bundler cache:

```bash
npx expo start --clear
```

### "GestureHandler not initialized"

Ensure `GestureHandlerRootView` wraps your entire app, including navigation containers.

### Build fails on EAS

Verify your `app.json` includes the required plugins:

```json title="app.json"
{
  "expo": {
    "plugins": [
      "react-native-reanimated"
    ]
  }
}
```
