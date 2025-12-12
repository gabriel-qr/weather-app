import BasicInfoCard from '@/components/BasicInfoCard';
import SearchInput from '@/components/searchBar';
import { useTheme } from '@/contexts/ThemeContext';
import { useLocationPermission } from '@/lib/hooks/useLocationPermission';
import { useWeatherData } from '@/lib/hooks/useWeatherData';
import { LinearGradient } from 'expo-linear-gradient';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  const { colorScheme, isReady } = useTheme();
  const { hasPermission } = useLocationPermission({
    autoCheck: true,
    onGranted: () => console.log('Permission granted!'),
    onDenied: () => console.log('Permission denied'),
  });
  const { weatherData, loading } = useWeatherData();
  // const currentTemperature = `${Number(weatherData.current.temp_c).toFixed(0)}ºC`;

  if (loading || !isReady) {
    return (
      <View style={[styles.loadingState, { backgroundColor: '#1a1a1a' }]}>
        <ActivityIndicator size={'large'} color='#ffffff' />
      </View>
    );
  }

  return (
    <LinearGradient
      colors={colorScheme.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>
          <SearchInput placeholder='Search something..' />
          <BasicInfoCard weatherData={weatherData} />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  loadingState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  gradient: {
    flex: 1,
  },

  safeArea: {
    flex: 1,
  },

  container: {
    flex: 1,
    gap: 25,
    padding: '5%',
  },

  currentCard: {
    justifyContent: 'center',
    padding: 20,
    borderRadius: 25,
    gap: 16,
  },

  locationContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },

  locationText: {
    fontSize: 20,
    fontWeight: '500',
  },

  temperatureText: {
    fontSize: 40,
    fontWeight: '700',
    alignSelf: 'center',
  },

  temperatureSubText: {
    fontSize: 14,
    fontWeight: '400',
    alignSelf: 'center',
  },
});
