---
sidebar_position: 1
title: E-Commerce Carousel
---

# E-Commerce Carousel

A product image carousel with thumbnail navigation, zoom support, and variant switching -- commonly used on product detail pages.

## Full Example

```tsx
import React, { useRef, useState, useCallback } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { UltraCarousel, UltraCarouselRef } from 'react-native-ultra-carousel';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const THUMBNAIL_SIZE = 64;
const THUMBNAIL_SPACING = 8;

interface ProductImage {
  id: string;
  uri: string;
  alt: string;
}

const productImages: ProductImage[] = [
  { id: '1', uri: 'https://example.com/product-front.jpg', alt: 'Front view' },
  { id: '2', uri: 'https://example.com/product-back.jpg', alt: 'Back view' },
  { id: '3', uri: 'https://example.com/product-side.jpg', alt: 'Side view' },
  { id: '4', uri: 'https://example.com/product-detail.jpg', alt: 'Detail view' },
  { id: '5', uri: 'https://example.com/product-lifestyle.jpg', alt: 'Lifestyle shot' },
];

export default function ProductCarousel() {
  const carouselRef = useRef<UltraCarouselRef>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const renderItem = useCallback(({ item }: { item: ProductImage }) => (
    <View style={styles.slide}>
      <Image
        source={{ uri: item.uri }}
        style={styles.productImage}
        resizeMode="contain"
        accessibilityLabel={item.alt}
      />
    </View>
  ), []);

  const onThumbnailPress = (index: number) => {
    carouselRef.current?.scrollTo(index);
  };

  return (
    <View style={styles.container}>
      {/* Main carousel */}
      <UltraCarousel
        ref={carouselRef}
        data={productImages}
        width={SCREEN_WIDTH}
        height={SCREEN_WIDTH}
        preset="fade-scale"
        presetConfig={{ minOpacity: 0.5, minScale: 0.95 }}
        onActiveIndexChange={setActiveIndex}
        pagination={{
          type: 'number',
          color: '#666',
          fontSize: 12,
        }}
        renderItem={renderItem}
      />

      {/* Thumbnail strip */}
      <FlatList
        data={productImages}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.thumbnailList}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => onThumbnailPress(index)}
            style={[
              styles.thumbnail,
              index === activeIndex && styles.thumbnailActive,
            ]}
          >
            <Image
              source={{ uri: item.uri }}
              style={styles.thumbnailImage}
              resizeMode="cover"
            />
          </TouchableOpacity>
        )}
      />

      {/* Product info */}
      <View style={styles.productInfo}>
        <Text style={styles.productName}>Premium Wireless Headphones</Text>
        <Text style={styles.productPrice}>$299.99</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  productImage: {
    width: '90%',
    height: '90%',
  },
  thumbnailList: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  thumbnail: {
    width: THUMBNAIL_SIZE,
    height: THUMBNAIL_SIZE,
    borderRadius: 8,
    marginRight: THUMBNAIL_SPACING,
    borderWidth: 2,
    borderColor: 'transparent',
    overflow: 'hidden',
  },
  thumbnailActive: {
    borderColor: '#333',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
  productInfo: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  productName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  productPrice: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FF6B6B',
    marginTop: 4,
  },
});
```

## Key Features

- **Fade-scale preset** provides a clean transition suitable for product images
- **Thumbnail navigation** synced with the main carousel via `onActiveIndexChange` and `scrollTo`
- **Number pagination** shows "2 / 5" style indicators
- **Accessible** with proper image alt text and touch targets

## Variations

### With Zoom

Wrap items in a pinch-to-zoom container:

```tsx
import { PinchGestureHandler } from 'react-native-gesture-handler';

const renderItem = ({ item }) => (
  <PinchGestureHandler>
    <Animated.Image source={{ uri: item.uri }} style={styles.productImage} />
  </PinchGestureHandler>
);
```

### With Sale Badge

Overlay a badge on specific slides:

```tsx
const renderItem = ({ item }) => (
  <View style={styles.slide}>
    <Image source={{ uri: item.uri }} style={styles.productImage} />
    {item.onSale && (
      <View style={styles.saleBadge}>
        <Text style={styles.saleText}>SALE</Text>
      </View>
    )}
  </View>
);
```
