const baseURL = 'https://api.weatherapi.com/v1';
const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

export async function getForecatsWeather(location: string, days: number, showAlerts: boolean) {
  const alerts = showAlerts ? 'yes' : 'no';

  try {
    const response = await fetch(
      `${baseURL}/forecast.json?key=${API_KEY}&q=${location}&days=${days}&aqi=${alerts}`
    );
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error(error.message);
  }
}
