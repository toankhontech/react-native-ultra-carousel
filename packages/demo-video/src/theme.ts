export const COLORS = {
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

export const GRADIENTS = {
  primary: 'linear-gradient(135deg, #6c63ff, #00d2ff)',
  secondary: 'linear-gradient(135deg, #ff6584, #ff9a56)',
  neon: 'linear-gradient(135deg, #b24dff, #00d2ff)',
  sunset: 'linear-gradient(135deg, #ff6584, #ffd740)',
};

export const CARD_COLORS = [
  '#6c63ff', '#00d2ff', '#ff6584', '#ff9a56', '#00e676',
  '#b24dff', '#ff4081', '#ffd740', '#64ffda', '#ea80fc',
];

// Duration constants in seconds (multiply by fps to get frames)
export const TIMING = {
  INTRO_DURATION: 3,           // 3s intro
  SECTION_TITLE_DURATION: 1.5, // 1.5s for section title
  BASIC_DURATION: 14,          // 14s for 10 basic presets
  ADVANCED_DURATION: 14,       // 14s for 10 advanced presets
  CREATIVE_DURATION: 12,       // 12s for 15 creative presets
  FEATURES_DURATION: 6,        // 6s features
  OUTRO_DURATION: 7,           // 7s outro
  TRANSITION_DURATION: 0.5,    // 0.5s between scenes
};

// Preset names organized by category
export const PRESETS = {
  basic: [
    'slide', 'fade', 'slide-fade', 'scale', 'scale-fade',
    'vertical', 'vertical-fade', 'parallax', 'overlap', 'peek',
  ],
  advanced: [
    'stack', 'tinder', 'coverflow', 'cube', 'flip',
    'wheel', 'accordion', 'zoom', 'rotate', 'depth',
  ],
  creative: [
    'newspaper', 'origami', 'carousel-3d', 'wave', 'spiral',
    'glitch', 'morph', 'shutter', 'domino', 'elastic',
    'blur-slide', 'windmill', 'film-strip', 'helix', 'gravity',
  ],
};
