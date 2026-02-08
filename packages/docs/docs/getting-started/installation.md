---
sidebar_position: 1
title: Installation
---

# Installation

## Install the package

```bash
# Using yarn
yarn add react-native-ultra-carousel

# Using npm
npm install react-native-ultra-carousel
```

## Peer Dependencies

Ultra Carousel requires the following peer dependencies:

```bash
# Using yarn
yarn add react-native-reanimated react-native-gesture-handler

# Using npm
npm install react-native-reanimated react-native-gesture-handler
```

### Version Requirements

| Dependency | Minimum Version |
|---|---|
| `react-native` | 0.71+ |
| `react-native-reanimated` | 3.3.0+ |
| `react-native-gesture-handler` | 2.12.0+ |
| `react` | 18.0+ |

## Babel Configuration

Add the Reanimated Babel plugin to your `babel.config.js`:

```js title="babel.config.js"
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: ['react-native-reanimated/plugin'], // Must be last
};
```

:::warning
The `react-native-reanimated/plugin` must be listed **last** in the plugins array.
:::

## Gesture Handler Setup

Wrap your app root with `GestureHandlerRootView`:

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

## Platform-Specific Setup

### iOS

After installing dependencies, run pod install:

```bash
cd ios && pod install
```

### Android

No additional setup is required for Android. Gesture Handler and Reanimated configure themselves automatically via autolinking.

## Verifying the Installation

Create a simple test to confirm everything is working:

```tsx
import { UltraCarousel } from 'react-native-ultra-carousel';

const data = [{ key: '1' }, { key: '2' }, { key: '3' }];

export default function Test() {
  return (
    <UltraCarousel
      data={data}
      preset="slide"
      renderItem={({ item }) => (
        <View style={{ width: 300, height: 200, backgroundColor: '#ccc' }} />
      )}
    />
  );
}
```

If the carousel renders and swipes without errors, the installation is complete.

## Next Steps

- [Quick Start](/docs/getting-started/quick-start) -- Build your first carousel in 2 minutes
- [Expo Setup](/docs/getting-started/expo-setup) -- Instructions for Expo projects
