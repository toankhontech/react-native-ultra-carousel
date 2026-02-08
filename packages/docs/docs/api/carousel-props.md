---
sidebar_position: 1
title: Carousel Props
---

# Carousel Props

Complete API reference for the `<UltraCarousel />` component.

## Required Props

| Prop | Type | Description |
|---|---|---|
| `data` | `T[]` | Array of items to render in the carousel |
| `renderItem` | `(info: RenderItemInfo<T>) => ReactElement` | Function to render each carousel item |

## Layout Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `width` | `number` | Window width | Carousel viewport width |
| `height` | `number` | `200` | Carousel viewport height |
| `itemWidth` | `number` | `width` | Width of each carousel item |
| `itemHeight` | `number` | `height` | Height of each carousel item |
| `horizontal` | `boolean` | `true` | Scroll direction |
| `contentContainerStyle` | `ViewStyle` | `undefined` | Style for the scroll content container |
| `style` | `ViewStyle` | `undefined` | Style for the outer carousel container |

## Animation Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `preset` | `PresetName` | `'slide'` | Animation preset name |
| `presetConfig` | `object` | `{}` | Preset-specific configuration overrides |
| `presetFallback` | `PresetName` | `undefined` | Fallback preset for low-end devices |
| `customAnimation` | `AnimationFunction` | `undefined` | Custom animation worklet function |
| `animationDuration` | `number` | `300` | Transition duration in milliseconds |
| `easing` | `EasingFunction` | `Easing.bezier(0.25, 0.1, 0.25, 1)` | Easing function for animations |

## Behavior Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `loop` | `boolean` | `false` | Enable infinite looping |
| `autoPlay` | `boolean` | `false` | Enable automatic advancement |
| `autoPlayInterval` | `number` | `3000` | Auto-play interval in milliseconds |
| `autoPlayReverse` | `boolean` | `false` | Reverse auto-play direction |
| `pauseOnInteraction` | `boolean` | `true` | Pause auto-play on user touch |
| `enabled` | `boolean` | `true` | Enable/disable gesture handling |
| `snapEnabled` | `boolean` | `true` | Snap to item positions |
| `defaultIndex` | `number` | `0` | Initial active index |
| `windowSize` | `number` | `5` | Number of items to render around active |
| `overscrollEnabled` | `boolean` | `true` | Allow overscroll at edges |

## Pagination Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `pagination` | `PaginationConfig \| false` | `false` | Pagination configuration or `false` to disable |

See the [Pagination](/docs/api/pagination) page for detailed configuration options.

## Callback Props

| Prop | Type | Description |
|---|---|---|
| `onActiveIndexChange` | `(index: number) => void` | Fired when the active index changes |
| `onScrollStart` | `() => void` | Fired when scrolling begins |
| `onScrollEnd` | `(index: number) => void` | Fired when scrolling ends and item snaps |
| `onSwipeLeft` | `(index: number) => void` | Fired on left swipe (tinder preset) |
| `onSwipeRight` | `(index: number) => void` | Fired on right swipe (tinder preset) |
| `onProgressChange` | `(offset: number, absoluteProgress: number) => void` | Fired on every animation frame |

## Ref Methods

Access imperative methods via `ref`:

```tsx
import { useRef } from 'react';
import { UltraCarousel, UltraCarouselRef } from 'react-native-ultra-carousel';

function MyComponent() {
  const carouselRef = useRef<UltraCarouselRef>(null);

  return (
    <>
      <UltraCarousel ref={carouselRef} data={data} renderItem={renderItem} />
      <Button onPress={() => carouselRef.current?.next()} title="Next" />
    </>
  );
}
```

| Method | Type | Description |
|---|---|---|
| `next()` | `() => void` | Advance to the next item |
| `prev()` | `() => void` | Go to the previous item |
| `scrollTo(index, animated?)` | `(index: number, animated?: boolean) => void` | Scroll to a specific index |
| `getCurrentIndex()` | `() => number` | Get the current active index |
| `startAutoPlay()` | `() => void` | Start auto-play programmatically |
| `stopAutoPlay()` | `() => void` | Stop auto-play programmatically |

## Plugin Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `plugins` | `Plugin[]` | `[]` | Array of plugin instances |

See the [Plugins](/docs/api/plugins) page for details.

## Accessibility Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `accessibilityLabel` | `string` | `'Carousel'` | Label for screen readers |
| `accessibilityRole` | `string` | `'adjustable'` | Accessibility role |
| `accessibilityHint` | `string` | `'Swipe to navigate'` | Usage hint for screen readers |
| `announceSlideChange` | `boolean` | `true` | Announce slide changes to screen reader |

## RenderItemInfo

The object passed to `renderItem`:

```ts
interface RenderItemInfo<T> {
  item: T;
  index: number;
  isActive: boolean;
  animationProgress: SharedValue<number>;
  parallaxStyle?: ViewStyle; // Only with parallax preset
}
```

## TypeScript

The component is fully generic:

```tsx
interface Slide {
  id: string;
  title: string;
  image: ImageSourcePropType;
}

<UltraCarousel<Slide>
  data={slides}
  renderItem={({ item }) => (
    <View>
      <Image source={item.image} />
      <Text>{item.title}</Text>
    </View>
  )}
/>
```
