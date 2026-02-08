/**
 * @file RTL support utilities
 * @description Helpers for right-to-left layout support
 */

import { I18nManager } from 'react-native';

/** Whether the current layout direction is RTL */
export const isRTL = (): boolean => {
  return I18nManager.isRTL;
};

/**
 * Flips a horizontal value for RTL layouts.
 * In RTL mode, positive becomes negative and vice versa.
 *
 * @param value - The horizontal value to flip
 * @returns The flipped value if RTL, original otherwise
 */
export const flipForRTL = (value: number): number => {
  'worklet';
  return I18nManager.isRTL ? -value : value;
};

/**
 * Returns the appropriate flex direction based on layout direction.
 *
 * @returns 'row-reverse' for RTL, 'row' for LTR
 */
export const getFlexDirection = (): 'row' | 'row-reverse' => {
  return I18nManager.isRTL ? 'row-reverse' : 'row';
};

/**
 * Returns the appropriate text alignment based on layout direction.
 *
 * @returns 'right' for RTL, 'left' for LTR
 */
export const getTextAlign = (): 'left' | 'right' => {
  return I18nManager.isRTL ? 'right' : 'left';
};

/**
 * Resolves start/end alignment to left/right based on layout direction.
 *
 * @param alignment - Logical alignment ('start' or 'end')
 * @returns Physical alignment ('left' or 'right')
 */
export const resolveAlignment = (alignment: 'start' | 'end'): 'left' | 'right' => {
  if (I18nManager.isRTL) {
    return alignment === 'start' ? 'right' : 'left';
  }
  return alignment === 'start' ? 'left' : 'right';
};
