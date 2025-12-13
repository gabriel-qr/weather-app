import { useTheme } from '@/contexts/ThemeContext';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type ActiveUnit = 'C' | 'F';

interface TemperatureToggleProps {
  activeUnit: ActiveUnit;
  onChange?: (unit: ActiveUnit) => void;
}

const TemperatureToggle = ({ activeUnit, onChange }: TemperatureToggleProps) => {
  const { colorScheme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colorScheme.card }]}>
      <TouchableOpacity
        style={[
          styles.button,
          activeUnit === 'C'
            ? { backgroundColor: colorScheme.white }
            : { backgroundColor: colorScheme.transparent },
        ]}
        activeOpacity={0.8}
        onPress={() => onChange?.('C')}
      >
        <Text
          style={[
            styles.text,
            activeUnit === 'C'
              ? { color: colorScheme.gray[900], fontWeight: '700' }
              : { color: colorScheme.gray[600] },
          ]}
        >
          ºC
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          activeUnit === 'F'
            ? { backgroundColor: colorScheme.white }
            : { backgroundColor: colorScheme.transparent },
        ]}
        activeOpacity={0.8}
        onPress={() => onChange?.('F')}
      >
        <Text
          style={[
            styles.text,
            activeUnit === 'F'
              ? { color: colorScheme.gray[900], fontWeight: '700' }
              : { color: colorScheme.gray[600] },
          ]}
        >
          ºF
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 16,
    padding: 5,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 12,
  },
  text: {
    fontWeight: '500',
    fontSize: 14,
  },
});

export default TemperatureToggle;
