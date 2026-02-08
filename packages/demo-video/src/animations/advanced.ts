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
// 1. stack - Cards stacked on top, swipe reveals card below
// ---------------------------------------------------------------------------
export const stackAnimator: PresetAnimator = (
  progress,
  cardIndex,
  activeIndex,
  _totalCards,
  _cardWidth,
) => {
  const offset = cardIndex - activeIndex - progress;
  const absOffset = Math.abs(offset);

  if (offset < -0.5) {
    // Card has already been swiped away (behind active)
    return {
      ...defaultTransform,
      opacity: 0,
      zIndex: 0,
    };
  }

  // Cards stacked with decreasing scale and slight vertical shift
  const distance = Math.max(0, offset);
  const scale = Math.pow(0.95, distance);
  const translateY = -distance * 8;

  // The active card slides away during swipe
  let translateX = 0;
  if (absOffset < 1 && offset < 0) {
    // This is the card being swiped away
    translateX = offset * 400;
  }

  return {
    ...defaultTransform,
    translateX,
    translateY,
    scale,
    opacity: clamp(1 - distance * 0.1, 0, 1),
    zIndex: Math.round((20 - distance) * 10),
  };
};

// ---------------------------------------------------------------------------
// 2. tinder - Tinder-style swipe with rotation
// ---------------------------------------------------------------------------
export const tinderAnimator: PresetAnimator = (
  progress,
  cardIndex,
  activeIndex,
  _totalCards,
  _cardWidth,
) => {
  const offset = cardIndex - activeIndex - progress;
  const absOffset = Math.abs(offset);

  if (offset < -0.5) {
    // Already swiped away
    return { ...defaultTransform, opacity: 0, zIndex: 0 };
  }

  // Cards below stack with decreasing scale
  const stackDistance = Math.max(0, offset);
  const stackScale = clamp(1 - stackDistance * 0.05, 0.8, 1);
  const stackTranslateY = -stackDistance * 10;

  // Active card swipes with rotation
  let translateX = 0;
  let rotateZ = 0;
  let opacity = 1;

  if (offset >= -1 && offset < 0) {
    // Being swiped away
    const swipeProgress = -offset;
    translateX = -swipeProgress * 400;
    rotateZ = -swipeProgress * 15;
    opacity = lerp(1, 0.3, swipeProgress);
  }

  return {
    ...defaultTransform,
    translateX,
    translateY: stackTranslateY,
    scale: offset < 0 ? lerp(1, 0.9, absOffset) : stackScale,
    rotateZ,
    opacity: offset < 0 ? opacity : clamp(1 - stackDistance * 0.1, 0, 1),
    zIndex: Math.round((20 - Math.max(0, offset)) * 10),
  };
};

// ---------------------------------------------------------------------------
// 3. coverflow - Apple CoverFlow effect
// ---------------------------------------------------------------------------
export const coverflowAnimator: PresetAnimator = (
  progress,
  cardIndex,
  activeIndex,
  _totalCards,
  cardWidth,
) => {
  const offset = cardIndex - activeIndex - progress;
  const absOffset = Math.abs(offset);

  // Center card is flat, side cards rotate toward viewer
  const rotateY = clamp(offset, -1, 1) * -55;

  // Side cards pushed apart and slightly forward
  const spreadFactor = cardWidth * 0.65;
  const translateX = offset * spreadFactor;

  // Scale decreases for side cards
  const scale = lerp(1, 0.8, clamp(absOffset, 0, 1));

  return {
    ...defaultTransform,
    translateX,
    scale,
    rotateY,
    opacity: clamp(1 - absOffset * 0.15, 0, 1),
    zIndex: Math.round((10 - absOffset) * 10),
  };
};

// ---------------------------------------------------------------------------
// 4. cube - 3D cube rotation between faces
// ---------------------------------------------------------------------------
export const cubeAnimator: PresetAnimator = (
  progress,
  cardIndex,
  activeIndex,
  _totalCards,
  cardWidth,
) => {
  const offset = cardIndex - activeIndex - progress;
  const absOffset = Math.abs(offset);

  // Only render adjacent faces (cube has 4 visible faces max)
  if (absOffset > 1.5) {
    return { ...defaultTransform, opacity: 0, zIndex: 0 };
  }

  // Each face rotates 90 degrees
  const rotateY = offset * 90;

  // Translate to edge of cube face, then rotate
  const halfWidth = cardWidth / 2;
  const translateX = Math.sin((offset * Math.PI) / 2) * halfWidth;

  // Scale slightly for depth feeling
  const depthScale = lerp(1, 0.85, clamp(absOffset, 0, 1));

  // Face visibility: backfaces hidden
  const isFacingAway = absOffset > 1;
  const opacity = isFacingAway ? 0 : lerp(1, 0.7, absOffset);

  return {
    ...defaultTransform,
    translateX,
    rotateY,
    scale: depthScale,
    opacity,
    zIndex: Math.round((10 - absOffset) * 10),
  };
};

// ---------------------------------------------------------------------------
// 5. flip - 3D card flip transition
// ---------------------------------------------------------------------------
export const flipAnimator: PresetAnimator = (
  progress,
  cardIndex,
  activeIndex,
  _totalCards,
  _cardWidth,
) => {
  const offset = cardIndex - activeIndex - progress;
  const absOffset = Math.abs(offset);

  // Only the active and next card participate in the flip
  if (absOffset > 1.5) {
    return { ...defaultTransform, opacity: 0, zIndex: 0 };
  }

  let rotateY = 0;
  let opacity = 1;
  let scale = 1;

  if (offset >= -1 && offset < 0) {
    // Current card flipping away (0 -> -180)
    const flipProgress = -offset; // 0 to 1
    rotateY = flipProgress * 180;
    // Hide when past 90 degrees (backface)
    opacity = flipProgress < 0.5 ? 1 : 0;
    scale = lerp(1, 0.9, flipProgress < 0.5 ? flipProgress : 1 - flipProgress);
  } else if (offset >= 0 && offset <= 1) {
    // Next card flipping in (-180 -> 0)
    const flipProgress = offset; // 1 to 0 as it becomes active
    rotateY = -flipProgress * 180;
    // Hidden until past 90 degrees
    opacity = flipProgress > 0.5 ? 0 : 1;
    scale = lerp(1, 0.9, flipProgress > 0.5 ? 1 - flipProgress : flipProgress);
  } else {
    opacity = 0;
  }

  return {
    ...defaultTransform,
    rotateY,
    scale,
    opacity,
    zIndex: Math.round((10 - absOffset) * 10),
  };
};

// ---------------------------------------------------------------------------
// 6. wheel - Ferris wheel arrangement
// ---------------------------------------------------------------------------
export const wheelAnimator: PresetAnimator = (
  progress,
  cardIndex,
  activeIndex,
  totalCards,
  cardWidth,
) => {
  const offset = cardIndex - activeIndex - progress;
  const absOffset = Math.abs(offset);

  // Arrange cards in a circle
  const anglePerCard = (2 * Math.PI) / Math.max(totalCards, 5);
  const angle = offset * anglePerCard;
  const radius = cardWidth * 1.5;

  const translateX = Math.sin(angle) * radius;
  const translateY = (1 - Math.cos(angle)) * radius * 0.4;
  const rotateZ = (offset * 360) / totalCards;

  // Scale based on "depth" (position on circle)
  const depthFactor = (1 + Math.cos(angle)) / 2; // 1 at front, 0 at back
  const scale = lerp(0.6, 1, depthFactor);
  const opacity = lerp(0.3, 1, depthFactor);

  return {
    ...defaultTransform,
    translateX,
    translateY,
    scale,
    rotateZ,
    opacity: clamp(opacity, 0, 1),
    zIndex: Math.round(depthFactor * 100),
  };
};

// ---------------------------------------------------------------------------
// 7. accordion - Fold/unfold horizontally
// ---------------------------------------------------------------------------
export const accordionAnimator: PresetAnimator = (
  progress,
  cardIndex,
  activeIndex,
  _totalCards,
  cardWidth,
) => {
  const offset = cardIndex - activeIndex - progress;
  const absOffset = Math.abs(offset);

  // Cards compress horizontally as they move away
  const compressionFactor = clamp(1 - absOffset * 0.4, 0.3, 1);

  // Tighter packing with compression
  const compressedWidth = cardWidth * compressionFactor;
  const translateX = offset * compressedWidth;

  // ScaleX simulates horizontal squish
  const scaleXFactor = compressionFactor;
  // Use uniform scale as approximation since we only have scale
  const scale = lerp(1, 0.6, clamp(absOffset, 0, 1));

  return {
    ...defaultTransform,
    translateX,
    scale,
    // Slight rotateY to enhance accordion fold look
    rotateY: offset > 0 ? clamp(absOffset * 15, 0, 30) : clamp(-absOffset * 15, -30, 0),
    opacity: clamp(1 - absOffset * 0.2, 0, 1),
    zIndex: Math.round((10 - absOffset) * 10),
  };
};

// ---------------------------------------------------------------------------
// 8. zoom - Zoom out/in transition
// ---------------------------------------------------------------------------
export const zoomAnimator: PresetAnimator = (
  progress,
  cardIndex,
  activeIndex,
  _totalCards,
  _cardWidth,
) => {
  const offset = cardIndex - activeIndex - progress;
  const absOffset = Math.abs(offset);

  if (absOffset > 1.5) {
    return { ...defaultTransform, opacity: 0, zIndex: 0 };
  }

  let scale = 1;
  let opacity = 1;

  if (offset >= -1 && offset < 0) {
    // Active card zooming out
    const exitProgress = -offset; // 0 to 1
    scale = lerp(1, 0.5, exitProgress);
    opacity = lerp(1, 0, exitProgress);
  } else if (offset >= 0 && offset <= 1) {
    // Next card zooming in
    const enterProgress = offset; // 1 to 0
    scale = lerp(1, 1.5, enterProgress);
    opacity = lerp(1, 0, enterProgress);
  } else {
    opacity = 0;
  }

  return {
    ...defaultTransform,
    scale: clamp(scale, 0.3, 1.5),
    opacity: clamp(opacity, 0, 1),
    zIndex: Math.round((10 - absOffset) * 10),
  };
};

// ---------------------------------------------------------------------------
// 9. rotate - Rotating display with Y-axis perspective
// ---------------------------------------------------------------------------
export const rotateAnimator: PresetAnimator = (
  progress,
  cardIndex,
  activeIndex,
  totalCards,
  cardWidth,
) => {
  const offset = cardIndex - activeIndex - progress;
  const absOffset = Math.abs(offset);

  // Cards arranged on a rotating display
  const anglePerCard = 60; // degrees between cards
  const rotateY = offset * anglePerCard;

  // Translate based on rotation to create circular arrangement
  const radians = (rotateY * Math.PI) / 180;
  const radius = cardWidth * 1.2;
  const translateX = Math.sin(radians) * radius;

  // Depth from rotation
  const depthFactor = (1 + Math.cos(radians)) / 2;
  const scale = lerp(0.65, 1, depthFactor);
  const opacity = lerp(0.2, 1, depthFactor);

  return {
    ...defaultTransform,
    translateX,
    rotateY,
    scale,
    opacity: clamp(opacity, 0, 1),
    zIndex: Math.round(depthFactor * 100),
  };
};

// ---------------------------------------------------------------------------
// 10. depth - Distance-based diminishing effect
// ---------------------------------------------------------------------------
export const depthAnimator: PresetAnimator = (
  progress,
  cardIndex,
  activeIndex,
  _totalCards,
  cardWidth,
) => {
  const offset = cardIndex - activeIndex - progress;
  const absOffset = Math.abs(offset);

  // Active card: full size and opacity
  // Others diminish with distance exponentially
  const depthFactor = Math.pow(0.75, absOffset);
  const scale = lerp(0.5, 1, depthFactor);
  const opacity = lerp(0.1, 1, depthFactor);

  // Cards spread apart and pushed "back"
  const translateX = offset * cardWidth * 0.6;
  const translateY = absOffset * 15; // slightly down for depth

  return {
    ...defaultTransform,
    translateX,
    translateY,
    scale,
    opacity: clamp(opacity, 0, 1),
    zIndex: Math.round(depthFactor * 100),
  };
};
