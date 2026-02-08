/**
 * @file Performance monitor dev tool
 * @description Overlay component showing FPS, memory, and render metrics
 */

import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface PerformanceMonitorProps {
  /** Show/hide the monitor (default: true in __DEV__) */
  enabled?: boolean;
  /** Position on screen (default: 'top-right') */
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

interface Metrics {
  fps: number;
  frameDrops: number;
  renderCount: number;
}

/**
 * Development-only performance monitor overlay.
 * Shows real-time FPS and frame drop statistics.
 */
export const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  enabled = __DEV__,
  position = 'top-right',
}) => {
  const [metrics, setMetrics] = useState<Metrics>({ fps: 60, frameDrops: 0, renderCount: 0 });
  const frameCount = useRef(0);
  const dropCount = useRef(0);
  const lastTimestamp = useRef(performance.now());
  const renderCount = useRef(0);

  renderCount.current++;

  useEffect(() => {
    if (!enabled) return;

    let rafId: number;
    let intervalId: ReturnType<typeof setInterval>;

    const onFrame = (timestamp: number) => {
      const delta = timestamp - lastTimestamp.current;
      lastTimestamp.current = timestamp;

      frameCount.current++;

      // Detect frame drop (> 20ms between frames means dropped)
      if (delta > 20) {
        dropCount.current++;
      }

      rafId = requestAnimationFrame(onFrame);
    };

    rafId = requestAnimationFrame(onFrame);

    intervalId = setInterval(() => {
      const currentFps = Math.min(60, Math.round(frameCount.current));
      setMetrics({
        fps: currentFps,
        frameDrops: dropCount.current,
        renderCount: renderCount.current,
      });
      frameCount.current = 0;
      dropCount.current = 0;
    }, 1000);

    return () => {
      cancelAnimationFrame(rafId);
      clearInterval(intervalId);
    };
  }, [enabled]);

  if (!enabled) return null;

  const positionStyle = {
    'top-left': { top: 50, left: 16 },
    'top-right': { top: 50, right: 16 },
    'bottom-left': { bottom: 50, left: 16 },
    'bottom-right': { bottom: 50, right: 16 },
  }[position];

  const fpsColor = metrics.fps >= 55 ? '#27ae60' : metrics.fps >= 30 ? '#f39c12' : '#e74c3c';

  return (
    <View style={[styles.container, positionStyle]}>
      <Text style={[styles.fps, { color: fpsColor }]}>{metrics.fps} FPS</Text>
      <Text style={styles.stat}>Drops: {metrics.frameDrops}</Text>
      <Text style={styles.stat}>Renders: {metrics.renderCount}</Text>
    </View>
  );
};

PerformanceMonitor.displayName = 'PerformanceMonitor';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    zIndex: 9999,
    minWidth: 90,
  },
  fps: {
    fontSize: 14,
    fontWeight: '800',
    fontFamily: 'monospace',
  },
  stat: {
    fontSize: 10,
    color: '#aaa',
    fontFamily: 'monospace',
  },
});
