---
sidebar_position: 4
title: Plugins
---

# Plugins

The plugin system lets you extend Ultra Carousel with custom behavior without modifying the core library.

## Using Plugins

Pass an array of plugin instances to the `plugins` prop:

```tsx
import { UltraCarousel, autoPlayPlugin, lazyLoadPlugin } from 'react-native-ultra-carousel';

<UltraCarousel
  data={data}
  plugins={[
    autoPlayPlugin({ interval: 3000 }),
    lazyLoadPlugin({ preloadCount: 2 }),
  ]}
  renderItem={renderItem}
/>
```

## Built-in Plugins

### autoPlayPlugin

Automatic slide advancement with configurable timing.

```tsx
import { autoPlayPlugin } from 'react-native-ultra-carousel';

autoPlayPlugin({
  interval: 3000,       // ms between slides
  reverse: false,       // reverse direction
  pauseOnHover: true,   // pause on hover (web)
  pauseOnInteraction: true, // pause on touch
})
```

### lazyLoadPlugin

Lazy-load items to reduce initial render time.

```tsx
import { lazyLoadPlugin } from 'react-native-ultra-carousel';

lazyLoadPlugin({
  preloadCount: 2,       // items to preload ahead
  placeholder: LoadingSpinner, // component shown while loading
})
```

### parallaxPlugin

Add parallax scrolling effects to item content.

```tsx
import { parallaxPlugin } from 'react-native-ultra-carousel';

parallaxPlugin({
  factor: 0.3,           // parallax speed factor (0-1)
  direction: 'horizontal', // parallax direction
})
```

### analyticsPlugin

Track carousel interactions for analytics.

```tsx
import { analyticsPlugin } from 'react-native-ultra-carousel';

analyticsPlugin({
  onView: (index) => analytics.track('slide_view', { index }),
  onSwipe: (from, to) => analytics.track('slide_swipe', { from, to }),
  onAutoPlay: (index) => analytics.track('slide_autoplay', { index }),
  viewThreshold: 1000, // ms before counting as a "view"
})
```

### prefetchPlugin

Prefetch images or data for upcoming slides.

```tsx
import { prefetchPlugin } from 'react-native-ultra-carousel';

prefetchPlugin({
  prefetchCount: 3,
  prefetchFn: async (item) => {
    await Image.prefetch(item.imageUrl);
  },
})
```

## Creating Custom Plugins

A plugin is an object implementing the `CarouselPlugin` interface:

```ts
interface CarouselPlugin {
  name: string;
  version?: string;

  // Lifecycle hooks
  onInit?: (context: PluginContext) => void;
  onDestroy?: () => void;

  // Event hooks
  onActiveIndexChange?: (index: number) => void;
  onScrollStart?: () => void;
  onScrollEnd?: (index: number) => void;
  onGestureStart?: (event: GestureEvent) => void;
  onGestureEnd?: (event: GestureEvent) => void;

  // Render hooks
  wrapItem?: (element: ReactElement, index: number) => ReactElement;
  renderOverlay?: (context: PluginContext) => ReactElement | null;
}
```

### PluginContext

The context object provided to plugins:

```ts
interface PluginContext {
  activeIndex: SharedValue<number>;
  progress: SharedValue<number>;
  totalItems: number;
  width: number;
  height: number;
  next: () => void;
  prev: () => void;
  scrollTo: (index: number) => void;
}
```

### Example: Custom Watermark Plugin

```tsx
import { CarouselPlugin, PluginContext } from 'react-native-ultra-carousel';

function watermarkPlugin(text: string): CarouselPlugin {
  return {
    name: 'watermark',
    version: '1.0.0',

    renderOverlay: (context: PluginContext) => (
      <View style={styles.watermark} pointerEvents="none">
        <Text style={styles.watermarkText}>{text}</Text>
      </View>
    ),
  };
}

// Usage
<UltraCarousel
  data={data}
  plugins={[watermarkPlugin('Preview')]}
  renderItem={renderItem}
/>
```

### Example: Keyboard Navigation Plugin

```tsx
function keyboardPlugin(): CarouselPlugin {
  let context: PluginContext;

  return {
    name: 'keyboard-navigation',

    onInit: (ctx) => {
      context = ctx;
      // Web only
      if (typeof window !== 'undefined') {
        window.addEventListener('keydown', handleKeyDown);
      }
    },

    onDestroy: () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('keydown', handleKeyDown);
      }
    },
  };

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'ArrowLeft') context.prev();
    if (e.key === 'ArrowRight') context.next();
  }
}
```

## Plugin Ordering

Plugins are executed in the order they appear in the array. If a plugin wraps items via `wrapItem`, the first plugin wraps outermost:

```tsx
plugins={[outerPlugin, innerPlugin]}
// Renders: <OuterWrap><InnerWrap><Item /></InnerWrap></OuterWrap>
```

## Plugin Compatibility

Plugins should declare their dependencies and conflicts:

```ts
const myPlugin: CarouselPlugin = {
  name: 'my-plugin',
  version: '1.0.0',
  // These are optional metadata fields
  meta: {
    requires: ['autoPlayPlugin'],
    conflicts: ['otherPlugin'],
  },
};
```
