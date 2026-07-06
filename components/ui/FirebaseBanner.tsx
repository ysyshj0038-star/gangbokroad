import { Text, View } from 'react-native';

import { useAppTranslation } from '@/hooks/useAppTranslation';

type FirebaseBannerProps = {
  compact?: boolean;
};

export function FirebaseBanner({ compact }: FirebaseBannerProps) {
  const { t } = useAppTranslation();

  return (
    <View className={`rounded-2xl border border-taeguk-blue/20 bg-taeguk-blue/5 ${compact ? 'p-3' : 'p-4'}`}>
      <Text className="text-sm font-semibold text-taeguk-blue">{t('firebase.notConfigured')}</Text>
      {!compact ? (
        <Text className="mt-1 text-sm leading-5 text-muted">{t('firebase.notConfiguredDesc')}</Text>
      ) : null}
    </View>
  );
}
