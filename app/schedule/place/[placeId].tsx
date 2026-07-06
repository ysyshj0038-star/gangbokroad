import { router, useLocalSearchParams } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { AppButton } from '@/components/ui/AppButton';
import { AppCard } from '@/components/ui/AppCard';
import { AudioGuideButton } from '@/components/ui/AudioGuideButton';
import { PlaceImageHeader } from '@/components/ui/PlaceImageHeader';
import { QuoteBlock } from '@/components/ui/QuoteBlock';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { getPlaceImage } from '@/constants/images';
import { getFigure } from '@/data/figures';
import { useAppTranslation, useLocalizedText } from '@/hooks/useAppTranslation';
import { useScheduleData } from '@/hooks/useScheduleData';

export default function PlaceDetailScreen() {
  const { placeId } = useLocalSearchParams<{ placeId: string }>();
  const { t } = useAppTranslation();
  const localize = useLocalizedText();
  const insets = useSafeAreaInsets();
  const { getPlace } = useScheduleData();

  const place = getPlace(placeId ?? '');

  if (!place) {
    return (
      <View className="flex-1 items-center justify-center bg-cream">
        <Text className="text-navy">Place not found</Text>
      </View>
    );
  }

  const relatedFigures = place.figureIds.map((id) => getFigure(id)).filter(Boolean);

  return (
    <View className="flex-1 bg-cream">
      <ScreenHeader title={localize(place.name)} onBack={() => router.back()} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
      >
        <PlaceImageHeader
          title={localize(place.name)}
          subtitle={localize(place.description)}
          imageSource={getPlaceImage(place.id, place.imageUrl)}
          gradient={place.imageGradient}
        />

        <View className="gap-4 px-5 pt-5">
          {place.hasAudioGuide ? (
            <AudioGuideButton
              label={t('schedule.aiAudioGuide')}
              onPress={() => router.push(`/schedule/audio/${place.id}`)}
            />
          ) : null}

          <View className="rounded-2xl border border-border bg-surface p-4">
            <SectionTitle title={t('figures.biography')} />
            <Text className="text-base leading-7 text-navy">{localize(place.historicalStory)}</Text>
          </View>

          {relatedFigures.length > 0 ? (
            <View>
              <SectionTitle title={t('schedule.relatedFigures')} />
              {relatedFigures.map((figure) =>
                figure ? (
                  <View key={figure.id} className="mb-3">
                    <QuoteBlock quote={localize(figure.quote)} author={localize(figure.name)} />
                    <AppCard
                      title={localize(figure.name)}
                      subtitle={figure.birthDeath}
                      onPress={() => router.push(`/figures/${figure.id}`)}
                      className="mt-2"
                    />
                  </View>
                ) : null,
              )}
            </View>
          ) : null}

          <AppButton
            label={t('common.askAi')}
            onPress={() => router.push('/ai-guide')}
          />
          <AppButton
            label={t('schedule.viewOnMap')}
            variant="outline"
            onPress={() => router.push('/map')}
          />
        </View>
      </ScrollView>
    </View>
  );
}
