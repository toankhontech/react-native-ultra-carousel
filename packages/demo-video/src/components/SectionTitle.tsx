import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { loadFont } from '@remotion/google-fonts/Inter';

const { fontFamily } = loadFont('normal', {
  weights: ['400', '700', '800'],
  subsets: ['latin'],
});

type SectionTitleProps = {
  title: string;
  color: string;
};

const SectionTitle: React.FC<SectionTitleProps> = ({ title, color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title slides in from left with spring
  const slideProgress = spring({
    frame,
    fps,
    config: {
      damping: 14,
      stiffness: 100,
      mass: 0.8,
    },
  });

  const translateX = interpolate(slideProgress, [0, 1], [-120, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const titleOpacity = interpolate(slideProgress, [0, 1], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Underline bar expands from left (starts after title arrives)
  const underlineWidth = interpolate(frame, [8, 23], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Dot scales in
  const dotScale = spring({
    frame: Math.max(0, frame - 3),
    fps,
    config: {
      damping: 10,
      stiffness: 200,
      mass: 0.5,
    },
  });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        opacity: titleOpacity,
        transform: `translateX(${translateX}px)`,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Bullet dot */}
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            backgroundColor: color,
            transform: `scale(${dotScale})`,
            boxShadow: `0 0 12px ${color}88`,
          }}
        />

        {/* Title text */}
        <span
          style={{
            fontFamily,
            fontSize: 28,
            fontWeight: 800,
            color: '#ffffff',
            letterSpacing: 2,
            textTransform: 'uppercase',
          }}
        >
          {title}
        </span>
      </div>

      {/* Colored underline bar */}
      <div
        style={{
          height: 3,
          width: `${underlineWidth}%`,
          borderRadius: 2,
          background: `linear-gradient(90deg, ${color}, ${color}44)`,
          marginLeft: 22,
        }}
      />
    </div>
  );
};

export default SectionTitle;
