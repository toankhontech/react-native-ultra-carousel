import type { CardTransform, PresetAnimator } from './index';

const defaultTransform: CardTransform = {
  translateX: 0,
  translateY: 0,
  scale: 1,
  rotateX: 0,
  rotateY: 0,
  rotateZ: 0,
  opacity: 1,
  zIndex: 0,
};

/** Clamp a number between min and max. */
function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/** Linear interpolation. */
function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

// ---------------------------------------------------------------------------
// 1. slide - Standard horizontal slide
// ---------------------------------------------------------------------------
export const slideAnimator: PresetAnimator = (
  progress,
  cardIndex,
  activeIndex,
  _totalCards,
  cardWidth,
) => {
  const offset = cardIndex - activeIndex - progress;
  const absOffset = Math.abs(offset);
  const scale = lerp(1, 0.85, clamp(absOffset, 0, 1));
  const opacity = clamp(1 - absOffset * 0.3, 0, 1);

  return {
    ...defaultTransform,
    translateX: offset * cardWidth,
    scale,
    opacity,
    zIndex: Math.round((1 - absOffset) * 10),
  };
};

// ---------------------------------------------------------------------------
// 2. fade - Stacked crossfade
// ---------------------------------------------------------------------------
export const fadeAnimator: PresetAnimator = (
  progress,
  cardIndex,
  activeIndex,
  _totalCards,
  _cardWidth,
) => {
  const offset = cardIndex - activeIndex - progress;
  const absOffset = Math.abs(offset);

  // Active card fades out, next card fades in, others invisible
  let opacity: number;
  if (absOffset < 0.01) {
    opacity = 1;
  } else if (absOffset <= 1) {
    opacity = 1 - absOffset;
  } else {
    opacity = 0;
  }

  return {
    ...defaultTransform,
    opacity: clamp(opacity, 0, 1),
    zIndex: Math.round((1 - absOffset) * 10),
    scale: lerp(1, 0.95, clamp(absOffset, 0, 1)),
  };
};

// ---------------------------------------------------------------------------
// 3. slide-fade - Horizontal slide with opacity fade
// ---------------------------------------------------------------------------
export const slideFadeAnimator: PresetAnimator = (
  progress,
  cardIndex,
  activeIndex,
  _totalCards,
  cardWidth,
) => {
  const offset = cardIndex - activeIndex - progress;
  const absOffset = Math.abs(offset);
  const opacity = clamp(1 - absOffset * 0.5, 0, 1);

  return {
    ...defaultTransform,
    translateX: offset * cardWidth * 0.8,
    scale: lerp(1, 0.9, clamp(absOffset, 0, 1)),
    opacity,
    zIndex: Math.round((1 - absOffset) * 10),
  };
};

// ---------------------------------------------------------------------------
// 4. scale - Active card full size, neighbors shrink
// ---------------------------------------------------------------------------
export const scaleAnimator: PresetAnimator = (
  progress,
  cardIndex,
  activeIndex,
  _totalCards,
  cardWidth,
) => {
  const offset = cardIndex - activeIndex - progress;
  const absOffset = Math.abs(offset);
  const scale = lerp(1, 0.7, clamp(absOffset, 0, 1));

  return {
    ...defaultTransform,
    translateX: offset * cardWidth,
    scale,
    opacity: 1,
    zIndex: Math.round((1 - absOffset) * 10),
  };
};

// ---------------------------------------------------------------------------
// 5. scale-fade - Scale combined with opacity
// ---------------------------------------------------------------------------
export const scaleFadeAnimator: PresetAnimator = (
  progress,
  cardIndex,
  activeIndex,
  _totalCards,
  cardWidth,
) => {
  const offset = cardIndex - activeIndex - progress;
  const absOffset = Math.abs(offset);
  const scale = lerp(1, 0.7, clamp(absOffset, 0, 1));
  const opacity = clamp(1 - absOffset * 0.4, 0, 1);

  return {
    ...defaultTransform,
    translateX: offset * cardWidth,
    scale,
    opacity,
    zIndex: Math.round((1 - absOffset) * 10),
  };
};

// ---------------------------------------------------------------------------
// 6. vertical - Vertical slide instead of horizontal
// ---------------------------------------------------------------------------
export const verticalAnimator: PresetAnimator = (
  progress,
  cardIndex,
  activeIndex,
  _totalCards,
  cardWidth,
) => {
  const offset = cardIndex - activeIndex - progress;
  const absOffset = Math.abs(offset);
  const cardHeight = cardWidth * 1.2; // approximate card height
  const scale = lerp(1, 0.85, clamp(absOffset, 0, 1));

  return {
    ...defaultTransform,
    translateY: offset * cardHeight,
    scale,
    opacity: clamp(1 - absOffset * 0.3, 0, 1),
    zIndex: Math.round((1 - absOffset) * 10),
  };
};

// ---------------------------------------------------------------------------
// 7. vertical-fade - Vertical movement with opacity fade
// ---------------------------------------------------------------------------
export const verticalFadeAnimator: PresetAnimator = (
  progress,
  cardIndex,
  activeIndex,
  _totalCards,
  cardWidth,
) => {
  const offset = cardIndex - activeIndex - progress;
  const absOffset = Math.abs(offset);
  const cardHeight = cardWidth * 1.2;
  const opacity = clamp(1 - absOffset * 0.5, 0, 1);

  return {
    ...defaultTransform,
    translateY: offset * cardHeight,
    scale: lerp(1, 0.9, clamp(absOffset, 0, 1)),
    opacity,
    zIndex: Math.round((1 - absOffset) * 10),
  };
};

// ---------------------------------------------------------------------------
// 8. parallax - Multi-speed parallax layers
// ---------------------------------------------------------------------------
export const parallaxAnimator: PresetAnimator = (
  progress,
  cardIndex,
  activeIndex,
  _totalCards,
  cardWidth,
) => {
  const offset = cardIndex - activeIndex - progress;
  const absOffset = Math.abs(offset);

  // Cards further from center move slower, creating depth
  const layerDepth = clamp(1 - absOffset * 0.25, 0, 1);
  const speed = 0.5 + 0.5 * layerDepth;
  const translateX = offset * cardWidth * speed;
  const scale = lerp(0.75, 1, layerDepth);

  return {
    ...defaultTransform,
    translateX,
    scale,
    opacity: clamp(1 - absOffset * 0.2, 0, 1),
    zIndex: Math.round(layerDepth * 10),
  };
};

// ---------------------------------------------------------------------------
// 9. overlap - Overlapping cards, tighter spacing
// ---------------------------------------------------------------------------
export const overlapAnimator: PresetAnimator = (
  progress,
  cardIndex,
  activeIndex,
  _totalCards,
  cardWidth,
) => {
  const offset = cardIndex - activeIndex - progress;
  const absOffset = Math.abs(offset);

  // Tighter spacing so cards overlap
  const translateX = offset * cardWidth * 0.7;
  const scale = lerp(1, 0.9, clamp(absOffset, 0, 1));

  // Cards closer to center are on top
  const zIndex = Math.round((10 - absOffset) * 10);

  return {
    ...defaultTransform,
    translateX,
    scale,
    opacity: clamp(1 - absOffset * 0.15, 0, 1),
    zIndex,
  };
};

// ---------------------------------------------------------------------------
// 10. peek - Adjacent cards peek from edges
// ---------------------------------------------------------------------------
export const peekAnimator: PresetAnimator = (
  progress,
  cardIndex,
  activeIndex,
  _totalCards,
  cardWidth,
) => {
  const offset = cardIndex - activeIndex - progress;
  const absOffset = Math.abs(offset);

  // Active card is fully centered, neighbors show 30% from edges
  let translateX: number;
  let scale: number;
  let opacity: number;

  if (absOffset < 0.01) {
    // Active card
    translateX = 0;
    scale = 1;
    opacity = 1;
  } else if (absOffset <= 1) {
    // Immediate neighbors - peek from sides
    const peekAmount = cardWidth * 0.35;
    const fullSlide = cardWidth * 0.5 + peekAmount;
    const direction = offset > 0 ? 1 : -1;
    translateX = direction * lerp(0, fullSlide, absOffset);
    scale = lerp(1, 0.8, absOffset);
    opacity = lerp(1, 0.7, absOffset);
  } else {
    // Far cards - pushed further out
    const direction = offset > 0 ? 1 : -1;
    translateX = direction * (cardWidth * 0.85 + (absOffset - 1) * cardWidth * 0.5);
    scale = 0.7;
    opacity = clamp(0.5 - (absOffset - 1) * 0.3, 0, 1);
  }

  return {
    ...defaultTransform,
    translateX,
    scale,
    opacity,
    zIndex: Math.round((10 - absOffset) * 10),
  };
};
