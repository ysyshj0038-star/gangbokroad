import { router, useLocalSearchParams } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { AppButton } from '@/components/ui/AppButton';
import { AppCard } from '@/components/ui/AppCard';
import { PlaceImageHeader } from '@/components/ui/PlaceImageHeader';
import { QuoteBlock } from '@/components/ui/QuoteBlock';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { getFigureImage, getPlaceImage } from '@/constants/images';
import { getFigure } from '@/data/figures';
import { useAppTranslation, useLocalizedText } from '@/hooks/useAppTranslation';
import { useScheduleData } from '@/hooks/useScheduleData';

export default function FigureDetailScreen() {
  const { figureId } = useLocalSearchParams<{ figureId: string }>();
  const { t } = useAppTranslation();
  const localize = useLocalizedText();
  const insets = useSafeAreaInsets();
  const { getPlace } = useScheduleData();

  const figure = getFigure(figureId ?? '');

  if (!figure) {
    return (
      <View className="flex-1 items-center justify-center bg-cream">
        <Text className="text-navy">Figure not found</Text>
      </View>
    );
  }

  const relatedPlaces = figure.relatedPlaceIds.map((id) => getPlace(id)).filter(Boolean);

  return (
    <View className="flex-1 bg-cream">
      <ScreenHeader
        title={localize(figure.name)}
        subtitle={figure.birthDeath}
        onBack={() => router.back()}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
      >
        <PlaceImageHeader
          title={localize(figure.name)}
          subtitle={figure.birthDeath}
          imageSource={getFigureImage(figure.id)}
          height={240}
        />

        <View className="gap-4 px-5 pt-5">
          <QuoteBlock quote={localize(figure.quote)} author={localize(figure.name)} />

          <View className="rounded-2xl border border-border bg-surface p-4">
            <SectionTitle title={t('figures.biography')} />
            <Text className="text-base leading-7 text-navy">{localize(figure.biography)}</Text>
          </View>

          <View className="rounded-2xl border border-border bg-surface p-4">
            <SectionTitle title={t('figures.achievements')} />
            {figure.achievements.map((item, index) => (
              <View key={index} className="mb-2 flex-row">
                <Text className="mr-2 font-bold text-taeguk-blue">{index + 1}.</Text>
                <Text className="flex-1 text-sm leading-6 text-navy">{localize(item)}</Text>
              </View>
            ))}
          </View>

          {relatedPlaces.length > 0 ? (
            <View>
              <SectionTitle title={t('figures.relatedPlaces')} />
              {relatedPlaces.map((place) =>
                place ? (
                  <AppCard
                    key={place.id}
                    title={localize(place.name)}
                    subtitle={localize(place.description)}
                    onPress={() => router.push(`/schedule/place/${place.id}`)}
                    className="mb-3"
                  />
                ) : null,
              )}
            </View>
          ) : null}

          <View className="rounded-2xl border border-dashed border-border bg-cream p-4">
            <SectionTitle title={t('figures.videos')} subtitle="7단계에서 영상 콘텐츠를 추가합니다." />
          </View>

          {figure.referenceUrls && figure.referenceUrls.length > 0 ? (
            <View className="rounded-2xl border border-border bg-surface p-4">
              <SectionTitle title={t('figures.references')} />
              {figure.referenceUrls.map((url, index) => (
                <Text key={index} className="mb-1 text-sm text-taeguk-blue">
                  • {url}
                </Text>
              ))}
            </View>
          ) : null}

          <AppButton label={t('figures.aiExplanation')} onPress={() => router.push('/ai-guide')} />
        </View>
      </ScrollView>
    </View>
  );
}
