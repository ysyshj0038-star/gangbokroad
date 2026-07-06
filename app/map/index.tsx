import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Platform, Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PlaceMapSheet } from '@/components/map/PlaceMapSheet';
import { TourMapView } from '@/components/map/TourMapView';
import { AppCard } from '@/components/ui/AppCard';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { useUserLocation } from '@/hooks/useUserLocation';
import { useAppTranslation, useLocalizedText } from '@/hooks/useAppTranslation';
import { useScheduleData } from '@/hooks/useScheduleData';
import { formatDistance, getDistanceKm } from '@/lib/geo/distance';

export default function MapScreen() {
  const { t } = useAppTranslation();
  const localize = useLocalizedText();
  const insets = useSafeAreaInsets();
  const { location, isLoading: locationLoading, refresh } = useUserLocation();
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
  const { getAllPlaces, days } = useScheduleData();

  const allPlaces = getAllPlaces();
  const mapPlaces = useMemo(
    () =>
      allPlaces.map((place) => ({
        ...place,
        label: localize(place.name),
      })),
    [localize, allPlaces],
  );

  const selectedPlace = selectedPlaceId ? allPlaces.find((p) => p.id === selectedPlaceId) : null;

  const distanceLabel = useMemo(() => {
    if (!selectedPlace || !location) return undefined;
    return formatDistance(
      getDistanceKm(location, selectedPlace.coordinates),
    );
  }, [selectedPlace, location]);

  const getPlaceDistance = (placeId: string) => {
    if (!location) return undefined;
    const place = allPlaces.find((p) => p.id === placeId);
    if (!place) return undefined;
    return formatDistance(getDistanceKm(location, place.coordinates));
  };

  return (
    <View className="flex-1 bg-cream">
      {Platform.OS !== 'web' ? (
        <TourMapView
          places={mapPlaces}
          selectedPlaceId={selectedPlaceId}
          userLocation={location}
          onPlaceSelect={setSelectedPlaceId}
        />
      ) : (
        <View className="flex-1 px-5 pt-16">
          <Text className="mb-2 text-2xl font-bold text-navy">{t('map.title')}</Text>
          <Text className="mb-4 text-sm text-muted">{t('map.webFallback')}</Text>
          {days.map((day) => {
            const dayPlaces = allPlaces.filter((p) => p.dayId === day.id);
            if (dayPlaces.length === 0) return null;
            return (
              <View key={day.id} className="mb-4">
                <SectionTitle title={t('common.day', { day: day.dayNumber })} />
                {dayPlaces.map((place) => (
                  <AppCard
                    key={place.id}
                    title={localize(place.name)}
                    subtitle={localize(place.description)}
                    badge={getPlaceDistance(place.id) ?? '—'}
                    onPress={() => router.push(`/schedule/place/${place.id}`)}
                    className="mb-2"
                  />
                ))}
              </View>
            );
          })}
        </View>
      )}

      {/* Header overlay */}
      {Platform.OS !== 'web' ? (
        <View
          className="absolute left-0 right-0 flex-row items-center justify-between px-4"
          style={{ top: insets.top + 8 }}
        >
          <Pressable
            onPress={() => router.back()}
            className="rounded-full bg-surface/95 px-4 py-2 shadow-sm"
          >
            <Text className="font-semibold text-navy">← {t('common.back')}</Text>
          </Pressable>
          <Pressable
            onPress={() => void refresh()}
            className="rounded-full bg-surface/95 px-4 py-2 shadow-sm"
          >
            <Text className="text-sm font-semibold text-taeguk-blue">
              📍 {locationLoading ? '...' : location ? t('map.currentLocation') : 'GPS'}
            </Text>
          </Pressable>
        </View>
      ) : null}

      {Platform.OS !== 'web' ? (
        <View
          className="absolute left-4 rounded-2xl bg-surface/95 px-4 py-3 shadow-sm"
          style={{ top: insets.top + 56 }}
        >
          <Text className="text-base font-bold text-navy">{t('map.title')}</Text>
          <Text className="text-xs text-muted">
            {allPlaces.length} {t('schedule.places')}
          </Text>
        </View>
      ) : null}

      {selectedPlace && Platform.OS !== 'web' ? (
        <PlaceMapSheet
          place={selectedPlace}
          placeName={localize(selectedPlace.name)}
          placeDescription={localize(selectedPlace.description)}
          distanceLabel={distanceLabel}
          distanceTitle={t('map.awayFromYou')}
          viewDetailsLabel={t('map.viewDetails')}
          askAiLabel={t('common.askAi')}
          audioGuideLabel={selectedPlace.hasAudioGuide ? t('schedule.aiAudioGuide') : undefined}
          onClose={() => setSelectedPlaceId(null)}
          onViewDetails={() => router.push(`/schedule/place/${selectedPlace.id}`)}
          onAskAi={() => router.push('/ai-guide')}
          onAudioGuide={
            selectedPlace.hasAudioGuide
              ? () => router.push(`/schedule/audio/${selectedPlace.id}`)
              : undefined
          }
        />
      ) : null}
    </View>
  );
}
