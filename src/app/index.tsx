import BasicInfoCard from '@/components/BasicInfoCard';
import HourInfoCard from '@/components/HourInfoCard';
import SearchInput from '@/components/searchBar';
import TemperatureToggle from '@/components/TemperatureToggle';
import { useTheme } from '@/contexts/ThemeContext';
import { useLocationPermission } from '@/lib/hooks/useLocationPermission';
import { useWeatherData } from '@/lib/hooks/useWeatherData';
import { hour12Formatted, hour24Formatted } from '@/lib/utils/utils';
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
    locationId,
    fetchSearchData,
  } = useWeatherData();

  const [activeUnit, setActiveUnit] = useState<'C' | 'F'>('C');
  const [searchText, setSearchText] = useState('');
  const [searching, setSearching] = useState(false);

  const dateNow = locationWeatherData.localtime?.split(' ')[0];
  const hourNow = locationWeatherData.localtime?.split(' ')[1].slice(0, 2);

  const hourlyInfo = hourlyWeatherData.map((item: any) => ({
    date: item.time.split(' ')[0],
    hour_24: hour24Formatted(item.time),
    hour_12: hour12Formatted(item.time),
    temp_c: item.temp_c,
    temp_f: item.temp_f,
    icon: item.condition.icon,
  }));

  const filteredHourlyInfo = hourlyInfo
    .filter(
      (item: any) => (item.date === dateNow && item.hour_24 > hourNow) || item.date !== dateNow
    )
    .slice(0, 12);

  const handleUnitChange = (unit: 'C' | 'F') => {
    setActiveUnit(unit);
  };

  const handleSearch = async (value: string) => {
    if (value !== '') {
      try {
        setSearching(true);
        await fetchSearchData(value);
        setSearchText('');
      } catch (error) {
        console.error('Erro na busca:', error);
      } finally {
        setSearching(false);
      }
    }
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
            <SearchInput
              placeholder='Search by city...'
              value={searchText}
              onChangeText={setSearchText}
              onSubmitEditing={() => handleSearch(searchText)}
              returnKeyType='search'
              onSearch={() => handleSearch(searchText)}
            />
            <TemperatureToggle activeUnit={activeUnit} onChange={handleUnitChange} />
          </View>
          <BasicInfoCard
            locationWeatherData={locationWeatherData}
            currentWeatherData={currentWeatherData}
            forecastWeatherData={forecastWeatherData}
            activeUnit={activeUnit}
            locationId={locationId}
            loading={searching}
          />

          {!searching && (
            <View style={[styles.flatListContainer, { backgroundColor: colorScheme.card }]}>
              <Text style={[styles.text, { color: colorScheme.text.primary }]}>
                Hourly Forecast
              </Text>
              <FlatList
                contentContainerStyle={styles.flatlist}
                data={filteredHourlyInfo}
                keyExtractor={(item, index) => index.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <HourInfoCard activeUnit={activeUnit} hourlyInfo={item} />
                )}
              />
            </View>
          )}
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
    paddingBottom: 25,
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
    gap: 16,
  },
});
