---
sidebar_position: 3
title: Accessibility
---

# Accessibility

Ultra Carousel is designed with accessibility in mind, supporting screen readers, keyboard navigation, and reduced motion preferences.

## Screen Reader Support

### Automatic Announcements

By default, Ultra Carousel announces slide changes to screen readers:

```tsx
<UltraCarousel
  data={data}
  accessibilityLabel="Product gallery"
  accessibilityHint="Swipe left or right to browse products"
  announceSlideChange  // Default: true
  renderItem={renderItem}
/>
```

When the user navigates to slide 3 of 5, the screen reader announces: **"Slide 3 of 5"**.

### Customizing Announcements

Override the default announcement text:

```tsx
<UltraCarousel
  data={data}
  announceSlideChange
  getAccessibilityAnnouncement={(index, total, item) =>
    `${item.title}, product ${index + 1} of ${total}`
  }
  renderItem={renderItem}
/>
```

### Item Accessibility

Add accessibility properties to each carousel item:

```tsx
const renderItem = ({ item, index, isActive }) => (
  <View
    accessible
    accessibilityRole="button"
    accessibilityLabel={item.title}
    accessibilityState={{ selected: isActive }}
    accessibilityHint={`Tap to view ${item.title}`}
  >
    <Image source={item.image} accessibilityLabel={item.imageAlt} />
    <Text>{item.title}</Text>
  </View>
);
```

## Keyboard Navigation

Ultra Carousel supports keyboard navigation on React Native Web:

| Key | Action |
|---|---|
| Arrow Left | Previous slide |
| Arrow Right | Next slide |
| Home | First slide |
| End | Last slide |
| Space / Enter | Activate current slide |

Enable keyboard support:

```tsx
<UltraCarousel
  data={data}
  keyboardNavigationEnabled  // Default: true on web
  renderItem={renderItem}
/>
```

Or use the keyboard plugin for native platforms:

```tsx
import { keyboardPlugin } from 'react-native-ultra-carousel';

<UltraCarousel
  data={data}
  plugins={[keyboardPlugin()]}
  renderItem={renderItem}
/>
```

## Reduced Motion

Ultra Carousel respects the user's reduced motion preference. When enabled, animations are replaced with simple crossfades:

```tsx
import { useReducedMotion } from 'react-native-reanimated';

function MyCarousel() {
  const reducedMotion = useReducedMotion();

  return (
    <UltraCarousel
      data={data}
      preset={reducedMotion ? 'fade' : 'cube'}
      animationDuration={reducedMotion ? 0 : 300}
      renderItem={renderItem}
    />
  );
}
```

Or use the built-in automatic handling:

```tsx
<UltraCarousel
  data={data}
  preset="cube"
  respectReducedMotion  // Auto-fallback to fade when reduced motion is on
  renderItem={renderItem}
/>
```

## Focus Management

### Auto-Focus Active Item

Automatically move focus to the active slide for screen reader users:

```tsx
<UltraCarousel
  data={data}
  autoFocusActiveItem  // Moves screen reader focus to active slide
  renderItem={renderItem}
/>
```

### Focus Trap

Keep focus within the carousel when navigating with Tab:

```tsx
<UltraCarousel
  data={data}
  trapFocus  // Prevent focus from leaving the carousel
  renderItem={renderItem}
/>
```

## ARIA Attributes (Web)

On React Native Web, Ultra Carousel renders proper ARIA attributes:

```html
<div role="region" aria-label="Product gallery" aria-roledescription="carousel">
  <div role="group" aria-roledescription="slide" aria-label="Slide 1 of 5">
    <!-- Slide content -->
  </div>
</div>
```

## Touch Target Sizes

Ensure pagination controls meet minimum touch target requirements (44x44 points):

```tsx
<UltraCarousel
  data={data}
  pagination={{
    type: 'dot',
    size: 12,
    hitSlop: { top: 16, bottom: 16, left: 8, right: 8 }, // Expand touch area
  }}
  renderItem={renderItem}
/>
```

## Accessibility Checklist

- [ ] Every carousel has an `accessibilityLabel`
- [ ] Every carousel item has an `accessibilityLabel`
- [ ] Images have descriptive `accessibilityLabel` values
- [ ] Slide change announcements are enabled
- [ ] Reduced motion preference is respected
- [ ] Touch targets are at least 44x44 points
- [ ] Auto-play can be paused by the user
- [ ] Color contrast meets WCAG AA standards
