import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { loadFont } from '@remotion/google-fonts/Inter';
import PhoneMockup from '../components/PhoneMockup';
import CarouselCard from '../components/CarouselCard';
import PresetLabel from '../components/PresetLabel';
import SectionTitle from '../components/SectionTitle';
import ParticleField from '../components/ParticleField';
import { getAnimator } from '../animations';

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

const CARD_COLORS = [
  '#6c63ff', '#00d2ff', '#ff6584', '#ff9a56', '#00e676',
  '#b24dff', '#ff4081', '#ffd740', '#64ffda', '#ea80fc',
];

const NUM_CARDS = 5;
const CARD_WIDTH = 140;
const CARD_HEIGHT = 200;
const PHONE_SCALE = 0.85;

type PresetShowcaseProps = {
  presets: string[];
  categoryName: string;
  categoryColor: string;
};

const PresetShowcase: React.FC<PresetShowcaseProps> = ({
  presets,
  categoryName,
  categoryColor,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const framesPerPreset = Math.floor(durationInFrames / presets.length);

  // Current preset index and local progress within that preset
  const currentPresetIndex = Math.min(
    Math.floor(frame / framesPerPreset),
    presets.length - 1,
  );
  const localFrame = frame - currentPresetIndex * framesPerPreset;
  const presetProgress = Math.min(localFrame / framesPerPreset, 1);

  const currentPresetName = presets[currentPresetIndex];
  const animator = getAnimator(currentPresetName);

  // Scene entrance animation
  const entranceProgress = spring({
    frame,
    fps,
    config: {
      damping: 16,
      stiffness: 80,
      mass: 0.8,
    },
  });

  const phoneScale = interpolate(entranceProgress, [0, 1], [0.7, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const phoneOpacity = interpolate(entranceProgress, [0, 1], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Simulate a carousel transition: progress goes 0 -> 1 within each preset time slot
  // We use an eased progress for smoother animation feel
  const easedProgress = easeInOutCubic(presetProgress);

  // Active card transitions from card 1 to card 2 (index 0 to 1) during the animation
  const activeIndex = 0;
  const transitionProgress = easedProgress;

  // Counter badge for current preset number
  const presetNumber = currentPresetIndex + 1;
  const totalPresets = presets.length;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        fontFamily,
      }}
    >
      <ParticleField />

      {/* Layout container */}
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '40px 60px',
        }}
      >
        {/* Top: Category name with section title */}
        <div
          style={{
            alignSelf: 'flex-start',
            marginBottom: 20,
          }}
        >
          <SectionTitle title={categoryName} color={categoryColor} />
        </div>

        {/* Preset counter */}
        <div
          style={{
            position: 'absolute',
            top: 48,
            right: 70,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span
            style={{
              fontFamily,
              fontSize: 16,
              color: COLORS.textMuted,
              fontWeight: 400,
            }}
          >
            {String(presetNumber).padStart(2, '0')}
          </span>
          <div
            style={{
              width: 40,
              height: 2,
              backgroundColor: COLORS.textMuted,
              borderRadius: 1,
            }}
          />
          <span
            style={{
              fontFamily,
              fontSize: 16,
              color: COLORS.textMuted,
              fontWeight: 400,
            }}
          >
            {String(totalPresets).padStart(2, '0')}
          </span>
        </div>

        {/* Center: Phone mockup with carousel */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `scale(${phoneScale})`,
            opacity: phoneOpacity,
          }}
        >
          <PhoneMockup scale={PHONE_SCALE}>
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                backgroundColor: COLORS.bg,
                perspective: 800,
              }}
            >
              {/* Carousel cards */}
              {Array.from({ length: NUM_CARDS }).map((_, cardIndex) => {
                const transform = animator(
                  transitionProgress,
                  cardIndex,
                  activeIndex,
                  NUM_CARDS,
                  CARD_WIDTH,
                );

                return (
                  <CarouselCard
                    key={cardIndex}
                    index={cardIndex}
                    color={CARD_COLORS[cardIndex % CARD_COLORS.length]}
                    width={CARD_WIDTH}
                    height={CARD_HEIGHT}
                    transform={transform}
                  />
                );
              })}
            </div>
          </PhoneMockup>
        </div>

        {/* Bottom: Current preset name */}
        <div
          style={{
            marginTop: 16,
            minHeight: 80,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <PresetLabel
            name={currentPresetName}
            progress={presetProgress}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/** Cubic ease-in-out for smoother carousel transition feel. */
function easeInOutCubic(t: number): number {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default PresetShowcase;
