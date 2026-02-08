---
sidebar_position: 1
title: Custom Animations
---

# Custom Animations

Learn how to create your own animation presets from scratch using Reanimated worklets.

## How Animations Work

Every preset is a **worklet function** that receives an animation progress value and returns a style object. The progress value ranges from `-1` (previous item) through `0` (active item) to `1` (next item).

```
-1          0          1
 prev     active     next
```

## Creating a Basic Custom Animation

Use the `customAnimation` prop to pass a worklet directly:

```tsx
<UltraCarousel
  data={data}
  customAnimation={(progress, itemWidth) => {
    'worklet';
    return {
      transform: [
        { translateX: progress * itemWidth },
        { scale: 1 - Math.abs(progress) * 0.3 },
      ],
      opacity: 1 - Math.abs(progress) * 0.6,
    };
  }}
  renderItem={renderItem}
/>
```

:::warning
The `'worklet'` directive is required. Without it, the animation will not run on the native UI thread and will cause frame drops.
:::

## Creating a Reusable Preset

Use `createPreset` to define a named, configurable preset:

```tsx
import { createPreset } from 'react-native-ultra-carousel';

const swingPreset = createPreset({
  name: 'swing',
  defaultConfig: {
    maxRotation: 25,
    perspective: 800,
  },
  animation: (progress, itemWidth, config) => {
    'worklet';
    const rotation = progress * config.maxRotation;
    return {
      transform: [
        { perspective: config.perspective },
        { translateX: progress * itemWidth },
        { rotateZ: `${rotation}deg` },
      ],
      opacity: 1 - Math.abs(progress) * 0.4,
    };
  },
});
```

Then use it:

```tsx
<UltraCarousel
  data={data}
  preset={swingPreset}
  presetConfig={{ maxRotation: 30 }}
  renderItem={renderItem}
/>
```

## Animation Function Signature

```ts
type AnimationFunction = (
  progress: number,       // -1 to 1, where 0 is the active item
  itemWidth: number,      // Width of each item in pixels
  config: object,         // Preset-specific config options
  index: number,          // Index of the item being animated
) => ViewStyle;
```

## Available Transform Properties

You can return any valid `ViewStyle` with transforms:

```tsx
(progress) => {
  'worklet';
  return {
    // Position
    transform: [
      { translateX: value },
      { translateY: value },
      // Rotation
      { rotateX: `${value}deg` },
      { rotateY: `${value}deg` },
      { rotateZ: `${value}deg` },
      // Scale
      { scale: value },
      { scaleX: value },
      { scaleY: value },
      // 3D
      { perspective: value },
      // Skew
      { skewX: `${value}deg` },
      { skewY: `${value}deg` },
    ],
    // Appearance
    opacity: value,
    borderRadius: value,
    backgroundColor: interpolateColor(progress, [-1, 0, 1], colors),
    // Layout
    zIndex: value,
  };
};
```

## Using Reanimated Interpolation

Leverage `interpolate` from Reanimated for precise control:

```tsx
import { interpolate, Extrapolation } from 'react-native-reanimated';

const ripplePreset = createPreset({
  name: 'ripple',
  animation: (progress, itemWidth) => {
    'worklet';
    const translateX = interpolate(
      progress,
      [-1, 0, 1],
      [-itemWidth, 0, itemWidth]
    );
    const scale = interpolate(
      progress,
      [-1, -0.5, 0, 0.5, 1],
      [0.6, 0.8, 1, 0.8, 0.6]
    );
    const rotate = interpolate(
      progress,
      [-1, 0, 1],
      [-10, 0, 10],
      Extrapolation.CLAMP
    );

    return {
      transform: [
        { translateX },
        { scale },
        { rotateZ: `${rotate}deg` },
      ],
      opacity: interpolate(progress, [-1, 0, 1], [0.4, 1, 0.4]),
    };
  },
});
```

## Combining Multiple Effects

Chain transforms to create complex animations:

```tsx
const vortexPreset = createPreset({
  name: 'vortex',
  defaultConfig: {
    intensity: 1,
    perspective: 1000,
  },
  animation: (progress, itemWidth, config) => {
    'worklet';
    const { intensity, perspective } = config;
    const absProgress = Math.abs(progress);

    return {
      transform: [
        { perspective },
        { translateX: progress * itemWidth },
        { rotateY: `${progress * 60 * intensity}deg` },
        { rotateZ: `${progress * 15 * intensity}deg` },
        { scale: 1 - absProgress * 0.3 },
      ],
      opacity: 1 - absProgress * 0.5,
      zIndex: Math.round((1 - absProgress) * 100),
    };
  },
});
```

## Testing Your Animation

Use the development preview to iterate quickly:

```tsx
import { AnimationPreview } from 'react-native-ultra-carousel/dev';

<AnimationPreview
  animation={myCustomAnimation}
  itemCount={5}
  showProgress    // Show progress value overlay
  showFPS         // Show FPS counter
/>
```

## Performance Guidelines

1. Keep worklets lightweight -- avoid complex math or allocations
2. Use `interpolate` over manual calculations when possible
3. Avoid creating new objects inside the worklet on every frame
4. Test on low-end Android devices to catch performance issues early
5. Limit the number of transform operations per item to 5-6
