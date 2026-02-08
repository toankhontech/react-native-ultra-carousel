/**
 * @file Home screen
 * @description Grid gallery of all animation presets
 */

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = (SCREEN_WIDTH - 48) / 2;

interface PresetEntry {
  name: string;
  label: string;
  color: string;
  category: 'basic' | 'advanced' | 'creative';
}

const PRESETS: PresetEntry[] = [
  { name: 'slide', label: 'Slide', color: '#FF6B6B', category: 'basic' },
  { name: 'fade', label: 'Fade', color: '#4ECDC4', category: 'basic' },
  { name: 'slide-fade', label: 'Slide Fade', color: '#45B7D1', category: 'basic' },
  { name: 'scale', label: 'Scale', color: '#96CEB4', category: 'basic' },
  { name: 'scale-fade', label: 'Scale Fade', color: '#FFEAA7', category: 'basic' },
  { name: 'vertical', label: 'Vertical', color: '#DDA0DD', category: 'basic' },
  { name: 'vertical-fade', label: 'Vertical Fade', color: '#98D8C8', category: 'basic' },
  { name: 'parallax', label: 'Parallax', color: '#F7DC6F', category: 'basic' },
  { name: 'overlap', label: 'Overlap', color: '#BB8FCE', category: 'basic' },
  { name: 'peek', label: 'Peek', color: '#85C1E9', category: 'basic' },
  { name: 'stack', label: 'Stack', color: '#E74C3C', category: 'advanced' },
  { name: 'tinder', label: 'Tinder', color: '#FE3C72', category: 'advanced' },
  { name: 'coverflow', label: 'Coverflow', color: '#8E44AD', category: 'advanced' },
  { name: 'cube', label: 'Cube', color: '#2ECC71', category: 'advanced' },
  { name: 'flip', label: 'Flip', color: '#F39C12', category: 'advanced' },
  { name: 'wheel', label: 'Wheel', color: '#1ABC9C', category: 'advanced' },
  { name: 'accordion', label: 'Accordion', color: '#3498DB', category: 'advanced' },
  { name: 'zoom', label: 'Zoom', color: '#E67E22', category: 'advanced' },
  { name: 'rotate', label: 'Rotate', color: '#9B59B6', category: 'advanced' },
  { name: 'depth', label: 'Depth', color: '#34495E', category: 'advanced' },
  { name: 'newspaper', label: 'Newspaper', color: '#C0392B', category: 'creative' },
  { name: 'origami', label: 'Origami', color: '#D35400', category: 'creative' },
  { name: 'carousel-3d', label: '3D Carousel', color: '#16A085', category: 'creative' },
  { name: 'wave', label: 'Wave', color: '#2980B9', category: 'creative' },
  { name: 'spiral', label: 'Spiral', color: '#8E44AD', category: 'creative' },
  { name: 'glitch', label: 'Glitch', color: '#2C3E50', category: 'creative' },
  { name: 'morph', label: 'Morph', color: '#27AE60', category: 'creative' },
  { name: 'shutter', label: 'Shutter', color: '#E74C3C', category: 'creative' },
  { name: 'domino', label: 'Domino', color: '#F1C40F', category: 'creative' },
  { name: 'elastic', label: 'Elastic', color: '#1ABC9C', category: 'creative' },
  { name: 'blur-slide', label: 'Blur Slide', color: '#3498DB', category: 'creative' },
  { name: 'windmill', label: 'Windmill', color: '#9B59B6', category: 'creative' },
  { name: 'film-strip', label: 'Film Strip', color: '#E67E22', category: 'creative' },
  { name: 'helix', label: 'Helix', color: '#1ABC9C', category: 'creative' },
  { name: 'gravity', label: 'Gravity', color: '#34495E', category: 'creative' },
];

const categories = ['basic', 'advanced', 'creative'] as const;

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>35+ Animation Presets</Text>
      <Text style={styles.subtitle}>Tap any preset to see it in action</Text>

      <View style={styles.nav}>
        <TouchableOpacity style={styles.navBtn} onPress={() => router.push('/playground')}>
          <Text style={styles.navText}>Playground</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBtn} onPress={() => router.push('/benchmarks')}>
          <Text style={styles.navText}>Benchmarks</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBtn} onPress={() => router.push('/custom')}>
          <Text style={styles.navText}>Custom</Text>
        </TouchableOpacity>
      </View>

      {categories.map((cat) => (
        <View key={cat}>
          <Text style={styles.sectionTitle}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </Text>
          <View style={styles.grid}>
            {PRESETS.filter((p) => p.category === cat).map((preset) => (
              <TouchableOpacity
                key={preset.name}
                style={[styles.card, { backgroundColor: preset.color }]}
                onPress={() => router.push(`/preset/${preset.name}`)}
              >
                <Text style={styles.cardLabel}>{preset.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  title: {
    fontSize: 26,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 20,
    color: '#1a1a2e',
  },
  subtitle: {
    fontSize: 13,
    color: '#888',
    textAlign: 'center',
    marginBottom: 16,
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 20,
  },
  navBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#1a1a2e',
    borderRadius: 20,
  },
  navText: { color: '#fff', fontSize: 13, fontWeight: '600' },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginLeft: 16,
    marginTop: 12,
    marginBottom: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    gap: 12,
  },
  card: {
    width: CARD_WIDTH,
    height: 80,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardLabel: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
});
