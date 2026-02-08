/**
 * @file Preset demo screen
 * @description Full demo of a single animation preset with controls
 */

import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Carousel } from 'react-native-ultra-carousel';
import type { PresetName } from 'react-native-ultra-carousel';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'];
const DATA = COLORS.map((color, i) => ({
  id: String(i + 1),
  title: `Slide ${i + 1}`,
  color,
}));

export default function PresetScreen() {
  const { name } = useLocalSearchParams<{ name: string }>();
  const preset = (name || 'slide') as PresetName;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{preset}</Text>

      <View style={styles.carouselWrap}>
        <Carousel
          data={DATA}
          renderItem={({ item }) => (
            <View style={[styles.card, { backgroundColor: item.color }]}>
              <Text style={styles.cardText}>{item.title}</Text>
            </View>
          )}
          preset={preset}
          width={SCREEN_WIDTH - 40}
          height={250}
          pagination
          gap={12}
        />
      </View>

      <View style={styles.info}>
        <Text style={styles.infoLabel}>Preset</Text>
        <Text style={styles.infoValue}>{preset}</Text>
      </View>

      <View style={styles.code}>
        <Text style={styles.codeText}>
          {`<Carousel\n  data={data}\n  renderItem={renderItem}\n  preset="${preset}"\n  pagination\n/>`}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  title: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 16,
    color: '#1a1a2e',
  },
  carouselWrap: { alignItems: 'center' },
  card: {
    flex: 1,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: { fontSize: 22, fontWeight: '700', color: '#fff' },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginTop: 20,
  },
  infoLabel: { fontSize: 14, color: '#888' },
  infoValue: { fontSize: 14, fontWeight: '600', color: '#333' },
  code: {
    margin: 20,
    padding: 16,
    backgroundColor: '#1a1a2e',
    borderRadius: 10,
  },
  codeText: {
    fontFamily: 'monospace',
    color: '#4ECDC4',
    fontSize: 13,
    lineHeight: 20,
  },
});
