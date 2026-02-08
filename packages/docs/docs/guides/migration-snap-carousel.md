---
sidebar_position: 4
title: Migrating from snap-carousel
---

# Migrating from react-native-snap-carousel

`react-native-snap-carousel` is no longer actively maintained. This guide walks you through migrating to Ultra Carousel step by step.

## Why Migrate?

- snap-carousel uses the old `ScrollView`/`FlatList` approach with JS-driven animations
- No Reanimated support means animations run on the JS thread
- No TypeScript support (community types only)
- No active maintenance since 2021

## Step 1: Install Ultra Carousel

```bash
yarn remove react-native-snap-carousel
yarn add react-native-ultra-carousel react-native-reanimated react-native-gesture-handler
```

See the [Installation](/docs/getting-started/installation) guide for full setup including Babel config and gesture handler.

## Step 2: Update Imports

```tsx
// Before
import Carousel from 'react-native-snap-carousel';

// After
import { UltraCarousel } from 'react-native-ultra-carousel';
```

## Step 3: Update Props

### Basic Props Mapping

| snap-carousel | Ultra Carousel | Notes |
|---|---|---|
| `data` | `data` | Same |
| `renderItem` | `renderItem` | Same signature |
| `sliderWidth` | `width` | Renamed |
| `itemWidth` | `itemWidth` | Same |
| `sliderHeight` | `height` | Renamed |
| `itemHeight` | `itemHeight` | Same |
| `loop` | `loop` | Same |
| `autoplay` | `autoPlay` | Camel case change |
| `autoplayDelay` | `autoPlayDelay` | Camel case change |
| `autoplayInterval` | `autoPlayInterval` | Camel case change |
| `enableSnap` | `snapEnabled` | Renamed |
| `firstItem` | `defaultIndex` | Renamed |
| `vertical` | `horizontal={false}` | Inverted boolean |
| `inactiveSlideScale` | `presetConfig.minScale` | Moved to preset config |
| `inactiveSlideOpacity` | `presetConfig.minOpacity` | Moved to preset config |
| `layout` | `preset` | See preset mapping below |

### Layout to Preset Mapping

| snap-carousel `layout` | Ultra Carousel `preset` |
|---|---|
| `'default'` | `'slide'` |
| `'stack'` | `'stack'` |
| `'tinder'` | `'tinder'` |

### Before and After

```tsx
// Before (snap-carousel)
<Carousel
  data={data}
  renderItem={renderItem}
  sliderWidth={screenWidth}
  itemWidth={screenWidth * 0.8}
  inactiveSlideScale={0.9}
  inactiveSlideOpacity={0.7}
  loop
  autoplay
  autoplayInterval={3000}
  layout="default"
/>

// After (Ultra Carousel)
<UltraCarousel
  data={data}
  renderItem={renderItem}
  width={screenWidth}
  itemWidth={screenWidth * 0.8}
  preset="slide"
  presetConfig={{
    minScale: 0.9,
    minOpacity: 0.7,
  }}
  loop
  autoPlay
  autoPlayInterval={3000}
/>
```

## Step 4: Update Ref Usage

```tsx
// Before
const carouselRef = useRef(null);
carouselRef.current.snapToItem(2);
carouselRef.current.snapToNext();
carouselRef.current.snapToPrev();

// After
const carouselRef = useRef<UltraCarouselRef>(null);
carouselRef.current?.scrollTo(2);
carouselRef.current?.next();
carouselRef.current?.prev();
```

## Step 5: Update Pagination

snap-carousel shipped a separate `Pagination` component. Ultra Carousel includes pagination as a built-in prop:

```tsx
// Before
import Carousel, { Pagination } from 'react-native-snap-carousel';

<Carousel ... />
<Pagination
  dotsLength={data.length}
  activeDotIndex={activeSlide}
  dotStyle={styles.dot}
  inactiveDotOpacity={0.4}
  inactiveDotScale={0.6}
/>

// After
<UltraCarousel
  data={data}
  pagination={{
    type: 'dot',
    activeColor: '#333',
    inactiveColor: 'rgba(0,0,0,0.4)',
    size: 10,
  }}
  renderItem={renderItem}
/>
```

## Step 6: Update Callbacks

```tsx
// Before
onSnapToItem={(index) => setActiveSlide(index)}
onBeforeSnapToItem={(index) => console.log('will snap to', index)}

// After
onActiveIndexChange={(index) => setActiveSlide(index)}
onScrollStart={() => console.log('scroll started')}
onScrollEnd={(index) => console.log('snapped to', index)}
```

## Step 7: Update ParallaxImage

snap-carousel included `ParallaxImage`. In Ultra Carousel, use the `parallax` preset:

```tsx
// Before
import { ParallaxImage } from 'react-native-snap-carousel';

const renderItem = ({ item, index }, parallaxProps) => (
  <ParallaxImage
    source={{ uri: item.image }}
    containerStyle={styles.imageContainer}
    style={styles.image}
    parallaxFactor={0.4}
    {...parallaxProps}
  />
);

// After
<UltraCarousel
  data={data}
  preset="parallax"
  presetConfig={{ parallaxFactor: 0.4 }}
  renderItem={({ item, parallaxStyle }) => (
    <View style={styles.imageContainer}>
      <Animated.Image
        source={{ uri: item.image }}
        style={[styles.image, parallaxStyle]}
      />
    </View>
  )}
/>
```

## Common Issues

### "Reanimated plugin not found"

Make sure you added `react-native-reanimated/plugin` to your Babel config and cleared the bundler cache.

### Gesture conflicts

If the carousel is inside a scrollable container, wrap it with `simultaneousHandlers` or use `nestedScrollEnabled`.

### Different sizing behavior

snap-carousel centers items based on `sliderWidth` and `itemWidth`. Ultra Carousel does the same with `width` and `itemWidth`, but margins and padding are handled differently. Adjust your item styles if spacing looks off.
