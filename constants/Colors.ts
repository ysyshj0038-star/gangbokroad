import { Theme } from './theme';

export default {
  light: {
    text: Theme.colors.navy,
    background: Theme.colors.cream,
    tint: Theme.colors.taegukBlue,
    tabIconDefault: Theme.colors.muted,
    tabIconSelected: Theme.colors.taegukBlue,
    card: Theme.colors.white,
    border: Theme.colors.border,
    accent: Theme.colors.taegukRed,
  },
  dark: {
    text: Theme.colors.cream,
    background: Theme.colors.navyDark,
    tint: Theme.colors.taegukBlue,
    tabIconDefault: Theme.colors.muted,
    tabIconSelected: Theme.colors.taegukBlue,
    card: Theme.colors.navy,
    border: Theme.colors.navyLight,
    accent: Theme.colors.taegukRed,
  },
};
