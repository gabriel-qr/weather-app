import { colors } from './colors';

export type WeatherType = 'sunny' | 'rainy' | 'cloudy' | 'night';

export interface ColorScheme {
  primary: string;
  secondary: string;
  background: string;
  accent: string;
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
    dark: string;
    darkSecondary: string;
  };
  card: string;
  cardDark: string;
  border: {
    light: string;
    medium: string;
    dark: string;
    transparent: string;
  };
  input: {
    background: string;
    border: string;
    placeholder: string;
    text: string;
  };
  chart: {
    line: string;
    lineAlt: string;
    fill: string;
    grid: string;
    dot: string;
    label: string;
    gradient: {
      start: string;
      end: string;
    };
  };
  status: {
    success: string;
    error: string;
    warning: string;
    info: string;
  };
  gray: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
  white: string;
  black: string;
  transparent: string;
  gradient: readonly [string, string, ...string[]];
  isDark: boolean;
}

export const createColorScheme = (weather: WeatherType): ColorScheme => {
  const weatherColors = colors[weather];
  const isDark = weather === 'night' || weather === 'rainy';

  return {
    primary: weatherColors.primary,
    secondary: weatherColors.secondary,
    background: weatherColors.background,
    accent: weatherColors.accent,
    text: isDark
      ? {
          primary: weatherColors.text,
          secondary: weatherColors.textSecondary,
          tertiary: colors.text.tertiary,
          dark: colors.text.dark,
          darkSecondary: colors.text.darkSecondary,
        }
      : {
          primary: weatherColors.text,
          secondary: weatherColors.textSecondary,
          tertiary: colors.gray[600],
          dark: colors.text.dark,
          darkSecondary: colors.text.darkSecondary,
        },
    card: colors.background.card,
    cardDark: colors.background.cardDark,
    border: colors.border,
    input: colors.input,
    chart: colors.chart,
    status: colors.status,
    gray: colors.gray,
    white: colors.white,
    black: colors.black,
    transparent: colors.transparent,
    gradient: weatherColors.gradient as readonly [string, string, ...string[]],
    isDark,
  };
};
