import { useTheme } from '@/contexts/ThemeContext';
import { tempFormatted } from '@/lib/utils/utils';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';

interface HourInfoCardProps {
  hourlyInfo: {
    date: string;
    hour_12: string;
    hour_24: string;
    temp_c: number;
    temp_f: number;
    icon: string;
  };
  activeUnit: 'C' | 'F';
  loading: boolean;
}

const HourInfoCard: React.FC<HourInfoCardProps> = ({ hourlyInfo, activeUnit, loading }) => {
  const { colorScheme } = useTheme();

  if (loading) {
    return (
      <View style={[styles.loadingState, { backgroundColor: colorScheme.card }]}>
        <ActivityIndicator size={'large'} color={colorScheme.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.hourText, { color: colorScheme.text.primary }]}>
        {hourlyInfo.hour_12}
      </Text>

      <Image
        source={{ uri: `https:${hourlyInfo.icon}` }}
        resizeMode={'contain'}
        style={{ height: 60, width: 60 }}
      />

      <Text style={[styles.temperatureText, { color: colorScheme.text.primary }]}>
        {activeUnit === 'C' ? tempFormatted(hourlyInfo.temp_c) : tempFormatted(hourlyInfo.temp_f)}º
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 30,
    gap: 16,
    backgroundColor: 'rgba(248, 248, 248, .3)',
    alignSelf: 'flex-start',
  },

  hourText: {
    fontSize: 18,
    fontWeight: '500',
  },

  temperatureText: {
    fontSize: 25,
    fontWeight: '700',
  },

  loadingState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
});

export default HourInfoCard;
