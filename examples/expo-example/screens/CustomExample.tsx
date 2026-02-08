/**
 * @file CustomExample screen
 * @description Shows how to create a custom animation function using
 * Reanimated's interpolate utility. Demonstrates passing a CustomAnimationFn
 * directly to the Carousel preset prop.
 * @author toankhontech
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { interpolate, Extrapolation } from 'react-native-reanimated';
import { Carousel, useCarousel } from 'react-native-ultra-carousel';
import type { CustomAnimationFn, AnimatedItemStyle } from 'react-native-ultra-carousel';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const COLORS = ['#E84393', '#0984E3', '#00B894', '#FDCB6E', '#6C5CE7', '#FF7675'];

const DATA = COLORS.map((color, i) => ({
  id: String(i + 1),
  title: `Slide ${i + 1}`,
  color,
}));

const CAROUSEL_WIDTH = SCREEN_WIDTH - 40;
const CAROUSEL_HEIGHT = 220;

/**
 * Custom animation: Swing Door
 *
 * Items rotate around their left edge like a swinging door,
 * with opacity fading as they rotate away.
 */
const swingDoorAnimation: CustomAnimationFn = (progress): AnimatedItemStyle => {
  const rotateY = interpolate(
    progress,
    [-1, 0, 1],
    [-45, 0, 45],
    Extrapolation.CLAMP
  );

  const opacity = interpolate(
    progress,
    [-1, 0, 1],
    [0.4, 1, 0.4],
    Extrapolation.CLAMP
  );

  const scale = interpolate(
    progress,
    [-1, 0, 1],
    [0.85, 1, 0.85],
    Extrapolation.CLAMP
  );

  const translateX = interpolate(
    progress,
    [-1, 0, 1],
    [-CAROUSEL_WIDTH * 0.3, 0, CAROUSEL_WIDTH * 0.3],
    Extrapolation.CLAMP
  );

  return {
    transform: [
      { perspective: 800 },
      { translateX },
      { rotateY: `${rotateY}deg` },
      { scale },
    ],
    opacity,
  };
};

/**
 * Custom animation: Rise & Fade
 *
 * Items rise vertically and fade in as they become active,
 * then sink and fade out as they move away.
 */
const riseFadeAnimation: CustomAnimationFn = (progress): AnimatedItemStyle => {
  const translateY = interpolate(
    progress,
    [-1, 0, 1],
    [40, 0, 40],
    Extrapolation.CLAMP
  );

  const opacity = interpolate(
    progress,
    [-1, -0.5, 0, 0.5, 1],
    [0, 0.4, 1, 0.4, 0],
    Extrapolation.CLAMP
  );

  const scale = interpolate(
    progress,
    [-1, 0, 1],
    [0.8, 1, 0.8],
    Extrapolation.CLAMP
  );

  const translateX = interpolate(
    progress,
    [-1, 0, 1],
    [-CAROUSEL_WIDTH, 0, CAROUSEL_WIDTH],
    Extrapolation.CLAMP
  );

  return {
    transform: [
      { translateX },
      { translateY },
      { scale },
    ],
    opacity,
  };
};

/**
 * Custom animation: Tilt Shift
 *
 * Items tilt along the Z-axis and shift horizontally,
 * creating a playful rotated card effect.
 */
const tiltShiftAnimation: CustomAnimationFn = (progress): AnimatedItemStyle => {
  const rotate = interpolate(
    progress,
    [-1, 0, 1],
    [-12, 0, 12],
    Extrapolation.CLAMP
  );

  const translateX = interpolate(
    progress,
    [-1, 0, 1],
    [-CAROUSEL_WIDTH * 0.8, 0, CAROUSEL_WIDTH * 0.8],
    Extrapolation.CLAMP
  );

  const translateY = interpolate(
    progress,
    [-1, 0, 1],
    [20, 0, 20],
    Extrapolation.CLAMP
  );

  const opacity = interpolate(
    progress,
    [-1, 0, 1],
    [0.5, 1, 0.5],
    Extrapolation.CLAMP
  );

  const scale = interpolate(
    progress,
    [-1, 0, 1],
    [0.9, 1, 0.9],
    Extrapolation.CLAMP
  );

  return {
    transform: [
      { translateX },
      { translateY },
      { rotate: `${rotate}deg` },
      { scale },
    ],
    opacity,
  };
};

interface CustomPresetOption {
  label: string;
  description: string;
  animation: CustomAnimationFn;
}

const CUSTOM_PRESETS: CustomPresetOption[] = [
  {
    label: 'Swing Door',
    description: 'Items rotate around their edge with a 3D perspective swing.',
    animation: swingDoorAnimation,
  },
  {
    label: 'Rise & Fade',
    description: 'Items rise vertically and fade in when becoming active.',
    animation: riseFadeAnimation,
  },
  {
    label: 'Tilt Shift',
    description: 'Items tilt along the Z-axis with a playful rotated card effect.',
    animation: tiltShiftAnimation,
  },
];

export default function CustomExample() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const carousel = useCarousel();

  const activePreset = CUSTOM_PRESETS[selectedIndex];

  return (
    <GestureHandlerRootView style={styles.flex}>
      <SafeAreaView style={styles.flex}>
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          <Text style={styles.header}>Custom Animations</Text>
          <Text style={styles.subheader}>
            Build your own animations with Reanimated interpolate
          </Text>

          {/* Carousel display */}
          <View style={styles.carouselContainer}>
            <Carousel
              ref={carousel.ref}
              data={DATA}
              renderItem={({ item }) => (
                <View style={[styles.card, { backgroundColor: item.color }]}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardLabel}>{activePreset.label}</Text>
                </View>
              )}
              preset={activePreset.animation}
              width={CAROUSEL_WIDTH}
              height={CAROUSEL_HEIGHT}
              pagination
              gap={12}
            />
          </View>

          <Text style={styles.counter}>
            {carousel.activeIndex + 1} / {DATA.length}
          </Text>

          {/* Preset selector */}
          <Text style={styles.selectorLabel}>Select custom animation</Text>
          <View style={styles.selectorContainer}>
            {CUSTOM_PRESETS.map((preset, index) => {
              const isActive = index === selectedIndex;
              return (
                <TouchableOpacity
                  key={preset.label}
                  style={[styles.selectorButton, isActive && styles.selectorButtonActive]}
                  onPress={() => setSelectedIndex(index)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.selectorButtonText,
                      isActive && styles.selectorButtonTextActive,
                    ]}
                  >
                    {preset.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Description */}
          <View style={styles.descriptionBox}>
            <Text style={styles.descriptionTitle}>{activePreset.label}</Text>
            <Text style={styles.descriptionText}>{activePreset.description}</Text>
          </View>

          {/* How it works */}
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>How it works</Text>
            <Text style={styles.infoText}>
              Pass a <Text style={styles.code}>CustomAnimationFn</Text> directly
              to the <Text style={styles.code}>preset</Text> prop instead of a
              preset name string. The function receives a normalized{' '}
              <Text style={styles.code}>progress</Text> value where 0 is the
              active item, -1 is the previous item, and +1 is the next item.
            </Text>
            <Text style={styles.infoText}>
              Use Reanimated's <Text style={styles.code}>interpolate</Text> to
              map the progress value to transform properties like translateX,
              scale, rotateY, and opacity.
            </Text>
          </View>

          <View style={styles.spacer} />
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 26,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 20,
    color: '#1a1a2e',
  },
  subheader: {
    fontSize: 13,
    color: '#888',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 32,
  },
  carouselContainer: {
    alignItems: 'center',
  },
  card: {
    flex: 1,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
  cardLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 4,
  },
  counter: {
    textAlign: 'center',
    color: '#888',
    fontSize: 13,
    marginTop: 8,
    marginBottom: 16,
  },
  selectorLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginLeft: 20,
    marginBottom: 10,
  },
  selectorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 10,
    marginBottom: 20,
  },
  selectorButton: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#e9ecef',
    minWidth: 80,
    alignItems: 'center',
  },
  selectorButtonActive: {
    backgroundColor: '#E84393',
  },
  selectorButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#555',
  },
  selectorButtonTextActive: {
    color: '#fff',
  },
  descriptionBox: {
    marginHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  descriptionText: {
    fontSize: 13,
    color: '#777',
    lineHeight: 19,
  },
  infoBox: {
    marginHorizontal: 20,
    backgroundColor: '#EBF5FB',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#0984E3',
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0984E3',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 13,
    color: '#555',
    lineHeight: 20,
    marginBottom: 8,
  },
  code: {
    fontFamily: 'monospace',
    fontWeight: '600',
    color: '#E84393',
  },
  spacer: {
    height: 40,
  },
});
