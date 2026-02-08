---
sidebar_position: 3
title: Pagination
---

# Pagination

Ultra Carousel includes 5 built-in pagination styles and supports fully custom pagination components.

## Enabling Pagination

Pass a `pagination` config object to the carousel:

```tsx
<UltraCarousel
  data={data}
  preset="slide"
  pagination={{
    type: 'dot',
    activeColor: '#333',
    inactiveColor: '#ccc',
  }}
  renderItem={renderItem}
/>
```

## Pagination Types

### dot

Classic dot indicators. The active dot can optionally animate its size.

```tsx
pagination={{
  type: 'dot',
  activeColor: '#333',
  inactiveColor: '#ddd',
  size: 8,
  activeSize: 12,
  spacing: 6,
  position: 'bottom',
  animated: true,
}}
```

### line

Expanding line indicators. The active indicator stretches into a wider line.

```tsx
pagination={{
  type: 'line',
  activeColor: '#333',
  inactiveColor: '#ddd',
  height: 3,
  activeWidth: 24,
  inactiveWidth: 8,
  spacing: 4,
  borderRadius: 2,
}}
```

### number

Numeric display showing current position (e.g., "3 / 10").

```tsx
pagination={{
  type: 'number',
  color: '#333',
  fontSize: 14,
  fontWeight: '600',
  separator: '/',
}}
```

### progress

A continuous progress bar that fills based on scroll position.

```tsx
pagination={{
  type: 'progress',
  activeColor: '#333',
  inactiveColor: '#eee',
  height: 3,
  borderRadius: 2,
  width: 200,
}}
```

### custom

Render a fully custom pagination component with access to carousel state.

```tsx
pagination={{
  type: 'custom',
  render: ({ activeIndex, totalItems, progress }) => (
    <View style={styles.customPagination}>
      {Array.from({ length: totalItems }).map((_, i) => (
        <View
          key={i}
          style={[
            styles.customDot,
            i === activeIndex && styles.customDotActive,
          ]}
        />
      ))}
    </View>
  ),
}}
```

## Common Configuration

All pagination types share these base options:

| Option | Type | Default | Description |
|---|---|---|---|
| `type` | `string` | `'dot'` | Pagination type |
| `position` | `string` | `'bottom'` | `'top'`, `'bottom'`, `'left'`, `'right'` |
| `offset` | `number` | `16` | Distance from edge in pixels |
| `containerStyle` | `ViewStyle` | `undefined` | Style for the pagination container |
| `activeColor` | `string` | `'#333'` | Active indicator color |
| `inactiveColor` | `string` | `'#ccc'` | Inactive indicator color |
| `animated` | `boolean` | `true` | Enable smooth indicator transitions |

## Type-Specific Options

### Dot Options

| Option | Type | Default | Description |
|---|---|---|---|
| `size` | `number` | `8` | Dot diameter |
| `activeSize` | `number` | `size` | Active dot diameter |
| `spacing` | `number` | `6` | Space between dots |
| `borderRadius` | `number` | `size / 2` | Dot border radius |

### Line Options

| Option | Type | Default | Description |
|---|---|---|---|
| `height` | `number` | `3` | Line height |
| `activeWidth` | `number` | `24` | Width of the active line |
| `inactiveWidth` | `number` | `8` | Width of inactive lines |
| `spacing` | `number` | `4` | Space between lines |

### Number Options

| Option | Type | Default | Description |
|---|---|---|---|
| `color` | `string` | `'#333'` | Text color |
| `fontSize` | `number` | `14` | Font size |
| `fontWeight` | `string` | `'600'` | Font weight |
| `separator` | `string` | `'/'` | Separator between current and total |

### Progress Options

| Option | Type | Default | Description |
|---|---|---|---|
| `height` | `number` | `3` | Bar height |
| `width` | `number \| string` | `'80%'` | Bar width |
| `borderRadius` | `number` | `2` | Bar border radius |

## Animated Pagination

When `animated` is `true`, pagination indicators interpolate smoothly with scroll position rather than jumping between states:

```tsx
pagination={{
  type: 'dot',
  animated: true, // Smooth interpolation
  activeColor: '#FF6B6B',
  inactiveColor: '#ddd',
}}
```

## Hiding Pagination Conditionally

Pass `false` or use a conditional:

```tsx
<UltraCarousel
  data={data}
  pagination={showPagination ? { type: 'dot' } : false}
  renderItem={renderItem}
/>
```
