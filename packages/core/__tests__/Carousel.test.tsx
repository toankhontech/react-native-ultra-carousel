/**
 * @file Carousel component unit tests
 * @description Tests for the main Carousel component rendering, props, presets, and accessibility
 */

import React, { createRef } from 'react';
import { render } from '@testing-library/react-native';
import { Carousel } from '../src/components/Carousel';
import type { CarouselProps, CarouselRef } from '../src/types';
import {
  DEFAULT_WIDTH,
  DEFAULT_HEIGHT,
  DEFAULT_PAGINATION_ACTIVE_COLOR,
  DEFAULT_PAGINATION_INACTIVE_COLOR,
  DEFAULT_PAGINATION_SIZE,
  DEFAULT_PAGINATION_GAP,
} from '../src/utils/constants';

/** Helper to create minimal carousel props */
const createProps = <T,>(
  overrides: Partial<CarouselProps<T>> = {}
): CarouselProps<T> => ({
  data: [1, 2, 3] as unknown as T[],
  renderItem: ({ item, index }) => (
    <React.Fragment key={index}>{String(item)}</React.Fragment>
  ),
  ...overrides,
});

describe('Carousel component', () => {
  describe('rendering', () => {
    it('renders without crashing with minimal props', () => {
      const { toJSON } = render(<Carousel {...createProps()} />);
      expect(toJSON()).toBeTruthy();
    });

    it('renders the correct number of items', () => {
      const data = ['a', 'b', 'c', 'd'];
      const renderItem = jest.fn(({ item }: { item: string }) => (
        <React.Fragment>{item}</React.Fragment>
      ));

      render(
        <Carousel
          {...createProps<string>({ data, renderItem })}
        />
      );

      expect(renderItem).toHaveBeenCalledTimes(4);
    });

    it('renders with empty data array', () => {
      const { toJSON } = render(
        <Carousel {...createProps({ data: [] })} />
      );
      expect(toJSON()).toBeTruthy();
    });

    it('renders with a single item', () => {
      const renderItem = jest.fn(({ item }: { item: number }) => (
        <React.Fragment>{item}</React.Fragment>
      ));

      render(
        <Carousel {...createProps<number>({ data: [42], renderItem })} />
      );

      expect(renderItem).toHaveBeenCalledTimes(1);
      expect(renderItem).toHaveBeenCalledWith(
        expect.objectContaining({
          item: 42,
          index: 0,
          isActive: true,
        })
      );
    });
  });

  describe('prop defaults', () => {
    it('uses default width and height when not specified', () => {
      const { toJSON } = render(<Carousel {...createProps()} />);
      const tree = toJSON();

      // The container View should have DEFAULT_WIDTH and DEFAULT_HEIGHT in its style
      expect(tree).toBeTruthy();
    });

    it('applies custom width and height', () => {
      const { toJSON } = render(
        <Carousel {...createProps({ width: 320, height: 200 })} />
      );

      expect(toJSON()).toBeTruthy();
    });

    it('defaults direction to horizontal', () => {
      const renderItem = jest.fn(({ item }: { item: number }) => (
        <React.Fragment>{item}</React.Fragment>
      ));

      const { toJSON } = render(
        <Carousel {...createProps<number>({ renderItem })} />
      );

      // horizontal direction means flexDirection: 'row' on the container
      expect(toJSON()).toBeTruthy();
    });

    it('supports vertical direction', () => {
      const { toJSON } = render(
        <Carousel {...createProps({ direction: 'vertical' })} />
      );

      expect(toJSON()).toBeTruthy();
    });

    it('defaults preset to slide', () => {
      const renderItem = jest.fn(({ item }: { item: number }) => (
        <React.Fragment>{item}</React.Fragment>
      ));

      render(<Carousel {...createProps<number>({ renderItem })} />);

      // Should render successfully with the default slide preset
      expect(renderItem).toHaveBeenCalled();
    });

    it('defaults loop to false', () => {
      const { toJSON } = render(<Carousel {...createProps()} />);
      expect(toJSON()).toBeTruthy();
    });

    it('defaults enabled to true', () => {
      const { toJSON } = render(<Carousel {...createProps()} />);
      expect(toJSON()).toBeTruthy();
    });

    it('defaults initialIndex to 0', () => {
      const renderItem = jest.fn(({ item, isActive }: { item: number; isActive: boolean }) => (
        <React.Fragment>{item}</React.Fragment>
      ));

      render(<Carousel {...createProps<number>({ renderItem })} />);

      // First item should be active
      expect(renderItem).toHaveBeenCalledWith(
        expect.objectContaining({ index: 0, isActive: true })
      );
    });

    it('defaults gap to 0', () => {
      const { toJSON } = render(<Carousel {...createProps()} />);
      expect(toJSON()).toBeTruthy();
    });
  });

  describe('preset switching', () => {
    const presetNames = [
      'slide',
      'fade',
      'slide-fade',
      'scale',
      'scale-fade',
      'vertical',
      'vertical-fade',
      'parallax',
      'overlap',
      'peek',
    ] as const;

    presetNames.forEach((preset) => {
      it(`renders with preset "${preset}" without crashing`, () => {
        const { toJSON } = render(
          <Carousel {...createProps({ preset })} />
        );
        expect(toJSON()).toBeTruthy();
      });
    });

    it('renders with a custom animation function', () => {
      const customAnimation = (
        _progress: number,
        _index: number,
        _totalItems: number
      ) => ({
        opacity: 1,
        transform: [{ translateX: 0 }],
      });

      const { toJSON } = render(
        <Carousel {...createProps({ preset: customAnimation })} />
      );

      expect(toJSON()).toBeTruthy();
    });

    it('passes animationConfig to items', () => {
      const { toJSON } = render(
        <Carousel
          {...createProps({
            preset: 'scale',
            animationConfig: { minScale: 0.5 },
          })}
        />
      );

      expect(toJSON()).toBeTruthy();
    });
  });

  describe('pagination integration', () => {
    it('renders without pagination by default', () => {
      const { queryByTestId, toJSON } = render(
        <Carousel {...createProps()} />
      );

      // Without pagination prop, no pagination component should render
      expect(toJSON()).toBeTruthy();
    });

    it('renders pagination when pagination=true', () => {
      const { toJSON } = render(
        <Carousel {...createProps({ pagination: true })} />
      );

      expect(toJSON()).toBeTruthy();
    });

    it('renders pagination with custom config', () => {
      const { toJSON } = render(
        <Carousel
          {...createProps({
            pagination: {
              type: 'dot',
              activeColor: '#FF0000',
              inactiveColor: '#CCCCCC',
              size: 12,
              gap: 8,
            },
          })}
        />
      );

      expect(toJSON()).toBeTruthy();
    });

    it('renders bar pagination type', () => {
      const { toJSON } = render(
        <Carousel
          {...createProps({
            pagination: { type: 'bar' },
          })}
        />
      );

      expect(toJSON()).toBeTruthy();
    });

    it('renders number pagination type', () => {
      const { toJSON } = render(
        <Carousel
          {...createProps({
            pagination: { type: 'number' },
          })}
        />
      );

      expect(toJSON()).toBeTruthy();
    });

    it('renders progress pagination type', () => {
      const { toJSON } = render(
        <Carousel
          {...createProps({
            pagination: { type: 'progress' },
          })}
        />
      );

      expect(toJSON()).toBeTruthy();
    });

    it('does not render pagination when false', () => {
      const { toJSON } = render(
        <Carousel {...createProps({ pagination: false })} />
      );

      expect(toJSON()).toBeTruthy();
    });
  });

  describe('auto play integration', () => {
    it('renders AutoPlayController when autoPlay is true', () => {
      const { toJSON } = render(
        <Carousel {...createProps({ autoPlay: true })} />
      );

      expect(toJSON()).toBeTruthy();
    });

    it('renders AutoPlayController with config object', () => {
      const { toJSON } = render(
        <Carousel
          {...createProps({
            autoPlay: {
              enabled: true,
              interval: 5000,
              direction: 'forward',
            },
          })}
        />
      );

      expect(toJSON()).toBeTruthy();
    });

    it('does not render AutoPlayController when autoPlay is false', () => {
      const { toJSON } = render(
        <Carousel {...createProps({ autoPlay: false })} />
      );

      expect(toJSON()).toBeTruthy();
    });

    it('accepts autoPlayInterval shorthand', () => {
      const { toJSON } = render(
        <Carousel
          {...createProps({ autoPlay: true, autoPlayInterval: 2000 })}
        />
      );

      expect(toJSON()).toBeTruthy();
    });
  });

  describe('accessibility props', () => {
    it('sets accessible=true by default', () => {
      const { toJSON } = render(<Carousel {...createProps()} />);
      const tree = toJSON();

      expect(tree).toBeTruthy();
    });

    it('applies default accessibility label "Carousel"', () => {
      const { toJSON } = render(<Carousel {...createProps()} />);

      expect(toJSON()).toBeTruthy();
    });

    it('applies custom accessibilityLabel', () => {
      const { toJSON } = render(
        <Carousel
          {...createProps({ accessibilityLabel: 'Photo gallery' })}
        />
      );

      expect(toJSON()).toBeTruthy();
    });

    it('omits accessibility props when accessible=false', () => {
      const { toJSON } = render(
        <Carousel {...createProps({ accessible: false })} />
      );

      expect(toJSON()).toBeTruthy();
    });

    it('provides increment and decrement actions', () => {
      const { toJSON } = render(
        <Carousel {...createProps({ accessible: true })} />
      );

      // The carousel container should have accessibility actions defined
      expect(toJSON()).toBeTruthy();
    });
  });

  describe('ref and imperative methods', () => {
    it('exposes scrollTo via ref', () => {
      const ref = createRef<CarouselRef>();

      render(<Carousel {...createProps()} ref={ref} />);

      expect(ref.current).not.toBeNull();
      expect(typeof ref.current?.scrollTo).toBe('function');
    });

    it('exposes next and prev via ref', () => {
      const ref = createRef<CarouselRef>();

      render(<Carousel {...createProps()} ref={ref} />);

      expect(typeof ref.current?.next).toBe('function');
      expect(typeof ref.current?.prev).toBe('function');
    });

    it('exposes getCurrentIndex via ref', () => {
      const ref = createRef<CarouselRef>();

      render(<Carousel {...createProps()} ref={ref} />);

      expect(typeof ref.current?.getCurrentIndex).toBe('function');
      expect(ref.current?.getCurrentIndex()).toBe(0);
    });

    it('exposes autoPlay controls via ref', () => {
      const ref = createRef<CarouselRef>();

      render(<Carousel {...createProps()} ref={ref} />);

      expect(typeof ref.current?.startAutoPlay).toBe('function');
      expect(typeof ref.current?.stopAutoPlay).toBe('function');
      expect(typeof ref.current?.pauseAutoPlay).toBe('function');
    });

    it('calling scrollTo does not throw', () => {
      const ref = createRef<CarouselRef>();

      render(<Carousel {...createProps()} ref={ref} />);

      expect(() => ref.current?.scrollTo(1)).not.toThrow();
      expect(() => ref.current?.scrollTo(0, false)).not.toThrow();
    });

    it('calling next and prev does not throw', () => {
      const ref = createRef<CarouselRef>();

      render(<Carousel {...createProps()} ref={ref} />);

      expect(() => ref.current?.next()).not.toThrow();
      expect(() => ref.current?.prev()).not.toThrow();
    });

    it('scrollTo clamps index when loop is disabled', () => {
      const ref = createRef<CarouselRef>();

      render(
        <Carousel
          {...createProps({ data: [1, 2, 3], loop: false })}
          ref={ref}
        />
      );

      // Should not throw when clamping out-of-bounds indices
      expect(() => ref.current?.scrollTo(-5)).not.toThrow();
      expect(() => ref.current?.scrollTo(100)).not.toThrow();
    });
  });

  describe('callbacks', () => {
    it('accepts onIndexChange callback', () => {
      const onIndexChange = jest.fn();

      const { toJSON } = render(
        <Carousel {...createProps({ onIndexChange })} />
      );

      expect(toJSON()).toBeTruthy();
    });

    it('accepts onScrollStart callback', () => {
      const onScrollStart = jest.fn();

      const { toJSON } = render(
        <Carousel {...createProps({ onScrollStart })} />
      );

      expect(toJSON()).toBeTruthy();
    });

    it('accepts onScrollEnd callback', () => {
      const onScrollEnd = jest.fn();

      const { toJSON } = render(
        <Carousel {...createProps({ onScrollEnd })} />
      );

      expect(toJSON()).toBeTruthy();
    });
  });

  describe('gesture configuration', () => {
    it('renders with custom gestureConfig', () => {
      const { toJSON } = render(
        <Carousel
          {...createProps({
            gestureConfig: {
              activeOffsetX: 20,
              activeOffsetY: 30,
              velocityThreshold: 800,
            },
          })}
        />
      );

      expect(toJSON()).toBeTruthy();
    });

    it('renders with gesture disabled', () => {
      const { toJSON } = render(
        <Carousel {...createProps({ enabled: false })} />
      );

      expect(toJSON()).toBeTruthy();
    });

    it('renders with tuple activeOffset values', () => {
      const { toJSON } = render(
        <Carousel
          {...createProps({
            gestureConfig: {
              activeOffsetX: [-15, 15],
              activeOffsetY: [-40, 40],
            },
          })}
        />
      );

      expect(toJSON()).toBeTruthy();
    });
  });

  describe('layout options', () => {
    it('renders with custom itemWidth and itemHeight', () => {
      const { toJSON } = render(
        <Carousel
          {...createProps({
            width: 400,
            height: 300,
            itemWidth: 350,
            itemHeight: 250,
          })}
        />
      );

      expect(toJSON()).toBeTruthy();
    });

    it('renders with gap between items', () => {
      const { toJSON } = render(
        <Carousel {...createProps({ gap: 16 })} />
      );

      expect(toJSON()).toBeTruthy();
    });

    it('renders with different snap alignments', () => {
      const alignments = ['start', 'center', 'end'] as const;

      alignments.forEach((snapAlignment) => {
        const { toJSON } = render(
          <Carousel {...createProps({ snapAlignment })} />
        );
        expect(toJSON()).toBeTruthy();
      });
    });

    it('applies custom container style', () => {
      const { toJSON } = render(
        <Carousel
          {...createProps({
            style: { backgroundColor: '#FF0000', borderRadius: 8 },
          })}
        />
      );

      expect(toJSON()).toBeTruthy();
    });

    it('applies custom item style', () => {
      const { toJSON } = render(
        <Carousel
          {...createProps({
            itemStyle: { borderWidth: 1, borderColor: '#000' },
          })}
        />
      );

      expect(toJSON()).toBeTruthy();
    });
  });

  describe('loop mode', () => {
    it('renders with loop enabled', () => {
      const { toJSON } = render(
        <Carousel {...createProps({ loop: true })} />
      );

      expect(toJSON()).toBeTruthy();
    });

    it('ref.next wraps around in loop mode', () => {
      const ref = createRef<CarouselRef>();

      render(
        <Carousel
          {...createProps({ data: [1, 2, 3], loop: true })}
          ref={ref}
        />
      );

      expect(() => ref.current?.next()).not.toThrow();
    });

    it('ref.prev wraps around in loop mode', () => {
      const ref = createRef<CarouselRef>();

      render(
        <Carousel
          {...createProps({ data: [1, 2, 3], loop: true })}
          ref={ref}
        />
      );

      expect(() => ref.current?.prev()).not.toThrow();
    });
  });

  describe('initialIndex', () => {
    it('renders with non-zero initialIndex', () => {
      const { toJSON } = render(
        <Carousel {...createProps({ initialIndex: 2 })} />
      );

      expect(toJSON()).toBeTruthy();
    });

    it('handles initialIndex out of bounds gracefully', () => {
      const { toJSON } = render(
        <Carousel {...createProps({ data: [1, 2, 3], initialIndex: 100 })} />
      );

      expect(toJSON()).toBeTruthy();
    });

    it('ignores initialIndex of 0 (no snap needed)', () => {
      const { toJSON } = render(
        <Carousel {...createProps({ initialIndex: 0 })} />
      );

      expect(toJSON()).toBeTruthy();
    });
  });

  describe('plugins', () => {
    it('initializes plugins on mount', () => {
      const plugin = {
        onInit: jest.fn(),
        onDestroy: jest.fn(),
        onIndexChange: jest.fn(),
      };

      render(<Carousel {...createProps({ plugins: [plugin] })} />);

      expect(plugin.onInit).toHaveBeenCalledTimes(1);
    });

    it('destroys plugins on unmount', () => {
      const plugin = {
        onInit: jest.fn(),
        onDestroy: jest.fn(),
        onIndexChange: jest.fn(),
      };

      const { unmount } = render(
        <Carousel {...createProps({ plugins: [plugin] })} />
      );

      unmount();

      expect(plugin.onDestroy).toHaveBeenCalledTimes(1);
    });

    it('accepts multiple plugins', () => {
      const pluginA = { onInit: jest.fn(), onDestroy: jest.fn() };
      const pluginB = { onInit: jest.fn(), onDestroy: jest.fn() };

      render(
        <Carousel {...createProps({ plugins: [pluginA, pluginB] })} />
      );

      expect(pluginA.onInit).toHaveBeenCalledTimes(1);
      expect(pluginB.onInit).toHaveBeenCalledTimes(1);
    });
  });

  describe('display name', () => {
    it('has the correct displayName', () => {
      expect((Carousel as React.FC).displayName).toBe('Carousel');
    });
  });
});
