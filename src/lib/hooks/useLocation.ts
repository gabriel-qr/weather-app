import { getCurrentPositionAsync } from 'expo-location';
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

  return { getCurrentPosition, loading };
}
