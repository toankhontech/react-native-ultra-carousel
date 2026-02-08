import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { loadFont } from '@remotion/google-fonts/Inter';

const { fontFamily } = loadFont('normal', {
  weights: ['400', '700', '800'],
  subsets: ['latin'],
});

const COLORS = {
  text: '#ffffff',
  textDim: '#8888aa',
  primary: '#6c63ff',
  accent: '#00d2ff',
};

type PresetLabelProps = {
  name: string;
  progress: number;
};

const PresetLabel: React.FC<PresetLabelProps> = ({ name, progress }) => {
  // Entrance: first 15% of progress
  const entranceEnd = 0.15;
  // Exit: last 15% of progress
  const exitStart = 0.85;

  const entranceOpacity = interpolate(progress, [0, entranceEnd], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const entranceScale = interpolate(progress, [0, entranceEnd], [0.8, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const exitOpacity = interpolate(progress, [exitStart, 1], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const exitScale = interpolate(progress, [exitStart, 1], [1, 0.8], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Combined: use entrance values during entrance, exit values during exit
  const opacity = progress <= entranceEnd
    ? entranceOpacity
    : progress >= exitStart
      ? exitOpacity
      : 1;

  const scale = progress <= entranceEnd
    ? entranceScale
    : progress >= exitStart
      ? exitScale
      : 1;

  // Format preset name: "slide-fade" -> "Slide Fade"
  const displayName = name
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        transform: `scale(${scale})`,
        opacity,
      }}
    >
      <span
        style={{
          fontFamily,
          fontSize: 48,
          fontWeight: 700,
          color: COLORS.text,
          letterSpacing: -1,
          textShadow: '0 0 40px rgba(108, 99, 255, 0.4)',
        }}
      >
        {displayName}
      </span>
      <div
        style={{
          width: 60,
          height: 3,
          borderRadius: 2,
          background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.accent})`,
          opacity: 0.7,
        }}
      />
    </div>
  );
};

export default PresetLabel;
