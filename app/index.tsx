import { router } from 'expo-router';
import { Text, View } from 'react-native';

import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { HeroBanner } from '@/components/ui/HeroBanner';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { MenuGrid, type MenuItem } from '@/components/ui/MenuGrid';
import { Theme } from '@/constants/theme';
import { getDDayCount } from '@/data/schedule';
import { useAppTranslation } from '@/hooks/useAppTranslation';

export default function HomeScreen() {
  const { t } = useAppTranslation();
  const dDayCount = getDDayCount();

  const dDayLabel =
    dDayCount > 0
      ? t('common.dDay', { days: dDayCount })
      : dDayCount === 0
        ? t('common.dDayToday')
        : undefined;

  const menuItems: MenuItem[] = [
    {
      key: 'schedule',
      label: t('home.menu.schedule'),
      href: '/schedule',
      icon: 'calendar-outline',
      color: Theme.colors.taegukBlue,
    },
    {
      key: 'map',
      label: t('home.menu.map'),
      href: '/map',
      icon: 'map-outline',
      color: Theme.colors.taegukRed,
    },
    {
      key: 'figures',
      label: t('home.menu.figures'),
      href: '/figures',
      icon: 'people-outline',
      color: Theme.colors.navy,
    },
    {
      key: 'aiGuide',
      label: t('home.menu.aiGuide'),
      href: '/ai-guide',
      icon: 'chatbubble-ellipses-outline',
      color: Theme.colors.taegukBlue,
    },
    {
      key: 'aiTranslate',
      label: t('home.menu.aiTranslate'),
      href: '/ai-translate',
      icon: 'language-outline',
      color: Theme.colors.taegukRed,
    },
    {
      key: 'practical',
      label: t('home.menu.practical'),
      href: '/practical',
      icon: 'information-circle-outline',
      color: Theme.colors.navy,
    },
    {
      key: 'resources',
      label: t('home.menu.resources'),
      href: '/resources',
      icon: 'folder-open-outline',
      color: Theme.colors.taegukBlue,
    },
  ];

  return (
    <ScreenContainer>
      <View className="pt-4">
        <View className="mb-5 items-end">
          <LanguageSwitcher />
        </View>

        <HeroBanner
          title={t('home.heroTitle')}
          subtitle={t('home.heroSubtitle')}
          dDayLabel={dDayLabel}
        />

        <View className="mb-4 mt-8 flex-row items-end justify-between">
          <Text className="text-lg font-bold text-navy">{t('common.appName')}</Text>
          <Text className="text-xs text-muted">{t('common.appSubtitle')}</Text>
        </View>

        <MenuGrid items={menuItems} onPress={(item) => router.push(item.href as never)} />
      </View>
    </ScreenContainer>
  );
}
