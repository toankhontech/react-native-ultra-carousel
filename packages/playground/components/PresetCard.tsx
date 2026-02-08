/**
 * @file Preset card component
 * @description Card showing preset preview in the gallery grid
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface PresetCardProps {
  name: string;
  label: string;
  color: string;
  onPress: () => void;
}

export const PresetCard: React.FC<PresetCardProps> = ({ label, color, onPress }) => (
  <TouchableOpacity style={[styles.card, { backgroundColor: color }]} onPress={onPress}>
    <Text style={styles.label}>{label}</Text>
  </TouchableOpacity>
);

PresetCard.displayName = 'PresetCard';

const styles = StyleSheet.create({
  card: {
    height: 80,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
});
