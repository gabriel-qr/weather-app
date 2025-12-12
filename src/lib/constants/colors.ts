export const colors = {
  // Cores de Clima
  sunny: {
    primary: '#FFA726',
    secondary: '#FFB74D',
    background: '#FF9800',
    accent: '#F57C00',
  },
  rainy: {
    primary: '#4A6FA5',
    secondary: '#5C7FA7',
    background: '#3D5A80',
    accent: '#2E4A66',
  },
  cloudy: {
    primary: '#78909C',
    secondary: '#90A4AE',
    background: '#607D8B',
    accent: '#546E7A',
  },
  night: {
    primary: '#1A2332',
    secondary: '#263447',
    background: '#0F1822',
    accent: '#384A5C',
  },
  white: '#FFFFFF',
  black: '#000000',
  text: {
    primary: '#FFFFFF',
    secondary: '#E3E3E3',
    muted: '#B0B0B0',
    dark: '#1A1A1A',
  },
  background: {
    light: '#F5F5F5',
    card: 'rgba(255, 255, 255, 0.15)',
    cardSolid: '#FFFFFF',
  },
  border: '#E0E0E0',
  input: '#F0F0F0',
  shadow: 'rgba(0, 0, 0, 0.1)',
  chart: {
    line: '#4FC3F7',
    gradient: ['#4FC3F7', '#0288D1'],
    dot: '#FFFFFF',
  },
};

export const gradients = {
  sunny: ['#FFA726', '#FF6F00'] as const,
  rainy: ['#4A6FA5', '#2E4A66'] as const,
  cloudy: ['#78909C', '#546E7A'] as const,
  night: ['#1A2332', '#0F1822'] as const,
};
