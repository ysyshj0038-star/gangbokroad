import { useEffect, useMemo, useState } from 'react';

import { places as localPlaces } from '@/data/places';
import { scheduleDays as localDays } from '@/data/schedule';
import {
  isFirebaseConfigured,
  subscribeToScheduleDays,
  subscribeToSchedulePlaces,
  type FirestoreScheduleDay,
  type FirestoreSchedulePlace,
} from '@/lib/firebase';
import type { Place } from '@/types/place';
import type { ScheduleDay } from '@/types/schedule';

function toScheduleDay(day: FirestoreScheduleDay): ScheduleDay {
  return {
    id: day.id,
    dayNumber: day.dayNumber,
    date: day.date,
    dateLabel: day.dateLabel,
    route: day.route,
    placeIds: day.placeIds,
  };
}

function toPlace(fsPlace: FirestoreSchedulePlace): Place {
  const local = localPlaces.find((item) => item.id === fsPlace.id);

  return {
    id: fsPlace.id,
    dayId: fsPlace.dayId,
    order: fsPlace.order,
    name: fsPlace.name,
    description: fsPlace.description,
    historicalStory: fsPlace.historicalStory,
    imageUrl: fsPlace.imageUrl,
    imageGradient: local?.imageGradient,
    coordinates: fsPlace.coordinates ?? local?.coordinates ?? { latitude: 0, longitude: 0 },
    figureIds: fsPlace.figureIds,
    hasAudioGuide: fsPlace.hasAudioGuide ?? local?.hasAudioGuide ?? false,
  };
}

export function useScheduleData() {
  const [days, setDays] = useState<ScheduleDay[]>(localDays);
  const [places, setPlaces] = useState<Place[]>(localPlaces);
  const [isLoading, setIsLoading] = useState(isFirebaseConfigured());
  const [source, setSource] = useState<'local' | 'firestore'>('local');

  useEffect(() => {
    if (!isFirebaseConfigured()) {
      setIsLoading(false);
      return;
    }

    let firestoreDays: FirestoreScheduleDay[] = [];
    let firestorePlaces: FirestoreSchedulePlace[] = [];
    let daysReady = false;
    let placesReady = false;

    const applyData = () => {
      if (!daysReady || !placesReady) return;

      setIsLoading(false);

      if (firestoreDays.length > 0) {
        setDays(firestoreDays.map(toScheduleDay));
        setSource('firestore');
      }

      if (firestorePlaces.length > 0) {
        setPlaces(firestorePlaces.map(toPlace));
        setSource('firestore');
      }
    };

    const unsubscribeDays = subscribeToScheduleDays((items) => {
      firestoreDays = items;
      daysReady = true;
      applyData();
    });

    const unsubscribePlaces = subscribeToSchedulePlaces((items) => {
      firestorePlaces = items;
      placesReady = true;
      applyData();
    });

    return () => {
      unsubscribeDays();
      unsubscribePlaces();
    };
  }, []);

  return useMemo(
    () => ({
      days,
      places,
      isLoading,
      source,
      getDay: (dayId: string) => days.find((day) => day.id === dayId),
      getPlace: (placeId: string) => places.find((place) => place.id === placeId),
      getPlacesByDay: (dayId: string) =>
        places.filter((place) => place.dayId === dayId).sort((a, b) => a.order - b.order),
      getAllPlaces: () =>
        [...places].sort((a, b) => {
          const dayCompare = a.dayId.localeCompare(b.dayId);
          return dayCompare !== 0 ? dayCompare : a.order - b.order;
        }),
    }),
    [days, places, isLoading, source],
  );
}
