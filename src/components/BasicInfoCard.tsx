import { useTheme } from '@/contexts/ThemeContext';
import { getFormattedDate, tempFormatted } from '@/lib/utils/utils';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { StyleSheet, Text, View } from 'react-native';

interface BasicInfoCardProps {
  locationWeatherData: any;
  currentWeatherData: any;
  forecastWeatherData: any;
  activeUnit: 'C' | 'F';
}

const BasicInfoCard: React.FC<BasicInfoCardProps> = ({
  locationWeatherData,
  currentWeatherData,
  forecastWeatherData,
  activeUnit,
}) => {
  const { colorScheme } = useTheme();
  const Date = getFormattedDate().date;
  const dayOfTheWeek = getFormattedDate().dayOfTheWeekCapitalized;

  const currentTemp =
    activeUnit === 'C'
      ? tempFormatted(currentWeatherData.temp_c)
      : tempFormatted(currentWeatherData.temp_f);

  const fellsLike = tempFormatted(
    activeUnit === 'C' ? currentWeatherData.feelslike_c : currentWeatherData.feelslike_f
  );

  const maxTemp = tempFormatted(
    activeUnit === 'C'
      ? forecastWeatherData.forecastday[0].day.maxtemp_c
      : forecastWeatherData.forecastday[0].day.maxtemp_f
  );

  const minTemp = tempFormatted(
    activeUnit === 'C'
      ? forecastWeatherData.forecastday[0].day.mintemp_c
      : forecastWeatherData.forecastday[0].day.mintemp_f
  );

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
          {`${currentTemp}º`}
        </Text>
        <Text style={[styles.temperatureSubText, { color: colorScheme.text.primary }]}>
          {currentWeatherData.condition.text}
        </Text>
        <View>
          <View style={[styles.horizontalContainer, { marginTop: 8 }]}>
            <Text style={[styles.secondaryText, { color: colorScheme.text.secondary }]}>
              Max:{' '}
              <Text style={[styles.temperatureSecondary, { color: colorScheme.text.primary }]}>
                {`${maxTemp}º`}
              </Text>
            </Text>

            <View style={[styles.divider, { backgroundColor: colorScheme.gray[400] }]} />

            <Text style={[styles.secondaryText, { color: colorScheme.text.secondary }]}>
              Min:{' '}
              <Text style={[styles.temperatureSecondary, { color: colorScheme.text.primary }]}>
                {`${minTemp}º`}
              </Text>
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.horizontalContainer}>
        <View style={{ alignItems: 'center' }}>
          <Text style={[styles.secondaryText, { color: colorScheme.text.secondary }]}>
            FEELS LIKE
          </Text>
          <Text
            style={[
              styles.secondaryText,
              { color: colorScheme.text.primary, fontWeight: '700', fontSize: 18 },
            ]}
          >{`${fellsLike}º`}</Text>
        </View>

        <View style={[styles.divider, { backgroundColor: colorScheme.gray[400] }]} />

        <View>
          <View style={styles.bottomRight}>
            <MaterialCommunityIcons
              name='water-percent'
              size={15}
              color={colorScheme.text.secondary}
            />
            <Text style={[styles.secondaryText, { color: colorScheme.text.secondary }]}>
              HUMIDITY
            </Text>
          </View>
          <Text
            style={[
              styles.temperatureSubText,
              { color: colorScheme.text.primary, fontWeight: '700', fontSize: 18 },
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
    paddingHorizontal: 20,
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
    height: '70%',
    alignItems: 'center',
    opacity: 0.5,
  },

  temperatureSecondary: {
    fontWeight: '700',
    fontSize: 16,
    height: 250,
  },
});

export default BasicInfoCard;
