import { useEffect, useState } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';

import { AdminField, AdminSectionTitle } from '@/components/admin/AdminField';
import { AppButton } from '@/components/ui/AppButton';
import { scheduleDays as localDays } from '@/data/schedule';
import { places as localPlaces } from '@/data/places';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { seedScheduleFromLocal, upsertScheduleDay } from '@/lib/firebase';
import type { ScheduleDay } from '@/types/schedule';

type Props = {
  days: ScheduleDay[];
};

function linesToRoute(koLines: string, enLines: string) {
  const koStops = koLines
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
  const enStops = enLines
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  return koStops.map((ko, index) => ({
    ko,
    en: enStops[index] ?? ko,
  }));
}

function routeToLines(route: ScheduleDay['route']) {
  return {
    ko: route.map((stop) => stop.ko).join('\n'),
    en: route.map((stop) => stop.en).join('\n'),
  };
}

export function AdminScheduleSection({ days }: Props) {
  const { t } = useAppTranslation();
  const sourceDays = days.length > 0 ? days : localDays;
  const [selectedDayId, setSelectedDayId] = useState(sourceDays[0]?.id ?? 'day1');
  const [dateLabelKo, setDateLabelKo] = useState('');
  const [dateLabelEn, setDateLabelEn] = useState('');
  const [routeKo, setRouteKo] = useState('');
  const [routeEn, setRouteEn] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);

  const selectedDay = sourceDays.find((day) => day.id === selectedDayId);

  useEffect(() => {
    if (!selectedDay) return;

    setDateLabelKo(selectedDay.dateLabel.ko);
    setDateLabelEn(selectedDay.dateLabel.en);
    const lines = routeToLines(selectedDay.route);
    setRouteKo(lines.ko);
    setRouteEn(lines.en);
  }, [selectedDay]);

  const handleSaveDay = async () => {
    if (!selectedDay) return;

    setIsSaving(true);
    try {
      await upsertScheduleDay({
        id: selectedDay.id,
        dayNumber: selectedDay.dayNumber,
        date: selectedDay.date,
        dateLabel: {
          ko: dateLabelKo.trim(),
          en: dateLabelEn.trim() || dateLabelKo.trim(),
        },
        route: linesToRoute(routeKo, routeEn),
        placeIds: selectedDay.placeIds,
      });
      Alert.alert(t('admin.scheduleSaved'));
    } catch {
      Alert.alert(t('common.error'));
    } finally {
      setIsSaving(false);
    }
  };

  const handleSeed = async () => {
    setIsSeeding(true);
    try {
      await seedScheduleFromLocal(
        localDays.map((day) => ({
          id: day.id,
          dayNumber: day.dayNumber,
          date: day.date,
          dateLabel: day.dateLabel,
          route: day.route,
          placeIds: day.placeIds,
        })),
        localPlaces.map((place) => ({
          id: place.id,
          dayId: place.dayId,
          order: place.order,
          name: place.name,
          description: place.description,
          historicalStory: place.historicalStory,
          imageUrl: place.imageUrl,
          coordinates: place.coordinates,
          figureIds: place.figureIds,
          hasAudioGuide: place.hasAudioGuide,
        })),
      );
      Alert.alert(t('admin.scheduleSeeded'));
    } catch {
      Alert.alert(t('common.error'));
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <View className="gap-4 rounded-2xl border border-border bg-surface p-4">
      <AdminSectionTitle title={t('admin.schedule')} subtitle={t('admin.scheduleHint')} />

      <AppButton
        label={t('admin.seedSchedule')}
        variant="outline"
        onPress={() => void handleSeed()}
        disabled={isSeeding}
      />

      <View className="flex-row flex-wrap gap-2">
        {sourceDays.map((day) => (
          <Pressable
            key={day.id}
            onPress={() => setSelectedDayId(day.id)}
            className={`rounded-full px-4 py-2 ${
              selectedDayId === day.id ? 'bg-navy' : 'border border-border bg-cream'
            }`}
          >
            <Text
              className={`text-sm font-medium ${
                selectedDayId === day.id ? 'text-white' : 'text-navy'
              }`}
            >
              {t('common.day', { day: day.dayNumber })}
            </Text>
          </Pressable>
        ))}
      </View>

      {selectedDay ? (
        <>
          <AdminField label={t('admin.dateLabelKo')} value={dateLabelKo} onChangeText={setDateLabelKo} />
          <AdminField label={t('admin.dateLabelEn')} value={dateLabelEn} onChangeText={setDateLabelEn} />
          <AdminField
            label={t('admin.routeKo')}
            value={routeKo}
            onChangeText={setRouteKo}
            multiline
            placeholder={t('admin.routePlaceholder')}
          />
          <AdminField
            label={t('admin.routeEn')}
            value={routeEn}
            onChangeText={setRouteEn}
            multiline
            placeholder={t('admin.routePlaceholder')}
          />
          <AppButton
            label={t('admin.saveSchedule')}
            onPress={() => void handleSaveDay()}
            disabled={isSaving || !dateLabelKo.trim()}
          />
        </>
      ) : null}
    </View>
  );
}
