<p align="center">
  <h1 align="center">react-native-ultra-carousel</h1>
</p>

<p align="center">
  <b>The Ultimate Carousel Ecosystem for React Native</b>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/react-native-ultra-carousel"><img src="https://img.shields.io/npm/v/react-native-ultra-carousel.svg?style=flat-square&color=blue" alt="npm version" /></a>
  <a href="https://www.npmjs.com/package/react-native-ultra-carousel"><img src="https://img.shields.io/npm/dm/react-native-ultra-carousel.svg?style=flat-square&color=green" alt="npm downloads" /></a>
  <a href="https://github.com/toankhontech/react-native-ultra-carousel/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/react-native-ultra-carousel.svg?style=flat-square" alt="license" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-strict-blue.svg?style=flat-square" alt="TypeScript" /></a>
  <a href="https://reactnative.dev/"><img src="https://img.shields.io/badge/platform-iOS%20%7C%20Android-lightgrey.svg?style=flat-square" alt="Platform" /></a>
</p>

<p align="center">
  A high-performance, fully customizable carousel library built on <code>react-native-reanimated</code> and <code>react-native-gesture-handler</code>.<br/>
  Ships with <b>35+ animation presets</b>, a <b>plugin system</b>, <b>theme support</b>, and full <b>TypeScript</b> coverage.
</p>

---

## Highlights

- **35+ Animation Presets** — From basic slide/fade to 3D cube, coverflow, tinder, helix, and more
- **60 FPS Animations** — All animations run on the UI thread via Reanimated worklets
- **Plugin System** — Extend carousel behavior with custom or built-in plugins
- **Theme Support** — Light, dark, vibrant, minimal themes out of the box
- **Cross-Platform** — iOS, Android, and Expo (SDK 50+)
- **TypeScript First** — Strict mode, full type coverage, IntelliSense-friendly API
- **Accessible** — Screen reader support, accessibility actions built in
- **Auto Play** — Built-in auto-advance with pause-on-interaction
- **Flexible Layout** — Horizontal/vertical, multi-item, gap, snap alignment
- **Custom Animations** — Write your own worklet-based animation functions
- **Built-in Components** — `ParallaxImage`, `ImageGallery`, `OnboardingCarousel`

## Installation

```bash
npm install react-native-ultra-carousel react-native-reanimated react-native-gesture-handler
```

```bash
yarn add react-native-ultra-carousel react-native-reanimated react-native-gesture-handler
```

```bash
npx expo install react-native-ultra-carousel react-native-reanimated react-native-gesture-handler
```

> Follow the setup guides for [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started) and [react-native-gesture-handler](https://docs.swmansion.com/react-native-gesture-handler/docs/fundamentals/installation) if you haven't already.

Add the Reanimated babel plugin to your `babel.config.js`:

```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'], // or 'module:metro-react-native-babel-preset'
    plugins: ['react-native-reanimated/plugin'],
  };
};
```

## Compatibility

| Environment | Versions |
|---|---|
| React | >= 18.0.0 (including React 19) |
| React Native | >= 0.72.0 |
| react-native-reanimated | >= 3.0.0 |
| react-native-gesture-handler | >= 2.9.0 |
| Expo SDK | 50, 51, 52, 53 |

> **Expo Go note:** If you encounter a Worklets version mismatch error with `react-native-reanimated` >= 4.x in Expo Go, use a [development build](https://docs.expo.dev/develop/development-builds/introduction/) instead, or pin reanimated to `~3.16.0` for Expo SDK 53 compatibility.

## Quick Start

```tsx
import { Carousel } from 'react-native-ultra-carousel';
import { View, Text } from 'react-native';

const data = [
  { id: '1', title: 'First Slide', color: '#FF6B6B' },
  { id: '2', title: 'Second Slide', color: '#4ECDC4' },
  { id: '3', title: 'Third Slide', color: '#45B7D1' },
];

export default function App() {
  return (
    <Carousel
      data={data}
      renderItem={({ item }) => (
        <View style={{ flex: 1, backgroundColor: item.color, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 24, color: '#fff', fontWeight: 'bold' }}>{item.title}</Text>
        </View>
      )}
      preset="slide"
      pagination
      autoPlay
      width={350}
      height={200}
    />
  );
}
```

## Animation Presets

### Basic (10 presets)

| Preset | Description |
|--------|-------------|
| `slide` | Standard horizontal slide (default) |
| `fade` | Crossfade between stacked items |
| `slide-fade` | Slide + fade combination |
| `scale` | Active item full-size, neighbors shrink |
| `scale-fade` | Scale + fade combination |
| `vertical` | Vertical slide transition |
| `vertical-fade` | Vertical slide + fade |
| `parallax` | Multi-layer parallax depth |
| `overlap` | Items overlap with 30% coverage |
| `peek` | Adjacent items peek from sides |

### Advanced (10 presets)

| Preset | Description |
|--------|-------------|
| `stack` | Stacked cards with swipe-to-reveal |
| `tinder` | Tinder-style swipe cards with rotation |
| `coverflow` | Apple CoverFlow 3D perspective |
| `cube` | 3D cube rotation |
| `flip` | 3D card flip |
| `wheel` | Ferris wheel circular motion |
| `accordion` | Fold/unfold effect |
| `zoom` | Zoom in/out transition |
| `rotate` | Rotation-based transition |
| `depth` | Depth-of-field effect |

### Creative (15 presets)

| Preset | Description |
|--------|-------------|
| `newspaper` | Fly in with spin like headlines |
| `origami` | Paper-fold origami effect |
| `carousel-3d` | True 3D circular carousel |
| `wave` | Sine wave motion |
| `spiral` | Spiral outward with rotation |
| `glitch` | Digital glitch jitter effect |
| `morph` | Shape morphing transition |
| `shutter` | Camera shutter open/close |
| `domino` | Domino falling effect |
| `elastic` | Elastic bounce stretch |
| `blur-slide` | Slide with simulated blur |
| `windmill` | Windmill pivot rotation |
| `film-strip` | Film strip slide with jitter |
| `helix` | DNA helix 3D spiral |
| `gravity` | Gravity drop with bounce |

## API Reference

### `<Carousel />` Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `T[]` | **required** | Array of data items |
| `renderItem` | `(info: RenderItemInfo<T>) => ReactNode` | **required** | Render function for each item |
| `preset` | `PresetName \| CustomAnimationFn` | `'slide'` | Animation preset or custom function |
| `width` | `number` | `375` | Container width |
| `height` | `number` | `250` | Container height |
| `itemWidth` | `number` | container width | Width of each item |
| `itemHeight` | `number` | container height | Height of each item |
| `direction` | `'horizontal' \| 'vertical'` | `'horizontal'` | Scroll direction |
| `gap` | `number` | `0` | Gap between items |
| `snapAlignment` | `'start' \| 'center' \| 'end'` | `'center'` | Snap position |
| `loop` | `boolean` | `false` | Enable infinite loop |
| `initialIndex` | `number` | `0` | Starting slide index |
| `enabled` | `boolean` | `true` | Enable/disable gesture |
| `autoPlay` | `boolean \| AutoPlayConfig` | `false` | Auto advance slides |
| `autoPlayInterval` | `number` | `3000` | Auto play interval (ms) |
| `pagination` | `boolean \| PaginationConfig` | `false` | Show pagination indicator |
| `gestureConfig` | `GestureConfig` | — | Gesture customization |
| `plugins` | `CarouselPlugin[]` | — | Array of plugins |
| `onIndexChange` | `(index: number) => void` | — | Called when active index changes |
| `onScrollStart` | `() => void` | — | Called when scrolling starts |
| `onScrollEnd` | `(index: number) => void` | — | Called when scrolling ends |
| `scrollProgress` | `SharedValue<number>` | — | External shared value for scroll offset |
| `accessible` | `boolean` | `true` | Enable accessibility |
| `style` | `ViewStyle` | — | Container style |
| `itemStyle` | `ViewStyle` | — | Style applied to each item wrapper |

### `<Carousel />` Ref Methods

```tsx
import { Carousel, CarouselRef } from 'react-native-ultra-carousel';

const ref = useRef<CarouselRef>(null);

ref.current?.next();                    // Go to next slide
ref.current?.prev();                    // Go to previous slide
ref.current?.scrollTo(3);               // Jump to index 3
ref.current?.scrollTo(3, false);        // Jump without animation
ref.current?.getCurrentIndex();         // Get current index
ref.current?.startAutoPlay();           // Start auto play
ref.current?.stopAutoPlay();            // Stop auto play
ref.current?.pauseAutoPlay();           // Pause auto play

<Carousel ref={ref} data={data} renderItem={renderItem} />
```

### `useCarousel` Hook

```tsx
import { useCarousel } from 'react-native-ultra-carousel';

function MyScreen() {
  const carousel = useCarousel();

  return (
    <>
      <Carousel ref={carousel.ref} data={data} renderItem={renderItem} />
      <Button title="Next" onPress={() => carousel.next()} />
      <Button title="Prev" onPress={() => carousel.prev()} />
      <Text>Current: {carousel.activeIndex}</Text>
    </>
  );
}
```

## Custom Animations

Create your own animation function. It receives the normalized `progress` value (-1 to 1, where 0 = active item) and returns an animated style:

```tsx
import { Carousel, type CustomAnimationFn } from 'react-native-ultra-carousel';
import { interpolate, Extrapolation } from 'react-native-reanimated';

const myAnimation: CustomAnimationFn = (progress) => {
  'worklet';

  const rotate = interpolate(progress, [-1, 0, 1], [-30, 0, 30], Extrapolation.CLAMP);
  const scale = interpolate(Math.abs(progress), [0, 1], [1, 0.8], Extrapolation.CLAMP);
  const opacity = interpolate(Math.abs(progress), [0, 1], [1, 0.5], Extrapolation.CLAMP);

  return {
    transform: [
      { rotate: `${rotate}deg` },
      { scale },
    ],
    opacity,
  };
};

<Carousel data={data} renderItem={renderItem} preset={myAnimation} />
```

## Pagination

```tsx
// Dot pagination (default)
<Carousel data={data} renderItem={renderItem} pagination />

// Bar pagination
<Carousel data={data} renderItem={renderItem} pagination={{ type: 'bar' }} />

// Number pagination ("1 / 5")
<Carousel data={data} renderItem={renderItem} pagination={{ type: 'number' }} />

// Progress bar
<Carousel data={data} renderItem={renderItem} pagination={{ type: 'progress' }} />

// Customized dots
<Carousel
  data={data}
  renderItem={renderItem}
  pagination={{
    type: 'dot',
    activeColor: '#FF6B6B',
    inactiveColor: '#ddd',
    size: 10,
    gap: 8,
  }}
/>

// Custom renderer
<Carousel
  data={data}
  renderItem={renderItem}
  pagination={{
    type: 'custom',
    renderCustom: ({ currentIndex, totalItems }) => (
      <Text>{currentIndex + 1} of {totalItems}</Text>
    ),
  }}
/>
```

## Plugin System

Extend carousel behavior with plugins:

```tsx
import { Carousel, createPlugin } from 'react-native-ultra-carousel';

// Create a custom plugin
const analyticsPlugin = createPlugin({
  name: 'analytics',
  onIndexChange: (index) => {
    analytics.track('carousel_swipe', { slideIndex: index });
  },
  onInit: (carouselRef) => {
    console.log('Carousel initialized');
  },
  onDestroy: () => {
    console.log('Carousel destroyed');
  },
});

<Carousel data={data} renderItem={renderItem} plugins={[analyticsPlugin]} />
```

### Built-in Plugins

```tsx
import {
  createAutoPlayPlugin,
  createPaginationPlugin,
  createParallaxImagePlugin,
} from 'react-native-ultra-carousel';

// Auto play plugin with custom config
const autoPlay = createAutoPlayPlugin({ interval: 5000, direction: 'forward' });

// Pagination plugin
const pagination = createPaginationPlugin({ type: 'dot', position: 'bottom' });

// Parallax image plugin
const parallax = createParallaxImagePlugin({ speed: 0.5 });
```

## Theme Support

```tsx
import { Carousel, lightTheme, darkTheme, createTheme } from 'react-native-ultra-carousel';

// Use built-in themes: 'light', 'dark', 'vibrant', 'minimal'
<Carousel theme={darkTheme} ... />

// Create a custom theme
const myTheme = createTheme({
  colors: {
    primary: '#FF6B6B',
    background: '#1a1a2e',
    text: '#ffffff',
    border: '#333366',
  },
  borderRadius: 16,
  spacing: 12,
});
```

## Built-in Components

### `<ParallaxImage />`

Parallax scrolling image inside carousel items:

```tsx
import { Carousel, ParallaxImage } from 'react-native-ultra-carousel';

<Carousel
  data={images}
  renderItem={({ item, animationProgress }) => (
    <ParallaxImage
      source={{ uri: item.url }}
      animationProgress={animationProgress}
      speed={0.3}
      style={{ width: '100%', height: '100%' }}
    />
  )}
/>
```

### `<ImageGallery />`

Full-featured image gallery carousel:

```tsx
import { ImageGallery } from 'react-native-ultra-carousel';

<ImageGallery
  images={[
    { uri: 'https://example.com/1.jpg', title: 'Photo 1' },
    { uri: 'https://example.com/2.jpg', title: 'Photo 2' },
  ]}
  width={400}
  height={300}
  pagination
/>
```

### `<OnboardingCarousel />`

Ready-to-use onboarding flow:

```tsx
import { OnboardingCarousel } from 'react-native-ultra-carousel';

<OnboardingCarousel
  steps={[
    { title: 'Welcome', description: 'Get started...', image: require('./welcome.png') },
    { title: 'Features', description: 'Discover...', image: require('./features.png') },
    { title: 'Ready', description: 'Let\'s go!', image: require('./ready.png') },
  ]}
  onComplete={() => navigation.navigate('Home')}
/>
```

## Advanced Usage

### Vertical Carousel

```tsx
<Carousel
  data={data}
  renderItem={renderItem}
  direction="vertical"
  width={300}
  height={500}
  preset="vertical-fade"
/>
```

### Multi-Item with Gaps

```tsx
<Carousel
  data={data}
  renderItem={renderItem}
  width={screenWidth}
  height={200}
  itemWidth={screenWidth * 0.7}
  gap={16}
  snapAlignment="center"
  preset="scale"
/>
```

### Auto Play with Custom Config

```tsx
<Carousel
  data={data}
  renderItem={renderItem}
  autoPlay={{
    enabled: true,
    interval: 4000,
    direction: 'forward',
    pauseOnInteraction: true,
  }}
/>
```

### Tracking Scroll Progress

```tsx
import { useSharedValue } from 'react-native-reanimated';

function MyCarousel() {
  const scrollProgress = useSharedValue(0);

  return (
    <Carousel
      data={data}
      renderItem={renderItem}
      scrollProgress={scrollProgress}
    />
  );
}
```

### Animation Preset Registry

```tsx
import { registerPreset, getAllPresetNames, getPresetMeta } from 'react-native-ultra-carousel';

// Register a custom preset
registerPreset('my-custom', myAnimationFn, {
  name: 'My Custom',
  category: 'custom',
  description: 'A custom animation',
});

// Use it by name
<Carousel preset="my-custom" ... />

// List all available presets
const names = getAllPresetNames(); // ['slide', 'fade', ..., 'my-custom']
```

## Performance Tips

- All 35+ presets run at **60 FPS** on the UI thread via Reanimated worklets
- Use `maxRenderItems` to limit rendered items for very large datasets
- Custom animations must include the `'worklet'` directive
- Avoid heavy JS computations inside `renderItem` — keep it lightweight
- Use `React.memo` for complex item components

## TypeScript

Full type coverage with strict mode:

```tsx
import type {
  CarouselProps,
  CarouselRef,
  PresetName,
  RenderItemInfo,
  CustomAnimationFn,
  AnimatedItemStyle,
  CarouselPlugin,
  PaginationConfig,
  GestureConfig,
  AutoPlayConfig,
} from 'react-native-ultra-carousel';
```

## Contributing

Contributions are welcome! See [CONTRIBUTING.md](https://github.com/toankhontech/react-native-ultra-carousel/blob/main/CONTRIBUTING.md) for details.

## License

MIT &copy; [toankhontech](https://github.com/toankhontech)

---

<p align="center">
  Created by <a href="https://github.com/toankhontech">toankhontech</a>
</p>
