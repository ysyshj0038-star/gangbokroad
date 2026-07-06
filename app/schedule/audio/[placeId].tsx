import { router, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { Text, View } from 'react-native';

import { AudioGuidePlayer } from '@/components/audio/AudioGuidePlayer';
import { LoadingPulse } from '@/components/audio/LoadingPulse';
import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { AppButton } from '@/components/ui/AppButton';
import { getFigure } from '@/data/figures';
import { useAudioGuide } from '@/hooks/useAudioGuide';
import { useAppTranslation, useLocalizedText } from '@/hooks/useAppTranslation';
import { useScheduleData } from '@/hooks/useScheduleData';

export default function AudioGuideScreen() {
  const { placeId } = useLocalSearchParams<{ placeId: string }>();
  const { t } = useAppTranslation();
  const localize = useLocalizedText();
  const guide = useAudioGuide();
  const { getPlace } = useScheduleData();

  const place = getPlace(placeId ?? '');

  useEffect(() => {
    if (!place || !guide.isConfigured) return;

    void guide.generate({
      placeId: place.id,
      placeName: localize(place.name),
      description: localize(place.description),
      historicalStory: localize(place.historicalStory),
      relatedFigures: place.figureIds
        .map((id) => getFigure(id))
        .filter(Boolean)
        .map((f) => localize(f!.name)),
    });
  }, [place?.id]);

  if (!place) {
    return (
      <View className="flex-1 items-center justify-center bg-cream">
        <Text className="text-navy">Place not found</Text>
      </View>
    );
  }

  const placeName = localize(place.name);

  return (
    <View className="flex-1 bg-cream">
      <ScreenHeader title={t('schedule.aiAudioGuide')} subtitle={placeName} onBack={() => router.back()} />
      <ScreenContainer>
        <View className="gap-4 pt-4">
          {!guide.isConfigured ? (
            <View className="rounded-2xl border border-taeguk-red/30 bg-taeguk-red/10 p-4">
              <Text className="text-sm text-taeguk-red">{t('ai.notConfigured')}</Text>
            </View>
          ) : null}

          {guide.state === 'generating-script' ? (
            <LoadingPulse message={t('ai.generatingScript')} />
          ) : null}

          {guide.state === 'generating-audio' ? (
            <LoadingPulse message={t('ai.generatingAudio')} />
          ) : null}

          {guide.state === 'error' ? (
            <View className="gap-3">
              <View className="rounded-2xl border border-taeguk-red/30 bg-taeguk-red/10 p-4">
                <Text className="text-sm text-taeguk-red">{guide.error ?? t('common.error')}</Text>
              </View>
              <AppButton
                label={t('common.retry')}
                onPress={() =>
                  void guide.generate({
                    placeId: place.id,
                    placeName,
                    description: localize(place.description),
                    historicalStory: localize(place.historicalStory),
                    relatedFigures: place.figureIds
                      .map((id) => getFigure(id))
                      .filter(Boolean)
                      .map((f) => localize(f!.name)),
                  })
                }
              />
            </View>
          ) : null}

          {guide.state === 'ready' && guide.audioUri ? (
            <AudioGuidePlayer audioUri={guide.audioUri} script={guide.script} title={placeName} />
          ) : null}
        </View>
      </ScreenContainer>
    </View>
  );
}
