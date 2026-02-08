/**
 * @file react-native-ultra-carousel
 * @description The Ultimate Carousel Ecosystem for React Native
 * @author toankhontech
 * @license MIT
 */

// === Components ===
export { Carousel } from './components/Carousel';
export { Pagination } from './components/Pagination';
export { ParallaxImage } from './components/ParallaxImage';
export { ImageGallery } from './components/ImageGallery';
export type { ImageGalleryProps, ImageGalleryItem } from './components/ImageGallery';
export { OnboardingCarousel } from './components/OnboardingCarousel';
export type { OnboardingCarouselProps, OnboardingStep } from './components/OnboardingCarousel';

// === Hooks ===
export { useCarousel } from './hooks/useCarousel';
export type { UseCarouselReturn } from './hooks/useCarousel';
export { useAnimationProgress } from './hooks/useAnimationProgress';
export { useItemAnimation } from './hooks/useItemAnimation';
export { useCarouselGesture } from './hooks/useCarouselGesture';
export { useAutoPlay } from './hooks/useAutoPlay';
export type { UseAutoPlayReturn } from './hooks/useAutoPlay';
export { useSnapPoints } from './hooks/useSnapPoints';
export { usePagination } from './hooks/usePagination';

// === Animations ===
export {
  // Basic
  slideAnimation,
  fadeAnimation,
  slideFadeAnimation,
  scaleAnimation,
  scaleFadeAnimation,
  verticalAnimation,
  verticalFadeAnimation,
  parallaxAnimation,
  overlapAnimation,
  peekAnimation,
  // Advanced
  stackAnimation,
  tinderAnimation,
  coverflowAnimation,
  cubeAnimation,
  flipAnimation,
  wheelAnimation,
  accordionAnimation,
  zoomAnimation,
  rotateAnimation,
  depthAnimation,
  // Creative
  newspaperAnimation,
  origamiAnimation,
  carousel3dAnimation,
  waveAnimation,
  spiralAnimation,
  glitchAnimation,
  morphAnimation,
  shutterAnimation,
  dominoAnimation,
  elasticAnimation,
  blurSlideAnimation,
  windmillAnimation,
  filmStripAnimation,
  helixAnimation,
  gravityAnimation,
  // Registry
  registerPreset,
  getPreset,
  getPresetMeta,
  getAllPresetNames,
  getAllPresetMeta,
  isPresetRegistered,
} from './animations';

// === Plugin System ===
export { createPlugin, PluginManager } from './plugins/PluginManager';
export { createAutoPlayPlugin } from './plugins/built-in/autoPlay';
export type { AutoPlayPluginConfig } from './plugins/built-in/autoPlay';
export { createPaginationPlugin } from './plugins/built-in/pagination';
export type { PaginationPluginConfig } from './plugins/built-in/pagination';
export { createParallaxImagePlugin } from './plugins/built-in/parallaxImage';
export type { ParallaxImagePluginConfig } from './plugins/built-in/parallaxImage';

// === Theme System ===
export {
  lightTheme,
  darkTheme,
  vibrantTheme,
  minimalTheme,
  themes,
  getTheme,
  createTheme,
} from './theme';
export type { CarouselTheme, ThemeName } from './theme';

// === Utilities ===
export { isRTL, flipForRTL, getFlexDirection, resolveAlignment } from './utils/rtl';

// === Dev Tools ===
export { PerformanceMonitor } from './dev/PerformanceMonitor';
export type { PerformanceMonitorProps } from './dev/PerformanceMonitor';

// === Types ===
export type {
  CarouselProps,
  CarouselRef,
  PresetName,
  CarouselDirection,
  SnapAlignment,
  RenderItemInfo,
  GestureConfig,
  AutoPlayConfig,
  AnimatedItemStyle,
  AnimationPresetFn,
  CustomAnimationFn,
  AnimationPresetMeta,
  CarouselPlugin,
  CreatePluginOptions,
  PaginationConfig,
  PaginationRenderInfo,
  PaginationType,
  PaginationPosition,
  BasePaginationProps,
  GestureState,
  PanGestureConfig,
  SnapResult,
} from './types';
