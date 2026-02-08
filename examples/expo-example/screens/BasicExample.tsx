/**
 * @file BasicExample screen
 * @description Demonstrates basic carousel presets: slide, fade, scale, parallax, peek.
 * Renders a scrollable list of carousels, one per preset.
 * @author toankhontech
 */

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Carousel } from 'react-native-ultra-carousel';
import type { PresetName } from 'react-native-ultra-carousel';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'];

const DATA = COLORS.map((color, i) => ({
  id: String(i + 1),
  title: `Item ${i + 1}`,
  color,
}));

const BASIC_PRESETS: { name: PresetName; description: string }[] = [
  { name: 'slide', description: 'Classic horizontal slide transition between items.' },
  { name: 'fade', description: 'Cross-fade transition with smooth opacity changes.' },
  { name: 'scale', description: 'Items scale down as they move away from center.' },
  { name: 'parallax', description: 'Content moves at a different rate than the container.' },
  { name: 'peek', description: 'Adjacent items are partially visible on each side.' },
];

const CAROUSEL_WIDTH = SCREEN_WIDTH - 40;
const CAROUSEL_HEIGHT = 180;

export default function BasicExample() {
  return (
    <GestureHandlerRootView style={styles.flex}>
      <SafeAreaView style={styles.flex}>
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          <Text style={styles.header}>Basic Presets</Text>
          <Text style={styles.subheader}>
            Core animation presets for common carousel patterns
          </Text>

          {BASIC_PRESETS.map((preset) => (
            <View key={preset.name} style={styles.section}>
              <Text style={styles.presetName}>{preset.name}</Text>
              <Text style={styles.presetDescription}>{preset.description}</Text>

              <View style={styles.carouselContainer}>
                <Carousel
                  data={DATA}
                  renderItem={({ item }) => (
                    <View style={[styles.card, { backgroundColor: item.color }]}>
                      <Text style={styles.cardTitle}>{item.title}</Text>
                      <Text style={styles.cardPreset}>{preset.name}</Text>
                    </View>
                  )}
                  preset={preset.name}
                  width={CAROUSEL_WIDTH}
                  height={CAROUSEL_HEIGHT}
                  pagination
                  gap={10}
                />
              </View>
            </View>
          ))}

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
    marginBottom: 24,
    paddingHorizontal: 32,
  },
  section: {
    marginBottom: 28,
  },
  presetName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginLeft: 20,
    marginBottom: 2,
    textTransform: 'capitalize',
  },
  presetDescription: {
    fontSize: 12,
    color: '#999',
    marginLeft: 20,
    marginBottom: 12,
    paddingRight: 20,
  },
  carouselContainer: {
    alignItems: 'center',
  },
  card: {
    flex: 1,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
  },
  cardPreset: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 4,
  },
  spacer: {
    height: 40,
  },
});
