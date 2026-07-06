import { router } from 'expo-router';
import { View } from 'react-native';

import { ScheduleDayCard } from '@/components/schedule/ScheduleDayCard';
import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { useAppTranslation, useLocalizedText } from '@/hooks/useAppTranslation';
import { useScheduleData } from '@/hooks/useScheduleData';

export default function ScheduleScreen() {
  const { t } = useAppTranslation();
  const localize = useLocalizedText();
  const { days, getPlacesByDay } = useScheduleData();

  return (
    <View className="flex-1 bg-cream">
      <ScreenHeader title={t('schedule.title')} onBack={() => router.back()} />
      <ScreenContainer>
        <View className="gap-4 pt-4">
          {days.map((day) => (
            <ScheduleDayCard
              key={day.id}
              dayNumber={day.dayNumber}
              dateLabel={localize(day.dateLabel)}
              routeStops={day.route.map((stop) => localize(stop))}
              placeCountLabel={
                getPlacesByDay(day.id).length > 0
                  ? t('schedule.placeCount', { count: getPlacesByDay(day.id).length })
                  : undefined
              }
              onPress={() => router.push(`/schedule/${day.id}`)}
            />
          ))}
        </View>
      </ScreenContainer>
    </View>
  );
}
