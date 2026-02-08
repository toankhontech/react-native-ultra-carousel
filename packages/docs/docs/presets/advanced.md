---
sidebar_position: 3
title: Advanced Presets
---

# Advanced Presets

These 10 presets use 3D transforms and complex animations for visually rich carousel experiences.

## cube

3D cube rotation. Each item is a face of a rotating cube.

```tsx
<UltraCarousel data={data} preset="cube" renderItem={renderItem} />
```

**Config options:**

| Option | Type | Default | Description |
|---|---|---|---|
| `perspective` | `number` | `800` | 3D perspective depth |
| `shadowEnabled` | `boolean` | `true` | Render shadow on cube faces |
| `shadowOpacity` | `number` | `0.4` | Shadow opacity (0-1) |

## coverflow

iTunes-style coverflow effect with perspective tilt. The active item faces forward while adjacent items angle away.

```tsx
<UltraCarousel data={data} preset="coverflow" renderItem={renderItem} />
```

**Config options:**

| Option | Type | Default | Description |
|---|---|---|---|
| `rotateY` | `number` | `50` | Y-axis rotation angle for side items |
| `scaleDown` | `number` | `0.8` | Scale factor for side items |
| `spacing` | `number` | `-60` | Overlap spacing between items |
| `perspective` | `number` | `1000` | 3D perspective value |

## parallax

Multi-layer parallax scrolling. Inner content moves at a different speed than the container for a depth effect.

```tsx
<UltraCarousel
  data={data}
  preset="parallax"
  presetConfig={{ parallaxFactor: 0.4 }}
  renderItem={({ item, parallaxStyle }) => (
    <View style={styles.slide}>
      <Animated.Image
        source={item.image}
        style={[styles.image, parallaxStyle]}
      />
      <Text>{item.title}</Text>
    </View>
  )}
/>
```

**Config options:**

| Option | Type | Default | Description |
|---|---|---|---|
| `parallaxFactor` | `number` | `0.3` | Speed difference ratio (0-1) |
| `parallaxDirection` | `string` | `'horizontal'` | `'horizontal'` or `'vertical'` |

## wheel

Ferris wheel rotation. Items rotate around a circular path.

```tsx
<UltraCarousel data={data} preset="wheel" renderItem={renderItem} />
```

**Config options:**

| Option | Type | Default | Description |
|---|---|---|---|
| `radius` | `number` | `300` | Wheel radius in pixels |
| `itemAngle` | `number` | `30` | Angle between items in degrees |

## flip

3D card flip. Items flip over like turning a card to reveal the next slide.

```tsx
<UltraCarousel data={data} preset="flip" renderItem={renderItem} />
```

**Config options:**

| Option | Type | Default | Description |
|---|---|---|---|
| `flipAxis` | `string` | `'y'` | Flip around `'x'` or `'y'` axis |
| `perspective` | `number` | `1200` | 3D perspective depth |

## accordion

Accordion fold and unfold. Items compress and expand like an accordion.

```tsx
<UltraCarousel data={data} preset="accordion" renderItem={renderItem} />
```

**Config options:**

| Option | Type | Default | Description |
|---|---|---|---|
| `foldCount` | `number` | `3` | Number of fold segments |
| `foldDirection` | `string` | `'horizontal'` | Fold axis direction |

## carousel-3d

True 3D circular carousel. Items are arranged in a circle in 3D space.

```tsx
<UltraCarousel data={data} preset="carousel-3d" renderItem={renderItem} />
```

**Config options:**

| Option | Type | Default | Description |
|---|---|---|---|
| `radius` | `number` | `250` | Circle radius |
| `perspective` | `number` | `1000` | 3D perspective depth |
| `visibleItems` | `number` | `5` | Number of items visible at once |

## depth

Depth-based scaling and opacity. Items recede into the background with diminishing scale and opacity.

```tsx
<UltraCarousel data={data} preset="depth" renderItem={renderItem} />
```

**Config options:**

| Option | Type | Default | Description |
|---|---|---|---|
| `depthScale` | `number` | `0.7` | Scale at maximum depth |
| `depthOpacity` | `number` | `0.5` | Opacity at maximum depth |
| `depthOffset` | `number` | `50` | Vertical offset at depth |

## perspective

Perspective tilt transition. Items tilt with 3D perspective as they enter and leave.

```tsx
<UltraCarousel data={data} preset="perspective" renderItem={renderItem} />
```

**Config options:**

| Option | Type | Default | Description |
|---|---|---|---|
| `tiltAngle` | `number` | `45` | Maximum tilt angle |
| `perspective` | `number` | `1000` | Perspective depth |

## rotate-in-out

Items rotate in from one direction and rotate out to the other.

```tsx
<UltraCarousel data={data} preset="rotate-in-out" renderItem={renderItem} />
```

**Config options:**

| Option | Type | Default | Description |
|---|---|---|---|
| `rotationAngle` | `number` | `90` | Rotation angle in degrees |
| `origin` | `string` | `'center'` | Rotation origin: `'center'`, `'top'`, `'bottom'` |

## Performance Note

Advanced presets use 3D transforms which can be GPU-intensive. On lower-end devices, consider:

- Reducing `perspective` values
- Disabling shadows via `shadowEnabled: false`
- Limiting `visibleItems` count
- Using the `shouldRasterize` prop on iOS
