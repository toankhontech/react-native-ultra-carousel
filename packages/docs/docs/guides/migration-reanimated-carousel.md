---
sidebar_position: 5
title: Migrating from reanimated-carousel
---

# Migrating from react-native-reanimated-carousel

`react-native-reanimated-carousel` is a solid library. This guide helps you migrate if you want access to Ultra Carousel's expanded preset library, plugin system, or CLI tooling.

## Differences Overview

| Feature | reanimated-carousel | Ultra Carousel |
|---|---|---|
| Animation presets | 5 built-in | 35+ built-in |
| Custom animations | Yes (worklets) | Yes (worklets + `createPreset`) |
| Plugin system | No | Yes |
| Pagination | External only | Built-in (5 types) |
| CLI tool | No | Yes |
| TypeScript | Yes | Strict mode |
| Reanimated | v2/v3 | v3 only |

## Step 1: Install Ultra Carousel

```bash
yarn remove react-native-reanimated-carousel
yarn add react-native-ultra-carousel
```

Both libraries share the same peer dependencies (`react-native-reanimated`, `react-native-gesture-handler`), so no changes are needed there.

## Step 2: Update Imports

```tsx
// Before
import Carousel from 'react-native-reanimated-carousel';

// After
import { UltraCarousel } from 'react-native-ultra-carousel';
```

## Step 3: Update Props

### Props Mapping

| reanimated-carousel | Ultra Carousel | Notes |
|---|---|---|
| `data` | `data` | Same |
| `renderItem` | `renderItem` | Same |
| `width` | `width` | Same |
| `height` | `height` | Same |
| `loop` | `loop` | Same |
| `autoPlay` | `autoPlay` | Same |
| `autoPlayInterval` | `autoPlayInterval` | Same |
| `autoPlayReverse` | `autoPlayReverse` | Same |
| `scrollAnimationDuration` | `animationDuration` | Renamed |
| `mode` | `preset` | See mapping below |
| `modeConfig` | `presetConfig` | Renamed |
| `defaultIndex` | `defaultIndex` | Same |
| `enabled` | `enabled` | Same |
| `pagingEnabled` | `snapEnabled` | Renamed |
| `snapDirection` | _removed_ | Use `horizontal` prop |
| `windowSize` | `windowSize` | Same |
| `onSnapToItem` | `onActiveIndexChange` | Renamed |
| `onProgressChange` | `onProgressChange` | Same signature |
| `onScrollBegin` | `onScrollStart` | Renamed |
| `onScrollEnd` | `onScrollEnd` | Same |
| `panGestureHandlerProps` | `gestureConfig` | Renamed |
| `customAnimation` | `customAnimation` | Same worklet signature |

### Mode to Preset Mapping

| reanimated-carousel `mode` | Ultra Carousel `preset` |
|---|---|
| `'default'` | `'slide'` |
| `'parallax'` | `'parallax'` |
| `'stack'` | `'stack'` |
| `'horizontal-stack'` | `'stack'` with `presetConfig.direction: 'horizontal'` |
| `'vertical-stack'` | `'stack'` with `presetConfig.direction: 'vertical'` |

### Before and After

```tsx
// Before (reanimated-carousel)
<Carousel
  data={data}
  renderItem={renderItem}
  width={screenWidth}
  height={200}
  loop
  autoPlay
  autoPlayInterval={3000}
  scrollAnimationDuration={500}
  mode="parallax"
  modeConfig={{
    parallaxScrollingScale: 0.9,
    parallaxScrollingOffset: 50,
  }}
  onSnapToItem={(index) => console.log(index)}
/>

// After (Ultra Carousel)
<UltraCarousel
  data={data}
  renderItem={renderItem}
  width={screenWidth}
  height={200}
  loop
  autoPlay
  autoPlayInterval={3000}
  animationDuration={500}
  preset="parallax"
  presetConfig={{
    parallaxScale: 0.9,
    parallaxOffset: 50,
  }}
  onActiveIndexChange={(index) => console.log(index)}
/>
```

## Step 4: Update Custom Animations

Custom animation worklets are compatible with minor adjustments:

```tsx
// Before (reanimated-carousel)
<Carousel
  customAnimation={(value: number) => {
    'worklet';
    return {
      transform: [
        { translateX: value * width },
        { scale: interpolate(value, [-1, 0, 1], [0.8, 1, 0.8]) },
      ],
    };
  }}
/>

// After (Ultra Carousel)
<UltraCarousel
  customAnimation={(progress: number, itemWidth: number) => {
    'worklet';
    return {
      transform: [
        { translateX: progress * itemWidth },
        { scale: interpolate(progress, [-1, 0, 1], [0.8, 1, 0.8]) },
      ],
    };
  }}
/>
```

The key difference: Ultra Carousel passes `itemWidth` as the second argument instead of requiring you to capture it from the outer scope.

## Step 5: Add Built-in Pagination

reanimated-carousel does not include pagination. If you built custom pagination, you can replace it with the built-in system:

```tsx
// Before: Custom pagination component alongside Carousel
<Carousel ... />
<MyCustomPagination activeIndex={index} count={data.length} />

// After: Built-in pagination
<UltraCarousel
  data={data}
  pagination={{
    type: 'dot',
    activeColor: '#333',
    inactiveColor: '#ccc',
  }}
  renderItem={renderItem}
/>
```

## Step 6: Update Ref Usage

```tsx
// Before
const ref = useRef<ICarouselInstance>(null);
ref.current?.scrollTo({ index: 2, animated: true });
ref.current?.next();
ref.current?.prev();

// After
const ref = useRef<UltraCarouselRef>(null);
ref.current?.scrollTo(2, true);
ref.current?.next();
ref.current?.prev();
```

The `scrollTo` method signature is simplified -- pass `index` and `animated` as direct arguments instead of an options object.

## Step 7: Leverage New Features

After migrating, take advantage of features not available in reanimated-carousel:

```tsx
// Plugin system
import { analyticsPlugin, prefetchPlugin } from 'react-native-ultra-carousel';

<UltraCarousel
  data={data}
  preset="coverflow"         // 35+ presets to choose from
  presetFallback="slide"     // Automatic fallback for low-end devices
  respectReducedMotion       // Accessibility built-in
  plugins={[
    analyticsPlugin({ onView: trackView }),
    prefetchPlugin({ prefetchCount: 2 }),
  ]}
  pagination={{ type: 'line' }}
  renderItem={renderItem}
/>
```

## Compatibility Notes

- Both libraries use Reanimated worklets, so animation code is largely compatible
- Gesture handling is similar since both use `react-native-gesture-handler`
- `windowSize` behaves the same in both libraries
- If you were using `withAnimation` from reanimated-carousel, use `easing` and `animationDuration` props instead
