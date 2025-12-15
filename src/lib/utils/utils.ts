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

export const tempFormatted = (temp: number) => {
  return Math.round(temp);
};

export const hour24Formatted = (time: string) => {
  return new Date(time).toLocaleTimeString('en-US', {
    hour: 'numeric',
    hour12: false,
  });
};

export const hour12Formatted = (time: string) => {
  return new Date(time).toLocaleTimeString('en-US', {
    hour: 'numeric',
    hour12: true,
  });
};
