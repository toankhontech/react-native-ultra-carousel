/**
 * @file Pan gesture manager
 * @description Handles pan gesture configuration and snap calculations for the carousel
 */

import { Gesture } from 'react-native-gesture-handler';
import {
  useSharedValue,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { useCallback, useMemo } from 'react';
import { DEFAULT_SPRING_CONFIG } from '../utils/constants';
import { clamp } from '../utils/math';
import { findNearestSnapIndex } from '../utils/layout';

/** Configuration for the pan gesture hook */
export interface PanGestureOptions {
  /** Total number of items */
  totalItems: number;
  /** Size of each item (width or height depending on direction) */
  itemSize: number;
  /** Gap between items */
  gap: number;
  /** All snap point offsets */
  snapPoints: number[];
  /** Whether carousel is horizontal */
  isHorizontal: boolean;
  /** Whether loop mode is enabled */
  loop: boolean;
  /** Whether gesture is enabled */
  enabled: boolean;
  /** Active offset X threshold */
  activeOffsetX: [number, number];
  /** Active offset Y threshold */
  activeOffsetY: [number, number];
  /** Velocity threshold for fling */
  velocityThreshold: number;
  /** Callback when index changes */
  onIndexChange?: (index: number) => void;
  /** Callback when scroll starts */
  onScrollStart?: () => void;
  /** Callback when scroll ends */
  onScrollEnd?: (index: number) => void;
  /** Custom gesture configuration callback */
  onConfigurePanGesture?: (gesture: ReturnType<typeof Gesture.Pan>) => void;
}

/**
 * Creates and manages the pan gesture for carousel navigation.
 *
 * @param options - Configuration for the gesture
 * @returns Object containing the gesture, shared values, and control methods
 */
export const usePanGesture = (options: PanGestureOptions) => {
  const {
    totalItems,
    itemSize,
    gap,
    snapPoints,
    isHorizontal,
    loop,
    enabled,
    activeOffsetX,
    activeOffsetY,
    velocityThreshold,
    onIndexChange,
    onScrollStart,
    onScrollEnd,
    onConfigurePanGesture,
  } = options;

  const offset = useSharedValue(0);
  const activeIndex = useSharedValue(0);
  const isGestureActive = useSharedValue(false);

  const stepSize = itemSize + gap;
  const maxOffset = (totalItems - 1) * stepSize;

  const handleIndexChange = useCallback(
    (index: number) => {
      onIndexChange?.(index);
    },
    [onIndexChange]
  );

  const handleScrollStart = useCallback(() => {
    onScrollStart?.();
  }, [onScrollStart]);

  const handleScrollEnd = useCallback(
    (index: number) => {
      onScrollEnd?.(index);
    },
    [onScrollEnd]
  );

  const snapToIndex = useCallback(
    (index: number, animated = true) => {
      const targetIndex = loop
        ? index
        : clamp(index, 0, totalItems - 1);
      const targetOffset = snapPoints[targetIndex] ?? targetIndex * stepSize;

      if (animated) {
        offset.value = withSpring(targetOffset, DEFAULT_SPRING_CONFIG);
      } else {
        offset.value = targetOffset;
      }

      if (activeIndex.value !== targetIndex) {
        activeIndex.value = targetIndex;
        runOnJS(handleIndexChange)(targetIndex);
      }
    },
    [loop, totalItems, snapPoints, stepSize, offset, activeIndex, handleIndexChange]
  );

  const gesture = useMemo(() => {
    const pan = Gesture.Pan()
      .activeOffsetX(activeOffsetX)
      .activeOffsetY(activeOffsetY)
      .enabled(enabled)
      .onStart(() => {
        isGestureActive.value = true;
        runOnJS(handleScrollStart)();
      })
      .onUpdate((event) => {
        const translation = isHorizontal
          ? event.translationX
          : event.translationY;
        const startOffset = activeIndex.value * stepSize;
        let newOffset = startOffset - translation;

        if (!loop) {
          newOffset = clamp(newOffset, 0, maxOffset);
        }

        offset.value = newOffset;
      })
      .onEnd((event) => {
        isGestureActive.value = false;

        const velocity = isHorizontal ? event.velocityX : event.velocityY;
        const isFling = Math.abs(velocity) > velocityThreshold;

        let targetIndex: number;

        if (isFling) {
          targetIndex = velocity < 0
            ? activeIndex.value + 1
            : activeIndex.value - 1;
        } else {
          targetIndex = findNearestSnapIndex(offset.value, snapPoints);
        }

        if (!loop) {
          targetIndex = clamp(targetIndex, 0, totalItems - 1);
        }

        const targetOffset = snapPoints[targetIndex] ?? targetIndex * stepSize;

        offset.value = withSpring(targetOffset, DEFAULT_SPRING_CONFIG);

        if (activeIndex.value !== targetIndex) {
          activeIndex.value = targetIndex;
          runOnJS(handleIndexChange)(targetIndex);
        }
        runOnJS(handleScrollEnd)(targetIndex);
      });

    onConfigurePanGesture?.(pan);

    return pan;
  }, [
    activeOffsetX,
    activeOffsetY,
    enabled,
    isHorizontal,
    loop,
    maxOffset,
    stepSize,
    totalItems,
    snapPoints,
    velocityThreshold,
    offset,
    activeIndex,
    isGestureActive,
    handleIndexChange,
    handleScrollStart,
    handleScrollEnd,
    onConfigurePanGesture,
  ]);

  return {
    gesture,
    offset,
    activeIndex,
    isGestureActive,
    snapToIndex,
  };
};
