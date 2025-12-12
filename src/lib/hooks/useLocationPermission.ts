import { useForegroundPermissions } from 'expo-location';
import { useEffect } from 'react';
import { Alert, Linking } from 'react-native';

interface UseLocationPermissionOptions {
  autoCheck?: boolean;
  onGranted?: () => void;
  onDenied?: () => void;
}

export const useLocationPermission = (options: UseLocationPermissionOptions = {}) => {
  const { autoCheck = true, onGranted, onDenied } = options;
  const [permission, requestPermission] = useForegroundPermissions();

  const checkPermission = async (): Promise<boolean> => {
    try {
      if (permission?.granted) {
        onGranted?.();
        return true;
      }

      const response = await requestPermission();

      if (response.granted) {
        onGranted?.();
        return true;
      }

      // Permission denied
      const isPermanent = !response.canAskAgain;

      Alert.alert(
        isPermanent ? 'Permission Denied' : 'Permission Required',
        isPermanent
          ? 'Please enable location access in your device settings.'
          : 'We need access to your location.',
        [
          { text: 'Cancel', style: 'cancel', onPress: onDenied },
          {
            text: isPermanent ? 'Open Settings' : 'Try Again',
            onPress: isPermanent ? Linking.openSettings : checkPermission,
          },
        ]
      );

      return false;
    } catch (error) {
      console.error('Error checking permission:', error);
      Alert.alert('Error', 'Could not verify location permission.');
      return false;
    }
  };

  useEffect(() => {
    if (autoCheck && permission && !permission.granted) {
      checkPermission();
    } else if (autoCheck && permission?.granted) {
      onGranted?.();
    }
  }, [autoCheck, permission?.granted]);

  return {
    permission,
    checkPermission,
    hasPermission: permission?.granted ?? false,
  };
};
