import { getCalendars, getLocales } from 'expo-localization';

export const getFormattedDate = (localtime: string, timeZone?: string) => {
  const now = new Date(localtime.replace(' ', 'T'));
  const userTimeZone = timeZone ? timeZone : getCalendars()[0].timeZone;
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
