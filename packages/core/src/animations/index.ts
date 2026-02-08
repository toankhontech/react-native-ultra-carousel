/**
 * @file Animation presets public exports
 * @description Export all animation presets and registry utilities
 */

// === Basic Presets ===
export { slideAnimation, SLIDE_DEFAULTS } from './basic/slide';
export type { SlideConfig } from './basic/slide';

export { fadeAnimation, FADE_DEFAULTS } from './basic/fade';
export type { FadeConfig } from './basic/fade';

export { slideFadeAnimation, SLIDE_FADE_DEFAULTS } from './basic/slideFade';
export type { SlideFadeConfig } from './basic/slideFade';

export { scaleAnimation, SCALE_DEFAULTS } from './basic/scale';
export type { ScaleConfig } from './basic/scale';

export { scaleFadeAnimation, SCALE_FADE_DEFAULTS } from './basic/scaleFade';
export type { ScaleFadeConfig } from './basic/scaleFade';

export { verticalAnimation, VERTICAL_DEFAULTS } from './basic/vertical';
export type { VerticalConfig } from './basic/vertical';

export { verticalFadeAnimation, VERTICAL_FADE_DEFAULTS } from './basic/verticalFade';
export type { VerticalFadeConfig } from './basic/verticalFade';

export { parallaxAnimation, PARALLAX_DEFAULTS } from './basic/parallax';
export type { ParallaxConfig } from './basic/parallax';

export { overlapAnimation, OVERLAP_DEFAULTS } from './basic/overlap';
export type { OverlapConfig } from './basic/overlap';

export { peekAnimation, PEEK_DEFAULTS } from './basic/peek';
export type { PeekConfig } from './basic/peek';

// === Advanced Presets ===
export { stackAnimation, STACK_DEFAULTS } from './advanced/stack';
export type { StackConfig } from './advanced/stack';

export { tinderAnimation, TINDER_DEFAULTS } from './advanced/tinder';
export type { TinderConfig } from './advanced/tinder';

export { coverflowAnimation, COVERFLOW_DEFAULTS } from './advanced/coverflow';
export type { CoverflowConfig } from './advanced/coverflow';

export { cubeAnimation, CUBE_DEFAULTS } from './advanced/cube';
export type { CubeConfig } from './advanced/cube';

export { flipAnimation, FLIP_DEFAULTS } from './advanced/flip';
export type { FlipConfig } from './advanced/flip';

export { wheelAnimation, WHEEL_DEFAULTS } from './advanced/wheel';
export type { WheelConfig } from './advanced/wheel';

export { accordionAnimation, ACCORDION_DEFAULTS } from './advanced/accordion';
export type { AccordionConfig } from './advanced/accordion';

export { zoomAnimation, ZOOM_DEFAULTS } from './advanced/zoom';
export type { ZoomConfig } from './advanced/zoom';

export { rotateAnimation, ROTATE_DEFAULTS } from './advanced/rotate';
export type { RotateConfig } from './advanced/rotate';

export { depthAnimation, DEPTH_DEFAULTS } from './advanced/depth';
export type { DepthConfig } from './advanced/depth';

// === Creative Presets ===
export { newspaperAnimation, NEWSPAPER_DEFAULTS } from './creative/newspaper';
export type { NewspaperConfig } from './creative/newspaper';

export { origamiAnimation, ORIGAMI_DEFAULTS } from './creative/origami';
export type { OrigamiConfig } from './creative/origami';

export { carousel3dAnimation, CAROUSEL3D_DEFAULTS } from './creative/carousel3d';
export type { Carousel3DConfig } from './creative/carousel3d';

export { waveAnimation, WAVE_DEFAULTS } from './creative/wave';
export type { WaveConfig } from './creative/wave';

export { spiralAnimation, SPIRAL_DEFAULTS } from './creative/spiral';
export type { SpiralConfig } from './creative/spiral';

export { glitchAnimation, GLITCH_DEFAULTS } from './creative/glitch';
export type { GlitchConfig } from './creative/glitch';

export { morphAnimation, MORPH_DEFAULTS } from './creative/morph';
export type { MorphConfig } from './creative/morph';

export { shutterAnimation, SHUTTER_DEFAULTS } from './creative/shutter';
export type { ShutterConfig } from './creative/shutter';

export { dominoAnimation, DOMINO_DEFAULTS } from './creative/domino';
export type { DominoConfig } from './creative/domino';

export { elasticAnimation, ELASTIC_DEFAULTS } from './creative/elastic';
export type { ElasticConfig } from './creative/elastic';

export { blurSlideAnimation, BLUR_SLIDE_DEFAULTS } from './creative/blurSlide';
export type { BlurSlideConfig } from './creative/blurSlide';

export { windmillAnimation, WINDMILL_DEFAULTS } from './creative/windmill';
export type { WindmillConfig } from './creative/windmill';

export { filmStripAnimation, FILM_STRIP_DEFAULTS } from './creative/filmStrip';
export type { FilmStripConfig } from './creative/filmStrip';

export { helixAnimation, HELIX_DEFAULTS } from './creative/helix';
export type { HelixConfig } from './creative/helix';

export { gravityAnimation, GRAVITY_DEFAULTS } from './creative/gravity';
export type { GravityConfig } from './creative/gravity';

// === Registry ===
export {
  registerPreset,
  getPreset,
  getPresetMeta,
  getAllPresetNames,
  getAllPresetMeta,
  isPresetRegistered,
} from './registry';

export type { AnimatedItemStyle, AnimationPresetFn, AnimationPresetMeta } from './types';
