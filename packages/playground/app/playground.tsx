/**
 * @file Interactive playground
 * @description Build custom carousels with drag-and-drop parameters
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Carousel } from 'react-native-ultra-carousel';
import type { PresetName } from 'react-native-ultra-carousel';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];
const DATA = COLORS.map((color, i) => ({
  id: String(i + 1),
  title: `Item ${i + 1}`,
  color,
}));

const PRESET_LIST: PresetName[] = [
  'slide', 'fade', 'scale', 'coverflow', 'cube',
  'flip', 'stack', 'tinder', 'newspaper', 'wave',
  'spiral', 'glitch', 'morph', 'elastic', 'gravity',
];

export default function PlaygroundScreen() {
  const [preset, setPreset] = useState<PresetName>('slide');
  const [showPagination, setShowPagination] = useState(true);
  const [gap, setGap] = useState(12);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.carouselWrap}>
        <Carousel
          data={DATA}
          renderItem={({ item }) => (
            <View style={[styles.card, { backgroundColor: item.color }]}>
              <Text style={styles.cardText}>{item.title}</Text>
              <Text style={styles.presetText}>{preset}</Text>
            </View>
          )}
          preset={preset}
          width={SCREEN_WIDTH - 32}
          height={200}
          pagination={showPagination}
          gap={gap}
        />
      </View>

      <Text style={styles.sectionTitle}>Preset</Text>
      <View style={styles.chips}>
        {PRESET_LIST.map((p) => (
          <TouchableOpacity
            key={p}
            style={[styles.chip, preset === p && styles.chipActive]}
            onPress={() => setPreset(p)}
          >
            <Text style={[styles.chipText, preset === p && styles.chipTextActive]}>{p}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Options</Text>
      <View style={styles.option}>
        <Text style={styles.optionLabel}>Pagination</Text>
        <TouchableOpacity
          style={[styles.toggle, showPagination && styles.toggleActive]}
          onPress={() => setShowPagination(!showPagination)}
        >
          <Text style={styles.toggleText}>{showPagination ? 'ON' : 'OFF'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.option}>
        <Text style={styles.optionLabel}>Gap: {gap}px</Text>
        <View style={styles.gapControls}>
          <TouchableOpacity style={styles.gapBtn} onPress={() => setGap(Math.max(0, gap - 4))}>
            <Text style={styles.gapBtnText}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.gapBtn} onPress={() => setGap(gap + 4)}>
            <Text style={styles.gapBtnText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.code}>
        <Text style={styles.codeTitle}>Generated Code</Text>
        <Text style={styles.codeText}>
          {`<Carousel\n  data={data}\n  renderItem={renderItem}\n  preset="${preset}"\n  ${showPagination ? 'pagination\n  ' : ''}gap={${gap}}\n  width={${SCREEN_WIDTH - 32}}\n  height={200}\n/>`}
        </Text>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  carouselWrap: { alignItems: 'center', marginTop: 16 },
  card: {
    flex: 1,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: { fontSize: 22, fontWeight: '700', color: '#fff' },
  presetText: { fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 4 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginLeft: 16,
    marginTop: 20,
    marginBottom: 10,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#e0e0e0',
  },
  chipActive: { backgroundColor: '#1a1a2e' },
  chipText: { fontSize: 12, color: '#555', fontWeight: '500' },
  chipTextActive: { color: '#fff' },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  optionLabel: { fontSize: 14, color: '#555' },
  toggle: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: '#ddd',
  },
  toggleActive: { backgroundColor: '#1a1a2e' },
  toggleText: { color: '#fff', fontSize: 12, fontWeight: '600' },
  gapControls: { flexDirection: 'row', gap: 8 },
  gapBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gapBtnText: { fontSize: 18, fontWeight: '700', color: '#333' },
  code: {
    margin: 16,
    padding: 16,
    backgroundColor: '#1a1a2e',
    borderRadius: 10,
  },
  codeTitle: { color: '#888', fontSize: 11, marginBottom: 8 },
  codeText: {
    fontFamily: 'monospace',
    color: '#4ECDC4',
    fontSize: 12,
    lineHeight: 18,
  },
});
