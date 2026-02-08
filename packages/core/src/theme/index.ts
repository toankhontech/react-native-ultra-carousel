/**
 * @file Theme system for react-native-ultra-carousel
 * @description Provides 4 built-in themes and custom theme support
 */

import type { ViewStyle, TextStyle } from 'react-native';

export interface CarouselTheme {
  /** Theme name */
  name: string;
  /** Pagination dot active color */
  paginationActiveColor: string;
  /** Pagination dot inactive color */
  paginationInactiveColor: string;
  /** Pagination number text color */
  paginationTextColor: string;
  /** Progress bar background color */
  progressBarBackground: string;
  /** Progress bar fill color */
  progressBarFill: string;
  /** Card background color */
  cardBackground: string;
  /** Card border radius */
  cardBorderRadius: number;
  /** Card shadow style */
  cardShadow: ViewStyle;
  /** Text styles for card title */
  cardTitleStyle: TextStyle;
  /** Text styles for card subtitle */
  cardSubtitleStyle: TextStyle;
}

/** Light theme — clean and minimal */
export const lightTheme: CarouselTheme = {
  name: 'light',
  paginationActiveColor: '#333333',
  paginationInactiveColor: '#CCCCCC',
  paginationTextColor: '#333333',
  progressBarBackground: '#E0E0E0',
  progressBarFill: '#333333',
  cardBackground: '#FFFFFF',
  cardBorderRadius: 12,
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitleStyle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  cardSubtitleStyle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666666',
  },
};

/** Dark theme — modern dark mode */
export const darkTheme: CarouselTheme = {
  name: 'dark',
  paginationActiveColor: '#FFFFFF',
  paginationInactiveColor: '#555555',
  paginationTextColor: '#FFFFFF',
  progressBarBackground: '#333333',
  progressBarFill: '#FFFFFF',
  cardBackground: '#1E1E2E',
  cardBorderRadius: 12,
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  cardTitleStyle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  cardSubtitleStyle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#AAAAAA',
  },
};

/** Vibrant theme — colorful and energetic */
export const vibrantTheme: CarouselTheme = {
  name: 'vibrant',
  paginationActiveColor: '#FF6B6B',
  paginationInactiveColor: '#FFD1D1',
  paginationTextColor: '#FF6B6B',
  progressBarBackground: '#FFE0E0',
  progressBarFill: '#FF6B6B',
  cardBackground: '#FFF5F5',
  cardBorderRadius: 16,
  cardShadow: {
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },
  cardTitleStyle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#CC3333',
  },
  cardSubtitleStyle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FF8888',
  },
};

/** Minimal theme — ultra clean, subtle */
export const minimalTheme: CarouselTheme = {
  name: 'minimal',
  paginationActiveColor: '#000000',
  paginationInactiveColor: '#E5E5E5',
  paginationTextColor: '#000000',
  progressBarBackground: '#F0F0F0',
  progressBarFill: '#000000',
  cardBackground: '#FAFAFA',
  cardBorderRadius: 4,
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  cardTitleStyle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111111',
  },
  cardSubtitleStyle: {
    fontSize: 13,
    fontWeight: '400',
    color: '#888888',
  },
};

/** All built-in themes */
export const themes = {
  light: lightTheme,
  dark: darkTheme,
  vibrant: vibrantTheme,
  minimal: minimalTheme,
} as const;

export type ThemeName = keyof typeof themes;

/**
 * Gets a built-in theme by name.
 *
 * @param name - Theme name
 * @returns The theme object
 */
export const getTheme = (name: ThemeName): CarouselTheme => {
  return themes[name];
};

/**
 * Creates a custom theme by extending a base theme.
 *
 * @param base - Base theme to extend
 * @param overrides - Partial theme overrides
 * @returns Complete merged theme
 */
export const createTheme = (
  base: ThemeName | CarouselTheme,
  overrides: Partial<CarouselTheme>
): CarouselTheme => {
  const baseTheme = typeof base === 'string' ? themes[base] : base;
  return { ...baseTheme, ...overrides };
};
