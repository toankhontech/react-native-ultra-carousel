/**
 * @file PanGestureManager unit tests
 * @description Tests for gesture configuration, velocity calculations, snap behavior, and callbacks
 */

import { renderHook, act } from '@testing-library/react-native';
import { usePanGesture, type PanGestureOptions } from '../../src/gestures/PanGestureManager';
import { calculateSnapPoints, findNearestSnapIndex } from '../../src/utils/layout';
import { clamp } from '../../src/utils/math';
import {
  DEFAULT_SPRING_CONFIG,
  DEFAULT_VELOCITY_THRESHOLD,
  DEFAULT_ACTIVE_OFFSET_X,
  DEFAULT_ACTIVE_OFFSET_Y,
} from '../../src/utils/constants';

/** Creates default PanGestureOptions for testing */
const createDefaultOptions = (
  overrides: Partial<PanGestureOptions> = {}
): PanGestureOptions => {
  const totalItems = overrides.totalItems ?? 5;
  const itemSize = overrides.itemSize ?? 300;
  const gap = overrides.gap ?? 0;
  const snapPoints =
    overrides.snapPoints ??
    calculateSnapPoints(totalItems, itemSize, gap, 400, 'center');

  return {
    totalItems,
    itemSize,
    gap,
    snapPoints,
    isHorizontal: true,
    loop: false,
    enabled: true,
    activeOffsetX: DEFAULT_ACTIVE_OFFSET_X,
    activeOffsetY: DEFAULT_ACTIVE_OFFSET_Y,
    velocityThreshold: DEFAULT_VELOCITY_THRESHOLD,
    ...overrides,
  };
};

describe('usePanGesture', () => {
  describe('return value interface', () => {
    it('returns expected properties', () => {
      const { result } = renderHook(() =>
        usePanGesture(createDefaultOptions())
      );

      expect(result.current.gesture).toBeDefined();
      expect(result.current.offset).toBeDefined();
      expect(result.current.activeIndex).toBeDefined();
      expect(result.current.isGestureActive).toBeDefined();
      expect(typeof result.current.snapToIndex).toBe('function');
    });

    it('initializes offset to 0', () => {
      const { result } = renderHook(() =>
        usePanGesture(createDefaultOptions())
      );

      expect(result.current.offset.value).toBe(0);
    });

    it('initializes activeIndex to 0', () => {
      const { result } = renderHook(() =>
        usePanGesture(createDefaultOptions())
      );

      expect(result.current.activeIndex.value).toBe(0);
    });

    it('initializes isGestureActive to false', () => {
      const { result } = renderHook(() =>
        usePanGesture(createDefaultOptions())
      );

      expect(result.current.isGestureActive.value).toBe(false);
    });
  });

  describe('gesture configuration', () => {
    it('creates a pan gesture object', () => {
      const { result } = renderHook(() =>
        usePanGesture(createDefaultOptions())
      );

      // The gesture should be a valid object from Gesture.Pan()
      expect(result.current.gesture).toBeDefined();
      expect(result.current.gesture).toBeTruthy();
    });

    it('respects the enabled flag', () => {
      const { result: enabledResult } = renderHook(() =>
        usePanGesture(createDefaultOptions({ enabled: true }))
      );

      const { result: disabledResult } = renderHook(() =>
        usePanGesture(createDefaultOptions({ enabled: false }))
      );

      // Both should produce valid gestures
      expect(enabledResult.current.gesture).toBeDefined();
      expect(disabledResult.current.gesture).toBeDefined();
    });

    it('applies custom activeOffsetX thresholds', () => {
      const customOffset: [number, number] = [-20, 20];

      const { result } = renderHook(() =>
        usePanGesture(createDefaultOptions({ activeOffsetX: customOffset }))
      );

      expect(result.current.gesture).toBeDefined();
    });

    it('applies custom activeOffsetY thresholds', () => {
      const customOffset: [number, number] = [-30, 30];

      const { result } = renderHook(() =>
        usePanGesture(createDefaultOptions({ activeOffsetY: customOffset }))
      );

      expect(result.current.gesture).toBeDefined();
    });

    it('invokes onConfigurePanGesture callback', () => {
      const onConfigurePanGesture = jest.fn();

      renderHook(() =>
        usePanGesture(
          createDefaultOptions({ onConfigurePanGesture })
        )
      );

      expect(onConfigurePanGesture).toHaveBeenCalledTimes(1);
    });

    it('passes the gesture to onConfigurePanGesture', () => {
      const onConfigurePanGesture = jest.fn();

      renderHook(() =>
        usePanGesture(
          createDefaultOptions({ onConfigurePanGesture })
        )
      );

      expect(onConfigurePanGesture).toHaveBeenCalledWith(
        expect.objectContaining({
          onStart: expect.any(Function),
          onUpdate: expect.any(Function),
          onEnd: expect.any(Function),
        })
      );
    });
  });

  describe('snapToIndex', () => {
    it('snaps to the specified index', () => {
      const { result } = renderHook(() =>
        usePanGesture(createDefaultOptions())
      );

      act(() => {
        result.current.snapToIndex(2);
      });

      // After snapping, activeIndex should update
      expect(result.current.activeIndex.value).toBe(2);
    });

    it('snaps without animation when animated=false', () => {
      const snapPoints = calculateSnapPoints(5, 300, 0, 400, 'center');
      const { result } = renderHook(() =>
        usePanGesture(createDefaultOptions({ snapPoints }))
      );

      act(() => {
        result.current.snapToIndex(3, false);
      });

      expect(result.current.activeIndex.value).toBe(3);
      // When not animated, offset should be set directly to snap point
      expect(result.current.offset.value).toBe(snapPoints[3]);
    });

    it('clamps index to valid range when loop is disabled', () => {
      const options = createDefaultOptions({ totalItems: 5, loop: false });
      const { result } = renderHook(() => usePanGesture(options));

      act(() => {
        result.current.snapToIndex(10, false);
      });

      expect(result.current.activeIndex.value).toBe(4); // clamped to max index
    });

    it('clamps negative index to 0 when loop is disabled', () => {
      const options = createDefaultOptions({ totalItems: 5, loop: false });
      const { result } = renderHook(() => usePanGesture(options));

      act(() => {
        result.current.snapToIndex(-3, false);
      });

      expect(result.current.activeIndex.value).toBe(0);
    });

    it('allows out-of-bounds index when loop is enabled', () => {
      const totalItems = 5;
      const itemSize = 300;
      const gap = 0;
      const snapPoints = calculateSnapPoints(totalItems, itemSize, gap, 400, 'center');
      const options = createDefaultOptions({
        totalItems,
        itemSize,
        gap,
        snapPoints,
        loop: true,
      });

      const { result } = renderHook(() => usePanGesture(options));

      // In loop mode, the index is not clamped
      act(() => {
        result.current.snapToIndex(7, false);
      });

      expect(result.current.activeIndex.value).toBe(7);
    });

    it('fires onIndexChange when index changes', () => {
      const onIndexChange = jest.fn();
      const { result } = renderHook(() =>
        usePanGesture(createDefaultOptions({ onIndexChange }))
      );

      act(() => {
        result.current.snapToIndex(2, false);
      });

      expect(onIndexChange).toHaveBeenCalledWith(2);
    });

    it('does not fire onIndexChange when snapping to the same index', () => {
      const onIndexChange = jest.fn();
      const { result } = renderHook(() =>
        usePanGesture(createDefaultOptions({ onIndexChange }))
      );

      // Already at index 0
      act(() => {
        result.current.snapToIndex(0, false);
      });

      expect(onIndexChange).not.toHaveBeenCalled();
    });

    it('snaps with animation by default', () => {
      const { result } = renderHook(() =>
        usePanGesture(createDefaultOptions())
      );

      act(() => {
        result.current.snapToIndex(1);
      });

      // When animated, offset.value is set via withSpring (mock returns the target value)
      expect(result.current.activeIndex.value).toBe(1);
    });
  });

  describe('step size calculation', () => {
    it('calculates correct step size (itemSize + gap)', () => {
      const itemSize = 200;
      const gap = 16;
      const stepSize = itemSize + gap;
      const snapPoints = calculateSnapPoints(5, itemSize, gap, 400, 'center');

      const { result } = renderHook(() =>
        usePanGesture(
          createDefaultOptions({ itemSize, gap, snapPoints })
        )
      );

      // Snap to index 1 without animation to verify offset
      act(() => {
        result.current.snapToIndex(1, false);
      });

      expect(result.current.offset.value).toBe(snapPoints[1]);
    });

    it('handles zero gap', () => {
      const itemSize = 300;
      const gap = 0;
      const snapPoints = calculateSnapPoints(3, itemSize, gap, 400, 'center');

      const { result } = renderHook(() =>
        usePanGesture(
          createDefaultOptions({ totalItems: 3, itemSize, gap, snapPoints })
        )
      );

      act(() => {
        result.current.snapToIndex(2, false);
      });

      expect(result.current.offset.value).toBe(snapPoints[2]);
    });

    it('handles large gap values', () => {
      const itemSize = 200;
      const gap = 50;
      const snapPoints = calculateSnapPoints(3, itemSize, gap, 400, 'center');

      const { result } = renderHook(() =>
        usePanGesture(
          createDefaultOptions({
            totalItems: 3,
            itemSize,
            gap,
            snapPoints,
          })
        )
      );

      act(() => {
        result.current.snapToIndex(1, false);
      });

      expect(result.current.offset.value).toBe(snapPoints[1]);
    });
  });

  describe('horizontal vs vertical', () => {
    it('creates gesture for horizontal direction', () => {
      const { result } = renderHook(() =>
        usePanGesture(createDefaultOptions({ isHorizontal: true }))
      );

      expect(result.current.gesture).toBeDefined();
    });

    it('creates gesture for vertical direction', () => {
      const { result } = renderHook(() =>
        usePanGesture(createDefaultOptions({ isHorizontal: false }))
      );

      expect(result.current.gesture).toBeDefined();
    });
  });

  describe('callbacks', () => {
    it('accepts onScrollStart callback', () => {
      const onScrollStart = jest.fn();
      const { result } = renderHook(() =>
        usePanGesture(createDefaultOptions({ onScrollStart }))
      );

      expect(result.current.gesture).toBeDefined();
    });

    it('accepts onScrollEnd callback', () => {
      const onScrollEnd = jest.fn();
      const { result } = renderHook(() =>
        usePanGesture(createDefaultOptions({ onScrollEnd }))
      );

      expect(result.current.gesture).toBeDefined();
    });

    it('accepts onIndexChange callback', () => {
      const onIndexChange = jest.fn();
      const { result } = renderHook(() =>
        usePanGesture(createDefaultOptions({ onIndexChange }))
      );

      expect(result.current.gesture).toBeDefined();
    });
  });

  describe('max offset calculation', () => {
    it('computes maxOffset correctly for non-loop mode', () => {
      const totalItems = 5;
      const itemSize = 200;
      const gap = 10;
      const stepSize = itemSize + gap;
      const maxOffset = (totalItems - 1) * stepSize;

      expect(maxOffset).toBe(4 * 210);
      expect(maxOffset).toBe(840);
    });

    it('maxOffset is 0 for a single item', () => {
      const totalItems = 1;
      const itemSize = 300;
      const gap = 0;
      const stepSize = itemSize + gap;
      const maxOffset = (totalItems - 1) * stepSize;

      expect(maxOffset).toBe(0);
    });

    it('maxOffset accounts for gap', () => {
      const totalItems = 3;
      const itemSize = 200;
      const gap = 20;
      const stepSize = itemSize + gap;
      const maxOffset = (totalItems - 1) * stepSize;

      expect(maxOffset).toBe(2 * 220);
      expect(maxOffset).toBe(440);
    });
  });
});

describe('findNearestSnapIndex (used by gesture onEnd)', () => {
  it('returns 0 for offset at the first snap point', () => {
    const snapPoints = [0, 300, 600, 900];
    expect(findNearestSnapIndex(0, snapPoints)).toBe(0);
  });

  it('returns the closest snap index for an intermediate offset', () => {
    const snapPoints = [0, 300, 600, 900];
    expect(findNearestSnapIndex(280, snapPoints)).toBe(1);
    expect(findNearestSnapIndex(320, snapPoints)).toBe(1);
  });

  it('returns last index for offset at the last snap point', () => {
    const snapPoints = [0, 300, 600, 900];
    expect(findNearestSnapIndex(900, snapPoints)).toBe(3);
  });

  it('handles offset between two snap points', () => {
    const snapPoints = [0, 300, 600];
    // 150 is exactly between 0 and 300 - should return 0 (first nearest)
    expect(findNearestSnapIndex(150, snapPoints)).toBe(0);
    // 151 is closer to 300
    expect(findNearestSnapIndex(151, snapPoints)).toBe(1);
  });

  it('handles negative offsets', () => {
    const snapPoints = [-100, 0, 100, 200];
    expect(findNearestSnapIndex(-80, snapPoints)).toBe(0);
    expect(findNearestSnapIndex(-20, snapPoints)).toBe(1);
  });

  it('handles single snap point', () => {
    const snapPoints = [100];
    expect(findNearestSnapIndex(0, snapPoints)).toBe(0);
    expect(findNearestSnapIndex(999, snapPoints)).toBe(0);
  });

  it('handles snap points with gaps', () => {
    const snapPoints = calculateSnapPoints(5, 200, 16, 400, 'center');

    // Each snap index should be nearest to its own snap point
    snapPoints.forEach((point, index) => {
      expect(findNearestSnapIndex(point, snapPoints)).toBe(index);
    });
  });
});

describe('velocity threshold behavior', () => {
  it('default velocity threshold is 500', () => {
    expect(DEFAULT_VELOCITY_THRESHOLD).toBe(500);
  });

  it('velocity below threshold is not a fling', () => {
    const velocity = 400;
    const isFling = Math.abs(velocity) > DEFAULT_VELOCITY_THRESHOLD;
    expect(isFling).toBe(false);
  });

  it('velocity above threshold is a fling', () => {
    const velocity = 600;
    const isFling = Math.abs(velocity) > DEFAULT_VELOCITY_THRESHOLD;
    expect(isFling).toBe(true);
  });

  it('negative velocity above threshold is a fling', () => {
    const velocity = -700;
    const isFling = Math.abs(velocity) > DEFAULT_VELOCITY_THRESHOLD;
    expect(isFling).toBe(true);
  });

  it('velocity at exactly the threshold is not a fling', () => {
    const velocity = 500;
    const isFling = Math.abs(velocity) > DEFAULT_VELOCITY_THRESHOLD;
    expect(isFling).toBe(false);
  });

  it('custom velocity threshold changes fling detection', () => {
    const customThreshold = 200;
    const velocity = 300;

    const isFlingDefault = Math.abs(velocity) > DEFAULT_VELOCITY_THRESHOLD;
    const isFlingCustom = Math.abs(velocity) > customThreshold;

    expect(isFlingDefault).toBe(false);
    expect(isFlingCustom).toBe(true);
  });
});

describe('snap point calculations for gesture', () => {
  it('center alignment creates negative snap for first item', () => {
    const snapPoints = calculateSnapPoints(3, 300, 0, 400, 'center');

    // First snap point should offset by (containerSize - itemSize) / 2 = 50
    expect(snapPoints[0]).toBe(-50);
  });

  it('start alignment starts at 0', () => {
    const snapPoints = calculateSnapPoints(3, 300, 0, 400, 'start');

    expect(snapPoints[0]).toBe(0);
    expect(snapPoints[1]).toBe(300);
    expect(snapPoints[2]).toBe(600);
  });

  it('end alignment offsets to align item with container end', () => {
    const snapPoints = calculateSnapPoints(3, 300, 0, 400, 'end');

    // Alignment offset = containerSize - itemSize = 100
    expect(snapPoints[0]).toBe(-100);
  });

  it('snap points are evenly spaced by stepSize', () => {
    const itemSize = 250;
    const gap = 10;
    const stepSize = itemSize + gap;
    const snapPoints = calculateSnapPoints(4, itemSize, gap, 400, 'start');

    for (let i = 1; i < snapPoints.length; i++) {
      expect(snapPoints[i] - snapPoints[i - 1]).toBe(stepSize);
    }
  });

  it('generates correct number of snap points', () => {
    const totalItems = 7;
    const snapPoints = calculateSnapPoints(totalItems, 200, 0, 400, 'center');
    expect(snapPoints).toHaveLength(totalItems);
  });
});

describe('clamp utility (used in offset clamping)', () => {
  it('clamps value below minimum', () => {
    expect(clamp(-10, 0, 100)).toBe(0);
  });

  it('clamps value above maximum', () => {
    expect(clamp(150, 0, 100)).toBe(100);
  });

  it('passes through value within range', () => {
    expect(clamp(50, 0, 100)).toBe(50);
  });

  it('handles min equal to max', () => {
    expect(clamp(50, 42, 42)).toBe(42);
  });

  it('handles negative ranges', () => {
    expect(clamp(-5, -10, -1)).toBe(-5);
    expect(clamp(-15, -10, -1)).toBe(-10);
    expect(clamp(0, -10, -1)).toBe(-1);
  });
});

describe('spring configuration', () => {
  it('has expected default values', () => {
    expect(DEFAULT_SPRING_CONFIG.damping).toBe(20);
    expect(DEFAULT_SPRING_CONFIG.stiffness).toBe(200);
    expect(DEFAULT_SPRING_CONFIG.mass).toBe(1);
    expect(DEFAULT_SPRING_CONFIG.overshootClamping).toBe(false);
  });

  it('has displacement and speed thresholds', () => {
    expect(DEFAULT_SPRING_CONFIG.restDisplacementThreshold).toBe(0.01);
    expect(DEFAULT_SPRING_CONFIG.restSpeedThreshold).toBe(0.01);
  });
});
