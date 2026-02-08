/**
 * @file Cube animation preset
 * @description 3D cube rotation effect — each item is a face of the cube
 * @preset cube
 * @difficulty Hard
 * @category advanced
 */

import { interpolate, Extrapolation } from 'react-native-reanimated';
import type { AnimatedItemStyle } from '../types';

/** Configuration for the cube animation */
export interface CubeConfig {
  /** 3D perspective distance (default: 800) */
  perspective: number;
  /** Item width for cube face calculations (default: 300) */
  itemWidth: number;
}

/** Default cube configuration */
export const CUBE_DEFAULTS: CubeConfig = {
  perspective: 800,
  itemWidth: 300,
};

/**
 * Cube animation worklet.
 * Each item is treated as a face of a 3D cube. Rotation happens around
 * the Y axis with appropriate Z translation to simulate cube geometry.
 *
 * @param progress - Normalized item progress: 0 = active, -1 = prev, +1 = next
 * @param config - Optional overrides for default configuration
 * @returns Animated style to apply to the carousel item
 */
export const cubeAnimation = (
  progress: number,
  config?: Partial<CubeConfig>
): AnimatedItemStyle => {
  'worklet';

  const c = { ...CUBE_DEFAULTS, ...config };
  const halfWidth = c.itemWidth / 2;

  const rotateY = interpolate(
    progress,
    [-1, 0, 1],
    [-90, 0, 90],
    Extrapolation.CLAMP
  );

  const radians = (Math.abs(rotateY) * Math.PI) / 180;
  const translateX = halfWidth * Math.sin(radians) * (progress < 0 ? -1 : 1);

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
      { perspective: c.perspective },
      { translateX },
      { rotateY: `${rotateY}deg` },
    ],
    opacity,
    zIndex,
    overflow: 'hidden',
  };
};
