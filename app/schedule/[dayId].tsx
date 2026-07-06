import { router, useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

import { PlaceTimelineCard } from '@/components/schedule/PlaceTimelineCard';
import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { AppButton } from '@/components/ui/AppButton';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { TimelineRoute } from '@/components/ui/TimelineRoute';
import { useAppTranslation, useLocalizedText } from '@/hooks/useAppTranslation';
import { useScheduleData } from '@/hooks/useScheduleData';

export default function DayDetailScreen() {
  const { dayId } = useLocalSearchParams<{ dayId: string }>();
  const { t } = useAppTranslation();
  const localize = useLocalizedText();
  const { getDay, getPlacesByDay } = useScheduleData();

  const day = getDay(dayId ?? '');
  const dayPlaces = getPlacesByDay(dayId ?? '');

  if (!day) {
    return (
      <View className="flex-1 items-center justify-center bg-cream">
        <Text className="text-navy">Day not found</Text>
      </View>
    );
  }

  const routeStops = day.route.map((stop) => localize(stop));

  return (
    <View className="flex-1 bg-cream">
      <ScreenHeader
        title={t('common.day', { day: day.dayNumber })}
        subtitle={localize(day.dateLabel)}
        onBack={() => router.back()}
      />
      <ScreenContainer>
        <View className="gap-6 pt-4">
          <View className="rounded-2xl border border-border bg-surface p-4">
            <SectionTitle title={t('schedule.routeTitle')} />
            <TimelineRoute stops={routeStops} />
          </View>

          {dayPlaces.length > 0 ? (
            <View>
              <SectionTitle
                title={t('schedule.places')}
                subtitle={t('schedule.placeCount', { count: dayPlaces.length })}
              />
              {dayPlaces.map((place, index) => (
                <PlaceTimelineCard
                  key={place.id}
                  place={place}
                  isLast={index === dayPlaces.length - 1}
                  onPress={() => router.push(`/schedule/place/${place.id}`)}
                />
              ))}
            </View>
          ) : (
            <View className="rounded-2xl border border-border bg-surface p-4">
              <TimelineRoute stops={routeStops} compact />
            </View>
          )}

          <AppButton label={t('schedule.viewOnMap')} variant="outline" onPress={() => router.push('/map')} />
        </View>
      </ScreenContainer>
    </View>
  );
}
