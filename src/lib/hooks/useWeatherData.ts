import { useTheme } from '@/contexts/ThemeContext';
import { getForecatsWeather } from '@/services/api/weather';
import { useEffect, useState } from 'react';
import { getThemeFromWeatherCode } from '../utils/weatherMapper';
import { useLocation } from './useLocation';

export function useWeatherData() {
  const [currentWeatherData, setCurrentWeatherData] = useState<any>([]);
  const [forecastWeatherData, setForecastWeatherData] = useState<any>([]);
  const [locationWeatherData, setLocationWeatherData] = useState<any>([]);
  const [hourlyWeatherData, setHourlyWeatherData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { setWeatherType } = useTheme();
  const { getCurrentPosition } = useLocation();

  const fetchWeatherData = async () => {
    try {
      const location = await getCurrentPosition();

      if (!location) {
        setError('Failed to get location');
        setLoading(false);
        return;
      }

      const result = await getForecatsWeather(`${location.lat},${location.lng}`, 1, false);

      const weatherConditionCode = result.current.condition.code;
      const isDay = result.current.condition.is_day;

      setWeatherType(getThemeFromWeatherCode(weatherConditionCode, isDay));
      setLocationWeatherData(result.location);
      setCurrentWeatherData(result.current);
      setForecastWeatherData(result.forecast);
      setHourlyWeatherData(result.forecast.forecastday[0].hour);

      console.log('Weather Condition:', getThemeFromWeatherCode(weatherConditionCode, isDay));
    } catch (error) {
      console.error('Error fetching weather:', error);
      setError('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  return {
    locationWeatherData,
    currentWeatherData,
    forecastWeatherData,
    hourlyWeatherData,
    loading,
    error,
    refetch: fetchWeatherData,
  };
}
