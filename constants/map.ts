import { Theme } from '@/constants/theme';

export const DAY_MARKER_COLORS: Record<string, string> = {
  day1: Theme.colors.taegukRed,
  day2: Theme.colors.taegukBlue,
  day3: Theme.colors.navy,
  day4: '#D97706',
  day5: Theme.colors.taegukRed,
};

export const DEFAULT_MAP_CAMERA = {
  coordinates: { latitude: 43.85, longitude: 131.75 },
  zoom: 6,
};
