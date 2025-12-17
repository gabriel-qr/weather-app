import { WeatherType } from '../constants/themes';

type WeatherCodeMapping = {
  [key: number]: {
    day: WeatherType;
    night: WeatherType;
  };
};

export const weatherCodeToTheme: WeatherCodeMapping = {
  1000: { day: 'sunny', night: 'night' },

  1003: { day: 'cloudy', night: 'night' },

  1006: { day: 'cloudy', night: 'cloudy' },
  1009: { day: 'cloudy', night: 'cloudy' },

  1030: { day: 'cloudy', night: 'cloudy' },
  1135: { day: 'cloudy', night: 'cloudy' },
  1147: { day: 'cloudy', night: 'cloudy' },

  1063: { day: 'rainy', night: 'rainy' },
  1150: { day: 'rainy', night: 'rainy' },
  1153: { day: 'rainy', night: 'rainy' },
  1180: { day: 'rainy', night: 'rainy' },
  1183: { day: 'rainy', night: 'rainy' },

  1186: { day: 'rainy', night: 'rainy' },
  1189: { day: 'rainy', night: 'rainy' },
  1192: { day: 'rainy', night: 'rainy' },
  1195: { day: 'rainy', night: 'rainy' },
  1240: { day: 'rainy', night: 'rainy' },
  1243: { day: 'rainy', night: 'rainy' },
  1246: { day: 'rainy', night: 'rainy' },

  1072: { day: 'rainy', night: 'rainy' },
  1168: { day: 'rainy', night: 'rainy' },
  1171: { day: 'rainy', night: 'rainy' },
  1198: { day: 'rainy', night: 'rainy' },
  1201: { day: 'rainy', night: 'rainy' },

  1087: { day: 'rainy', night: 'rainy' },
  1273: { day: 'rainy', night: 'rainy' },
  1276: { day: 'rainy', night: 'rainy' },

  1066: { day: 'cloudy', night: 'cloudy' },
  1114: { day: 'cloudy', night: 'cloudy' },
  1117: { day: 'cloudy', night: 'cloudy' },
  1210: { day: 'cloudy', night: 'cloudy' },
  1213: { day: 'cloudy', night: 'cloudy' },
  1216: { day: 'cloudy', night: 'cloudy' },
  1219: { day: 'cloudy', night: 'cloudy' },
  1222: { day: 'cloudy', night: 'cloudy' },
  1225: { day: 'cloudy', night: 'cloudy' },
  1255: { day: 'cloudy', night: 'cloudy' },
  1258: { day: 'cloudy', night: 'cloudy' },
  1279: { day: 'cloudy', night: 'cloudy' },
  1282: { day: 'cloudy', night: 'cloudy' },

  1069: { day: 'cloudy', night: 'cloudy' },
  1204: { day: 'cloudy', night: 'cloudy' },
  1207: { day: 'cloudy', night: 'cloudy' },
  1237: { day: 'cloudy', night: 'cloudy' },
  1249: { day: 'cloudy', night: 'cloudy' },
  1252: { day: 'cloudy', night: 'cloudy' },
  1261: { day: 'cloudy', night: 'cloudy' },
  1264: { day: 'cloudy', night: 'cloudy' },
};

export const getThemeFromWeatherCode = (code: number, isDay: boolean): WeatherType => {
  const mapping = weatherCodeToTheme[code];

  if (!mapping) {
    return isDay ? 'cloudy' : 'night';
  }

  return isDay ? mapping.day : mapping.night;
};
