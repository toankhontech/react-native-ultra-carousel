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
// 1. newspaper - Fly in with spin (scale 0->1, rotateZ 720->0)
// ---------------------------------------------------------------------------
export const newspaperAnimator: PresetAnimator = (
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
  let rotateZ = 0;
  let opacity = 1;

  if (offset >= -1 && offset < 0) {
    // Exiting: spin out and shrink
    const exitProgress = -offset;
    scale = lerp(1, 0, exitProgress);
    rotateZ = exitProgress * 720;
    opacity = lerp(1, 0, exitProgress);
  } else if (offset >= 0 && offset <= 1) {
    // Entering: spin in and grow
    const enterProgress = offset; // 1 -> 0
    scale = lerp(1, 0, enterProgress);
    rotateZ = -enterProgress * 720;
    opacity = lerp(1, 0, enterProgress);
  } else {
    opacity = 0;
  }

  return {
    ...defaultTransform,
    scale: clamp(scale, 0.05, 1.5),
    rotateZ,
    opacity: clamp(opacity, 0, 1),
    zIndex: Math.round((10 - absOffset) * 10),
  };
};

// ---------------------------------------------------------------------------
// 2. origami - Paper fold effect
// ---------------------------------------------------------------------------
export const origamiAnimator: PresetAnimator = (
  progress,
  cardIndex,
  activeIndex,
  _totalCards,
  cardWidth,
) => {
  const offset = cardIndex - activeIndex - progress;
  const absOffset = Math.abs(offset);

  // Create folding illusion: cards fold at their edges
  const foldAmount = clamp(absOffset, 0, 1);

  // ScaleX simulates horizontal fold - cards appear thinner when folded
  // We approximate with scale + rotateY
  const rotateY = offset > 0 ? foldAmount * 75 : -foldAmount * 75;
  const scale = lerp(1, 0.85, foldAmount);

  // Cards slide inward as they fold
  const foldTranslateX = offset * cardWidth * lerp(1, 0.3, foldAmount);

  return {
    ...defaultTransform,
    translateX: foldTranslateX,
    scale,
    rotateY,
    opacity: clamp(1 - absOffset * 0.3, 0, 1),
    zIndex: Math.round((10 - absOffset) * 10),
  };
};

// ---------------------------------------------------------------------------
// 3. carousel-3d - True 3D circular arrangement
// ---------------------------------------------------------------------------
export const carousel3dAnimator: PresetAnimator = (
  progress,
  cardIndex,
  activeIndex,
  totalCards,
  cardWidth,
) => {
  const offset = cardIndex - activeIndex - progress;

  // Place cards in a circle
  const anglePerCard = 360 / Math.max(totalCards, 5);
  const angle = offset * anglePerCard;
  const radians = (angle * Math.PI) / 180;

  // Radius of the 3D circle
  const radius = cardWidth * 1.8;

  // Position on circle
  const translateX = Math.sin(radians) * radius;
  const translateY = 0;

  // Each card faces outward from circle center
  const rotateY = angle;

  // Depth-based scaling and opacity
  const depthFactor = (1 + Math.cos(radians)) / 2; // 1 at front, 0 at back
  const scale = lerp(0.5, 1, depthFactor);
  const opacity = lerp(0.15, 1, depthFactor);

  return {
    ...defaultTransform,
    translateX,
    translateY,
    rotateY,
    scale,
    opacity: clamp(opacity, 0, 1),
    zIndex: Math.round(depthFactor * 100),
  };
};

// ---------------------------------------------------------------------------
// 4. wave - Sine wave bobbing
// ---------------------------------------------------------------------------
export const waveAnimator: PresetAnimator = (
  progress,
  cardIndex,
  activeIndex,
  _totalCards,
  cardWidth,
) => {
  const offset = cardIndex - activeIndex - progress;
  const absOffset = Math.abs(offset);

  // Horizontal spread
  const translateX = offset * cardWidth;

  // Sine wave for vertical motion
  const amplitude = 60;
  const wavePhase = offset * Math.PI * 0.8;
  const translateY = Math.sin(wavePhase) * amplitude;

  // Slight rotation following the wave
  const rotateZ = Math.sin(wavePhase) * 8;

  const scale = lerp(1, 0.85, clamp(absOffset, 0, 1));

  return {
    ...defaultTransform,
    translateX,
    translateY,
    scale,
    rotateZ,
    opacity: clamp(1 - absOffset * 0.2, 0, 1),
    zIndex: Math.round((10 - absOffset) * 10),
  };
};

// ---------------------------------------------------------------------------
// 5. spiral - Cards spiral outward from center
// ---------------------------------------------------------------------------
export const spiralAnimator: PresetAnimator = (
  progress,
  cardIndex,
  activeIndex,
  _totalCards,
  cardWidth,
) => {
  const offset = cardIndex - activeIndex - progress;
  const absOffset = Math.abs(offset);

  // Spiral: increasing angle and radius with distance
  const spiralAngle = offset * 45; // degrees of rotation per card step
  const spiralRadius = absOffset * cardWidth * 0.5;

  const radians = (spiralAngle * Math.PI) / 180;
  const translateX = Math.sin(radians) * spiralRadius + offset * cardWidth * 0.3;
  const translateY = Math.cos(radians) * spiralRadius * 0.4 - absOffset * 20;

  const rotateZ = spiralAngle * 0.5;
  const scale = lerp(1, 0.6, clamp(absOffset, 0, 2) / 2);

  return {
    ...defaultTransform,
    translateX: clamp(translateX, -500, 500),
    translateY: clamp(translateY, -300, 300),
    scale,
    rotateZ,
    opacity: clamp(1 - absOffset * 0.25, 0, 1),
    zIndex: Math.round((10 - absOffset) * 10),
  };
};

// ---------------------------------------------------------------------------
// 6. glitch - Deterministic jitter effect
// ---------------------------------------------------------------------------
export const glitchAnimator: PresetAnimator = (
  progress,
  cardIndex,
  activeIndex,
  _totalCards,
  cardWidth,
) => {
  const offset = cardIndex - activeIndex - progress;
  const absOffset = Math.abs(offset);

  // Deterministic "random" jitter using high-frequency sin
  const seed = cardIndex * 7.3 + progress * 13.7;
  const jitterX = Math.sin(seed * 43.7) * 12;
  const jitterY = Math.sin(seed * 67.3) * 8;
  const jitterRotation = Math.sin(seed * 29.1) * 3;
  const jitterScale = 1 + Math.sin(seed * 51.3) * 0.04;

  // Base horizontal slide
  const translateX = offset * cardWidth + jitterX;
  const translateY = jitterY;

  // Active card has more jitter during transition
  const transitionJitter = absOffset < 1 ? (1 - absOffset) * 0.5 : 0;
  const extraJitterX = Math.sin(progress * 97.3) * 20 * transitionJitter;
  const extraJitterY = Math.sin(progress * 73.1) * 15 * transitionJitter;

  return {
    ...defaultTransform,
    translateX: clamp(translateX + extraJitterX, -500, 500),
    translateY: clamp(translateY + extraJitterY, -200, 200),
    scale: clamp(jitterScale * lerp(1, 0.85, clamp(absOffset, 0, 1)), 0.5, 1.2),
    rotateZ: jitterRotation + Math.sin(progress * 53.7) * 5 * transitionJitter,
    opacity: clamp(1 - absOffset * 0.3, 0, 1),
    zIndex: Math.round((10 - absOffset) * 10),
  };
};

// ---------------------------------------------------------------------------
// 7. morph - Non-uniform shape morphing
// ---------------------------------------------------------------------------
export const morphAnimator: PresetAnimator = (
  progress,
  cardIndex,
  activeIndex,
  _totalCards,
  cardWidth,
) => {
  const offset = cardIndex - activeIndex - progress;
  const absOffset = Math.abs(offset);

  // During transition, cards scale non-uniformly (simulated with rotateY + scale)
  // At mid-transition, cards are most distorted
  const morphProgress = absOffset < 1 ? Math.sin(absOffset * Math.PI) : 0;

  // RotateY creates perspective distortion (simulates scaleX != scaleY)
  const rotateY = morphProgress * 25 * (offset > 0 ? 1 : -1);

  // Scale oscillates - cards squeeze and stretch
  const scaleBase = lerp(1, 0.8, clamp(absOffset, 0, 1));
  const scaleWarp = 1 + morphProgress * 0.15;
  const scale = scaleBase * scaleWarp;

  // RotateX adds vertical warp
  const rotateX = morphProgress * 10;

  return {
    ...defaultTransform,
    translateX: offset * cardWidth * 0.85,
    scale: clamp(scale, 0.5, 1.3),
    rotateX,
    rotateY,
    opacity: clamp(1 - absOffset * 0.25, 0, 1),
    zIndex: Math.round((10 - absOffset) * 10),
  };
};

// ---------------------------------------------------------------------------
// 8. shutter - Camera shutter blades
// ---------------------------------------------------------------------------
export const shutterAnimator: PresetAnimator = (
  progress,
  cardIndex,
  activeIndex,
  _totalCards,
  cardWidth,
) => {
  const offset = cardIndex - activeIndex - progress;
  const absOffset = Math.abs(offset);

  if (absOffset > 2) {
    return { ...defaultTransform, opacity: 0, zIndex: 0 };
  }

  // Shutter: cards slide from center outward with rotation
  const shutterAngle = cardIndex * (360 / 5); // distribute blade angles
  const radians = (shutterAngle * Math.PI) / 180;

  // During transition, cards expand outward like opening shutter
  const openAmount = absOffset < 1 ? Math.sin(absOffset * Math.PI) * 0.6 : 0;

  const translateX = offset * cardWidth + Math.cos(radians) * openAmount * 80;
  const translateY = Math.sin(radians) * openAmount * 50;
  const rotateZ = openAmount * 15 * (cardIndex % 2 === 0 ? 1 : -1);

  const scale = lerp(1, 0.85, clamp(absOffset, 0, 1));

  return {
    ...defaultTransform,
    translateX: clamp(translateX, -500, 500),
    translateY: clamp(translateY, -200, 200),
    scale,
    rotateZ,
    opacity: clamp(1 - absOffset * 0.3, 0, 1),
    zIndex: Math.round((10 - absOffset) * 10),
  };
};

// ---------------------------------------------------------------------------
// 9. domino - Cards fall like dominoes in sequence
// ---------------------------------------------------------------------------
export const dominoAnimator: PresetAnimator = (
  progress,
  cardIndex,
  activeIndex,
  _totalCards,
  cardWidth,
) => {
  const offset = cardIndex - activeIndex - progress;
  const absOffset = Math.abs(offset);

  // Each card tips over with rotateX, cascading with delay
  const fallDelay = absOffset * 0.3;
  const fallProgress = clamp(
    absOffset < 1 ? (1 - absOffset - fallDelay) / (1 - fallDelay) : 0,
    0,
    1,
  );

  // Domino rotation around X axis (tipping forward)
  let rotateX = 0;
  if (offset >= -1 && offset < 0) {
    // Active card tips forward as it exits
    const tipProgress = -offset;
    rotateX = tipProgress * 70;
  } else if (offset > 0 && offset <= 2) {
    // Cards in line ready to fall - slight anticipation
    const anticipation = Math.max(0, 1 - offset) * progress;
    rotateX = anticipation * 20;
  }

  // Cascade: earlier cards in the "domino line" fall sooner
  const translateX = offset * cardWidth;
  const translateY = rotateX > 0 ? Math.sin((rotateX * Math.PI) / 180) * 30 : 0;
  const scale = lerp(1, 0.9, clamp(absOffset, 0, 1));

  return {
    ...defaultTransform,
    translateX,
    translateY,
    rotateX: clamp(rotateX, 0, 70),
    scale,
    opacity: clamp(1 - absOffset * 0.2, 0, 1),
    zIndex: Math.round((10 - absOffset) * 10),
  };
};

// ---------------------------------------------------------------------------
// 10. elastic - Elastic bounce with damped oscillation
// ---------------------------------------------------------------------------
export const elasticAnimator: PresetAnimator = (
  progress,
  cardIndex,
  activeIndex,
  _totalCards,
  cardWidth,
) => {
  const offset = cardIndex - activeIndex - progress;
  const absOffset = Math.abs(offset);

  // Damped elastic function: overshoot then settle
  const elasticScale = (t: number): number => {
    if (t <= 0) return 1;
    if (t >= 1) return 0.85;
    // Damped sine for bounce effect
    const damping = Math.exp(-3 * t);
    const oscillation = Math.cos(t * Math.PI * 3);
    return 1 - (1 - 0.85) * (1 - damping * oscillation) * t;
  };

  const scale = elasticScale(absOffset);

  // Elastic translateX with overshoot
  const elasticTranslate = (t: number): number => {
    if (Math.abs(t) < 0.01) return 0;
    const sign = t > 0 ? 1 : -1;
    const absT = Math.abs(t);
    const damping = Math.exp(-2 * absT);
    const oscillation = Math.sin(absT * Math.PI * 2.5);
    const overshoot = 1 + damping * oscillation * 0.15;
    return sign * absT * cardWidth * overshoot;
  };

  const translateX = elasticTranslate(offset);

  // Slight vertical bounce
  const bounceY =
    absOffset < 1.5
      ? Math.exp(-3 * absOffset) * Math.sin(absOffset * Math.PI * 3) * 15
      : 0;

  return {
    ...defaultTransform,
    translateX: clamp(translateX, -500, 500),
    translateY: bounceY,
    scale: clamp(scale, 0.5, 1.2),
    opacity: clamp(1 - absOffset * 0.25, 0, 1),
    zIndex: Math.round((10 - absOffset) * 10),
  };
};

// ---------------------------------------------------------------------------
// 11. blur-slide - Slide with speed-based stretch
// ---------------------------------------------------------------------------
export const blurSlideAnimator: PresetAnimator = (
  progress,
  cardIndex,
  activeIndex,
  _totalCards,
  cardWidth,
) => {
  const offset = cardIndex - activeIndex - progress;
  const absOffset = Math.abs(offset);

  // Speed-based "blur" simulation: stretch in X during fast motion
  // Cards in transition move fast, so they get stretched
  const transitionSpeed = absOffset < 1 ? Math.sin(absOffset * Math.PI) : 0;

  // ScaleX stretch simulated with slight rotateY perspective warp
  const rotateY = transitionSpeed * 8 * (offset > 0 ? 1 : -1);

  // Slight horizontal scaling (simulate motion blur via scale)
  const scaleStretch = 1 + transitionSpeed * 0.08;
  const baseScale = lerp(1, 0.85, clamp(absOffset, 0, 1));
  const scale = baseScale * scaleStretch;

  const translateX = offset * cardWidth;

  return {
    ...defaultTransform,
    translateX,
    scale: clamp(scale, 0.5, 1.3),
    rotateY,
    opacity: clamp(1 - absOffset * 0.25, 0, 1),
    zIndex: Math.round((10 - absOffset) * 10),
  };
};

// ---------------------------------------------------------------------------
// 12. windmill - Cards pivot from corner
// ---------------------------------------------------------------------------
export const windmillAnimator: PresetAnimator = (
  progress,
  cardIndex,
  activeIndex,
  totalCards,
  cardWidth,
) => {
  const offset = cardIndex - activeIndex - progress;
  const absOffset = Math.abs(offset);

  // Each card pivots from its corner, creating windmill blades
  const bladeAngle = (cardIndex / Math.max(totalCards, 1)) * 360;
  const animatedAngle = bladeAngle + progress * (360 / Math.max(totalCards, 1));

  // Rotation around Z axis
  const rotateZ = offset * 30 + Math.sin((animatedAngle * Math.PI) / 180) * 15;

  // Cards fan out from center
  const fanRadius = absOffset * cardWidth * 0.6;
  const fanAngle = ((offset * 40) * Math.PI) / 180;
  const translateX = Math.sin(fanAngle) * fanRadius;
  const translateY = -Math.abs(Math.cos(fanAngle)) * fanRadius * 0.3;

  const scale = lerp(1, 0.75, clamp(absOffset, 0, 1));

  return {
    ...defaultTransform,
    translateX: clamp(translateX, -500, 500),
    translateY: clamp(translateY, -200, 200),
    scale,
    rotateZ,
    opacity: clamp(1 - absOffset * 0.25, 0, 1),
    zIndex: Math.round((10 - absOffset) * 10),
  };
};

// ---------------------------------------------------------------------------
// 13. film-strip - Film strip with perforation jitter
// ---------------------------------------------------------------------------
export const filmStripAnimator: PresetAnimator = (
  progress,
  cardIndex,
  activeIndex,
  _totalCards,
  cardWidth,
) => {
  const offset = cardIndex - activeIndex - progress;
  const absOffset = Math.abs(offset);

  // Film strip: tight horizontal layout with slight vertical jitter
  const gapMultiplier = 1.05; // slight gap between frames
  const translateX = offset * cardWidth * gapMultiplier;

  // Perforated-edge jitter (deterministic using card index)
  const jitterSeed = cardIndex * 17.3 + progress * 5.7;
  const jitterY = Math.sin(jitterSeed * 11.3) * 3 + Math.sin(jitterSeed * 23.7) * 2;

  // Film strip frames are uniform except for gate weave
  const gateWeave = Math.sin(progress * Math.PI * 4 + cardIndex * 2.1) * 1.5;

  const scale = lerp(1, 0.9, clamp(absOffset, 0, 1));

  return {
    ...defaultTransform,
    translateX,
    translateY: jitterY + gateWeave,
    scale,
    rotateZ: Math.sin(jitterSeed * 7.9) * 0.8, // slight frame tilt
    opacity: clamp(1 - absOffset * 0.2, 0, 1),
    zIndex: Math.round((10 - absOffset) * 10),
  };
};

// ---------------------------------------------------------------------------
// 14. helix - DNA double helix spiral
// ---------------------------------------------------------------------------
export const helixAnimator: PresetAnimator = (
  progress,
  cardIndex,
  activeIndex,
  totalCards,
  cardWidth,
) => {
  const offset = cardIndex - activeIndex - progress;
  const absOffset = Math.abs(offset);

  // Helical path: cards arranged along a helix
  const helixPitch = 80; // vertical spacing per turn
  const helixRadius = cardWidth * 0.8;
  const anglePerCard = (2 * Math.PI) / Math.max(totalCards, 3);

  // Angle along helix
  const helixAngle = offset * anglePerCard * 1.5;

  const translateX = Math.cos(helixAngle) * helixRadius;
  const translateY = offset * helixPitch * 0.4;

  // Depth along helix determines scale
  const depthFactor = (1 + Math.sin(helixAngle)) / 2; // 0 to 1
  const scale = lerp(0.6, 1, depthFactor);

  // Cards rotate to face outward from helix
  const rotateY = (helixAngle * 180) / Math.PI * 0.3;

  const opacity = lerp(0.3, 1, depthFactor);

  return {
    ...defaultTransform,
    translateX: clamp(translateX, -400, 400),
    translateY: clamp(translateY, -300, 300),
    scale,
    rotateY: clamp(rotateY, -60, 60),
    opacity: clamp(opacity, 0, 1),
    zIndex: Math.round(depthFactor * 100),
  };
};

// ---------------------------------------------------------------------------
// 15. gravity - Drop with bounce (damped oscillation)
// ---------------------------------------------------------------------------
export const gravityAnimator: PresetAnimator = (
  progress,
  cardIndex,
  activeIndex,
  _totalCards,
  cardWidth,
) => {
  const offset = cardIndex - activeIndex - progress;
  const absOffset = Math.abs(offset);

  // Gravity bounce: cards drop from above and bounce to rest
  const bounceY = (t: number): number => {
    if (t <= 0) return 0;
    if (t >= 2) return 0;

    // Damped bounce
    const gravity = 400;
    const dropDuration = 0.4;

    if (t < dropDuration) {
      // Falling phase: accelerating down
      const fallProgress = t / dropDuration;
      return -gravity * (1 - fallProgress * fallProgress);
    }

    // Bouncing phase: damped oscillation
    const bounceTime = t - dropDuration;
    const damping = Math.exp(-4 * bounceTime);
    const bounce = Math.abs(Math.sin(bounceTime * Math.PI * 5));
    return -gravity * damping * bounce * 0.3;
  };

  // Cards further away have delayed bounce
  const delay = absOffset * 0.15;
  const bounceProgress = Math.max(0, absOffset - delay);
  const translateY = bounceY(bounceProgress);

  const translateX = offset * cardWidth;
  const scale = lerp(1, 0.85, clamp(absOffset, 0, 1));

  // Slight rotation from impact
  const impactRotation =
    absOffset < 1.5
      ? Math.exp(-3 * absOffset) * Math.sin(absOffset * Math.PI * 3) * 5
      : 0;

  return {
    ...defaultTransform,
    translateX,
    translateY: clamp(translateY, -400, 50),
    scale,
    rotateZ: impactRotation,
    opacity: clamp(1 - absOffset * 0.2, 0, 1),
    zIndex: Math.round((10 - absOffset) * 10),
  };
};
