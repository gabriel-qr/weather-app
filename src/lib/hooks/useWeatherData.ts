import { useTheme } from '@/contexts/ThemeContext';
import { getForecastWeather } from '@/services/api/weather';
import { useEffect, useState } from 'react';
import { getThemeFromWeatherCode } from '../utils/weatherMapper';
import { useLocation } from './useLocation';

export function useWeatherData() {
  const [currentWeatherData, setCurrentWeatherData] = useState<any>([]);
  const [forecastWeatherData, setForecastWeatherData] = useState<any>([]);
  const [locationWeatherData, setLocationWeatherData] = useState<any>([]);
  const [hourlyWeatherData, setHourlyWeatherData] = useState<any>([]);
  const [locationId, setLocationId] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { setWeatherType } = useTheme();
  const { getCurrentPosition, getCityFromCoords } = useLocation();

  const fetchWeatherData = async () => {
    try {
      const locationCoords = await getCurrentPosition();
      const location = await getCityFromCoords(locationCoords?.lat!, locationCoords?.lng!);

      if (!location) {
        setError('Failed to get location');
        setLoading(false);
        return;
      }

      const result = await getForecastWeather(`${location.subregion}`, 2, false);

      const weatherConditionCode = result.current.condition.code;
      const isDay = result.current.is_day;

      const hourlyWeatherDataTotal = [
        ...result.forecast.forecastday[0].hour,
        ...result.forecast.forecastday[1].hour,
      ];

      const geoInfo = {
        city: location.city ? location.city : location.subregion,
        state: location.region,
        countryCode: location.isoCountryCode,
      };

      setWeatherType(getThemeFromWeatherCode(weatherConditionCode, isDay));
      setLocationWeatherData(result.location);
      setCurrentWeatherData(result.current);
      setForecastWeatherData(result.forecast);
      setHourlyWeatherData(hourlyWeatherDataTotal);
      setLocationId(geoInfo);

      console.log('Weather Condition:', getThemeFromWeatherCode(weatherConditionCode, isDay));
    } catch (error) {
      console.error('Error fetching weather:', error);
      setError('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const fetchSearchData = async (value: string) => {
    if (value !== '') {
      try {
        console.log('searching for: ', value);
        const result = await getForecastWeather(value, 2, false);

        const weatherConditionCode = result.current.condition.code;
        const isDay = result.current.is_day;

        const hourlyWeatherDataTotal = [
          ...result.forecast.forecastday[0].hour,
          ...result.forecast.forecastday[1].hour,
        ];

        const location = await getCityFromCoords(result.location.lat, result.location.lon);

        const geoInfo = {
          city: location?.city ? location.city : location?.subregion,
          state: location?.region,
          countryCode: location?.isoCountryCode,
        };

        setWeatherType(getThemeFromWeatherCode(weatherConditionCode, isDay));
        setLocationWeatherData(result.location);
        setCurrentWeatherData(result.current);
        setForecastWeatherData(result.forecast);
        setHourlyWeatherData(hourlyWeatherDataTotal);
        setLocationId(geoInfo);

        console.log('Weather Condition:', getThemeFromWeatherCode(weatherConditionCode, isDay));
      } catch (error) {
        console.error('Error fetching weather:', error);
        setError('Failed to fetch weather data');
      }
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, [location]);

  return {
    locationWeatherData,
    currentWeatherData,
    forecastWeatherData,
    hourlyWeatherData,
    locationId,
    loading,
    error,
    fetchSearchData,
    refetch: fetchWeatherData,
  };
}
