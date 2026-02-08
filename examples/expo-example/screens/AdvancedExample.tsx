/**
 * @file AdvancedExample screen
 * @description Demonstrates advanced carousel presets: stack, tinder, coverflow, cube, flip.
 * Features an interactive preset selector to switch between animations.
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
import { Carousel, useCarousel } from 'react-native-ultra-carousel';
import type { PresetName } from 'react-native-ultra-carousel';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const COLORS = ['#6C5CE7', '#00CEC9', '#FD79A8', '#FDCB6E', '#55EFC4', '#74B9FF', '#E17055'];

const DATA = COLORS.map((color, i) => ({
  id: String(i + 1),
  title: `Card ${i + 1}`,
  subtitle: `Swipe to explore`,
  color,
}));

interface AdvancedPresetInfo {
  name: PresetName;
  label: string;
  description: string;
}

const ADVANCED_PRESETS: AdvancedPresetInfo[] = [
  {
    name: 'stack',
    label: 'Stack',
    description: 'Cards stack on top of each other with a layered depth effect.',
  },
  {
    name: 'tinder',
    label: 'Tinder',
    description: 'Swipe cards left or right with a rotating throw animation.',
  },
  {
    name: 'coverflow',
    label: 'Coverflow',
    description: 'Items rotate and recede in 3D, similar to the classic album art view.',
  },
  {
    name: 'cube',
    label: 'Cube',
    description: 'Items are placed on the faces of a rotating 3D cube.',
  },
  {
    name: 'flip',
    label: 'Flip',
    description: 'Items flip around the Y-axis to reveal the next card.',
  },
];

const CAROUSEL_WIDTH = SCREEN_WIDTH - 40;
const CAROUSEL_HEIGHT = 260;

export default function AdvancedExample() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const carousel = useCarousel();

  const activePreset = ADVANCED_PRESETS[selectedIndex];

  return (
    <GestureHandlerRootView style={styles.flex}>
      <SafeAreaView style={styles.flex}>
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          <Text style={styles.header}>Advanced Presets</Text>
          <Text style={styles.subheader}>
            Tap a preset below to see it in action
          </Text>

          {/* Carousel display */}
          <View style={styles.carouselContainer}>
            <Carousel
              ref={carousel.ref}
              data={DATA}
              renderItem={({ item }) => (
                <View style={[styles.card, { backgroundColor: item.color }]}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
                  <View style={styles.presetBadge}>
                    <Text style={styles.presetBadgeText}>{activePreset.name}</Text>
                  </View>
                </View>
              )}
              preset={activePreset.name}
              width={CAROUSEL_WIDTH}
              height={CAROUSEL_HEIGHT}
              pagination
              gap={12}
            />
          </View>

          <Text style={styles.counter}>
            {carousel.activeIndex + 1} / {DATA.length}
          </Text>

          {/* Preset description */}
          <View style={styles.descriptionBox}>
            <Text style={styles.descriptionTitle}>{activePreset.label}</Text>
            <Text style={styles.descriptionText}>{activePreset.description}</Text>
          </View>

          {/* Preset selector */}
          <Text style={styles.selectorLabel}>Choose a preset</Text>
          <View style={styles.selectorContainer}>
            {ADVANCED_PRESETS.map((preset, index) => {
              const isActive = index === selectedIndex;
              return (
                <TouchableOpacity
                  key={preset.name}
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
  },
  carouselContainer: {
    alignItems: 'center',
  },
  card: {
    flex: 1,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  cardTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
  },
  cardSubtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.75)',
    marginTop: 4,
  },
  presetBadge: {
    marginTop: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 12,
  },
  presetBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#fff',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  counter: {
    textAlign: 'center',
    color: '#888',
    fontSize: 13,
    marginTop: 8,
    marginBottom: 16,
  },
  descriptionBox: {
    marginHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
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
    backgroundColor: '#6C5CE7',
  },
  selectorButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#555',
  },
  selectorButtonTextActive: {
    color: '#fff',
  },
  spacer: {
    height: 40,
  },
});
