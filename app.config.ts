import type { ExpoConfig } from 'expo/config';

const base = require('./app.json').expo as ExpoConfig;

const locationPermission =
  '탐방 중 현재 위치와 방문지까지의 거리를 표시하기 위해 위치 정보를 사용합니다.';

const easProjectId = [
  process.env.EAS_PROJECT_ID,
  process.env.EXPO_PUBLIC_EAS_PROJECT_ID,
  base.extra?.eas?.projectId,
].find((value) => value && value !== 'YOUR_EAS_PROJECT_ID');

export default (): ExpoConfig => ({
  ...base,
  ios: {
    ...base.ios,
    buildNumber: '1',
    infoPlist: {
      ...base.ios?.infoPlist,
      NSLocationWhenInUseUsageDescription: locationPermission,
      UIBackgroundModes: ['audio'],
    },
  },
  android: {
    ...base.android,
    versionCode: 1,
    permissions: [
      'ACCESS_COARSE_LOCATION',
      'ACCESS_FINE_LOCATION',
      'POST_NOTIFICATIONS',
      'VIBRATE',
    ],
    config: {
      ...base.android?.config,
      googleMaps: {
        apiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY ?? '',
      },
    },
  },
  extra: {
    ...base.extra,
    eas: {
      ...base.extra?.eas,
      projectId: easProjectId,
    },
    appVariant: process.env.APP_VARIANT ?? 'development',
  },
  plugins: [
    ...(base.plugins ?? []),
    [
      'expo-maps',
      {
        requestLocationPermission: true,
        locationPermission,
      },
    ],
    [
      'expo-location',
      {
        locationWhenInUsePermission: locationPermission,
      },
    ],
    [
      'expo-notifications',
      {
        icon: './assets/images/android-icon-monochrome.png',
        color: '#1B2A4A',
      },
    ],
  ],
});
