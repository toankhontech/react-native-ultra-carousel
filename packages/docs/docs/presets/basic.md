---
sidebar_position: 2
title: Basic Presets
---

# Basic Presets

These 10 presets cover the most common carousel transition patterns. They are lightweight and performant on all devices.

## slide

The default horizontal slide transition. Items slide left and right as the user swipes.

```tsx
<UltraCarousel data={data} preset="slide" renderItem={renderItem} />
```

**Config options:**

| Option | Type | Default | Description |
|---|---|---|---|
| `gap` | `number` | `0` | Space between items in pixels |
| `overshoot` | `boolean` | `true` | Allow overscroll bounce at edges |

## fade

Crossfade transition between items. The outgoing item fades out while the incoming item fades in.

```tsx
<UltraCarousel data={data} preset="fade" renderItem={renderItem} />
```

**Config options:**

| Option | Type | Default | Description |
|---|---|---|---|
| `minOpacity` | `number` | `0` | Minimum opacity during transition |
| `duration` | `number` | `300` | Fade duration in ms |

## scale

Items scale up as they become active and scale down as they move away.

```tsx
<UltraCarousel data={data} preset="scale" renderItem={renderItem} />
```

**Config options:**

| Option | Type | Default | Description |
|---|---|---|---|
| `minScale` | `number` | `0.8` | Scale factor for inactive items |
| `activeScale` | `number` | `1.0` | Scale factor for the active item |

## slide-vertical

Vertical slide transition. Items move up and down instead of left and right.

```tsx
<UltraCarousel data={data} preset="slide-vertical" renderItem={renderItem} />
```

**Config options:**

| Option | Type | Default | Description |
|---|---|---|---|
| `gap` | `number` | `0` | Vertical space between items |

## fade-scale

Combined fade and scale effect. Items simultaneously fade and scale during transitions.

```tsx
<UltraCarousel data={data} preset="fade-scale" renderItem={renderItem} />
```

**Config options:**

| Option | Type | Default | Description |
|---|---|---|---|
| `minOpacity` | `number` | `0.3` | Minimum opacity |
| `minScale` | `number` | `0.85` | Minimum scale |

## push

The current item is pushed off-screen by the incoming item, creating a stacking feel.

```tsx
<UltraCarousel data={data} preset="push" renderItem={renderItem} />
```

**Config options:**

| Option | Type | Default | Description |
|---|---|---|---|
| `pushOffset` | `number` | `0.3` | How far the outgoing item is pushed (0-1) |

## overlap

Items overlap each other during the transition, creating a layered card effect.

```tsx
<UltraCarousel data={data} preset="overlap" renderItem={renderItem} />
```

**Config options:**

| Option | Type | Default | Description |
|---|---|---|---|
| `overlapAmount` | `number` | `0.5` | Overlap ratio (0-1) |
| `shadowEnabled` | `boolean` | `true` | Show shadows on overlapping items |

## stack

Cards stack on top of each other. Swiping reveals the next card from behind.

```tsx
<UltraCarousel data={data} preset="stack" renderItem={renderItem} />
```

**Config options:**

| Option | Type | Default | Description |
|---|---|---|---|
| `stackCount` | `number` | `3` | Number of visible stacked items |
| `stackOffset` | `number` | `10` | Pixel offset between stacked items |
| `stackScale` | `number` | `0.95` | Scale reduction per stack level |

## slide-rotate

Slide with a slight rotation. Items rotate as they move in and out of view.

```tsx
<UltraCarousel data={data} preset="slide-rotate" renderItem={renderItem} />
```

**Config options:**

| Option | Type | Default | Description |
|---|---|---|---|
| `maxRotation` | `number` | `15` | Maximum rotation angle in degrees |

## zoom

Zoom in/out effect. The active item fills the viewport while adjacent items shrink.

```tsx
<UltraCarousel data={data} preset="zoom" renderItem={renderItem} />
```

**Config options:**

| Option | Type | Default | Description |
|---|---|---|---|
| `maxZoom` | `number` | `1.2` | Maximum zoom scale for active item |
| `minZoom` | `number` | `0.6` | Minimum zoom scale for inactive items |

## Common Pattern

All basic presets share these common properties:

```tsx
<UltraCarousel
  data={data}
  preset="slide" // Any basic preset name
  presetConfig={{
    // Preset-specific options go here
  }}
  loop                    // Enable infinite looping
  autoPlay                // Enable auto-play
  autoPlayInterval={3000} // Auto-play interval in ms
  renderItem={renderItem}
/>
```
