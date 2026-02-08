// ---------------------------------------------------------------------------
// Shared types
// ---------------------------------------------------------------------------

export type CardTransform = {
  translateX: number;
  translateY: number;
  scale: number;
  rotateX: number;
  rotateY: number;
  rotateZ: number;
  opacity: number;
  zIndex: number;
};

export type PresetAnimator = (
  progress: number, // 0 to 1 - how far the transition has progressed
  cardIndex: number, // 0-based index of this card
  activeIndex: number, // which card is currently "active" (centered)
  totalCards: number, // total number of cards (typically 5)
  cardWidth: number, // width of each card in px (typically 220)
) => CardTransform;

// ---------------------------------------------------------------------------
// Import all presets
// ---------------------------------------------------------------------------
import {
  slideAnimator,
  fadeAnimator,
  slideFadeAnimator,
  scaleAnimator,
  scaleFadeAnimator,
  verticalAnimator,
  verticalFadeAnimator,
  parallaxAnimator,
  overlapAnimator,
  peekAnimator,
} from './basic';

import {
  stackAnimator,
  tinderAnimator,
  coverflowAnimator,
  cubeAnimator,
  flipAnimator,
  wheelAnimator,
  accordionAnimator,
  zoomAnimator,
  rotateAnimator,
  depthAnimator,
} from './advanced';

import {
  newspaperAnimator,
  origamiAnimator,
  carousel3dAnimator,
  waveAnimator,
  spiralAnimator,
  glitchAnimator,
  morphAnimator,
  shutterAnimator,
  dominoAnimator,
  elasticAnimator,
  blurSlideAnimator,
  windmillAnimator,
  filmStripAnimator,
  helixAnimator,
  gravityAnimator,
} from './creative';

// ---------------------------------------------------------------------------
// Re-export all presets
// ---------------------------------------------------------------------------

// Basic (10)
export {
  slideAnimator,
  fadeAnimator,
  slideFadeAnimator,
  scaleAnimator,
  scaleFadeAnimator,
  verticalAnimator,
  verticalFadeAnimator,
  parallaxAnimator,
  overlapAnimator,
  peekAnimator,
};

// Advanced (10)
export {
  stackAnimator,
  tinderAnimator,
  coverflowAnimator,
  cubeAnimator,
  flipAnimator,
  wheelAnimator,
  accordionAnimator,
  zoomAnimator,
  rotateAnimator,
  depthAnimator,
};

// Creative (15)
export {
  newspaperAnimator,
  origamiAnimator,
  carousel3dAnimator,
  waveAnimator,
  spiralAnimator,
  glitchAnimator,
  morphAnimator,
  shutterAnimator,
  dominoAnimator,
  elasticAnimator,
  blurSlideAnimator,
  windmillAnimator,
  filmStripAnimator,
  helixAnimator,
  gravityAnimator,
};

// ---------------------------------------------------------------------------
// Preset name -> animator registry
// ---------------------------------------------------------------------------
const animatorRegistry: Record<string, PresetAnimator> = {
  // Basic (10)
  'slide': slideAnimator,
  'fade': fadeAnimator,
  'slide-fade': slideFadeAnimator,
  'scale': scaleAnimator,
  'scale-fade': scaleFadeAnimator,
  'vertical': verticalAnimator,
  'vertical-fade': verticalFadeAnimator,
  'parallax': parallaxAnimator,
  'overlap': overlapAnimator,
  'peek': peekAnimator,

  // Advanced (10)
  'stack': stackAnimator,
  'tinder': tinderAnimator,
  'coverflow': coverflowAnimator,
  'cube': cubeAnimator,
  'flip': flipAnimator,
  'wheel': wheelAnimator,
  'accordion': accordionAnimator,
  'zoom': zoomAnimator,
  'rotate': rotateAnimator,
  'depth': depthAnimator,

  // Creative (15)
  'newspaper': newspaperAnimator,
  'origami': origamiAnimator,
  'carousel-3d': carousel3dAnimator,
  'wave': waveAnimator,
  'spiral': spiralAnimator,
  'glitch': glitchAnimator,
  'morph': morphAnimator,
  'shutter': shutterAnimator,
  'domino': dominoAnimator,
  'elastic': elasticAnimator,
  'blur-slide': blurSlideAnimator,
  'windmill': windmillAnimator,
  'film-strip': filmStripAnimator,
  'helix': helixAnimator,
  'gravity': gravityAnimator,
};

/**
 * Look up a PresetAnimator by preset name.
 * Falls back to the `slide` animator if the name is not found.
 */
export function getAnimator(presetName: string): PresetAnimator {
  return animatorRegistry[presetName] ?? slideAnimator;
}

/** All registered preset names. */
export const presetNames = Object.keys(animatorRegistry);
