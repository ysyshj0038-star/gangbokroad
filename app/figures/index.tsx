import { router } from 'expo-router';
import { View } from 'react-native';

import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { FigurePortraitCard } from '@/components/ui/FigurePortraitCard';
import { getFigureImage } from '@/constants/images';
import { figures } from '@/data/figures';
import { useAppTranslation, useLocalizedText } from '@/hooks/useAppTranslation';

export default function FiguresScreen() {
  const { t } = useAppTranslation();
  const localize = useLocalizedText();

  return (
    <View className="flex-1 bg-cream">
      <ScreenHeader title={t('figures.title')} onBack={() => router.back()} />
      <ScreenContainer>
        <View className="gap-4 pt-4">
          {figures.map((figure) => (
            <FigurePortraitCard
              key={figure.id}
              name={localize(figure.name)}
              birthDeath={figure.birthDeath}
              quote={localize(figure.quote)}
              imageSource={getFigureImage(figure.id)}
              onPress={() => router.push(`/figures/${figure.id}`)}
            />
          ))}
        </View>
      </ScreenContainer>
    </View>
  );
}
