/**
 * @file Windmill animation preset
 * @description Windmill rotation — items rotate around a central pivot following a circular path
 * @preset windmill
 * @difficulty Hard
 * @category creative
 */

import { interpolate, Extrapolation } from 'react-native-reanimated';
import type { AnimatedItemStyle } from '../types';

/** Configuration for the windmill animation */
export interface WindmillConfig {
  /** Maximum rotation angle in degrees per step (default: 90) */
  rotationAngle: number;
  /** Radius of the circular path in pixels (default: 100) */
  radius: number;
  /** Minimum scale for items at the extremes (default: 0.75) */
  minScale: number;
}

/** Default windmill configuration */
export const WINDMILL_DEFAULTS: WindmillConfig = {
  rotationAngle: 90,
  radius: 100,
  minScale: 0.75,
};

/**
 * Windmill animation worklet.
 * Items rotate around a central pivot point while following a circular
 * arc, creating a windmill or pinwheel-like transition effect.
 *
 * @param progress - Normalized item progress: 0 = active, -1 = prev, +1 = next
 * @param config - Optional overrides for default configuration
 * @returns Animated style to apply to the carousel item
 */
export const windmillAnimation = (
  progress: number,
  config?: Partial<WindmillConfig>
): AnimatedItemStyle => {
  'worklet';

  const c = { ...WINDMILL_DEFAULTS, ...config };

  const rotate = interpolate(
    progress,
    [-1, 0, 1],
    [-c.rotationAngle, 0, c.rotationAngle],
    Extrapolation.CLAMP
  );

  const translateX = interpolate(
    progress,
    [-1, 0, 1],
    [-c.radius * Math.sin((c.rotationAngle * Math.PI) / 180), 0, c.radius * Math.sin((c.rotationAngle * Math.PI) / 180)],
    Extrapolation.CLAMP
  );

  const translateY = interpolate(
    Math.abs(progress),
    [0, 1],
    [0, c.radius * (1 - Math.cos((c.rotationAngle * Math.PI) / 180))],
    Extrapolation.CLAMP
  );

  const scale = interpolate(
    Math.abs(progress),
    [0, 1],
    [1, c.minScale],
    Extrapolation.CLAMP
  );

  const opacity = interpolate(
    Math.abs(progress),
    [0, 0.5, 1],
    [1, 0.8, 0.6],
    Extrapolation.CLAMP
  );

  const zIndex = Math.round(
    interpolate(Math.abs(progress), [0, 1], [100, 0], Extrapolation.CLAMP)
  );

  return {
    transform: [
      { translateX },
      { translateY },
      { rotate: `${rotate}deg` },
      { scale },
    ],
    opacity,
    zIndex,
  };
};
