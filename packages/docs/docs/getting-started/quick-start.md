---
sidebar_position: 2
title: Quick Start
---

# Quick Start

Build a fully animated carousel in under 2 minutes.

## Step 1: Import the Component

```tsx
import { UltraCarousel } from 'react-native-ultra-carousel';
```

## Step 2: Prepare Your Data

```tsx
const slides = [
  { id: '1', title: 'Welcome', color: '#FF6B6B' },
  { id: '2', title: 'Explore', color: '#4ECDC4' },
  { id: '3', title: 'Create', color: '#45B7D1' },
  { id: '4', title: 'Share', color: '#96CEB4' },
];
```

## Step 3: Render the Carousel

```tsx
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { UltraCarousel } from 'react-native-ultra-carousel';

const { width } = Dimensions.get('window');

const slides = [
  { id: '1', title: 'Welcome', color: '#FF6B6B' },
  { id: '2', title: 'Explore', color: '#4ECDC4' },
  { id: '3', title: 'Create', color: '#45B7D1' },
  { id: '4', title: 'Share', color: '#96CEB4' },
];

export default function MyCarousel() {
  return (
    <UltraCarousel
      data={slides}
      width={width}
      height={250}
      preset="slide"
      autoPlay
      autoPlayInterval={3000}
      pagination={{ type: 'dot', activeColor: '#fff' }}
      renderItem={({ item }) => (
        <View style={[styles.slide, { backgroundColor: item.color }]}>
          <Text style={styles.title}>{item.title}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
});
```

## Step 4: Try a Different Preset

Swap `preset="slide"` with any of the 35+ available presets:

```tsx
// 3D cube rotation
<UltraCarousel preset="cube" ... />

// Coverflow effect
<UltraCarousel preset="coverflow" ... />

// Fade transition
<UltraCarousel preset="fade" ... />

// Parallax scrolling
<UltraCarousel preset="parallax" ... />
```

## Step 5: Add Pagination

Ultra Carousel includes multiple pagination styles out of the box:

```tsx
<UltraCarousel
  data={slides}
  preset="slide"
  pagination={{
    type: 'dot',           // 'dot' | 'line' | 'number' | 'progress' | 'custom'
    activeColor: '#FF6B6B',
    inactiveColor: '#ccc',
    size: 8,
    spacing: 6,
  }}
  renderItem={renderItem}
/>
```

## What's Next?

- [Presets Overview](/docs/presets/overview) -- Browse all 35+ animation presets
- [Carousel Props](/docs/api/carousel-props) -- Full API reference
- [Custom Animations](/docs/guides/custom-animations) -- Build your own animation
