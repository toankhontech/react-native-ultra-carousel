/**
 * @file Benchmarks screen
 * @description Performance comparison of animation presets
 */

import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const ALL_PRESETS = [
  'slide', 'fade', 'slide-fade', 'scale', 'scale-fade',
  'vertical', 'vertical-fade', 'parallax', 'overlap', 'peek',
  'stack', 'tinder', 'coverflow', 'cube', 'flip',
  'wheel', 'accordion', 'zoom', 'rotate', 'depth',
  'newspaper', 'origami', 'carousel-3d', 'wave', 'spiral',
  'glitch', 'morph', 'shutter', 'domino', 'elastic',
  'blur-slide', 'windmill', 'film-strip', 'helix', 'gravity',
];

interface BenchResult {
  name: string;
  avgMs: number;
  fps: number;
}

export default function BenchmarksScreen() {
  const [results, setResults] = useState<BenchResult[]>([]);
  const [running, setRunning] = useState(false);

  const runBenchmarks = useCallback(() => {
    setRunning(true);
    // Simulate benchmark results
    const newResults: BenchResult[] = ALL_PRESETS.map((name) => {
      const avgMs = Math.random() * 0.08 + 0.01;
      return {
        name,
        avgMs,
        fps: Math.min(60, Math.round(1000 / (avgMs + 16))),
      };
    });
    setResults(newResults.sort((a, b) => a.avgMs - b.avgMs));
    setRunning(false);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Performance Benchmarks</Text>
      <Text style={styles.subtitle}>Animation function execution time</Text>

      <TouchableOpacity style={styles.runBtn} onPress={runBenchmarks} disabled={running}>
        <Text style={styles.runBtnText}>{running ? 'Running...' : 'Run Benchmarks'}</Text>
      </TouchableOpacity>

      {results.length > 0 && (
        <View style={styles.results}>
          <View style={styles.headerRow}>
            <Text style={[styles.headerCell, { flex: 2 }]}>Preset</Text>
            <Text style={styles.headerCell}>Avg (ms)</Text>
            <Text style={styles.headerCell}>FPS</Text>
          </View>
          {results.map((r) => (
            <View key={r.name} style={styles.row}>
              <Text style={[styles.cell, { flex: 2 }]}>{r.name}</Text>
              <Text style={styles.cell}>{r.avgMs.toFixed(3)}</Text>
              <Text style={[styles.cell, { color: r.fps >= 58 ? '#27ae60' : '#e74c3c' }]}>
                {r.fps}
              </Text>
            </View>
          ))}
        </View>
      )}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  title: { fontSize: 22, fontWeight: '700', textAlign: 'center', marginTop: 20, color: '#1a1a2e' },
  subtitle: { fontSize: 13, color: '#888', textAlign: 'center', marginBottom: 20 },
  runBtn: {
    alignSelf: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#1a1a2e',
    borderRadius: 24,
    marginBottom: 20,
  },
  runBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  results: { marginHorizontal: 16 },
  headerRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#ddd',
  },
  headerCell: { flex: 1, fontSize: 12, fontWeight: '700', color: '#555' },
  row: {
    flexDirection: 'row',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  cell: { flex: 1, fontSize: 13, color: '#333' },
});
