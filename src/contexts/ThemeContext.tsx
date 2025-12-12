import { ColorScheme, createColorScheme, WeatherType } from '@/lib/constants/themes';
import React, { createContext, ReactNode, useContext, useState } from 'react';

interface ThemeContextType {
  colorScheme: ColorScheme;
  weatherType: WeatherType;
  setWeatherType: (weather: WeatherType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [weatherType, setWeatherType] = useState<WeatherType>('sunny');
  const colorScheme = createColorScheme(weatherType);

  return (
    <ThemeContext.Provider value={{ colorScheme, weatherType, setWeatherType }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
