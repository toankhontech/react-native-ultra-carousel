import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';

const COLORS = {
  primary: '#6c63ff',
  accent: '#00d2ff',
};

const PARTICLE_COUNT = 35;

/**
 * Deterministic pseudo-random number from index using golden ratio.
 * Returns a value between 0 and 1.
 */
function pseudoRandom(index: number, seed: number = 0): number {
  return ((Math.sin((index + seed) * 1.618033988749) * 43758.5453) % 1 + 1) % 1;
}

type Particle = {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  color: string;
  alphaBase: number;
};

function generateParticles(width: number, height: number): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const px = pseudoRandom(i, 0);
    const py = pseudoRandom(i, 1);
    const pSize = pseudoRandom(i, 2);
    const pSpeedY = pseudoRandom(i, 3);
    const pSpeedX = pseudoRandom(i, 4);
    const pColor = pseudoRandom(i, 5);
    const pAlpha = pseudoRandom(i, 6);

    particles.push({
      x: px * width,
      y: py * height,
      size: 2 + pSize * 4,
      speedY: 0.3 + pSpeedY * 0.7,
      speedX: (pSpeedX - 0.5) * 0.4,
      color: pColor > 0.5 ? COLORS.primary : COLORS.accent,
      alphaBase: 0.08 + pAlpha * 0.12,
    });
  }
  return particles;
}

const ParticleField: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const particles = React.useMemo(
    () => generateParticles(width, height),
    [width, height],
  );

  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      {particles.map((particle, i) => {
        // Animate position based on frame
        const yOffset = frame * particle.speedY;
        const xOffset = Math.sin(frame * 0.02 + i * 0.5) * 20 + frame * particle.speedX;

        // Wrap around vertically and horizontally
        const currentY = ((particle.y - yOffset) % height + height) % height;
        const currentX = ((particle.x + xOffset) % width + width) % width;

        // Subtle pulsing opacity
        const pulse = Math.sin(frame * 0.05 + i * 1.2) * 0.3 + 0.7;
        const opacity = particle.alphaBase * pulse;

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: currentX,
              top: currentY,
              width: particle.size,
              height: particle.size,
              borderRadius: '50%',
              backgroundColor: particle.color,
              opacity,
              willChange: 'transform',
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

export default ParticleField;
