import React from 'react';

const COLORS = {
  bg: '#0a0a0f',
  surface: '#16162a',
  textDim: '#8888aa',
  textMuted: '#555577',
};

type PhoneMockupProps = {
  children: React.ReactNode;
  scale?: number;
};

const BASE_WIDTH = 280;
const BASE_HEIGHT = 560;
const BORDER_RADIUS = 40;
const STATUS_BAR_HEIGHT = 32;
const HOME_BAR_HEIGHT = 24;

const PhoneMockup: React.FC<PhoneMockupProps> = ({ children, scale = 1 }) => {
  const width = BASE_WIDTH * scale;
  const height = BASE_HEIGHT * scale;
  const radius = BORDER_RADIUS * scale;
  const statusH = STATUS_BAR_HEIGHT * scale;
  const homeH = HOME_BAR_HEIGHT * scale;

  return (
    <div
      style={{
        width,
        height,
        borderRadius: radius,
        border: `${2 * scale}px solid #333`,
        backgroundColor: COLORS.surface,
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(108, 99, 255, 0.1)',
        flexShrink: 0,
      }}
    >
      {/* Dynamic Island / Notch */}
      <div
        style={{
          position: 'absolute',
          top: 8 * scale,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 80 * scale,
          height: 22 * scale,
          borderRadius: 12 * scale,
          backgroundColor: COLORS.bg,
          zIndex: 20,
        }}
      />

      {/* Status Bar */}
      <div
        style={{
          height: statusH,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: `0 ${20 * scale}px`,
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Time */}
        <span
          style={{
            fontSize: 11 * scale,
            fontWeight: 600,
            color: COLORS.textDim,
            letterSpacing: 0.5,
          }}
        >
          9:41
        </span>

        {/* Right indicators */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 * scale }}>
          {/* Signal bars */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 1 * scale }}>
            {[3, 5, 7, 9].map((h, i) => (
              <div
                key={i}
                style={{
                  width: 2.5 * scale,
                  height: h * scale,
                  backgroundColor: COLORS.textDim,
                  borderRadius: 1 * scale,
                }}
              />
            ))}
          </div>
          {/* Battery */}
          <div
            style={{
              width: 18 * scale,
              height: 9 * scale,
              border: `1px solid ${COLORS.textDim}`,
              borderRadius: 2 * scale,
              marginLeft: 4 * scale,
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 1.5 * scale,
                left: 1.5 * scale,
                width: '70%',
                height: 5 * scale,
                backgroundColor: COLORS.textDim,
                borderRadius: 1 * scale,
              }}
            />
            <div
              style={{
                position: 'absolute',
                right: -3 * scale,
                top: '50%',
                transform: 'translateY(-50%)',
                width: 2 * scale,
                height: 4 * scale,
                backgroundColor: COLORS.textDim,
                borderRadius: `0 ${1 * scale}px ${1 * scale}px 0`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div
        style={{
          position: 'absolute',
          top: statusH,
          left: 0,
          right: 0,
          bottom: homeH,
          overflow: 'hidden',
        }}
      >
        {children}
      </div>

      {/* Home Indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: 6 * scale,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 100 * scale,
          height: 4 * scale,
          borderRadius: 2 * scale,
          backgroundColor: COLORS.textMuted,
        }}
      />
    </div>
  );
};

export default PhoneMockup;
