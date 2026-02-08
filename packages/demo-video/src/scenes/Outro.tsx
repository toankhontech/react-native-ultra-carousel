import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { loadFont as loadInter } from '@remotion/google-fonts/Inter';
import { loadFont as loadJetBrains } from '@remotion/google-fonts/JetBrainsMono';
import ParticleField from '../components/ParticleField';
import GradientText from '../components/GradientText';

const { fontFamily } = loadInter('normal', {
  weights: ['400', '700', '800'],
  subsets: ['latin'],
});

const { fontFamily: monoFont } = loadJetBrains('normal', {
  weights: ['400', '700'],
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

const INSTALL_COMMAND = 'npm install react-native-ultra-carousel';
const FRAMES_PER_CHAR = 2;
const TYPING_START_FRAME = 5;
const TYPING_TOTAL_FRAMES = INSTALL_COMMAND.length * FRAMES_PER_CHAR;
const TYPING_END_FRAME = TYPING_START_FRAME + TYPING_TOTAL_FRAMES;

const GITHUB_URL = 'github.com/toankhontech/react-native-ultra-carousel';

const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // --- Terminal typewriter effect ---
  const typingFrame = Math.max(0, frame - TYPING_START_FRAME);
  const charsShown = Math.min(
    Math.floor(typingFrame / FRAMES_PER_CHAR),
    INSTALL_COMMAND.length,
  );
  const displayedText = INSTALL_COMMAND.slice(0, charsShown);
  const isTypingComplete = charsShown >= INSTALL_COMMAND.length;

  // Blinking cursor (toggles every 15 frames)
  const cursorVisible = Math.floor(frame / 15) % 2 === 0;

  // Terminal container entrance
  const terminalEntrance = spring({
    frame,
    fps,
    config: {
      damping: 16,
      stiffness: 100,
      mass: 0.7,
    },
  });

  const terminalScale = interpolate(terminalEntrance, [0, 1], [0.9, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const terminalOpacity = interpolate(terminalEntrance, [0, 1], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // --- GitHub section (appears after typing completes, ~90 frames in) ---
  const githubDelay = TYPING_END_FRAME + 10;
  const githubSpring = spring({
    frame: Math.max(0, frame - githubDelay),
    fps,
    config: {
      damping: 12,
      stiffness: 120,
      mass: 0.6,
    },
  });

  const githubScale = interpolate(githubSpring, [0, 1], [0.6, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const githubOpacity = interpolate(githubSpring, [0, 1], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // GitHub URL fade in
  const urlDelay = githubDelay + 15;
  const urlOpacity = interpolate(frame, [urlDelay, urlDelay + 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const urlTranslateY = interpolate(frame, [urlDelay, urlDelay + 20], [10, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // --- "Built by" footer (appears last) ---
  const footerDelay = urlDelay + 30;
  const footerOpacity = interpolate(frame, [footerDelay, footerDelay + 25], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const footerTranslateY = interpolate(
    frame,
    [footerDelay, footerDelay + 25],
    [15, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    },
  );

  // Success checkmark appears when typing completes
  const checkDelay = TYPING_END_FRAME + 2;
  const checkSpring = spring({
    frame: Math.max(0, frame - checkDelay),
    fps,
    config: {
      damping: 10,
      stiffness: 200,
      mass: 0.4,
    },
  });

  const checkScale = interpolate(checkSpring, [0, 1], [0, 1], {
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

      {/* Centered content */}
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 36,
          padding: '60px 80px',
        }}
      >
        {/* Terminal window */}
        <div
          style={{
            transform: `scale(${terminalScale})`,
            opacity: terminalOpacity,
            width: '100%',
            maxWidth: 720,
          }}
        >
          <div
            style={{
              backgroundColor: COLORS.surface,
              borderRadius: 14,
              border: `1px solid ${COLORS.surfaceLight}`,
              overflow: 'hidden',
              boxShadow: `0 8px 40px rgba(0, 0, 0, 0.4), 0 0 30px ${COLORS.primary}11`,
            }}
          >
            {/* Terminal title bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 16px',
                borderBottom: `1px solid ${COLORS.surfaceLight}`,
              }}
            >
              {/* Window dots */}
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  backgroundColor: '#ff5f56',
                }}
              />
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  backgroundColor: '#ffbd2e',
                }}
              />
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  backgroundColor: '#27c93f',
                }}
              />
              <span
                style={{
                  flex: 1,
                  textAlign: 'center',
                  fontFamily: monoFont,
                  fontSize: 13,
                  color: COLORS.textMuted,
                }}
              >
                Terminal
              </span>
            </div>

            {/* Terminal content */}
            <div
              style={{
                padding: '20px 24px',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                minHeight: 60,
              }}
            >
              {/* Prompt symbol */}
              <span
                style={{
                  fontFamily: monoFont,
                  fontSize: 20,
                  color: COLORS.success,
                  fontWeight: 700,
                }}
              >
                $
              </span>

              {/* Typed command */}
              <span
                style={{
                  fontFamily: monoFont,
                  fontSize: 20,
                  color: COLORS.text,
                  fontWeight: 400,
                  letterSpacing: 0.3,
                }}
              >
                {displayedText}
              </span>

              {/* Blinking cursor */}
              {!isTypingComplete && (
                <span
                  style={{
                    fontFamily: monoFont,
                    fontSize: 20,
                    color: COLORS.accent,
                    opacity: cursorVisible ? 1 : 0,
                    fontWeight: 700,
                  }}
                >
                  |
                </span>
              )}

              {/* Success checkmark when done */}
              {isTypingComplete && (
                <span
                  style={{
                    fontFamily: monoFont,
                    fontSize: 20,
                    color: COLORS.success,
                    fontWeight: 700,
                    marginLeft: 12,
                    transform: `scale(${checkScale})`,
                    display: 'inline-block',
                  }}
                >
                  OK
                </span>
              )}
            </div>
          </div>
        </div>

        {/* GitHub star section */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
            transform: `scale(${githubScale})`,
            opacity: githubOpacity,
          }}
        >
          {/* Star button */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '14px 32px',
              borderRadius: 30,
              background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.accent})`,
              boxShadow: `0 4px 24px ${COLORS.primary}44`,
            }}
          >
            {/* Star shape using CSS */}
            <div
              style={{
                width: 20,
                height: 20,
                position: 'relative',
              }}
            >
              {/* Simple 5-point star approximation */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span
                  style={{
                    fontSize: 20,
                    color: '#ffd740',
                    lineHeight: 1,
                    fontFamily: 'serif',
                  }}
                >
                  &#9733;
                </span>
              </div>
            </div>
            <span
              style={{
                fontFamily,
                fontSize: 20,
                fontWeight: 700,
                color: COLORS.text,
                letterSpacing: 0.5,
              }}
            >
              Star on GitHub
            </span>
          </div>

          {/* GitHub URL */}
          <div
            style={{
              opacity: urlOpacity,
              transform: `translateY(${urlTranslateY}px)`,
            }}
          >
            <span
              style={{
                fontFamily: monoFont,
                fontSize: 16,
                color: COLORS.textDim,
                letterSpacing: 0.3,
              }}
            >
              {GITHUB_URL}
            </span>
          </div>
        </div>

        {/* Footer: "Built by" */}
        <div
          style={{
            position: 'absolute',
            bottom: 50,
            opacity: footerOpacity,
            transform: `translateY(${footerTranslateY}px)`,
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
            Built by
          </span>
          <GradientText
            gradient={`linear-gradient(135deg, ${COLORS.primary}, ${COLORS.accent})`}
            style={{
              fontSize: 16,
              fontWeight: 700,
            }}
          >
            toankhontech
          </GradientText>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export default Outro;
