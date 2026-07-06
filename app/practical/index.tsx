import { router } from 'expo-router';
import { View } from 'react-native';

import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { PracticalSectionCard } from '@/components/ui/PracticalSectionCard';
import { practicalSections } from '@/data/practical';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import type { Ionicons } from '@expo/vector-icons';

export default function PracticalScreen() {
  const { t } = useAppTranslation();

  return (
    <View className="flex-1 bg-cream">
      <ScreenHeader title={t('practical.title')} onBack={() => router.back()} />
      <ScreenContainer>
        <View className="gap-4 pt-4">
          {practicalSections.map((section) => (
            <PracticalSectionCard
              key={section.id}
              icon={section.icon as keyof typeof Ionicons.glyphMap}
              title={section.title}
              items={section.items}
            />
          ))}
        </View>
      </ScreenContainer>
    </View>
  );
}
