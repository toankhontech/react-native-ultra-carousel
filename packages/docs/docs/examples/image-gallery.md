---
sidebar_position: 2
title: Image Gallery
---

# Image Gallery

A full-screen image gallery with swipe navigation, pinch-to-zoom feel, and a counter overlay -- suitable for photo viewers and media apps.

## Full Example

```tsx
import React, { useState, useCallback } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { UltraCarousel } from 'react-native-ultra-carousel';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface GalleryImage {
  id: string;
  uri: string;
  caption: string;
  photographer: string;
}

const images: GalleryImage[] = [
  {
    id: '1',
    uri: 'https://example.com/photo-1.jpg',
    caption: 'Mountain sunrise over the valley',
    photographer: 'Alex Chen',
  },
  {
    id: '2',
    uri: 'https://example.com/photo-2.jpg',
    caption: 'Coastal cliffs at golden hour',
    photographer: 'Maria Silva',
  },
  {
    id: '3',
    uri: 'https://example.com/photo-3.jpg',
    caption: 'Dense forest canopy from below',
    photographer: 'James Park',
  },
  {
    id: '4',
    uri: 'https://example.com/photo-4.jpg',
    caption: 'Desert dunes under starlight',
    photographer: 'Sara Ahmed',
  },
];

export default function ImageGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showOverlay, setShowOverlay] = useState(true);
  const activeImage = images[activeIndex];

  const toggleOverlay = useCallback(() => {
    setShowOverlay((prev) => !prev);
  }, []);

  const renderItem = useCallback(({ item }: { item: GalleryImage }) => (
    <TouchableOpacity
      activeOpacity={1}
      onPress={toggleOverlay}
      style={styles.slide}
    >
      <Image
        source={{ uri: item.uri }}
        style={styles.image}
        resizeMode="contain"
      />
    </TouchableOpacity>
  ), [toggleOverlay]);

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <UltraCarousel
        data={images}
        width={SCREEN_WIDTH}
        height={SCREEN_HEIGHT}
        preset="fade"
        presetConfig={{ minOpacity: 0.2, duration: 250 }}
        loop
        onActiveIndexChange={setActiveIndex}
        renderItem={renderItem}
      />

      {/* Top overlay: counter and close */}
      {showOverlay && (
        <View style={styles.topOverlay}>
          <Text style={styles.counter}>
            {activeIndex + 1} / {images.length}
          </Text>
          <TouchableOpacity style={styles.closeButton}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Bottom overlay: caption */}
      {showOverlay && (
        <View style={styles.bottomOverlay}>
          <Text style={styles.caption}>{activeImage.caption}</Text>
          <Text style={styles.photographer}>
            Photo by {activeImage.photographer}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  topOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 12,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  counter: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  closeButton: {
    padding: 8,
  },
  closeText: {
    color: '#fff',
    fontSize: 16,
  },
  bottomOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 16,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  caption: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  photographer: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 13,
    marginTop: 4,
  },
});
```

## Key Features

- **Full-screen layout** with black background and hidden status bar
- **Fade preset** provides a smooth transition between photos
- **Tap-to-toggle overlay** for caption, counter, and controls
- **Loop enabled** for continuous browsing

## Variations

### With Parallax

Use the parallax preset for a more dynamic feel:

```tsx
<UltraCarousel
  data={images}
  preset="parallax"
  presetConfig={{ parallaxFactor: 0.3 }}
  renderItem={({ item, parallaxStyle }) => (
    <View style={styles.slide}>
      <Animated.Image
        source={{ uri: item.uri }}
        style={[styles.image, parallaxStyle]}
      />
    </View>
  )}
/>
```

### With Auto-Play Slideshow

Turn the gallery into a slideshow:

```tsx
<UltraCarousel
  data={images}
  preset="fade"
  autoPlay
  autoPlayInterval={5000}
  loop
  pagination={{ type: 'progress', activeColor: '#fff', inactiveColor: 'rgba(255,255,255,0.3)' }}
  renderItem={renderItem}
/>
```
