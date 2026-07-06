import { router } from 'expo-router';
import * as Linking from 'expo-linking';
import { ActivityIndicator, Text, View } from 'react-native';

import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { AppCard } from '@/components/ui/AppCard';
import { FirebaseBanner } from '@/components/ui/FirebaseBanner';
import { useAppTranslation, useLocalizedText } from '@/hooks/useAppTranslation';
import { useNotices } from '@/hooks/useNotices';
import { useResources } from '@/hooks/useResources';

export default function ResourcesScreen() {
  const { t } = useAppTranslation();
  const localize = useLocalizedText();
  const { notices, isLoading: noticesLoading, isConfigured } = useNotices();
  const { resources, isLoading: resourcesLoading } = useResources();

  return (
    <View className="flex-1 bg-cream">
      <ScreenHeader title={t('resources.title')} onBack={() => router.back()} />
      <ScreenContainer>
        <View className="gap-4 pt-4">
          {!isConfigured ? <FirebaseBanner /> : null}

          <Text className="text-base font-bold text-navy">{t('resources.notices')}</Text>
          {noticesLoading ? (
            <ActivityIndicator color="#0047A0" />
          ) : notices.length === 0 ? (
            <AppCard title={t('firebase.noNotices')} />
          ) : (
            notices.map((notice) => (
              <AppCard
                key={notice.id}
                title={localize(notice.title)}
                subtitle={localize(notice.body)}
                badge={notice.isPinned ? t('firebase.pinned') : undefined}
              />
            ))
          )}

          <Text className="mt-2 text-base font-bold text-navy">{t('resources.references')}</Text>
          {resourcesLoading ? (
            <ActivityIndicator color="#0047A0" />
          ) : resources.length === 0 ? (
            <AppCard title={t('firebase.noResources')} subtitle={t('resources.download')} />
          ) : (
            resources.map((resource) => (
              <AppCard
                key={resource.id}
                title={localize(resource.title)}
                subtitle={localize(resource.description)}
                badge={resource.type}
                onPress={
                  resource.fileUrl
                    ? () => void Linking.openURL(resource.fileUrl!)
                    : undefined
                }
              />
            ))
          )}
        </View>
      </ScreenContainer>
    </View>
  );
}
