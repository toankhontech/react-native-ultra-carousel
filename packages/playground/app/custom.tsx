/**
 * @file Custom animation builder
 * @description Build and preview custom animation configurations
 */

import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, TextInput } from 'react-native';
import { Carousel } from 'react-native-ultra-carousel';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];
const DATA = COLORS.map((color, i) => ({
  id: String(i + 1),
  title: `Card ${i + 1}`,
  color,
}));

export default function CustomScreen() {
  const [rotateY, setRotateY] = useState('45');
  const [scale, setScale] = useState('0.85');
  const [opacity, setOpacity] = useState('0.6');

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Custom Animation</Text>
      <Text style={styles.subtitle}>Adjust parameters to build your animation</Text>

      <View style={styles.carouselWrap}>
        <Carousel
          data={DATA}
          renderItem={({ item }) => (
            <View style={[styles.card, { backgroundColor: item.color }]}>
              <Text style={styles.cardText}>{item.title}</Text>
            </View>
          )}
          preset="coverflow"
          animationConfig={{
            rotateY: parseFloat(rotateY) || 45,
            scale: parseFloat(scale) || 0.85,
            opacity: parseFloat(opacity) || 0.6,
          }}
          width={SCREEN_WIDTH - 32}
          height={200}
          pagination
        />
      </View>

      <View style={styles.controls}>
        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>Rotate Y</Text>
          <TextInput
            style={styles.input}
            value={rotateY}
            onChangeText={setRotateY}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>Scale</Text>
          <TextInput
            style={styles.input}
            value={scale}
            onChangeText={setScale}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>Opacity</Text>
          <TextInput
            style={styles.input}
            value={opacity}
            onChangeText={setOpacity}
            keyboardType="numeric"
          />
        </View>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  title: { fontSize: 22, fontWeight: '700', textAlign: 'center', marginTop: 20, color: '#1a1a2e' },
  subtitle: { fontSize: 13, color: '#888', textAlign: 'center', marginBottom: 16 },
  carouselWrap: { alignItems: 'center' },
  card: {
    flex: 1,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: { fontSize: 22, fontWeight: '700', color: '#fff' },
  controls: { padding: 20 },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  inputLabel: { fontSize: 14, color: '#555', fontWeight: '500' },
  input: {
    width: 100,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 14,
    backgroundColor: '#fff',
  },
});
