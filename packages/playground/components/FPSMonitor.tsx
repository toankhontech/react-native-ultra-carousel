/**
 * @file FPS Monitor component
 * @description Overlay showing current FPS during animation
 */

import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface FPSMonitorProps {
  visible?: boolean;
}

export const FPSMonitor: React.FC<FPSMonitorProps> = ({ visible = true }) => {
  const [fps, setFps] = useState(60);
  const frameCount = useRef(0);
  const lastTime = useRef(Date.now());

  useEffect(() => {
    if (!visible) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const elapsed = now - lastTime.current;
      const currentFps = Math.round((frameCount.current / elapsed) * 1000);
      setFps(Math.min(60, currentFps));
      frameCount.current = 0;
      lastTime.current = now;
    }, 1000);

    const tick = () => {
      frameCount.current++;
      if (visible) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    return () => clearInterval(interval);
  }, [visible]);

  if (!visible) return null;

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: fps >= 55 ? '#27ae60' : fps >= 30 ? '#f39c12' : '#e74c3c' }]}>
        {fps} FPS
      </Text>
    </View>
  );
};

FPSMonitor.displayName = 'FPSMonitor';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    zIndex: 999,
  },
  text: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'monospace',
  },
});
