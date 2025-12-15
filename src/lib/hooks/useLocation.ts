import { getCurrentPositionAsync, reverseGeocodeAsync } from 'expo-location';
import { useState } from 'react';

export function useLocation() {
  const [loading, setLoading] = useState(false);

  const getCurrentPosition = async () => {
    try {
      setLoading(true);
      const position = await getCurrentPositionAsync();

      return {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    } catch (error) {
      console.error('Error getting location: ', error);

      return null;
    } finally {
      setLoading(false);
    }
  };

  const getCityFromCoords = async (lat: number, lng: number) => {
    try {
      setLoading(true);

      const result = await reverseGeocodeAsync({
        latitude: lat,
        longitude: lng,
      });

      return result[0];
    } catch (error) {
      console.error('Error getting location: ', error);

      return null;
    } finally {
      setLoading(false);
    }
  };

  return { getCurrentPosition, getCityFromCoords, loading };
}
