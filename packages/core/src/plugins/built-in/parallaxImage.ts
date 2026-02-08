/**
 * @file Parallax image built-in plugin
 * @description Adds parallax scrolling effect to carousel item images
 */

import { createPlugin } from '../PluginManager';
import type { AnimatedItemStyle } from '../../types/animation';

export interface ParallaxImagePluginConfig {
  /** Parallax factor — how much background moves relative to foreground (default: 0.3) */
  factor?: number;
  /** Maximum translateX for parallax (default: 100) */
  maxOffset?: number;
}

const PARALLAX_DEFAULTS: Required<ParallaxImagePluginConfig> = {
  factor: 0.3,
  maxOffset: 100,
};

export const createParallaxImagePlugin = (config?: ParallaxImagePluginConfig) => {
  const c = { ...PARALLAX_DEFAULTS, ...config };

  return createPlugin({
    name: 'parallax-image',
    onAnimate: (progress) => {
      const translateX = Math.max(
        -c.maxOffset,
        Math.min(c.maxOffset, progress * c.maxOffset * c.factor)
      );
      return {
        transform: [{ translateX }],
      } as AnimatedItemStyle;
    },
  });
};
