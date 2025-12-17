import { useTheme } from '@/contexts/ThemeContext';
import { useFont } from '@shopify/react-native-skia';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { CartesianChart, Line } from 'victory-native';

interface ForecastChartdProps {
  chartInfo: [];
  activeUnit: 'C' | 'F';
  loading?: boolean;
}

const ForecastChart: React.FC<ForecastChartdProps> = ({ chartInfo, activeUnit, loading }) => {
  const refTemps = chartInfo.reduce(
    (refTemps, item: any) => ({
      minC: Math.min(refTemps.minC, item.temp_c),
      maxC: Math.max(refTemps.maxC, item.temp_c),
      minF: Math.min(refTemps.minF, item.temp_f),
      maxF: Math.max(refTemps.maxF, item.temp_f),
    }),
    {
      minC: Infinity,
      maxC: -Infinity,
      minF: Infinity,
      maxF: -Infinity,
    }
  );

  const { colorScheme } = useTheme();

  const font = useFont(require('../../assets/fonts/Inter-Regular.ttf'), 11);

  if (loading) {
    return (
      <View style={[styles.loadingState, { backgroundColor: colorScheme.card }]}>
        <ActivityIndicator size={'large'} color={colorScheme.primary} />
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colorScheme.card,
        },
      ]}
    >
      <Text style={{ fontSize: 16, fontWeight: '700', color: colorScheme.text.primary }}>
        NEXT 12H
      </Text>

      <CartesianChart
        data={chartInfo}
        padding={{ top: 10 }}
        xKey='hour_12'
        yKeys={[activeUnit === 'C' ? 'temp_c' : 'temp_f']}
        axisOptions={{
          font,
          labelColor: colorScheme.black,
          labelOffset: { x: 5, y: 5 },
          lineWidth: 0,
          formatYLabel: (value) => `${value}°`,
          formatXLabel: (value) => String(value).replace(' ', '').toLowerCase(),
          tickCount: { x: 6, y: 5 },
        }}
        domain={{
          y:
            activeUnit === 'C'
              ? [refTemps.minC - 2, refTemps.maxC + 2]
              : [refTemps.minF - 5, refTemps.maxF + 5],
        }}
        domainPadding={{ left: 20, right: 20 }}
      >
        {({ points }) => (
          <>
            <Line
              points={activeUnit === 'C' ? points.temp_c : points.temp_f}
              color={colorScheme.chart.lineAlt}
              strokeWidth={2}
              curveType='natural'
            />
          </>
        )}
      </CartesianChart>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 350,
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 30,
    gap: 20,
  },

  loadingState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
});

export default ForecastChart;
