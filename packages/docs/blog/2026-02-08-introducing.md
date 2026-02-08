---
slug: introducing-react-native-ultra-carousel
title: Introducing react-native-ultra-carousel
authors:
  - name: toankhontech
    url: https://github.com/toankhontech
tags: [release, react-native, carousel, animation]
---

# Introducing react-native-ultra-carousel

We are excited to announce the public release of **react-native-ultra-carousel** -- the ultimate carousel ecosystem for React Native.

<!-- truncate -->

## The Problem

Building carousels in React Native has always been a frustrating experience. The most popular library, `react-native-snap-carousel`, has been unmaintained since 2021 and never supported Reanimated. Newer libraries like `react-native-reanimated-carousel` improved the situation with native-thread animations, but still ship with only a handful of presets and no extensibility system.

We kept finding ourselves writing the same custom animation code, the same pagination components, and the same performance optimizations across every project. Ultra Carousel was born from the desire to solve this once and for all.

## What Ships Today

### 35+ Animation Presets

From simple slides and fades to 3D cubes, coverflow, tinder cards, origami folds, and more. Every preset runs on the native UI thread at 60 FPS via Reanimated worklets.

```tsx
<UltraCarousel data={data} preset="cube" renderItem={renderItem} />
```

Swap `"cube"` with any of the 35+ preset names. No additional configuration required.

### Plugin System

Extend carousel behavior without forking the library. Ultra Carousel includes built-in plugins for auto-play, lazy loading, parallax, analytics, and image prefetching. Creating your own plugin is straightforward:

```tsx
const myPlugin: CarouselPlugin = {
  name: 'my-plugin',
  onActiveIndexChange: (index) => {
    analytics.track('slide_view', { index });
  },
};
```

### Built-in Pagination

Five pagination styles out of the box: dots, lines, numbers, progress bars, and fully custom renderers. No need to build your own pagination component.

```tsx
<UltraCarousel
  data={data}
  pagination={{ type: 'dot', activeColor: '#333' }}
  renderItem={renderItem}
/>
```

### Full TypeScript Support

Strict TypeScript throughout. The component is generic, so your `renderItem` function receives correctly typed items.

### Performance by Default

- All animations run on the native UI thread
- `windowSize` prop controls how many items are rendered
- `presetFallback` automatically switches to a lighter preset on low-end devices
- Built-in FPS monitoring in development

## Migration Guides

Already using another carousel library? We have step-by-step migration guides:

- [Migrating from react-native-snap-carousel](/docs/guides/migration-snap-carousel)
- [Migrating from react-native-reanimated-carousel](/docs/guides/migration-reanimated-carousel)

## Getting Started

Install the package and its peer dependencies:

```bash
yarn add react-native-ultra-carousel react-native-reanimated react-native-gesture-handler
```

Create your first carousel:

```tsx
import { UltraCarousel } from 'react-native-ultra-carousel';

<UltraCarousel
  data={[
    { id: '1', title: 'First', color: '#FF6B6B' },
    { id: '2', title: 'Second', color: '#4ECDC4' },
    { id: '3', title: 'Third', color: '#45B7D1' },
  ]}
  preset="coverflow"
  autoPlay
  pagination={{ type: 'dot' }}
  renderItem={({ item }) => (
    <View style={{ flex: 1, backgroundColor: item.color, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: '#fff', fontSize: 24 }}>{item.title}</Text>
    </View>
  )}
/>
```

Check out the [full documentation](/docs/intro) for installation details, all preset options, API reference, and example projects.

## What's Next

We are actively working on:

- **Interactive preset playground** -- Try all 35+ presets in the browser
- **VS Code extension** -- Preview animations directly in your editor
- **More presets** -- Community-contributed animation presets
- **React Native Web** -- Full support for web builds

We would love your feedback. Open an issue on [GitHub](https://github.com/toankhontech/react-native-ultra-carousel) or start a discussion. Contributions are welcome.

Happy coding!
