/**
 * @file Carousel Storybook stories
 * @description Visual test cases for the Carousel component
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Carousel } from './Carousel';
import type { PresetName } from '../types';

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];
const DATA = COLORS.map((color, i) => ({
  id: String(i + 1),
  title: `Slide ${i + 1}`,
  color,
}));

const renderItem = ({ item }: { item: typeof DATA[number] }) => (
  <View style={[storyStyles.card, { backgroundColor: item.color }]}>
    <Text style={storyStyles.cardText}>{item.title}</Text>
  </View>
);

export default {
  title: 'Carousel',
  component: Carousel,
};

export const Default = () => (
  <Carousel data={DATA} renderItem={renderItem} width={350} height={200} pagination />
);

export const WithAutoPlay = () => (
  <Carousel data={DATA} renderItem={renderItem} width={350} height={200} autoPlay pagination />
);

const BASIC_PRESETS: PresetName[] = ['slide', 'fade', 'scale', 'parallax', 'peek'];
const ADVANCED_PRESETS: PresetName[] = ['coverflow', 'cube', 'flip', 'stack', 'tinder'];

export const BasicPresets = () => (
  <View>
    {BASIC_PRESETS.map((preset) => (
      <View key={preset} style={storyStyles.section}>
        <Text style={storyStyles.label}>{preset}</Text>
        <Carousel data={DATA} renderItem={renderItem} preset={preset} width={350} height={150} />
      </View>
    ))}
  </View>
);

export const AdvancedPresets = () => (
  <View>
    {ADVANCED_PRESETS.map((preset) => (
      <View key={preset} style={storyStyles.section}>
        <Text style={storyStyles.label}>{preset}</Text>
        <Carousel data={DATA} renderItem={renderItem} preset={preset} width={350} height={150} />
      </View>
    ))}
  </View>
);

export const PaginationStyles = () => (
  <View>
    <View style={storyStyles.section}>
      <Text style={storyStyles.label}>Dot</Text>
      <Carousel data={DATA} renderItem={renderItem} width={350} height={150} pagination />
    </View>
    <View style={storyStyles.section}>
      <Text style={storyStyles.label}>Bar</Text>
      <Carousel data={DATA} renderItem={renderItem} width={350} height={150} pagination={{ type: 'bar' }} />
    </View>
    <View style={storyStyles.section}>
      <Text style={storyStyles.label}>Number</Text>
      <Carousel data={DATA} renderItem={renderItem} width={350} height={150} pagination={{ type: 'number' }} />
    </View>
    <View style={storyStyles.section}>
      <Text style={storyStyles.label}>Progress</Text>
      <Carousel data={DATA} renderItem={renderItem} width={350} height={150} pagination={{ type: 'progress' }} />
    </View>
  </View>
);

const storyStyles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: { fontSize: 20, fontWeight: '700', color: '#fff' },
  section: { marginBottom: 24 },
  label: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 8, marginLeft: 8 },
});
