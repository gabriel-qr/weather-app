import { useTheme } from '@/contexts/ThemeContext';
import { getFormattedDate } from '@/lib/utils/timeUtils';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { StyleSheet, Text, View } from 'react-native';

interface BasicInfoCardProps {
  locationWeatherData: any;
  currentWeatherData: any;
  forecastWeatherData: any;
}

const BasicInfoCard: React.FC<BasicInfoCardProps> = ({
  locationWeatherData,
  currentWeatherData,
  forecastWeatherData,
}) => {
  const { colorScheme } = useTheme();
  const Date = getFormattedDate().date;
  const dayOfTheWeek = getFormattedDate().dayOfTheWeekCapitalized;

  const tempCelsius = (temp: string) => {
    return Number(temp).toFixed(0);
  };

  const currentTemp = tempCelsius(currentWeatherData.temp_c);
  const fellsLike = tempCelsius(currentWeatherData.feelslike_c);
  const maxTemp = tempCelsius(forecastWeatherData.forecastday[0].day.maxtemp_c);
  const minTemp = tempCelsius(forecastWeatherData.forecastday[0].day.mintemp_c);

  return (
    <View style={[styles.container, { backgroundColor: colorScheme.card }]}>
      <View style={styles.header}>
        <View style={[styles.locationContainer]}>
          <Ionicons name='location-outline' size={25} color={colorScheme.text.primary} />
          <Text style={[styles.locationText, { color: colorScheme.text.primary }]}>
            {locationWeatherData.name}, {locationWeatherData.region}
          </Text>
        </View>
        <Text
          style={[styles.secondaryText, { color: colorScheme.text.tertiary }]}
        >{`${dayOfTheWeek}, ${Date}`}</Text>
      </View>

      <View>
        <Text style={[styles.temperatureText, { color: colorScheme.text.primary }]}>
          {`${currentTemp}ºC`}
        </Text>
        <Text style={[styles.temperatureSubText, { color: colorScheme.text.primary }]}>
          {currentWeatherData.condition.text}
        </Text>
        <View>
          <View style={[styles.horizontalContainer, { marginTop: 8 }]}>
            <Text style={[styles.secondaryText, { color: colorScheme.text.tertiary }]}>
              Max:{' '}
              <Text style={[styles.temperatureSecondary, { color: colorScheme.text.primary }]}>
                {maxTemp}ºC
              </Text>
            </Text>

            <View style={[styles.divider, { backgroundColor: colorScheme.gray[400] }]} />

            <Text style={[styles.secondaryText, { color: colorScheme.text.tertiary }]}>
              Min:{' '}
              <Text style={[styles.temperatureSecondary, { color: colorScheme.text.primary }]}>
                {minTemp}ºC
              </Text>
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.horizontalContainer}>
        <View style={{ alignItems: 'center' }}>
          <Text style={[styles.secondaryText, { color: colorScheme.text.tertiary }]}>
            FEELS LIKE
          </Text>
          <Text
            style={[styles.secondaryText, { color: colorScheme.text.primary, fontWeight: '700' }]}
          >{`${fellsLike}ºC`}</Text>
        </View>

        <View style={[styles.divider, { backgroundColor: colorScheme.gray[400] }]} />

        <View>
          <View style={styles.bottomRight}>
            <MaterialCommunityIcons
              name='water-percent'
              size={15}
              color={colorScheme.text.tertiary}
            />
            <Text style={[styles.secondaryText, { color: colorScheme.text.tertiary }]}>
              HUMIDITY
            </Text>
          </View>
          <Text
            style={[
              styles.temperatureSubText,
              { color: colorScheme.text.primary, fontWeight: '700' },
            ]}
          >{`${currentWeatherData.humidity}%`}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingHorizontal: 18,
    paddingVertical: 30,
    borderRadius: 30,
    gap: 25,
  },

  header: {
    gap: 5,
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

  horizontalContainer: {
    flexDirection: 'row',
    gap: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },

  bottomRight: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -3,
  },

  secondaryText: {
    fontSize: 14,
    fontWeight: '400',
  },

  divider: {
    width: 2,
    minHeight: 15,
    maxHeight: '70%',
    alignItems: 'center',
    opacity: 0.3,
  },

  temperatureSecondary: {
    fontWeight: '700',
    fontSize: 16,
    height: 250,
  },
});

export default BasicInfoCard;
