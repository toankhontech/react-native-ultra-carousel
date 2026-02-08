/**
 * @file Carousel component
 * @description Main carousel component with gesture handling, animations, and accessibility
 */

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { StyleSheet, View } from 'react-native';
import { GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import type { CarouselProps, CarouselRef, CustomAnimationFn, RenderItemInfo } from '../types';
import { CarouselItem, type CarouselItemProps } from './CarouselItem';
import { Pagination } from './Pagination';
import { AutoPlayController } from './AutoPlayController';
import { useCarouselGesture } from '../hooks/useCarouselGesture';
import { useSnapPoints } from '../hooks/useSnapPoints';
import { usePagination } from '../hooks/usePagination';
import { useAnimationProgress } from '../hooks/useAnimationProgress';
import type { UseAutoPlayReturn } from '../hooks/useAutoPlay';
import { getEffectiveItemSize } from '../utils/layout';
import { getCarouselAccessibilityProps } from '../utils/accessibility';
import {
  DEFAULT_WIDTH,
  DEFAULT_HEIGHT,
  DEFAULT_PAGINATION_ACTIVE_COLOR,
  DEFAULT_PAGINATION_INACTIVE_COLOR,
  DEFAULT_PAGINATION_SIZE,
  DEFAULT_PAGINATION_GAP,
} from '../utils/constants';
import { clamp } from '../utils/math';

/**
 * Wrapper component for each carousel item.
 * Hooks (useAnimationProgress) are called at the top level of this
 * component instead of inside a useMemo/map loop, which satisfies
 * React's Rules of Hooks.
 */
interface ItemRendererProps<T> extends Omit<CarouselItemProps, 'children'> {
  item: T;
  renderItem: (info: RenderItemInfo<T>) => React.ReactNode;
}

function ItemRenderer<T>({ item, renderItem, ...itemProps }: ItemRendererProps<T>) {
  const animationProgress = useAnimationProgress(
    itemProps.index,
    itemProps.scrollOffset,
    itemProps.itemWidth,
    itemProps.gap
  );

  return (
    <CarouselItem {...itemProps}>
      {renderItem({
        item,
        index: itemProps.index,
        animationProgress,
        isActive: itemProps.isActive,
      })}
    </CarouselItem>
  );
}

/**
 * The main Carousel component.
 * Provides gesture-driven navigation, animation presets, pagination, and auto play.
 *
 * @example
 * ```tsx
 * <Carousel
 *   data={items}
 *   renderItem={({ item }) => <Card item={item} />}
 *   preset="coverflow"
 *   pagination
 *   autoPlay
 * />
 * ```
 */
const CarouselComponent = <T,>(
  props: CarouselProps<T>,
  ref: React.Ref<CarouselRef>
) => {
  const {
    data,
    renderItem,
    preset = 'slide',
    animationConfig,
    width: containerWidth = DEFAULT_WIDTH,
    height: containerHeight = DEFAULT_HEIGHT,
    itemWidth: itemWidthProp,
    itemHeight: itemHeightProp,
    direction = 'horizontal',
    gap = 0,
    snapAlignment = 'center',
    loop = false,
    initialIndex = 0,
    enabled = true,
    autoPlay,
    autoPlayInterval,
    pagination,
    gestureConfig,
    onIndexChange,
    onScrollStart,
    onScrollEnd,
    scrollProgress: externalScrollProgress,
    plugins,
    maxRenderItems: _maxRenderItems = 0,
    renderBuffer: _renderBuffer = 2,
    accessible = true,
    accessibilityLabel,
    style,
    itemStyle,
  } = props;

  const isHorizontal = direction === 'horizontal';
  const containerSize = isHorizontal ? containerWidth : containerHeight;
  const itemWidth = getEffectiveItemSize(itemWidthProp, containerWidth);
  const itemHeight = getEffectiveItemSize(itemHeightProp, containerHeight);
  const itemSize = isHorizontal ? itemWidth : itemHeight;
  const totalItems = data.length;

  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const autoPlayRef = useRef<UseAutoPlayReturn | null>(null);

  const snapPoints = useSnapPoints(
    totalItems,
    itemSize,
    gap,
    containerSize,
    snapAlignment
  );

  const handleIndexChange = useCallback(
    (index: number) => {
      setCurrentIndex(index);
      onIndexChange?.(index);

      plugins?.forEach((plugin) => {
        plugin.onIndexChange?.(index);
      });
    },
    [onIndexChange, plugins]
  );

  const {
    gesture,
    offset,
    activeIndex: _activeIndex,
    snapToIndex,
  } = useCarouselGesture({
    totalItems,
    itemSize,
    gap,
    snapPoints,
    direction,
    loop,
    enabled,
    gestureConfig,
    onIndexChange: handleIndexChange,
    onScrollStart,
    onScrollEnd,
  });

  const { currentPage } = usePagination(offset, itemSize, gap, totalItems);

  useEffect(() => {
    if (externalScrollProgress) {
      externalScrollProgress.value = offset.value;
    }
  });

  useEffect(() => {
    if (initialIndex > 0 && initialIndex < totalItems) {
      snapToIndex(initialIndex, false);
    }
  }, []);

  useEffect(() => {
    plugins?.forEach((plugin) => {
      plugin.onInit?.(carouselRef);
    });

    return () => {
      plugins?.forEach((plugin) => {
        plugin.onDestroy?.();
      });
    };
  }, [plugins]);

  const carouselRef: CarouselRef = useMemo(
    () => ({
      scrollTo: (index: number, animated = true) => {
        const clampedIndex = loop ? index : clamp(index, 0, totalItems - 1);
        snapToIndex(clampedIndex, animated);
      },
      next: (animated = true) => {
        const nextIndex = loop
          ? (currentIndex + 1) % totalItems
          : Math.min(currentIndex + 1, totalItems - 1);
        snapToIndex(nextIndex, animated);
      },
      prev: (animated = true) => {
        const prevIndex = loop
          ? (currentIndex - 1 + totalItems) % totalItems
          : Math.max(currentIndex - 1, 0);
        snapToIndex(prevIndex, animated);
      },
      getCurrentIndex: () => currentIndex,
      startAutoPlay: () => autoPlayRef.current?.start(),
      stopAutoPlay: () => autoPlayRef.current?.stop(),
      pauseAutoPlay: () => autoPlayRef.current?.pause(),
    }),
    [currentIndex, totalItems, loop, snapToIndex]
  );

  useImperativeHandle(ref, () => carouselRef, [carouselRef]);

  const handleAutoPlayAdvance = useCallback(
    (advanceDirection: 'forward' | 'backward') => {
      if (advanceDirection === 'forward') {
        carouselRef.next();
      } else {
        carouselRef.prev();
      }
    },
    [carouselRef]
  );

  const handleAutoPlayControlsReady = useCallback(
    (controls: UseAutoPlayReturn) => {
      autoPlayRef.current = controls;
    },
    []
  );

  const autoPlayConfig = useMemo(() => {
    if (typeof autoPlay === 'boolean') {
      return {
        enabled: autoPlay,
        interval: autoPlayInterval,
      };
    }
    return autoPlay;
  }, [autoPlay, autoPlayInterval]);

  const a11yProps = accessible
    ? getCarouselAccessibilityProps(accessibilityLabel, currentIndex, totalItems)
    : {};

  const handleAccessibilityAction = useCallback(
    (event: { nativeEvent: { actionName: string } }) => {
      switch (event.nativeEvent.actionName) {
        case 'increment':
          carouselRef.next();
          break;
        case 'decrement':
          carouselRef.prev();
          break;
      }
    },
    [carouselRef]
  );

  const paginationConfig = useMemo(() => {
    if (!pagination) return null;
    if (typeof pagination === 'boolean') {
      return {
        type: 'dot' as const,
        activeColor: DEFAULT_PAGINATION_ACTIVE_COLOR,
        inactiveColor: DEFAULT_PAGINATION_INACTIVE_COLOR,
        size: DEFAULT_PAGINATION_SIZE,
        gap: DEFAULT_PAGINATION_GAP,
      };
    }
    return {
      ...pagination,
      activeColor: pagination.activeColor ?? DEFAULT_PAGINATION_ACTIVE_COLOR,
      inactiveColor: pagination.inactiveColor ?? DEFAULT_PAGINATION_INACTIVE_COLOR,
      size: pagination.size ?? DEFAULT_PAGINATION_SIZE,
      gap: pagination.gap ?? DEFAULT_PAGINATION_GAP,
    };
  }, [pagination]);

  const goToIndex = useCallback(
    (index: number) => {
      carouselRef.scrollTo(index);
    },
    [carouselRef]
  );

  const renderItems = data.map((item, index) => (
    <ItemRenderer
      key={index}
      item={item}
      renderItem={renderItem}
      index={index}
      totalItems={totalItems}
      scrollOffset={offset}
      itemWidth={itemWidth}
      itemHeight={itemHeight}
      gap={gap}
      preset={preset as string | CustomAnimationFn}
      animationConfig={animationConfig}
      isActive={index === currentIndex}
      accessible={accessible}
      style={itemStyle}
    />
  ));

  return (
    <GestureHandlerRootView style={styles.root}>
      <View
        style={[
          styles.container,
          {
            width: containerWidth,
            height: containerHeight,
            flexDirection: isHorizontal ? 'row' : 'column',
          },
          style,
        ]}
        {...a11yProps}
        onAccessibilityAction={handleAccessibilityAction}
      >
        <GestureDetector gesture={gesture}>
          <View style={styles.gestureContainer}>
            {renderItems}
          </View>
        </GestureDetector>

        {paginationConfig && (
          <Pagination
            config={paginationConfig}
            totalItems={totalItems}
            progress={currentPage}
            goToIndex={goToIndex}
          />
        )}

        {autoPlayConfig && (
          <AutoPlayController
            config={autoPlayConfig}
            onAdvance={handleAutoPlayAdvance}
            onControlsReady={handleAutoPlayControlsReady}
          />
        )}
      </View>
    </GestureHandlerRootView>
  );
};

CarouselComponent.displayName = 'Carousel';

const styles = StyleSheet.create({
  root: {
    flex: 0,
  },
  container: {
    overflow: 'hidden',
    position: 'relative',
  },
  gestureContainer: {
    flex: 1,
    position: 'relative',
  },
});

export const Carousel = forwardRef(CarouselComponent) as <T>(
  props: CarouselProps<T> & { ref?: React.Ref<CarouselRef> }
) => React.ReactElement;

(Carousel as React.FC).displayName = 'Carousel';
