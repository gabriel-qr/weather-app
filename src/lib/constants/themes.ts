import { colors, gradients } from './colors';

export type WeatherType = 'sunny' | 'rainy' | 'cloudy' | 'night';

export interface ColorScheme {
  primary: string;
  secondary: string;
  background: string;
  accent: string;
  text: {
    primary: string;
    secondary: string;
    muted: string;
    dark: string;
  };
  card: string;
  cardSolid: string;
  border: string;
  gradient: readonly [string, string];
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
    text: colors.text,
    card: colors.background.card,
    cardSolid: colors.background.cardSolid,
    border: colors.border,
    gradient: gradients[weather],
    isDark,
  };
};
