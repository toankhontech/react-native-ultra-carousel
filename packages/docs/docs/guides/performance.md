---
sidebar_position: 2
title: Performance
---

# Performance

Ultra Carousel is optimized for 60 FPS on both iOS and Android. This guide covers best practices and troubleshooting for maintaining smooth performance.

## Architecture Overview

All animations run on the **native UI thread** via Reanimated worklets. This means:

- Animations do not block the JS thread
- Gestures are handled natively with no bridge overhead
- 60 FPS is achievable even with complex presets

## Key Performance Settings

### windowSize

Controls how many items are rendered around the active index. Lower values reduce memory usage but may cause visible blank areas during fast swiping.

```tsx
<UltraCarousel
  data={data}
  windowSize={3}  // Render 3 items: prev, active, next
  renderItem={renderItem}
/>
```

| Value | Rendered Items | Best For |
|---|---|---|
| `1` | Active only | Heavy items (video, maps) |
| `3` | Active + 1 each side | Most use cases |
| `5` | Active + 2 each side | Fast swiping, simple items |
| `0` | All items | Small datasets only |

### maxRenderAhead

Limits how many items are pre-rendered beyond the window:

```tsx
<UltraCarousel
  data={data}
  windowSize={3}
  maxRenderAhead={2}
  renderItem={renderItem}
/>
```

## Image Optimization

### Use Appropriately Sized Images

Avoid loading full-resolution images in carousel items. Resize to match the display size:

```tsx
// Bad: Full resolution image
<Image source={{ uri: item.fullResUrl }} style={{ width: 300, height: 200 }} />

// Good: Thumbnail or resized image
<Image source={{ uri: item.thumbnailUrl }} style={{ width: 300, height: 200 }} />
```

### Prefetch Adjacent Images

Use the `prefetchPlugin` to load images for upcoming slides:

```tsx
import { prefetchPlugin } from 'react-native-ultra-carousel';

<UltraCarousel
  data={data}
  plugins={[
    prefetchPlugin({
      prefetchCount: 2,
      prefetchFn: async (item) => {
        await Image.prefetch(item.imageUrl);
      },
    }),
  ]}
  renderItem={renderItem}
/>
```

### Use FastImage

Replace `Image` with a fast image library for better caching:

```tsx
import FastImage from 'react-native-fast-image';

const renderItem = ({ item }) => (
  <FastImage
    source={{ uri: item.imageUrl, priority: FastImage.priority.normal }}
    style={styles.image}
    resizeMode={FastImage.resizeMode.cover}
  />
);
```

## Avoiding Common Pitfalls

### Do Not Create Components Inside renderItem

```tsx
// Bad: Creates a new component on every render
const renderItem = ({ item }) => {
  const Card = () => <View><Text>{item.title}</Text></View>;
  return <Card />;
};

// Good: Inline JSX or use a stable component
const renderItem = ({ item }) => (
  <View><Text>{item.title}</Text></View>
);
```

### Memoize renderItem

Wrap your render function in `useCallback`:

```tsx
const renderItem = useCallback(({ item }) => (
  <SlideCard item={item} />
), []);
```

### Memoize Item Components

Use `React.memo` for complex item components:

```tsx
const SlideCard = React.memo(({ item }) => (
  <View style={styles.card}>
    <Image source={{ uri: item.image }} style={styles.image} />
    <Text style={styles.title}>{item.title}</Text>
  </View>
));
```

### Avoid Inline Styles

```tsx
// Bad: New object every render
<View style={{ width: 300, height: 200, backgroundColor: '#fff' }}>

// Good: StyleSheet
const styles = StyleSheet.create({
  card: { width: 300, height: 200, backgroundColor: '#fff' },
});
<View style={styles.card}>
```

## Platform-Specific Tips

### iOS

- Enable `shouldRasterize` on complex items with static content:

```tsx
<View style={styles.card} shouldRasterizeIOS>
```

- Use `removeClippedSubviews` for long lists:

```tsx
<UltraCarousel removeClippedSubviews renderItem={renderItem} />
```

### Android

- Ensure hardware acceleration is enabled (default in modern RN)
- Use `renderToHardwareTextureAndroid` for items with 3D transforms:

```tsx
<View style={styles.card} renderToHardwareTextureAndroid>
```

## Measuring Performance

### FPS Monitor

Enable the built-in FPS monitor in development:

```tsx
<UltraCarousel
  data={data}
  __DEV_showFPS  // Development only
  renderItem={renderItem}
/>
```

### React DevTools Profiler

Use the React DevTools Profiler to identify unnecessary re-renders in your `renderItem` components.

### Flipper

Use Flipper's performance plugin to monitor native UI thread frame times.

## Preset Performance Tiers

| Tier | Presets | GPU Cost |
|---|---|---|
| Light | slide, fade, scale, push | Low |
| Medium | coverflow, parallax, stack, depth | Medium |
| Heavy | cube, flip, carousel-3d, wheel | High |
| Intensive | tinder, magazine, origami, kaleidoscope | Very High |

For lower-end devices, use the `presetFallback` prop:

```tsx
<UltraCarousel
  data={data}
  preset="cube"
  presetFallback="slide"  // Falls back on low-end devices
  renderItem={renderItem}
/>
```
