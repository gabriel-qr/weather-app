# Weather App

A modern mobile weather application built with React Native and Expo, featuring dynamic theming, real-time forecasts, and an intuitive user experience.

## Features

- **Dynamic Theming:** The entire UI adapts its color scheme based on current weather conditions, creating an immersive experience that reflects the atmosphere outside.

- **Global City Search:** Access weather information for any location worldwide with intelligent search functionality.

- **12-Hour Visual Forecast:** An elegant, scrollable timeline displays hourly weather predictions, making it easy to plan your day at a glance.

- **Temperature Units:** Seamlessly toggle between Celsius and Fahrenheit to match your preference.

- **Location-Aware:** Automatically detects your current location on startup to deliver immediate, relevant weather data (with permission).

- **Localized Experience:** Dates are automatically formatted according to your device's language and regional settings for a native feel.

- **Real-Time Data:** Integrates with WeatherAPI to provide accurate, up-to-date weather information and forecasts.

## Tech Stack

- **React Native** - Cross-platform mobile development framework
- **Expo** - Development platform and toolchain
- **TypeScript** - Type-safe development for better code quality
- **React Context API** - Efficient state management for theming and app-wide data
- **Expo Location** - Geolocation services for automatic weather updates
- **Expo Localization** - Device language and region detection for proper date/time formatting
- **WeatherAPI** - Reliable weather data provider

## Setup

1. **Clone the repository:**

```bash
   git clone <your-repository-url>
   cd weather-app
```

2. **Install dependencies:**

```bash
   yarn install
```

3. **Configure environment variables:**

   Create a `.env` file in the root directory:

```
   EXPO_PUBLIC_API_KEY=your_api_key_here
```

Get your free API key from [WeatherAPI.com](https://www.weatherapi.com/)

4. **Start the development server:**

```bash
   yarn start
```

Use the Expo Go app on your device to scan the QR code, or run on an emulator with:

```bash
   yarn android  # for Android
   yarn ios      # for iOS
```

## Project Structure

The app showcases best practices in mobile development, including modular component architecture, efficient API data handling, and responsive design principles that work across different screen sizes and platforms.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
