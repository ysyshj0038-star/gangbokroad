export const Theme = {
  colors: {
    navy: '#1B2A4A',
    navyLight: '#2A3F6B',
    navyDark: '#0F1A2E',
    taegukRed: '#CD2E3A',
    taegukBlue: '#0047A0',
    cream: '#F8F9FC',
    white: '#FFFFFF',
    muted: '#6B7280',
    border: '#E5E7EB',
    success: '#059669',
    warning: '#D97706',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 9999,
  },
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },
} as const;

export type ThemeColors = typeof Theme.colors;
