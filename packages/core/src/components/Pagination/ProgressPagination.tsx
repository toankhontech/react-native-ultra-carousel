/**
 * @file ProgressPagination component
 * @description Progress bar pagination indicator
 */

import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
} from 'react-native-reanimated';
import type { BasePaginationProps } from '../../types';

/** Progress bar height */
const PROGRESS_HEIGHT = 3;

/**
 * Progress bar pagination indicator.
 * Shows overall carousel progress as a horizontal bar.
 */
const ProgressPaginationComponent: React.FC<BasePaginationProps> = ({
  totalItems,
  progress,
  activeColor,
  inactiveColor,
  style,
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    const fraction = totalItems > 1
      ? (progress.value / (totalItems - 1)) * 100
      : 0;
    return {
      width: `${Math.max(0, Math.min(100, fraction))}%`,
    };
  });

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.track, { backgroundColor: inactiveColor }]}>
        <Animated.View
          style={[
            styles.fill,
            { backgroundColor: activeColor },
            animatedStyle,
          ]}
        />
      </View>
    </View>
  );
};

ProgressPaginationComponent.displayName = 'ProgressPagination';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  track: {
    height: PROGRESS_HEIGHT,
    borderRadius: PROGRESS_HEIGHT / 2,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: PROGRESS_HEIGHT / 2,
  },
});

export const ProgressPagination = memo(ProgressPaginationComponent);
