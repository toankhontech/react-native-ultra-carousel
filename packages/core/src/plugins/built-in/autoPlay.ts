/**
 * @file Auto play built-in plugin
 * @description Automatically advances carousel slides at a configurable interval
 */

import { createPlugin } from '../PluginManager';
import type { CarouselRef } from '../../types/carousel';

export interface AutoPlayPluginConfig {
  /** Interval between slides in ms (default: 3000) */
  interval?: number;
  /** Direction of auto play (default: 'forward') */
  direction?: 'forward' | 'backward';
  /** Pause when user interacts (default: true) */
  pauseOnInteraction?: boolean;
  /** Resume delay after interaction in ms (default: 1000) */
  resumeDelay?: number;
}

const AUTO_PLAY_DEFAULTS: Required<AutoPlayPluginConfig> = {
  interval: 3000,
  direction: 'forward',
  pauseOnInteraction: true,
  resumeDelay: 1000,
};

export const createAutoPlayPlugin = (config?: AutoPlayPluginConfig) => {
  const c = { ...AUTO_PLAY_DEFAULTS, ...config };
  let timer: ReturnType<typeof setInterval> | null = null;
  let carousel: CarouselRef | null = null;
  let paused = false;
  let resumeTimer: ReturnType<typeof setTimeout> | null = null;

  const start = () => {
    stop();
    paused = false;
    timer = setInterval(() => {
      if (!paused && carousel) {
        if (c.direction === 'forward') {
          carousel.next();
        } else {
          carousel.prev();
        }
      }
    }, c.interval);
  };

  const stop = () => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
    if (resumeTimer) {
      clearTimeout(resumeTimer);
      resumeTimer = null;
    }
  };

  const pause = () => {
    paused = true;
    if (c.pauseOnInteraction && c.resumeDelay > 0) {
      if (resumeTimer) clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => {
        paused = false;
      }, c.resumeDelay);
    }
  };

  return createPlugin({
    name: 'auto-play',
    onInit: (ref) => {
      carousel = ref;
      start();
    },
    onIndexChange: () => {
      if (c.pauseOnInteraction) {
        pause();
      }
    },
    onDestroy: () => {
      stop();
      carousel = null;
    },
  });
};
