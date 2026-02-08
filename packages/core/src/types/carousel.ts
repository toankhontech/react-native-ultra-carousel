/**
 * @file Core type definitions for react-native-ultra-carousel
 * @description All public-facing types used across the carousel ecosystem
 */

import type { ViewStyle, StyleProp } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import type { PanGesture } from 'react-native-gesture-handler';
import type { CustomAnimationFn } from './animation';
import type { CarouselPlugin } from './plugin';
import type { PaginationConfig, PaginationRenderInfo } from './pagination';

/** All available animation preset names */
export type PresetName =
  | 'slide'
  | 'fade'
  | 'slide-fade'
  | 'scale'
  | 'scale-fade'
  | 'vertical'
  | 'vertical-fade'
  | 'parallax'
  | 'overlap'
  | 'peek'
  | 'stack'
  | 'tinder'
  | 'coverflow'
  | 'cube'
  | 'flip'
  | 'wheel'
  | 'accordion'
  | 'zoom'
  | 'rotate'
  | 'depth'
  | 'newspaper'
  | 'origami'
  | 'carousel-3d'
  | 'wave'
  | 'spiral'
  | 'glitch'
  | 'morph'
  | 'shutter'
  | 'domino'
  | 'elastic'
  | 'blur-slide'
  | 'windmill'
  | 'film-strip'
  | 'helix'
  | 'gravity';

/** Direction of carousel scrolling */
export type CarouselDirection = 'horizontal' | 'vertical';

/** Snap alignment within the container */
export type SnapAlignment = 'start' | 'center' | 'end';

/** Information passed to renderItem callback */
export interface RenderItemInfo<T> {
  /** The data item */
  item: T;
  /** Index in the data array */
  index: number;
  /** Animated progress value for this item */
  animationProgress: SharedValue<number>;
  /** Whether this item is currently active */
  isActive: boolean;
}

/** Gesture configuration for fine-tuning */
export interface GestureConfig {
  /** Minimum horizontal distance before gesture activates (default: 10) */
  activeOffsetX?: number | [number, number];
  /** Minimum vertical distance before gesture activates */
  activeOffsetY?: number | [number, number];
  /** Velocity threshold for fling gesture (default: 500) */
  velocityThreshold?: number;
  /** Enable/disable fling gesture (default: true) */
  enableFling?: boolean;
  /** Callback to customize the pan gesture */
  onConfigurePanGesture?: (gesture: PanGesture) => void;
}

/** Auto play configuration */
export interface AutoPlayConfig {
  /** Enable auto play (default: false) */
  enabled: boolean;
  /** Interval between slides in ms (default: 3000) */
  interval?: number;
  /** Pause on user interaction (default: true) */
  pauseOnInteraction?: boolean;
  /** Direction: forward or backward (default: 'forward') */
  direction?: 'forward' | 'backward';
}

/** Main Carousel component props */
export interface CarouselProps<T> {
  /** Array of data items */
  data: T[];
  /** Render function for each item */
  renderItem: (info: RenderItemInfo<T>) => React.ReactNode;

  /** Animation preset name or custom animation function */
  preset?: PresetName | CustomAnimationFn;
  /** Animation configuration overrides for the selected preset */
  animationConfig?: Record<string, number>;

  /** Container width (default: screen width) */
  width?: number;
  /** Container height (default: auto) */
  height?: number;
  /** Individual item width (default: container width) */
  itemWidth?: number;
  /** Individual item height (default: container height) */
  itemHeight?: number;
  /** Scroll direction (default: 'horizontal') */
  direction?: CarouselDirection;
  /** Number of items visible at once (default: 1) */
  visibleItems?: number;
  /** Gap between items in pixels (default: 0) */
  gap?: number;
  /** Snap alignment (default: 'center') */
  snapAlignment?: SnapAlignment;

  /** Enable infinite loop (default: false) */
  loop?: boolean;
  /** Initial active index (default: 0) */
  initialIndex?: number;
  /** Enable/disable user interaction (default: true) */
  enabled?: boolean;

  /** Enable auto play (default: false) */
  autoPlay?: boolean | AutoPlayConfig;
  /** Auto play interval in ms (default: 3000) */
  autoPlayInterval?: number;

  /** Enable/configure pagination */
  pagination?: boolean | PaginationConfig;

  /** Gesture configuration */
  gestureConfig?: GestureConfig;

  /** Called when active index changes */
  onIndexChange?: (index: number) => void;
  /** Called when scroll begins */
  onScrollStart?: () => void;
  /** Called when scroll ends */
  onScrollEnd?: (index: number) => void;
  /** Shared value updated with scroll progress */
  scrollProgress?: SharedValue<number>;

  /** Array of plugins to apply */
  plugins?: CarouselPlugin[];

  /** Max items to render (virtualization). 0 = render all (default: 0) */
  maxRenderItems?: number;
  /** Buffer items outside visible area (default: 2) */
  renderBuffer?: number;

  /** Enable accessibility features (default: true) */
  accessible?: boolean;
  /** Carousel label for screen readers */
  accessibilityLabel?: string;

  /** Container style */
  style?: StyleProp<ViewStyle>;
  /** Item container style */
  itemStyle?: StyleProp<ViewStyle>;
}

/** Carousel instance methods (exposed via ref) */
export interface CarouselRef {
  /** Scroll to specific index */
  scrollTo: (index: number, animated?: boolean) => void;
  /** Go to next item */
  next: (animated?: boolean) => void;
  /** Go to previous item */
  prev: (animated?: boolean) => void;
  /** Get current active index */
  getCurrentIndex: () => number;
  /** Start auto play */
  startAutoPlay: () => void;
  /** Stop auto play */
  stopAutoPlay: () => void;
  /** Pause auto play (resumes on next interaction) */
  pauseAutoPlay: () => void;
}

export type { PaginationConfig, PaginationRenderInfo };
