import SearchInput from '@/components/searchBar';
import { useTheme } from '@/contexts/ThemeContext';
import { colors } from '@/lib/constants/colors';
import { useLocationPermission } from '@/lib/hooks/useLocationPermission';
import { useWeatherData } from '@/lib/hooks/useWeatherData';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  const { colorScheme, isReady } = useTheme();
  const { hasPermission } = useLocationPermission({
    autoCheck: true,
    onGranted: () => console.log('Permission granted!'),
    onDenied: () => console.log('Permission denied'),
  });
  const { weatherData, loading } = useWeatherData();

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
          <View style={[styles.locationContainer]}>
            <Ionicons name='location-outline' size={30} color={colors.white} />
            <Text style={[styles.locationText]}>
              {weatherData.location.name}, {weatherData.location.region}
            </Text>
          </View>
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

  locationContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },

  locationText: {
    fontSize: 24,
    fontWeight: '600',
  },
});
