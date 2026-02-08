import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { loadFont } from '@remotion/google-fonts/Inter';
import GradientText from '../components/GradientText';
import ParticleField from '../components/ParticleField';

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

/**
 * Feature definition with a geometric shape descriptor instead of emojis.
 * shape: 'grid' | 'puzzle' | 'code' | 'bolt' | 'arrows' | 'terminal'
 */
type Feature = {
  label: string;
  shape: string;
  color: string;
};

const FEATURES: Feature[] = [
  { label: '35+ Presets', shape: 'grid', color: COLORS.primary },
  { label: 'Plugin System', shape: 'puzzle', color: COLORS.accent },
  { label: 'TypeScript', shape: 'code', color: '#00d2ff' },
  { label: '60 FPS', shape: 'bolt', color: COLORS.success },
  { label: 'RTL Support', shape: 'arrows', color: COLORS.secondary },
  { label: 'Expo & CLI', shape: 'terminal', color: '#b24dff' },
];

const STAGGER_FRAMES = 20;

/**
 * Renders a geometric icon shape using only divs and CSS borders.
 */
const GeometricIcon: React.FC<{ shape: string; color: string; size: number }> = ({
  shape,
  color,
  size,
}) => {
  const half = size / 2;
  const quarter = size / 4;

  switch (shape) {
    case 'grid':
      // 2x2 grid of small squares
      return (
        <div
          style={{
            width: size,
            height: size,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: '1fr 1fr',
            gap: 3,
          }}
        >
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                backgroundColor: color,
                borderRadius: 3,
                opacity: 0.9,
              }}
            />
          ))}
        </div>
      );

    case 'puzzle':
      // Interlocking L-shape
      return (
        <div style={{ width: size, height: size, position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: half + 2,
              height: size,
              backgroundColor: color,
              borderRadius: 4,
              opacity: 0.9,
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: half + 2,
              height: half + 2,
              backgroundColor: color,
              borderRadius: 4,
              opacity: 0.7,
            }}
          />
        </div>
      );

    case 'code':
      // Angle brackets < />
      return (
        <div
          style={{
            width: size,
            height: size,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
          }}
        >
          {/* Left bracket */}
          <div
            style={{
              width: 0,
              height: 0,
              borderTop: `${quarter}px solid transparent`,
              borderBottom: `${quarter}px solid transparent`,
              borderRight: `${quarter}px solid ${color}`,
            }}
          />
          {/* Slash */}
          <div
            style={{
              width: 3,
              height: size * 0.7,
              backgroundColor: color,
              transform: 'rotate(15deg)',
              borderRadius: 2,
              opacity: 0.7,
            }}
          />
          {/* Right bracket */}
          <div
            style={{
              width: 0,
              height: 0,
              borderTop: `${quarter}px solid transparent`,
              borderBottom: `${quarter}px solid transparent`,
              borderLeft: `${quarter}px solid ${color}`,
            }}
          />
        </div>
      );

    case 'bolt':
      // Lightning bolt shape using rotated rectangles
      return (
        <div style={{ width: size, height: size, position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: half - 4,
              width: 8,
              height: half + 4,
              backgroundColor: color,
              borderRadius: 2,
              transform: 'rotate(-15deg)',
              transformOrigin: 'bottom center',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: half - 4,
              width: 8,
              height: half + 4,
              backgroundColor: color,
              borderRadius: 2,
              transform: 'rotate(15deg)',
              transformOrigin: 'top center',
              opacity: 0.8,
            }}
          />
        </div>
      );

    case 'arrows':
      // Bidirectional arrows
      return (
        <div
          style={{
            width: size,
            height: size,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
          }}
        >
          {/* Left arrow */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div
              style={{
                width: 0,
                height: 0,
                borderTop: `${quarter * 0.7}px solid transparent`,
                borderBottom: `${quarter * 0.7}px solid transparent`,
                borderRight: `${quarter}px solid ${color}`,
              }}
            />
            <div
              style={{
                width: half,
                height: 3,
                backgroundColor: color,
                borderRadius: 1,
              }}
            />
          </div>
          {/* Right arrow */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div
              style={{
                width: half,
                height: 3,
                backgroundColor: color,
                borderRadius: 1,
                opacity: 0.8,
              }}
            />
            <div
              style={{
                width: 0,
                height: 0,
                borderTop: `${quarter * 0.7}px solid transparent`,
                borderBottom: `${quarter * 0.7}px solid transparent`,
                borderLeft: `${quarter}px solid ${color}`,
                opacity: 0.8,
              }}
            />
          </div>
        </div>
      );

    case 'terminal':
      // Terminal prompt: > _
      return (
        <div
          style={{
            width: size,
            height: size,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 3,
            paddingLeft: 3,
          }}
        >
          {/* Prompt chevron */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <div
              style={{
                width: 0,
                height: 0,
                borderTop: `${quarter * 0.6}px solid transparent`,
                borderBottom: `${quarter * 0.6}px solid transparent`,
                borderLeft: `${quarter * 0.8}px solid ${color}`,
              }}
            />
          </div>
          {/* Cursor underline */}
          <div
            style={{
              width: half,
              height: 3,
              backgroundColor: color,
              borderRadius: 1,
              opacity: 0.7,
              marginLeft: quarter,
            }}
          />
        </div>
      );

    default:
      // Fallback: circle
      return (
        <div
          style={{
            width: size,
            height: size,
            borderRadius: '50%',
            backgroundColor: color,
            opacity: 0.9,
          }}
        />
      );
  }
};

const Features: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title entrance
  const titleProgress = spring({
    frame,
    fps,
    config: {
      damping: 14,
      stiffness: 100,
      mass: 0.6,
    },
  });

  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const titleTranslateY = interpolate(titleProgress, [0, 1], [-30, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        fontFamily,
      }}
    >
      <ParticleField />

      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 80px',
          gap: 50,
        }}
      >
        {/* Title */}
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleTranslateY}px)`,
          }}
        >
          <GradientText
            gradient={`linear-gradient(135deg, ${COLORS.primary}, ${COLORS.accent})`}
            style={{
              fontSize: 52,
              fontWeight: 800,
              letterSpacing: -1,
            }}
          >
            Why Ultra Carousel?
          </GradientText>
        </div>

        {/* 2x3 grid of feature badges */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: 'repeat(2, 1fr)',
            gap: 28,
            width: '100%',
            maxWidth: 900,
          }}
        >
          {FEATURES.map((feature, index) => {
            const delay = 15 + index * STAGGER_FRAMES;
            const badgeSpring = spring({
              frame: Math.max(0, frame - delay),
              fps,
              config: {
                damping: 12,
                stiffness: 120,
                mass: 0.5,
              },
            });

            const badgeScale = interpolate(badgeSpring, [0, 1], [0.5, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });

            const badgeOpacity = interpolate(badgeSpring, [0, 1], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });

            return (
              <div
                key={index}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 16,
                  padding: '28px 20px',
                  borderRadius: 16,
                  backgroundColor: COLORS.surface,
                  border: `1px solid ${COLORS.surfaceLight}`,
                  transform: `scale(${badgeScale})`,
                  opacity: badgeOpacity,
                  boxShadow: `0 4px 20px rgba(0, 0, 0, 0.3), 0 0 20px ${feature.color}11`,
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    backgroundColor: `${feature.color}18`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <GeometricIcon
                    shape={feature.shape}
                    color={feature.color}
                    size={28}
                  />
                </div>

                {/* Label */}
                <span
                  style={{
                    fontFamily,
                    fontSize: 18,
                    fontWeight: 700,
                    color: COLORS.text,
                    letterSpacing: 0.3,
                    textAlign: 'center',
                  }}
                >
                  {feature.label}
                </span>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export default Features;
