export const colors = {
  sunny: {
    primary: '#FCD34D',
    secondary: '#FBBF24',
    background: '#FDE68A',
    accent: '#F59E0B',
    gradient: ['#FCD34D', '#FBBF24', '#FDE68A'] as const,
    text: '#78350F',
    textSecondary: '#92400E',
  },

  cloudy: {
    primary: '#94A3B8',
    secondary: '#CBD5E1',
    background: '#E2E8F0',
    accent: '#64748B',
    gradient: ['#94A3B8', '#CBD5E1', '#E2E8F0'] as const,
    text: '#1E293B',
    textSecondary: '#334155',
  },

  rainy: {
    primary: '#475569',
    secondary: '#64748B',
    background: '#94A3B8',
    accent: '#334155',
    gradient: ['#475569', '#64748B', '#94A3B8'] as const,
    text: '#F1F5F9',
    textSecondary: '#E2E8F0',
    rain: '#60A5FA',
  },

  night: {
    primary: '#4C1D95',
    secondary: '#5B21B6',
    background: '#1E1B4B',
    accent: '#6D28D9',
    gradient: ['#4C1D95', '#5B21B6', '#1E1B4B'] as const,
    text: '#FFFFFF',
    textSecondary: '#E0E7FF',
    stars: '#FBBF24',
  },

  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',

  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },

  text: {
    primary: '#FFFFFF',
    secondary: '#E5E7EB',
    tertiary: '#9CA3AF',
    dark: '#111827',
    darkSecondary: '#374151',
  },

  background: {
    primary: '#F9FAFB',
    secondary: '#F3F4F6',
    card: 'rgba(255, 255, 255, 0.15)',
    cardDark: 'rgba(0, 0, 0, 0.15)',
    overlay: 'rgba(0, 0, 0, 0.05)',
  },

  border: {
    light: '#E5E7EB',
    medium: '#D1D5DB',
    dark: '#9CA3AF',
    transparent: 'rgba(255, 255, 255, 0.2)',
  },

  input: {
    background: 'rgba(255, 255, 255, 0.2)',
    border: 'rgba(255, 255, 255, 0.3)',
    placeholder: '#9CA3AF',
    text: '#FFFFFF',
  },

  chart: {
    line: '#60A5FA',
    lineAlt: '#34D399',
    fill: 'rgba(96, 165, 250, 0.1)',
    grid: 'rgba(255, 255, 255, 0.1)',
    dot: '#FFFFFF',
    label: '#E5E7EB',
    gradient: {
      start: '#60A5FA',
      end: '#3B82F6',
    },
  },

  status: {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  },
};
