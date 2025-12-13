import BasicInfoCard from '@/components/BasicInfoCard';
import HourInfoCard from '@/components/HourInfoCard';
import SearchInput from '@/components/searchBar';
import TemperatureToggle from '@/components/TemperatureToggle';
import { useTheme } from '@/contexts/ThemeContext';
import { useLocationPermission } from '@/lib/hooks/useLocationPermission';
import { useWeatherData } from '@/lib/hooks/useWeatherData';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  const { colorScheme, isReady } = useTheme();
  const { hasPermission } = useLocationPermission({
    autoCheck: true,
    onGranted: () => console.log('Permission granted!'),
    onDenied: () => console.log('Permission denied'),
  });
  const {
    locationWeatherData,
    currentWeatherData,
    forecastWeatherData,
    hourlyWeatherData,
    loading,
  } = useWeatherData();

  const [activeUnit, setActiveUnit] = useState<'C' | 'F'>('C');

  const hourlyInfo = hourlyWeatherData.map((item: any) => ({
    hour: item.time.slice(-5, -3),
    temp_c: item.temp_c,
    temp_f: item.temp_f,
    icon: item.condition.icon,
  }));

  const handleUnitChange = (unit: 'C' | 'F') => {
    setActiveUnit(unit);
  };

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
          <View style={styles.header}>
            <SearchInput placeholder='Search something..' />
            <TemperatureToggle activeUnit={activeUnit} onChange={handleUnitChange} />
          </View>
          <BasicInfoCard
            locationWeatherData={locationWeatherData}
            currentWeatherData={currentWeatherData}
            forecastWeatherData={forecastWeatherData}
            activeUnit={activeUnit}
          />

          <View style={[styles.flatListContainer, { backgroundColor: colorScheme.card }]}>
            <Text style={[styles.text, { color: colorScheme.text.primary }]}>Hourly Forecast</Text>
            <FlatList
              contentContainerStyle={styles.flatlist}
              data={hourlyInfo}
              keyExtractor={(item, index) => index.toString()}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => <HourInfoCard activeUnit={activeUnit} hourlyInfo={item} />}
            />
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

  header: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },

  text: {
    fontSize: 20,
    fontWeight: '600',
  },

  flatListContainer: {
    width: '100%',
    paddingVertical: 30,
    paddingHorizontal: 16,
    borderRadius: 25,
    gap: 20,
  },

  flatlist: {
    paddingHorizontal: 2,
    gap: 8,
  },
});
