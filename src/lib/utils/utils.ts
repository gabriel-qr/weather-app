import { getCalendars, getLocales } from 'expo-localization';

export const getFormattedDate = () => {
  const now = new Date();
  const userTimeZone = getCalendars()[0].timeZone;
  const userLocale = getLocales()[0].languageTag;

  const date = new Intl.DateTimeFormat(userLocale, {
    dateStyle: 'medium',
    timeZone: userTimeZone!,
  }).format(now);

  const dayOfTheWeek = new Intl.DateTimeFormat(userLocale, { weekday: 'long' }).format(now);
  const dayOfTheWeekCapitalized = dayOfTheWeek.charAt(0).toUpperCase() + dayOfTheWeek.slice(1);

  return { date, dayOfTheWeekCapitalized };
};

export const tempFormatted = (temp: string | number) => {
  return Number(temp).toFixed(0);
};
