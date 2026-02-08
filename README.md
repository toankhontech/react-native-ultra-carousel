# react-native-ultra-carousel

[![npm version](https://img.shields.io/npm/v/react-native-ultra-carousel.svg)](https://www.npmjs.com/package/react-native-ultra-carousel)
[![license](https://img.shields.io/npm/l/react-native-ultra-carousel.svg)](https://github.com/toankhontech/react-native-ultra-carousel/blob/main/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue.svg)](https://www.typescriptlang.org/)
[![Platform](https://img.shields.io/badge/platform-iOS%20%7C%20Android-lightgrey.svg)](https://reactnative.dev/)

**The Ultimate Carousel Ecosystem for React Native**

A high-performance, fully customizable carousel library built on `react-native-reanimated` and `react-native-gesture-handler`. Ships with 35+ animation presets, a plugin system, and full TypeScript support.

---

## Features

| | Feature | Description |
|---|---------|-------------|
| 🎨 | **35+ Animation Presets** | From basic slide to 3D cube, coverflow, tinder, and more |
| ⚡ | **60 FPS Animations** | All animations run on the UI thread via Reanimated worklets |
| 🔌 | **Plugin System** | Extend behavior with custom plugins |
| 📱 | **Cross-Platform** | iOS, Android, and Expo supported |
| 🎯 | **TypeScript First** | Strict mode, full type coverage |
| ♿ | **Accessible** | Screen reader support, keyboard navigation |
| 🔄 | **Auto Play** | Built-in auto-advance with pause-on-interaction |
| 📐 | **Flexible Layout** | Horizontal, vertical, multi-item, gap, snap alignment |

## Quick Start

### Installation

```bash
# npm
npm install react-native-ultra-carousel react-native-reanimated react-native-gesture-handler

# yarn
yarn add react-native-ultra-carousel react-native-reanimated react-native-gesture-handler
```

> Make sure to follow the installation guides for [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started) and [react-native-gesture-handler](https://docs.swmansion.com/react-native-gesture-handler/docs/fundamentals/installation).

### Compatibility

| Environment | Supported Versions |
|---|---|
| React | >= 18.0.0 (including React 19) |
| React Native | >= 0.72.0 |
| react-native-reanimated | >= 3.0.0 |
| react-native-gesture-handler | >= 2.9.0 |
| Expo SDK | 50, 51, 52, 53 |

> **Expo Go note:** If you encounter a Worklets version mismatch error with `react-native-reanimated` >= 4.x in Expo Go, use a [development build](https://docs.expo.dev/develop/development-builds/introduction/) instead, or pin reanimated to `~3.16.0` for Expo SDK 53 compatibility.

### Basic Usage

```tsx
import { Carousel } from 'react-native-ultra-carousel';

const data = [
  { id: 1, title: 'First Slide', color: '#FF6B6B' },
  { id: 2, title: 'Second Slide', color: '#4ECDC4' },
  { id: 3, title: 'Third Slide', color: '#45B7D1' },
];

export default function App() {
  return (
    <Carousel
      data={data}
      renderItem={({ item }) => (
        <View style={{ flex: 1, backgroundColor: item.color, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 24, color: '#fff' }}>{item.title}</Text>
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

### Basic

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

### Advanced

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

### Creative

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

### Carousel Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `T[]` | **required** | Array of data items |
| `renderItem` | `(info) => ReactNode` | **required** | Render function for each item |
| `preset` | `PresetName \| Function` | `'slide'` | Animation preset |
| `width` | `number` | screen width | Container width |
| `height` | `number` | `250` | Container height |
| `direction` | `'horizontal' \| 'vertical'` | `'horizontal'` | Scroll direction |
| `loop` | `boolean` | `false` | Enable infinite loop |
| `autoPlay` | `boolean \| AutoPlayConfig` | `false` | Auto advance slides |
| `autoPlayInterval` | `number` | `3000` | Auto play interval (ms) |
| `pagination` | `boolean \| PaginationConfig` | `false` | Show pagination |
| `gap` | `number` | `0` | Gap between items |
| `snapAlignment` | `'start' \| 'center' \| 'end'` | `'center'` | Snap position |
| `onIndexChange` | `(index) => void` | - | Index change callback |
| `gestureConfig` | `GestureConfig` | - | Gesture customization |
| `plugins` | `CarouselPlugin[]` | - | Array of plugins |

### useCarousel Hook

```tsx
import { useCarousel } from 'react-native-ultra-carousel';

const carousel = useCarousel();

// Control
carousel.next();
carousel.prev();
carousel.scrollTo(3);

// State
console.log(carousel.activeIndex);
console.log(carousel.totalItems);
console.log(carousel.isAnimating);

// Attach to component
<Carousel ref={carousel.ref} {...otherProps} />
```

### Custom Animations

```tsx
import { Carousel, type CustomAnimationFn } from 'react-native-ultra-carousel';
import { interpolate, Extrapolation } from 'react-native-reanimated';

const myAnimation: CustomAnimationFn = (progress, index, total) => {
  'worklet';

  const rotate = interpolate(progress, [-1, 0, 1], [-30, 0, 30], Extrapolation.CLAMP);
  const scale = interpolate(Math.abs(progress), [0, 1], [1, 0.8], Extrapolation.CLAMP);

  return {
    transform: [
      { rotate: `${rotate}deg` },
      { scale },
    ],
    opacity: interpolate(Math.abs(progress), [0, 1], [1, 0.5], Extrapolation.CLAMP),
  };
};

<Carousel data={data} renderItem={renderItem} preset={myAnimation} />
```

### Plugin System

```tsx
import { Carousel, createPlugin } from 'react-native-ultra-carousel';

const analyticsPlugin = createPlugin({
  name: 'analytics',
  onIndexChange: (index) => {
    analytics.track('carousel_swipe', { index });
  },
});

<Carousel data={data} renderItem={renderItem} plugins={[analyticsPlugin]} />
```

### Pagination Styles

```tsx
// Dot (default)
<Carousel pagination />

// Bar
<Carousel pagination={{ type: 'bar' }} />

// Number ("1 / 5")
<Carousel pagination={{ type: 'number' }} />

// Progress bar
<Carousel pagination={{ type: 'progress' }} />

// Custom
<Carousel
  pagination={{
    type: 'custom',
    renderCustom: ({ currentIndex, totalItems }) => (
      <Text>{currentIndex + 1} of {totalItems}</Text>
    ),
  }}
/>
```

## Expo Support

Works out of the box with Expo SDK 50+. Just install the dependencies:

```bash
npx expo install react-native-ultra-carousel react-native-reanimated react-native-gesture-handler
```

Add the Reanimated babel plugin to your `babel.config.js`:

```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-reanimated/plugin'],
  };
};
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup and guidelines.

## License

MIT - see [LICENSE](LICENSE) for details.

---

Built with care by [toankhontech](https://github.com/toankhontech)
