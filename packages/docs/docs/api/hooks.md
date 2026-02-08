---
sidebar_position: 2
title: Hooks
---

# Hooks

Ultra Carousel provides several React hooks for fine-grained control over carousel behavior and state.

## useCarousel

The primary hook for controlling a carousel instance.

```tsx
import { useCarousel } from 'react-native-ultra-carousel';

function Controls() {
  const { next, prev, scrollTo, activeIndex, isAutoPlaying } = useCarousel();

  return (
    <View style={styles.controls}>
      <Button onPress={prev} title="Previous" />
      <Text>Slide {activeIndex + 1}</Text>
      <Button onPress={next} title="Next" />
    </View>
  );
}
```

**Return value:**

| Property | Type | Description |
|---|---|---|
| `activeIndex` | `number` | Current active slide index |
| `totalItems` | `number` | Total number of items |
| `isAutoPlaying` | `boolean` | Whether auto-play is running |
| `next()` | `() => void` | Go to next slide |
| `prev()` | `() => void` | Go to previous slide |
| `scrollTo(index)` | `(index: number) => void` | Jump to a specific index |
| `startAutoPlay()` | `() => void` | Start auto-play |
| `stopAutoPlay()` | `() => void` | Stop auto-play |

:::info
`useCarousel` must be used inside a component that is a descendant of `<UltraCarousel>` or wrapped in `<CarouselProvider>`.
:::

## useAutoPlay

Manage auto-play behavior independently.

```tsx
import { useAutoPlay } from 'react-native-ultra-carousel';

function AutoPlayToggle() {
  const { isPlaying, start, stop, toggle } = useAutoPlay({
    interval: 3000,
    reverse: false,
    pauseOnInteraction: true,
  });

  return (
    <Button
      onPress={toggle}
      title={isPlaying ? 'Pause' : 'Play'}
    />
  );
}
```

**Options:**

| Option | Type | Default | Description |
|---|---|---|---|
| `interval` | `number` | `3000` | Interval between slides in ms |
| `reverse` | `boolean` | `false` | Reverse direction |
| `pauseOnInteraction` | `boolean` | `true` | Pause when user interacts |

**Return value:**

| Property | Type | Description |
|---|---|---|
| `isPlaying` | `boolean` | Current play state |
| `start()` | `() => void` | Start auto-play |
| `stop()` | `() => void` | Stop auto-play |
| `toggle()` | `() => void` | Toggle auto-play |

## useAnimationProgress

Access the raw animation progress value for custom effects.

```tsx
import { useAnimationProgress } from 'react-native-ultra-carousel';

function ProgressBar() {
  const { progress, absoluteProgress } = useAnimationProgress();

  const barStyle = useAnimatedStyle(() => ({
    width: `${(absoluteProgress.value / totalItems) * 100}%`,
  }));

  return <Animated.View style={[styles.bar, barStyle]} />;
}
```

**Return value:**

| Property | Type | Description |
|---|---|---|
| `progress` | `SharedValue<number>` | Normalized progress (-1 to 1) for current transition |
| `absoluteProgress` | `SharedValue<number>` | Absolute scroll progress across all items |

## useCarouselGesture

Access and customize gesture behavior.

```tsx
import { useCarouselGesture } from 'react-native-ultra-carousel';

function CustomGesture() {
  const { isGestureActive, velocity, panX, panY } = useCarouselGesture();

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: isGestureActive.value ? 0.3 : 0,
  }));

  return <Animated.View style={[styles.overlay, overlayStyle]} />;
}
```

**Return value:**

| Property | Type | Description |
|---|---|---|
| `isGestureActive` | `SharedValue<boolean>` | Whether a gesture is in progress |
| `velocity` | `SharedValue<number>` | Current swipe velocity |
| `panX` | `SharedValue<number>` | Horizontal pan offset |
| `panY` | `SharedValue<number>` | Vertical pan offset |

## useCarouselLayout

Access layout measurements for custom positioning.

```tsx
import { useCarouselLayout } from 'react-native-ultra-carousel';

function LayoutInfo() {
  const { width, height, itemWidth, itemHeight } = useCarouselLayout();

  return (
    <Text>
      Viewport: {width}x{height}, Item: {itemWidth}x{itemHeight}
    </Text>
  );
}
```

**Return value:**

| Property | Type | Description |
|---|---|---|
| `width` | `number` | Carousel viewport width |
| `height` | `number` | Carousel viewport height |
| `itemWidth` | `number` | Individual item width |
| `itemHeight` | `number` | Individual item height |
| `horizontal` | `boolean` | Whether the carousel is horizontal |

## CarouselProvider

If you need hook access outside the `UltraCarousel` render tree, wrap your components in `CarouselProvider`:

```tsx
import { CarouselProvider, UltraCarousel, useCarousel } from 'react-native-ultra-carousel';

function App() {
  return (
    <CarouselProvider>
      <Header />
      <UltraCarousel data={data} renderItem={renderItem} />
      <ExternalControls />
    </CarouselProvider>
  );
}

function ExternalControls() {
  const { next, prev, activeIndex } = useCarousel();
  return (
    <View>
      <Button onPress={prev} title="Prev" />
      <Text>{activeIndex}</Text>
      <Button onPress={next} title="Next" />
    </View>
  );
}
```
