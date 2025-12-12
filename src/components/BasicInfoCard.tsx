import { useTheme } from '@/contexts/ThemeContext';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { StyleSheet, Text, View } from 'react-native';

interface BasicInfoCardProps {
  weatherData: any;
}

const BasicInfoCard: React.FC<BasicInfoCardProps> = ({ weatherData }) => {
  const { colorScheme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colorScheme.card }]}>
      <View style={[styles.locationContainer]}>
        <Ionicons name='location-outline' size={25} color={colorScheme.text.primary} />
        <Text style={[styles.locationText, { color: colorScheme.text.primary }]}>
          {weatherData.location.name}, {weatherData.location.region}
        </Text>
      </View>

      <View>
        <Text style={[styles.temperatureText, { color: colorScheme.text.primary }]}>
          {`${Number(weatherData.current.temp_c).toFixed(0)}ºC`}
        </Text>
        <Text style={[styles.temperatureSubText, { color: colorScheme.text.primary }]}>
          {weatherData.current.condition.text}
        </Text>
      </View>

      <View style={styles.bottomContainer}>
        <View>
          <Text style={[styles.temperatureSubText, { color: colorScheme.text.secondary }]}>
            FEELS LIKE
          </Text>
          <Text
            style={[
              styles.temperatureSubText,
              { color: colorScheme.text.primary, fontWeight: '700' },
            ]}
          >{`${Number(weatherData.current.feelslike_c).toFixed(0)}ºC`}</Text>
        </View>

        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcons
              name='water-percent'
              size={15}
              color={colorScheme.text.secondary}
            />
            <Text style={[styles.temperatureSubText, { color: colorScheme.text.secondary }]}>
              HUMIDITY
            </Text>
          </View>
          <Text
            style={[
              styles.temperatureSubText,
              { color: colorScheme.text.primary, fontWeight: '700' },
            ]}
          >{`${weatherData.current.humidity}%`}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
    fontSize: 16,
    fontWeight: '400',
    alignSelf: 'center',
  },

  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default BasicInfoCard;
