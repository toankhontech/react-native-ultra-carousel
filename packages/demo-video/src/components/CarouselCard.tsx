import React from 'react';

type CardTransform = {
  translateX: number;
  translateY: number;
  scale: number;
  rotateX: number;
  rotateY: number;
  rotateZ: number;
  opacity: number;
  zIndex: number;
};

type CarouselCardProps = {
  index: number;
  color: string;
  width: number;
  height: number;
  transform: CardTransform;
};

const CarouselCard: React.FC<CarouselCardProps> = ({
  index,
  color,
  width,
  height,
  transform,
}) => {
  const {
    translateX,
    translateY,
    scale,
    rotateX,
    rotateY,
    rotateZ,
    opacity,
    zIndex,
  } = transform;

  const cssTransform = [
    `translateX(${translateX}px)`,
    `translateY(${translateY}px)`,
    `scale(${scale})`,
    `rotateX(${rotateX}deg)`,
    `rotateY(${rotateY}deg)`,
    `rotateZ(${rotateZ}deg)`,
  ].join(' ');

  return (
    <div
      style={{
        position: 'absolute',
        width,
        height,
        borderRadius: 12,
        overflow: 'hidden',
        transform: cssTransform,
        opacity,
        zIndex,
        perspective: 800,
        backfaceVisibility: 'hidden',
        willChange: 'transform, opacity',
      }}
    >
      {/* Card background */}
      <div
        style={{
          width: '100%',
          height: '100%',
          background: `linear-gradient(145deg, ${color}, ${color}cc)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Gradient overlay for depth */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.1) 100%)',
          }}
        />

        {/* Decorative circle pattern */}
        <div
          style={{
            position: 'absolute',
            top: -height * 0.2,
            right: -width * 0.2,
            width: width * 0.7,
            height: width * 0.7,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.08)',
          }}
        />

        {/* Card number */}
        <span
          style={{
            fontSize: Math.min(width, height) * 0.35,
            fontWeight: 800,
            color: 'rgba(255, 255, 255, 0.85)',
            position: 'relative',
            zIndex: 1,
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          {index + 1}
        </span>
      </div>
    </div>
  );
};

export default CarouselCard;
