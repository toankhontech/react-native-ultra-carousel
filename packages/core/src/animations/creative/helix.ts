/**
 * @file Helix animation preset
 * @description Helix/DNA spiral — items follow a 3D helix path with perspective
 * @preset helix
 * @difficulty Expert
 * @category creative
 */

import { interpolate, Extrapolation } from 'react-native-reanimated';
import type { AnimatedItemStyle } from '../types';

/** Configuration for the helix animation */
export interface HelixConfig {
  /** Radius of the helix spiral in pixels (default: 100) */
  radius: number;
  /** 3D perspective distance (default: 800) */
  perspective: number;
  /** Minimum scale to simulate depth along the spiral (default: 0.6) */
  minScale: number;
}

/** Default helix configuration */
export const HELIX_DEFAULTS: HelixConfig = {
  radius: 100,
  perspective: 800,
  minScale: 0.6,
};

/**
 * Helix animation worklet.
 * Items follow a 3D helical (DNA-like) spiral path. Each item orbits
 * through X and Y offsets derived from sine/cosine, with rotateY and
 * scale changes to reinforce the sense of depth.
 *
 * @param progress - Normalized item progress: 0 = active, -1 = prev, +1 = next
 * @param config - Optional overrides for default configuration
 * @returns Animated style to apply to the carousel item
 */
export const helixAnimation = (
  progress: number,
  config?: Partial<HelixConfig>
): AnimatedItemStyle => {
  'worklet';

  const c = { ...HELIX_DEFAULTS, ...config };

  // Circular offsets — X follows cosine (lateral), Y follows sine (vertical)
  const translateX = interpolate(
    progress,
    [-1, -0.5, 0, 0.5, 1],
    [
      -c.radius * Math.cos(0),
      -c.radius * Math.cos(Math.PI / 2),
      0,
      c.radius * Math.cos(Math.PI / 2),
      c.radius * Math.cos(0),
    ],
    Extrapolation.CLAMP
  );

  const translateY = interpolate(
    progress,
    [-1, -0.5, 0, 0.5, 1],
    [
      c.radius * Math.sin(Math.PI),
      c.radius * Math.sin(Math.PI / 2),
      0,
      -c.radius * Math.sin(Math.PI / 2),
      -c.radius * Math.sin(Math.PI),
    ],
    Extrapolation.CLAMP
  );

  const rotateY = interpolate(
    progress,
    [-1, 0, 1],
    [-60, 0, 60],
    Extrapolation.CLAMP
  );

  // Scale simulates depth — items further along the spiral appear smaller
  const scale = interpolate(
    Math.abs(progress),
    [0, 1],
    [1, c.minScale],
    Extrapolation.CLAMP
  );

  const opacity = interpolate(
    Math.abs(progress),
    [0, 0.5, 1],
    [1, 0.7, 0.4],
    Extrapolation.CLAMP
  );

  const zIndex = Math.round(
    interpolate(Math.abs(progress), [0, 1], [100, 0], Extrapolation.CLAMP)
  );

  return {
    transform: [
      { perspective: c.perspective },
      { translateX },
      { translateY },
      { rotateY: `${rotateY}deg` },
      { scale },
    ],
    opacity,
    zIndex,
  };
};
