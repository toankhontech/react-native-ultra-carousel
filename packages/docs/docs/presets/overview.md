---
sidebar_position: 1
title: Presets Overview
---

# Presets Overview

Ultra Carousel ships with **35+ animation presets** organized into three categories: Basic, Advanced, and Creative.

## Using a Preset

Apply any preset by passing its name to the `preset` prop:

```tsx
<UltraCarousel
  data={data}
  preset="cube"
  renderItem={renderItem}
/>
```

## All Presets at a Glance

### Basic Presets

| Preset | Description |
|---|---|
| `slide` | Standard horizontal slide transition |
| `fade` | Crossfade between items |
| `scale` | Scale up/down on transition |
| `slide-vertical` | Vertical slide transition |
| `fade-scale` | Combined fade and scale |
| `push` | Push current item off-screen |
| `overlap` | Items overlap during transition |
| `stack` | Stacked card transition |
| `slide-rotate` | Slide with slight rotation |
| `zoom` | Zoom in/out effect |

### Advanced Presets

| Preset | Description |
|---|---|
| `cube` | 3D cube rotation |
| `coverflow` | iTunes-style coverflow |
| `parallax` | Multi-layer parallax scrolling |
| `wheel` | Ferris wheel rotation |
| `flip` | 3D card flip |
| `accordion` | Accordion fold/unfold |
| `carousel-3d` | 3D circular carousel |
| `depth` | Depth-based scaling and opacity |
| `perspective` | Perspective tilt transition |
| `rotate-in-out` | Rotate items in and out |

### Creative Presets

| Preset | Description |
|---|---|
| `tinder` | Tinder-style swipe cards |
| `magazine` | Page-turning magazine effect |
| `morphing` | Shape morphing between items |
| `glitch` | Digital glitch transition |
| `origami` | Paper folding origami effect |
| `helix` | Helical spiral rotation |
| `shutter` | Camera shutter reveal |
| `kaleidoscope` | Kaleidoscope pattern transition |
| `liquid` | Liquid morph transition |
| `elastic` | Elastic bounce transition |
| `windmill` | Windmill rotation |
| `spiral` | Spiral zoom transition |
| `domino` | Domino toppling effect |
| `prism` | Triangular prism rotation |
| `mosaic` | Mosaic tile assembly |

## Customizing Presets

Every preset accepts optional configuration overrides:

```tsx
<UltraCarousel
  data={data}
  preset="cube"
  presetConfig={{
    perspective: 1000,
    rotationAngle: 90,
    shadowEnabled: true,
    shadowOpacity: 0.3,
  }}
  renderItem={renderItem}
/>
```

## Creating Custom Presets

You can define entirely custom animation presets. See the [Custom Animations](/docs/guides/custom-animations) guide for details.

```tsx
import { createPreset } from 'react-native-ultra-carousel';

const myPreset = createPreset({
  name: 'my-custom',
  animation: (progress) => {
    'worklet';
    return {
      transform: [
        { translateX: progress * width },
        { scale: 1 - Math.abs(progress) * 0.2 },
      ],
      opacity: 1 - Math.abs(progress) * 0.5,
    };
  },
});
```
