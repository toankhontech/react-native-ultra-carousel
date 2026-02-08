/**
 * @file Pagination built-in plugin
 * @description Tracks carousel pagination state and provides callbacks
 */

import { createPlugin } from '../PluginManager';

export interface PaginationPluginConfig {
  /** Called when page changes with current and total */
  onPageChange?: (current: number, total: number) => void;
  /** Total number of items (set during init) */
  totalItems?: number;
}

export const createPaginationPlugin = (config?: PaginationPluginConfig) => {
  let total = config?.totalItems ?? 0;
  let currentIndex = 0;

  return createPlugin({
    name: 'pagination',
    onInit: () => {
      currentIndex = 0;
    },
    onIndexChange: (index) => {
      currentIndex = index;
      config?.onPageChange?.(currentIndex, total);
    },
    onDestroy: () => {
      currentIndex = 0;
    },
  });
};
