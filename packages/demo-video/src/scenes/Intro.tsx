import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { loadFont } from '@remotion/google-fonts/Inter';
import ParticleField from '../components/ParticleField';
import GradientText from '../components/GradientText';

const { fontFamily } = loadFont('normal', {
  weights: ['400', '700', '800'],
  subsets: ['latin'],
});

const COLORS = {
  bg: '#0a0a0f',
  surface: '#16162a',
  surfaceLight: '#1e1e3a',
  primary: '#6c63ff',
  secondary: '#ff6584',
  accent: '#00d2ff',
  text: '#ffffff',
  textDim: '#8888aa',
  textMuted: '#555577',
  success: '#00e676',
};

const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // --- Animated grid lines ---
  const gridOpacity = interpolate(frame, [0, 30], [0, 0.06], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const gridOffset = interpolate(frame, [0, 90], [0, 20], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // --- Title spring animation (scale 0 -> 1 with bounce) ---
  const titleScale = spring({
    frame,
    fps,
    config: {
      damping: 12,
      stiffness: 100,
      mass: 0.8,
    },
  });

  const titleOpacity = interpolate(titleScale, [0, 0.5], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // --- Subtitle fades in after 20 frames ---
  const subtitleOpacity = interpolate(frame, [20, 40], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const subtitleTranslateY = interpolate(frame, [20, 40], [15, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // --- Badge slides up from bottom after 40 frames ---
  const badgeProgress = spring({
    frame: Math.max(0, frame - 40),
    fps,
    config: {
      damping: 14,
      stiffness: 120,
      mass: 0.6,
    },
  });

  const badgeTranslateY = interpolate(badgeProgress, [0, 1], [60, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const badgeOpacity = interpolate(badgeProgress, [0, 1], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // --- Glow effect behind title ---
  const glowScale = interpolate(frame, [0, 30], [0.5, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const glowPulse = Math.sin(frame * 0.08) * 0.15 + 0.85;

  // Grid line count
  const gridSpacing = 60;
  const verticalLines = Math.ceil(width / gridSpacing) + 1;
  const horizontalLines = Math.ceil(height / gridSpacing) + 1;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        fontFamily,
      }}
    >
      {/* Animated grid background */}
      <AbsoluteFill style={{ opacity: gridOpacity }}>
        {/* Vertical lines */}
        {Array.from({ length: verticalLines }).map((_, i) => (
          <div
            key={`v-${i}`}
            style={{
              position: 'absolute',
              left: i * gridSpacing + gridOffset,
              top: 0,
              width: 1,
              height: '100%',
              backgroundColor: COLORS.primary,
            }}
          />
        ))}
        {/* Horizontal lines */}
        {Array.from({ length: horizontalLines }).map((_, i) => (
          <div
            key={`h-${i}`}
            style={{
              position: 'absolute',
              top: i * gridSpacing + gridOffset,
              left: 0,
              height: 1,
              width: '100%',
              backgroundColor: COLORS.primary,
            }}
          />
        ))}
      </AbsoluteFill>

      {/* Particle field */}
      <ParticleField />

      {/* Glow effect behind title */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 500,
          height: 300,
          transform: `translate(-50%, -60%) scale(${glowScale})`,
          background: `radial-gradient(ellipse, ${COLORS.primary}30 0%, transparent 70%)`,
          opacity: glowPulse,
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />

      {/* Main content - centered */}
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 24,
        }}
      >
        {/* Title */}
        <div
          style={{
            transform: `scale(${titleScale})`,
            opacity: titleOpacity,
          }}
        >
          <GradientText
            gradient={`linear-gradient(135deg, ${COLORS.primary}, ${COLORS.accent})`}
            style={{
              fontSize: 82,
              fontWeight: 800,
              letterSpacing: -2,
              lineHeight: 1,
            }}
          >
            Ultra Carousel
          </GradientText>
        </div>

        {/* Subtitle */}
        <div
          style={{
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleTranslateY}px)`,
          }}
        >
          <span
            style={{
              fontSize: 24,
              fontWeight: 400,
              color: COLORS.textDim,
              letterSpacing: 0.5,
            }}
          >
            The Ultimate Carousel Ecosystem for React Native
          </span>
        </div>

        {/* Badge */}
        <div
          style={{
            marginTop: 16,
            transform: `translateY(${badgeTranslateY}px)`,
            opacity: badgeOpacity,
          }}
        >
          <div
            style={{
              background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.accent})`,
              padding: '12px 32px',
              borderRadius: 30,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              boxShadow: `0 4px 24px ${COLORS.primary}44`,
            }}
          >
            {/* Decorative diamond shape */}
            <div
              style={{
                width: 10,
                height: 10,
                backgroundColor: COLORS.text,
                transform: 'rotate(45deg)',
                opacity: 0.9,
              }}
            />
            <span
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: COLORS.text,
                letterSpacing: 1,
              }}
            >
              35+ Animation Presets
            </span>
            <div
              style={{
                width: 10,
                height: 10,
                backgroundColor: COLORS.text,
                transform: 'rotate(45deg)',
                opacity: 0.9,
              }}
            />
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export default Intro;
