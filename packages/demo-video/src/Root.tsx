import React from 'react';
import {
  AbsoluteFill,
  Composition,
  Still,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
  Sequence,
} from 'remotion';
import {
  TransitionSeries,
  linearTiming,
} from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { slide } from '@remotion/transitions/slide';
import { loadFont as loadInter } from '@remotion/google-fonts/Inter';
import { loadFont as loadJetBrains } from '@remotion/google-fonts/JetBrainsMono';
import { COLORS, GRADIENTS, CARD_COLORS, PRESETS } from './theme';

// ---------------------------------------------------------------------------
// Fonts
// ---------------------------------------------------------------------------
const { fontFamily: interFont } = loadInter('normal', {
  weights: ['400', '600', '700', '800'],
  subsets: ['latin'],
});
const { fontFamily: jetbrainsFont } = loadJetBrains('normal', {
  weights: ['400', '700'],
  subsets: ['latin'],
});

export { interFont, jetbrainsFont };

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const FPS = 30;
const WIDTH = 1920;
const HEIGHT = 1080;
const TOTAL_FRAMES = 1800; // 60s

// Scene durations in frames
const TRANSITION_FRAMES = 15;
const INTRO_FRAMES = 105;       // 3.5s
const BASIC_FRAMES = 480;       // 16s
const ADVANCED_FRAMES = 480;    // 16s
const CREATIVE_FRAMES = 420;    // 14s
const FEATURES_FRAMES = 195;    // 6.5s
const OUTRO_FRAMES = 195;       // 6.5s
// Total scene frames: 105+480+480+420+195+195 = 1875
// Subtract 5 transitions overlapping: 5*15 = 75
// Net: 1875 - 75 = 1800 frames = 60s

// ---------------------------------------------------------------------------
// ParticleField - animated background particles
// ---------------------------------------------------------------------------
interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  hue: number;
}

const PARTICLES: Particle[] = Array.from({ length: 60 }, (_, i) => ({
  x: ((i * 137.508) % 100),
  y: ((i * 97.31) % 100),
  size: 1.5 + (i % 5) * 0.8,
  speed: 0.15 + (i % 7) * 0.08,
  opacity: 0.15 + (i % 4) * 0.1,
  hue: (i * 23) % 360,
}));

const ParticleField: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const time = frame / fps;

  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      {PARTICLES.map((p, i) => {
        const y = (p.y + time * p.speed * 10) % 110 - 5;
        const x = p.x + Math.sin(time * 0.5 + i) * 2;
        const pulse = 0.5 + 0.5 * Math.sin(time * 2 + i * 0.7);
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${x}%`,
              top: `${y}%`,
              width: p.size * (1 + pulse * 0.3),
              height: p.size * (1 + pulse * 0.3),
              borderRadius: '50%',
              background: `hsla(${p.hue}, 80%, 65%, ${p.opacity * (0.7 + pulse * 0.3)})`,
              boxShadow: `0 0 ${4 + pulse * 6}px hsla(${p.hue}, 80%, 65%, ${p.opacity * 0.5})`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// GlowOrb - decorative floating orb
// ---------------------------------------------------------------------------
const GlowOrb: React.FC<{
  color: string;
  size: number;
  x: number;
  y: number;
  delay?: number;
}> = ({ color, size, x, y, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const time = frame / fps;
  const floatY = Math.sin(time * 0.8 + delay) * 20;
  const floatX = Math.cos(time * 0.6 + delay) * 15;
  const pulse = 0.7 + 0.3 * Math.sin(time * 1.2 + delay);

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y + floatY,
        transform: `translateX(${floatX}px)`,
        width: size,
        height: size,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color}44, ${color}11, transparent)`,
        filter: `blur(${size * 0.25}px)`,
        opacity: pulse,
      }}
    />
  );
};

// ---------------------------------------------------------------------------
// AnimatedText - text that fades/slides in
// ---------------------------------------------------------------------------
const AnimatedText: React.FC<{
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  style?: React.CSSProperties;
}> = ({ children, delay = 0, direction = 'up', style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 20, stiffness: 100, mass: 0.8 },
  });

  const opacity = interpolate(progress, [0, 1], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const offsets = {
    up: { x: 0, y: 40 },
    down: { x: 0, y: -40 },
    left: { x: 60, y: 0 },
    right: { x: -60, y: 0 },
  };

  const translateX = interpolate(progress, [0, 1], [offsets[direction].x, 0], {
    extrapolateRight: 'clamp',
  });
  const translateY = interpolate(progress, [0, 1], [offsets[direction].y, 0], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        opacity,
        transform: `translate(${translateX}px, ${translateY}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// ---------------------------------------------------------------------------
// PhoneMockup - renders a phone bezel with content
// ---------------------------------------------------------------------------
const PhoneMockup: React.FC<{
  children: React.ReactNode;
  scale?: number;
  style?: React.CSSProperties;
}> = ({ children, scale = 1, style }) => {
  return (
    <div
      style={{
        width: 280 * scale,
        height: 560 * scale,
        borderRadius: 36 * scale,
        background: '#1a1a2e',
        border: `2px solid ${COLORS.surfaceLight}`,
        boxShadow: `0 0 60px rgba(108, 99, 255, 0.15), 0 20px 60px rgba(0, 0, 0, 0.5)`,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
    >
      {/* Status bar */}
      <div
        style={{
          height: 36 * scale,
          background: '#0d0d1a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <div
          style={{
            width: 80 * scale,
            height: 20 * scale,
            borderRadius: 10 * scale,
            background: '#000',
            position: 'absolute',
          }}
        />
      </div>
      {/* Screen content */}
      <div
        style={{
          flex: 1,
          overflow: 'hidden',
          position: 'relative',
          background: COLORS.bg,
        }}
      >
        {children}
      </div>
      {/* Home indicator */}
      <div
        style={{
          height: 24 * scale,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0d0d1a',
        }}
      >
        <div
          style={{
            width: 100 * scale,
            height: 4 * scale,
            borderRadius: 2 * scale,
            background: COLORS.textMuted,
          }}
        />
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// CarouselCard - a single card in the simulated carousel
// ---------------------------------------------------------------------------
const CarouselCard: React.FC<{
  index: number;
  color: string;
  scale?: number;
  label?: string;
}> = ({ index, color, scale = 1, label }) => {
  return (
    <div
      style={{
        width: 220 * scale,
        height: 320 * scale,
        borderRadius: 20 * scale,
        background: `linear-gradient(145deg, ${color}dd, ${color}88)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: `0 8px 32px ${color}44`,
        border: `1px solid ${color}66`,
        gap: 12 * scale,
      }}
    >
      <div
        style={{
          width: 60 * scale,
          height: 60 * scale,
          borderRadius: 16 * scale,
          background: 'rgba(255,255,255,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 28 * scale,
        }}
      >
        {['♠', '♥', '♦', '♣', '★'][index % 5]}
      </div>
      <div
        style={{
          color: '#fff',
          fontFamily: interFont,
          fontWeight: 700,
          fontSize: 16 * scale,
          textShadow: '0 2px 8px rgba(0,0,0,0.3)',
        }}
      >
        {label || `Card ${index + 1}`}
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// SimulatedCarousel - animates cards to simulate a preset effect
// ---------------------------------------------------------------------------
const SimulatedCarousel: React.FC<{
  preset: string;
  frame: number;
  fps: number;
  phoneScale?: number;
}> = ({ preset, frame, fps, phoneScale = 1 }) => {
  const time = frame / fps;
  // Cycle through cards every 1.2 seconds
  const cycleProgress = (time % 1.2) / 1.2;
  const activeIndex = Math.floor(time / 1.2) % 5;

  const cards = Array.from({ length: 5 }, (_, i) => {
    const offset = i - activeIndex;
    const wrappedOffset =
      offset > 2 ? offset - 5 : offset < -2 ? offset + 5 : offset;

    // Base transform values
    let translateX = wrappedOffset * 240 * phoneScale;
    let translateY = 0;
    let scale = 1;
    let rotate = 0;
    let rotateY = 0;
    let opacity = 1;
    let zIndex = 5 - Math.abs(wrappedOffset);

    // Slide animation from cycleProgress
    const slideAmount = cycleProgress * 240 * phoneScale;

    switch (preset) {
      case 'slide':
        translateX = (wrappedOffset * 240 + slideAmount * 0) * phoneScale;
        translateX = wrappedOffset * 240 * phoneScale;
        scale = wrappedOffset === 0 ? 1 : 0.85;
        opacity = wrappedOffset === 0 ? 1 : 0.5;
        break;
      case 'fade':
        translateX = 0;
        opacity = wrappedOffset === 0 ? 1 : 0;
        scale = wrappedOffset === 0 ? 1 : 0.9;
        break;
      case 'slide-fade':
        translateX = wrappedOffset * 200 * phoneScale;
        opacity = wrappedOffset === 0 ? 1 : 0.3;
        scale = wrappedOffset === 0 ? 1 : 0.9;
        break;
      case 'scale':
        translateX = 0;
        scale = wrappedOffset === 0 ? 1 : 0.5;
        opacity = wrappedOffset === 0 ? 1 : 0;
        break;
      case 'scale-fade':
        translateX = 0;
        scale = 1 - Math.abs(wrappedOffset) * 0.2;
        opacity = 1 - Math.abs(wrappedOffset) * 0.4;
        break;
      case 'vertical':
        translateX = 0;
        translateY = wrappedOffset * 180 * phoneScale;
        scale = wrappedOffset === 0 ? 1 : 0.9;
        break;
      case 'vertical-fade':
        translateX = 0;
        translateY = wrappedOffset * 160 * phoneScale;
        opacity = 1 - Math.abs(wrappedOffset) * 0.4;
        break;
      case 'parallax':
        translateX = wrappedOffset * 260 * phoneScale;
        scale = wrappedOffset === 0 ? 1 : 0.85;
        break;
      case 'overlap':
        translateX = wrappedOffset * 60 * phoneScale;
        zIndex = 10 - Math.abs(wrappedOffset);
        scale = 1 - Math.abs(wrappedOffset) * 0.05;
        break;
      case 'peek':
        translateX = wrappedOffset * 200 * phoneScale;
        scale = wrappedOffset === 0 ? 1 : 0.8;
        opacity = wrappedOffset === 0 ? 1 : 0.6;
        break;
      case 'stack':
        translateX = wrappedOffset * 8 * phoneScale;
        translateY = Math.abs(wrappedOffset) * -8 * phoneScale;
        zIndex = 10 - Math.abs(wrappedOffset);
        scale = 1 - Math.abs(wrappedOffset) * 0.04;
        opacity = 1 - Math.abs(wrappedOffset) * 0.15;
        break;
      case 'tinder':
        rotate = wrappedOffset * 8;
        translateX = wrappedOffset * 30 * phoneScale;
        translateY = Math.abs(wrappedOffset) * 10 * phoneScale;
        zIndex = 10 - Math.abs(wrappedOffset);
        scale = 1 - Math.abs(wrappedOffset) * 0.03;
        break;
      case 'coverflow':
        translateX = wrappedOffset * 170 * phoneScale;
        rotateY = wrappedOffset * -35;
        scale = wrappedOffset === 0 ? 1 : 0.8;
        zIndex = 10 - Math.abs(wrappedOffset);
        break;
      case 'cube':
        rotateY = wrappedOffset * -90;
        translateX = wrappedOffset * 140 * phoneScale;
        opacity = Math.abs(wrappedOffset) > 1 ? 0 : 1;
        break;
      case 'flip':
        rotateY = wrappedOffset * 180;
        translateX = 0;
        opacity = Math.abs(wrappedOffset) > 0 ? 0 : 1;
        break;
      case 'wheel':
        rotate = wrappedOffset * 30;
        translateX = wrappedOffset * 180 * phoneScale;
        translateY = Math.abs(wrappedOffset) * 40 * phoneScale;
        break;
      case 'accordion':
        translateX = wrappedOffset * 120 * phoneScale;
        scale = wrappedOffset === 0 ? 1 : 0.6;
        opacity = 1 - Math.abs(wrappedOffset) * 0.3;
        break;
      case 'zoom':
        translateX = 0;
        scale = wrappedOffset === 0 ? 1 : 0.3;
        opacity = wrappedOffset === 0 ? 1 : 0;
        break;
      case 'rotate':
        translateX = wrappedOffset * 200 * phoneScale;
        rotate = wrappedOffset * 15;
        break;
      case 'depth':
        translateX = wrappedOffset * 80 * phoneScale;
        scale = 1 - Math.abs(wrappedOffset) * 0.15;
        zIndex = 10 - Math.abs(wrappedOffset);
        opacity = 1 - Math.abs(wrappedOffset) * 0.25;
        break;
      case 'newspaper':
        rotate = wrappedOffset === 0 ? 0 : wrappedOffset * 180;
        scale = wrappedOffset === 0 ? 1 : 0;
        translateX = 0;
        break;
      case 'origami':
        rotateY = wrappedOffset * -45;
        translateX = wrappedOffset * 150 * phoneScale;
        scale = 1 - Math.abs(wrappedOffset) * 0.1;
        break;
      case 'carousel-3d':
        rotate = wrappedOffset * 20;
        translateX = wrappedOffset * 160 * phoneScale;
        translateY = Math.abs(wrappedOffset) * 30 * phoneScale;
        scale = 1 - Math.abs(wrappedOffset) * 0.12;
        break;
      case 'wave':
        translateX = wrappedOffset * 200 * phoneScale;
        translateY = Math.sin(wrappedOffset * Math.PI * 0.5) * 60 * phoneScale;
        rotate = wrappedOffset * 5;
        break;
      case 'spiral':
        rotate = wrappedOffset * 45;
        translateX = wrappedOffset * 100 * phoneScale;
        scale = 1 - Math.abs(wrappedOffset) * 0.15;
        break;
      case 'glitch':
        translateX = wrappedOffset * 220 * phoneScale;
        translateY = (Math.random() > 0.7 ? (Math.random() - 0.5) * 10 : 0) * phoneScale;
        scale = wrappedOffset === 0 ? 1 : 0.9;
        break;
      case 'morph':
        translateX = 0;
        scale = wrappedOffset === 0 ? 1 : 0.7;
        opacity = wrappedOffset === 0 ? 1 : 0;
        break;
      case 'shutter':
        translateX = wrappedOffset * 240 * phoneScale;
        scale = wrappedOffset === 0 ? 1 : 0.85;
        opacity = Math.abs(wrappedOffset) > 1 ? 0 : 1;
        break;
      case 'domino':
        translateX = wrappedOffset * 180 * phoneScale;
        rotate = wrappedOffset * 25;
        scale = 1 - Math.abs(wrappedOffset) * 0.08;
        break;
      case 'elastic':
        translateX = wrappedOffset * 220 * phoneScale;
        scale = wrappedOffset === 0 ? 1 + Math.sin(time * 8) * 0.03 : 0.85;
        break;
      case 'blur-slide':
        translateX = wrappedOffset * 230 * phoneScale;
        opacity = wrappedOffset === 0 ? 1 : 0.4;
        scale = wrappedOffset === 0 ? 1 : 0.9;
        break;
      case 'windmill':
        rotate = wrappedOffset * 60;
        translateX = wrappedOffset * 100 * phoneScale;
        scale = 1 - Math.abs(wrappedOffset) * 0.2;
        break;
      case 'film-strip':
        translateX = wrappedOffset * 240 * phoneScale;
        translateY = 0;
        scale = 1;
        opacity = Math.abs(wrappedOffset) > 2 ? 0 : 1;
        break;
      case 'helix':
        translateX = wrappedOffset * 160 * phoneScale;
        translateY = Math.sin(wrappedOffset * Math.PI * 0.3) * 50 * phoneScale;
        rotate = wrappedOffset * 15;
        scale = 1 - Math.abs(wrappedOffset) * 0.1;
        break;
      case 'gravity':
        translateX = wrappedOffset * 200 * phoneScale;
        translateY = Math.abs(wrappedOffset) * 80 * phoneScale;
        scale = 1 - Math.abs(wrappedOffset) * 0.1;
        break;
      default:
        translateX = wrappedOffset * 240 * phoneScale;
        break;
    }

    return (
      <div
        key={i}
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: `translate(-50%, -50%) translate(${translateX}px, ${translateY}px) scale(${scale}) rotate(${rotate}deg) perspective(800px) rotateY(${rotateY}deg)`,
          opacity,
          zIndex,
          transition: 'none',
        }}
      >
        <CarouselCard
          index={i}
          color={CARD_COLORS[i % CARD_COLORS.length]}
          scale={phoneScale * 0.55}
        />
      </div>
    );
  });

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {cards}
    </div>
  );
};

// ---------------------------------------------------------------------------
// PresetLabel - animated label below the phone
// ---------------------------------------------------------------------------
const PresetLabel: React.FC<{ name: string; frame: number; fps: number }> = ({
  name,
  frame,
  fps,
}) => {
  const enterProgress = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 120, mass: 0.6 },
  });

  const opacity = interpolate(enterProgress, [0, 1], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const translateY = interpolate(enterProgress, [0, 1], [20, 0], {
    extrapolateRight: 'clamp',
  });
  const scaleVal = interpolate(enterProgress, [0, 1], [0.8, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px) scale(${scaleVal})`,
        background: 'rgba(108, 99, 255, 0.15)',
        border: `1px solid ${COLORS.primary}55`,
        borderRadius: 12,
        padding: '8px 24px',
        fontFamily: jetbrainsFont,
        fontWeight: 700,
        fontSize: 22,
        color: COLORS.accent,
        letterSpacing: 0.5,
        textAlign: 'center' as const,
        backdropFilter: 'blur(8px)',
      }}
    >
      {name}
    </div>
  );
};

// ---------------------------------------------------------------------------
// IntroScene
// ---------------------------------------------------------------------------
const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo glow pulse
  const glowPulse = interpolate(
    Math.sin((frame / fps) * 2),
    [-1, 1],
    [0.4, 1],
  );

  // Title animation
  const titleProgress = spring({
    frame: frame - 10,
    fps,
    config: { damping: 15, stiffness: 80, mass: 1 },
  });

  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const titleY = interpolate(titleProgress, [0, 1], [60, 0], {
    extrapolateRight: 'clamp',
  });

  // Subtitle animation
  const subtitleProgress = spring({
    frame: frame - 25,
    fps,
    config: { damping: 18, stiffness: 90, mass: 0.8 },
  });
  const subtitleOpacity = interpolate(subtitleProgress, [0, 1], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const subtitleY = interpolate(subtitleProgress, [0, 1], [30, 0], {
    extrapolateRight: 'clamp',
  });

  // Badge animation
  const badgeProgress = spring({
    frame: frame - 40,
    fps,
    config: { damping: 12, stiffness: 100, mass: 0.6 },
  });
  const badgeOpacity = interpolate(badgeProgress, [0, 1], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const badgeScale = interpolate(badgeProgress, [0, 1], [0.5, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Decorative orbs */}
      <GlowOrb color={COLORS.primary} size={400} x={200} y={100} delay={0} />
      <GlowOrb color={COLORS.accent} size={300} x={1400} y={600} delay={2} />
      <GlowOrb color={COLORS.secondary} size={250} x={800} y={200} delay={4} />

      {/* Radial gradient backdrop */}
      <div
        style={{
          position: 'absolute',
          width: 800,
          height: 800,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${COLORS.primary}18, transparent 70%)`,
          filter: `blur(40px)`,
          opacity: glowPulse,
        }}
      />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 24,
          zIndex: 1,
        }}
      >
        {/* Logo / Icon */}
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            width: 100,
            height: 100,
            borderRadius: 28,
            background: GRADIENTS.primary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 0 ${40 * glowPulse}px ${COLORS.primary}88`,
            marginBottom: 8,
          }}
        >
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
            <rect x="8" y="16" width="14" height="24" rx="4" fill="white" opacity="0.6" />
            <rect x="21" y="10" width="14" height="36" rx="4" fill="white" />
            <rect x="34" y="16" width="14" height="24" rx="4" fill="white" opacity="0.6" />
          </svg>
        </div>

        {/* Title */}
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            fontFamily: interFont,
            fontWeight: 800,
            fontSize: 72,
            color: COLORS.text,
            letterSpacing: -2,
            lineHeight: 1.1,
            textAlign: 'center' as const,
          }}
        >
          Ultra Carousel
        </div>

        {/* Subtitle */}
        <div
          style={{
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleY}px)`,
            fontFamily: interFont,
            fontWeight: 400,
            fontSize: 28,
            color: COLORS.textDim,
            textAlign: 'center' as const,
            maxWidth: 700,
            lineHeight: 1.5,
          }}
        >
          35+ stunning animation presets for React Native
        </div>

        {/* Badge */}
        <div
          style={{
            opacity: badgeOpacity,
            transform: `scale(${badgeScale})`,
            display: 'flex',
            gap: 16,
            marginTop: 16,
          }}
        >
          {['React Native', 'Expo', 'Reanimated'].map((label) => (
            <div
              key={label}
              style={{
                background: COLORS.surface,
                border: `1px solid ${COLORS.surfaceLight}`,
                borderRadius: 24,
                padding: '10px 24px',
                fontFamily: interFont,
                fontWeight: 600,
                fontSize: 16,
                color: COLORS.accent,
                letterSpacing: 0.5,
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// PresetShowcase - shows presets one by one in a grid or sequence
// ---------------------------------------------------------------------------
const PresetShowcase: React.FC<{
  presets: string[];
  category: string;
  categoryColor: string;
  gradient: string;
}> = ({ presets, category, categoryColor, gradient }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Time per preset = total scene frames / number of presets
  // We split the scene: first ~45 frames for section title, then presets
  const titleFrames = 45;
  const presetFrame = frame - titleFrames;
  const framesPerPreset = Math.floor(
    (useVideoConfig().durationInFrames - titleFrames) / presets.length,
  );
  const currentPresetIndex = Math.min(
    Math.max(0, Math.floor(presetFrame / framesPerPreset)),
    presets.length - 1,
  );
  const frameInPreset = Math.max(0, presetFrame - currentPresetIndex * framesPerPreset);

  // Section title animation
  const titleEnter = spring({
    frame: frame,
    fps,
    config: { damping: 14, stiffness: 90, mass: 0.8 },
  });
  const titleOpacity = interpolate(titleEnter, [0, 1], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const titleScale = interpolate(titleEnter, [0, 1], [0.8, 1], {
    extrapolateRight: 'clamp',
  });

  // Title fade out after initial display
  const titleFadeOut = interpolate(frame, [35, 50], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Progress bar
  const overallProgress =
    presets.length > 0
      ? Math.min(
          1,
          (currentPresetIndex + frameInPreset / framesPerPreset) / presets.length,
        )
      : 0;

  // Counter text
  const counterText = `${Math.min(currentPresetIndex + 1, presets.length)} / ${presets.length}`;

  return (
    <AbsoluteFill style={{ background: COLORS.bg }}>
      {/* Decorative orbs */}
      <GlowOrb color={categoryColor} size={500} x={-100} y={200} delay={0} />
      <GlowOrb color={categoryColor} size={350} x={1500} y={500} delay={3} />

      {/* Section title overlay */}
      {frame < 50 && (
        <AbsoluteFill
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 20,
            opacity: titleFadeOut,
          }}
        >
          <div
            style={{
              opacity: titleOpacity,
              transform: `scale(${titleScale})`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <div
              style={{
                fontFamily: interFont,
                fontWeight: 800,
                fontSize: 56,
                backgroundImage: gradient,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: -1,
              }}
            >
              {category}
            </div>
            <div
              style={{
                fontFamily: interFont,
                fontWeight: 400,
                fontSize: 24,
                color: COLORS.textDim,
              }}
            >
              {presets.length} presets
            </div>
          </div>
        </AbsoluteFill>
      )}

      {/* Main content area */}
      {presetFrame >= 0 && (
        <AbsoluteFill
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 60,
          }}
        >
          {/* Top bar: category + counter */}
          <div
            style={{
              position: 'absolute',
              top: 40,
              left: 80,
              right: 80,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                fontFamily: interFont,
                fontWeight: 700,
                fontSize: 20,
                color: categoryColor,
                textTransform: 'uppercase' as const,
                letterSpacing: 3,
              }}
            >
              {category}
            </div>
            <div
              style={{
                fontFamily: jetbrainsFont,
                fontWeight: 400,
                fontSize: 18,
                color: COLORS.textDim,
              }}
            >
              {counterText}
            </div>
          </div>

          {/* Progress bar */}
          <div
            style={{
              position: 'absolute',
              top: 80,
              left: 80,
              right: 80,
              height: 3,
              background: COLORS.surfaceLight,
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${overallProgress * 100}%`,
                height: '100%',
                background: gradient,
                borderRadius: 2,
              }}
            />
          </div>

          {/* Phone mockup with carousel */}
          <PhoneMockup scale={1.1}>
            <SimulatedCarousel
              preset={presets[currentPresetIndex]}
              frame={frameInPreset}
              fps={fps}
              phoneScale={1.1}
            />
          </PhoneMockup>

          {/* Preset name label */}
          <div style={{ marginTop: 36 }}>
            <PresetLabel
              name={presets[currentPresetIndex]}
              frame={frameInPreset}
              fps={fps}
            />
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// FeaturesScene
// ---------------------------------------------------------------------------
interface Feature {
  icon: string;
  title: string;
  desc: string;
  color: string;
}

const FEATURES_LIST: Feature[] = [
  { icon: '60', title: '60 FPS', desc: 'Silky-smooth native animations', color: COLORS.success },
  { icon: 'TS', title: 'TypeScript', desc: 'Full type safety & IntelliSense', color: COLORS.accent },
  { icon: 'RN', title: 'Reanimated', desc: 'Powered by worklet threads', color: COLORS.primary },
  { icon: '35+', title: 'Presets', desc: 'Ready-to-use animations', color: COLORS.secondary },
  { icon: 'API', title: 'Simple API', desc: 'One prop to change preset', color: '#ffd740' },
  { icon: 'KB', title: 'Tiny Size', desc: 'Under 15KB gzipped', color: '#64ffda' },
];

const FeaturesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title
  const titleProgress = spring({
    frame: frame - 5,
    fps,
    config: { damping: 15, stiffness: 80, mass: 1 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const titleY = interpolate(titleProgress, [0, 1], [40, 0], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bg,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 80,
      }}
    >
      <GlowOrb color={COLORS.primary} size={400} x={100} y={300} delay={1} />
      <GlowOrb color={COLORS.accent} size={300} x={1400} y={200} delay={3} />

      {/* Title */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          fontFamily: interFont,
          fontWeight: 800,
          fontSize: 52,
          color: COLORS.text,
          letterSpacing: -1,
          marginBottom: 60,
          textAlign: 'center' as const,
        }}
      >
        Why Ultra Carousel?
      </div>

      {/* Feature grid */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap' as const,
          justifyContent: 'center',
          gap: 24,
          maxWidth: 1200,
        }}
      >
        {FEATURES_LIST.map((feature, i) => {
          const delay = 15 + i * 8;
          const cardProgress = spring({
            frame: frame - delay,
            fps,
            config: { damping: 16, stiffness: 100, mass: 0.7 },
          });
          const cardOpacity = interpolate(cardProgress, [0, 1], [0, 1], {
            extrapolateRight: 'clamp',
          });
          const cardY = interpolate(cardProgress, [0, 1], [30, 0], {
            extrapolateRight: 'clamp',
          });
          const cardScale = interpolate(cardProgress, [0, 1], [0.9, 1], {
            extrapolateRight: 'clamp',
          });

          return (
            <div
              key={feature.title}
              style={{
                opacity: cardOpacity,
                transform: `translateY(${cardY}px) scale(${cardScale})`,
                background: COLORS.surface,
                border: `1px solid ${COLORS.surfaceLight}`,
                borderRadius: 20,
                padding: '32px 36px',
                width: 340,
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              {/* Icon badge */}
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 16,
                  background: `${feature.color}18`,
                  border: `1px solid ${feature.color}33`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: jetbrainsFont,
                  fontWeight: 700,
                  fontSize: 18,
                  color: feature.color,
                }}
              >
                {feature.icon}
              </div>
              <div
                style={{
                  fontFamily: interFont,
                  fontWeight: 700,
                  fontSize: 22,
                  color: COLORS.text,
                }}
              >
                {feature.title}
              </div>
              <div
                style={{
                  fontFamily: interFont,
                  fontWeight: 400,
                  fontSize: 16,
                  color: COLORS.textDim,
                  lineHeight: 1.5,
                }}
              >
                {feature.desc}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// OutroScene
// ---------------------------------------------------------------------------
const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Stagger animations
  const titleProgress = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14, stiffness: 80, mass: 1 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const titleY = interpolate(titleProgress, [0, 1], [50, 0], {
    extrapolateRight: 'clamp',
  });

  const installProgress = spring({
    frame: frame - 30,
    fps,
    config: { damping: 16, stiffness: 100, mass: 0.7 },
  });
  const installOpacity = interpolate(installProgress, [0, 1], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const installScale = interpolate(installProgress, [0, 1], [0.9, 1], {
    extrapolateRight: 'clamp',
  });

  const linksProgress = spring({
    frame: frame - 50,
    fps,
    config: { damping: 18, stiffness: 90, mass: 0.8 },
  });
  const linksOpacity = interpolate(linksProgress, [0, 1], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const linksY = interpolate(linksProgress, [0, 1], [30, 0], {
    extrapolateRight: 'clamp',
  });

  // CTA pulse
  const glowPulse = interpolate(
    Math.sin((frame / fps) * 3),
    [-1, 1],
    [0.6, 1],
  );

  // Final fade out at end
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 20, durationInFrames],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: fadeOut,
      }}
    >
      <GlowOrb color={COLORS.primary} size={500} x={300} y={150} delay={0} />
      <GlowOrb color={COLORS.accent} size={400} x={1200} y={500} delay={2} />
      <GlowOrb color={COLORS.secondary} size={300} x={700} y={100} delay={4} />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 32,
          zIndex: 1,
        }}
      >
        {/* Title */}
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            fontFamily: interFont,
            fontWeight: 800,
            fontSize: 60,
            color: COLORS.text,
            letterSpacing: -2,
            textAlign: 'center' as const,
          }}
        >
          Get Started Today
        </div>

        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            fontFamily: interFont,
            fontWeight: 400,
            fontSize: 24,
            color: COLORS.textDim,
            textAlign: 'center' as const,
            maxWidth: 600,
            lineHeight: 1.6,
          }}
        >
          Add beautiful carousel animations to your React Native app in minutes
        </div>

        {/* Install command */}
        <div
          style={{
            opacity: installOpacity,
            transform: `scale(${installScale})`,
            background: COLORS.surface,
            border: `1px solid ${COLORS.surfaceLight}`,
            borderRadius: 16,
            padding: '20px 48px',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginTop: 8,
          }}
        >
          <div
            style={{
              fontFamily: jetbrainsFont,
              fontWeight: 400,
              fontSize: 14,
              color: COLORS.textMuted,
            }}
          >
            $
          </div>
          <div
            style={{
              fontFamily: jetbrainsFont,
              fontWeight: 700,
              fontSize: 22,
              color: COLORS.success,
            }}
          >
            npx react-native-ultra-carousel@latest init
          </div>
        </div>

        {/* Alternative install */}
        <div
          style={{
            opacity: installOpacity,
            fontFamily: jetbrainsFont,
            fontWeight: 400,
            fontSize: 16,
            color: COLORS.textMuted,
            textAlign: 'center' as const,
          }}
        >
          or: npm install react-native-ultra-carousel
        </div>

        {/* Links */}
        <div
          style={{
            opacity: linksOpacity,
            transform: `translateY(${linksY}px)`,
            display: 'flex',
            gap: 24,
            marginTop: 16,
          }}
        >
          {[
            { label: 'GitHub', icon: '{}' },
            { label: 'Documentation', icon: 'Docs' },
            { label: 'npm', icon: 'npm' },
          ].map((link) => (
            <div
              key={link.label}
              style={{
                background: `${COLORS.primary}15`,
                border: `1px solid ${COLORS.primary}33`,
                borderRadius: 12,
                padding: '12px 28px',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                fontFamily: interFont,
                fontWeight: 600,
                fontSize: 16,
                color: COLORS.accent,
              }}
            >
              <span
                style={{
                  fontFamily: jetbrainsFont,
                  fontWeight: 700,
                  fontSize: 13,
                  color: COLORS.primary,
                  opacity: 0.7,
                }}
              >
                {link.icon}
              </span>
              {link.label}
            </div>
          ))}
        </div>

        {/* CTA glow box */}
        <div
          style={{
            opacity: linksOpacity * glowPulse,
            marginTop: 24,
            background: GRADIENTS.primary,
            borderRadius: 16,
            padding: '16px 48px',
            fontFamily: interFont,
            fontWeight: 700,
            fontSize: 20,
            color: '#fff',
            boxShadow: `0 0 ${30 * glowPulse}px ${COLORS.primary}66`,
          }}
        >
          Star on GitHub
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// ThumbnailComp - still frame for video thumbnail
// ---------------------------------------------------------------------------
const ThumbnailComp: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.bg }}>
      <GlowOrb color={COLORS.primary} size={500} x={200} y={100} delay={0} />
      <GlowOrb color={COLORS.accent} size={400} x={1400} y={500} delay={0} />
      <GlowOrb color={COLORS.secondary} size={300} x={900} y={200} delay={0} />

      <AbsoluteFill
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 24,
          }}
        >
          {/* Logo */}
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: 32,
              background: GRADIENTS.primary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 0 60px ${COLORS.primary}88`,
            }}
          >
            <svg width="68" height="68" viewBox="0 0 56 56" fill="none">
              <rect x="8" y="16" width="14" height="24" rx="4" fill="white" opacity="0.6" />
              <rect x="21" y="10" width="14" height="36" rx="4" fill="white" />
              <rect x="34" y="16" width="14" height="24" rx="4" fill="white" opacity="0.6" />
            </svg>
          </div>

          <div
            style={{
              fontFamily: interFont,
              fontWeight: 800,
              fontSize: 80,
              color: COLORS.text,
              letterSpacing: -3,
              textAlign: 'center' as const,
            }}
          >
            Ultra Carousel
          </div>

          <div
            style={{
              fontFamily: interFont,
              fontWeight: 600,
              fontSize: 32,
              backgroundImage: GRADIENTS.primary,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textAlign: 'center' as const,
            }}
          >
            35+ Animation Presets for React Native
          </div>

          <div
            style={{
              display: 'flex',
              gap: 16,
              marginTop: 12,
            }}
          >
            {CARD_COLORS.slice(0, 7).map((color, i) => (
              <div
                key={i}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: `linear-gradient(135deg, ${color}dd, ${color}88)`,
                  boxShadow: `0 4px 20px ${color}44`,
                }}
              />
            ))}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// DemoVideo - main composition component
// ---------------------------------------------------------------------------
const DemoVideo: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ background: COLORS.bg }}>
      {/* Persistent particle background */}
      <ParticleField />

      {/* Scene sequence with transitions */}
      <TransitionSeries>
        {/* Intro */}
        <TransitionSeries.Sequence durationInFrames={INTRO_FRAMES}>
          <IntroScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />

        {/* Basic Presets */}
        <TransitionSeries.Sequence durationInFrames={BASIC_FRAMES}>
          <PresetShowcase
            presets={PRESETS.basic}
            category="Basic Presets"
            categoryColor={COLORS.primary}
            gradient={GRADIENTS.primary}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: 'from-right' })}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />

        {/* Advanced Presets */}
        <TransitionSeries.Sequence durationInFrames={ADVANCED_FRAMES}>
          <PresetShowcase
            presets={PRESETS.advanced}
            category="Advanced Presets"
            categoryColor={COLORS.accent}
            gradient={GRADIENTS.neon}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: 'from-right' })}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />

        {/* Creative Presets */}
        <TransitionSeries.Sequence durationInFrames={CREATIVE_FRAMES}>
          <PresetShowcase
            presets={PRESETS.creative}
            category="Creative Presets"
            categoryColor={COLORS.secondary}
            gradient={GRADIENTS.secondary}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />

        {/* Features */}
        <TransitionSeries.Sequence durationInFrames={FEATURES_FRAMES}>
          <FeaturesScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />

        {/* Outro */}
        <TransitionSeries.Sequence durationInFrames={OUTRO_FRAMES}>
          <OutroScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// RemotionRoot - registers compositions
// ---------------------------------------------------------------------------
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="DemoVideo"
        component={DemoVideo}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Still
        id="Thumbnail"
        component={ThumbnailComp}
        width={WIDTH}
        height={HEIGHT}
      />
    </>
  );
};
