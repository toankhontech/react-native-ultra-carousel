---
sidebar_position: 4
title: Creative Presets
---

# Creative Presets

These 15 presets push the boundaries of carousel animation with unique visual effects. They are designed for maximum visual impact on hero sections, galleries, and showcase screens.

## tinder

Tinder-style swipeable cards. Cards stack and can be swiped left or right with rotation.

```tsx
<UltraCarousel
  data={data}
  preset="tinder"
  presetConfig={{
    maxRotation: 20,
    swipeThreshold: 120,
    stackCount: 3,
  }}
  onSwipeLeft={(index) => console.log('Rejected', index)}
  onSwipeRight={(index) => console.log('Liked', index)}
  renderItem={renderItem}
/>
```

**Config options:**

| Option | Type | Default | Description |
|---|---|---|---|
| `maxRotation` | `number` | `15` | Max rotation on swipe (degrees) |
| `swipeThreshold` | `number` | `100` | Pixels to trigger swipe action |
| `stackCount` | `number` | `3` | Visible cards in stack |
| `stackScale` | `number` | `0.95` | Scale reduction per level |

## magazine

Page-turning magazine effect. Pages curl and turn like a physical magazine.

```tsx
<UltraCarousel data={data} preset="magazine" renderItem={renderItem} />
```

**Config options:**

| Option | Type | Default | Description |
|---|---|---|---|
| `curlRadius` | `number` | `80` | Page curl radius |
| `shadowIntensity` | `number` | `0.4` | Shadow darkness under curl |

## morphing

Shape morphing between items. Container shape transforms fluidly between slides.

```tsx
<UltraCarousel data={data} preset="morphing" renderItem={renderItem} />
```

**Config options:**

| Option | Type | Default | Description |
|---|---|---|---|
| `borderRadiusFrom` | `number` | `0` | Starting border radius |
| `borderRadiusTo` | `number` | `50` | Ending border radius |

## glitch

Digital glitch transition. Items appear to glitch with RGB splitting and displacement.

```tsx
<UltraCarousel data={data} preset="glitch" renderItem={renderItem} />
```

**Config options:**

| Option | Type | Default | Description |
|---|---|---|---|
| `glitchIntensity` | `number` | `10` | Pixel displacement amount |
| `glitchDuration` | `number` | `200` | Glitch effect duration in ms |
| `rgbSplit` | `boolean` | `true` | Enable RGB channel splitting |

## origami

Paper folding origami effect. Items fold and unfold like origami paper.

```tsx
<UltraCarousel data={data} preset="origami" renderItem={renderItem} />
```

**Config options:**

| Option | Type | Default | Description |
|---|---|---|---|
| `folds` | `number` | `4` | Number of origami folds |
| `foldShadow` | `boolean` | `true` | Show shadow on fold creases |

## helix

Helical spiral rotation. Items rotate around a helical path in 3D space.

```tsx
<UltraCarousel data={data} preset="helix" renderItem={renderItem} />
```

**Config options:**

| Option | Type | Default | Description |
|---|---|---|---|
| `helixRadius` | `number` | `200` | Helix radius |
| `helixPitch` | `number` | `100` | Vertical distance per revolution |
| `perspective` | `number` | `1000` | 3D perspective |

## shutter

Camera shutter reveal. The next slide is revealed through a shutter-like opening animation.

```tsx
<UltraCarousel data={data} preset="shutter" renderItem={renderItem} />
```

**Config options:**

| Option | Type | Default | Description |
|---|---|---|---|
| `bladeCount` | `number` | `8` | Number of shutter blades |
| `openDuration` | `number` | `400` | Shutter open duration in ms |

## kaleidoscope

Kaleidoscope pattern transition. Items split into mirrored segments during transition.

```tsx
<UltraCarousel data={data} preset="kaleidoscope" renderItem={renderItem} />
```

**Config options:**

| Option | Type | Default | Description |
|---|---|---|---|
| `segments` | `number` | `6` | Number of kaleidoscope segments |
| `rotationSpeed` | `number` | `1` | Segment rotation multiplier |

## liquid

Liquid morph transition. Items appear to melt and flow into the next slide.

```tsx
<UltraCarousel data={data} preset="liquid" renderItem={renderItem} />
```

**Config options:**

| Option | Type | Default | Description |
|---|---|---|---|
| `viscosity` | `number` | `0.5` | Liquid flow resistance (0-1) |
| `waveAmplitude` | `number` | `20` | Wave height in pixels |

## elastic

Elastic bounce transition. Items stretch and bounce with spring physics.

```tsx
<UltraCarousel data={data} preset="elastic" renderItem={renderItem} />
```

**Config options:**

| Option | Type | Default | Description |
|---|---|---|---|
| `stiffness` | `number` | `100` | Spring stiffness |
| `damping` | `number` | `10` | Spring damping |
| `mass` | `number` | `1` | Spring mass |

## windmill

Windmill rotation. Items rotate around a central point like windmill blades.

```tsx
<UltraCarousel data={data} preset="windmill" renderItem={renderItem} />
```

**Config options:**

| Option | Type | Default | Description |
|---|---|---|---|
| `bladeCount` | `number` | `4` | Number of windmill blades |
| `rotationSpeed` | `number` | `1` | Rotation speed multiplier |

## spiral

Spiral zoom transition. Items spiral inward or outward during transitions.

```tsx
<UltraCarousel data={data} preset="spiral" renderItem={renderItem} />
```

**Config options:**

| Option | Type | Default | Description |
|---|---|---|---|
| `spiralTurns` | `number` | `2` | Number of spiral rotations |
| `direction` | `string` | `'inward'` | `'inward'` or `'outward'` |

## domino

Domino toppling effect. Items fall like dominoes in sequence.

```tsx
<UltraCarousel data={data} preset="domino" renderItem={renderItem} />
```

**Config options:**

| Option | Type | Default | Description |
|---|---|---|---|
| `fallAngle` | `number` | `90` | Fall rotation angle |
| `staggerDelay` | `number` | `50` | Delay between each domino in ms |

## prism

Triangular prism rotation. Items rotate on a triangular prism showing three faces.

```tsx
<UltraCarousel data={data} preset="prism" renderItem={renderItem} />
```

**Config options:**

| Option | Type | Default | Description |
|---|---|---|---|
| `prismFaces` | `number` | `3` | Number of prism faces |
| `perspective` | `number` | `1000` | 3D perspective |

## mosaic

Mosaic tile assembly. The next slide assembles from small mosaic tiles.

```tsx
<UltraCarousel data={data} preset="mosaic" renderItem={renderItem} />
```

**Config options:**

| Option | Type | Default | Description |
|---|---|---|---|
| `tileColumns` | `number` | `8` | Number of tile columns |
| `tileRows` | `number` | `6` | Number of tile rows |
| `assemblyDuration` | `number` | `600` | Total assembly time in ms |
| `randomOrder` | `boolean` | `true` | Randomize tile assembly order |

## Tips for Creative Presets

1. **Test on real devices** -- Creative presets are GPU-intensive. Always test on physical hardware.
2. **Reduce data count** -- Limit the number of carousel items to keep memory usage low.
3. **Use `windowSize`** -- Set `windowSize` to render only nearby items and reduce the render tree.
4. **Consider fallbacks** -- Use `presetFallback="slide"` to fall back to a simpler preset on low-end devices.
