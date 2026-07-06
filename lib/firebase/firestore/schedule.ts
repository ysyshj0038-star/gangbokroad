import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  type Unsubscribe,
} from 'firebase/firestore';

import { COLLECTIONS, type FirestoreScheduleDay, type FirestoreSchedulePlace } from '../types';
import { getDb, timestampToIso } from './client';

function mapDay(id: string, data: Record<string, unknown>): FirestoreScheduleDay {
  return {
    id,
    dayNumber: Number(data.dayNumber ?? 0),
    date: String(data.date ?? ''),
    dateLabel: data.dateLabel as FirestoreScheduleDay['dateLabel'],
    route: (data.route as FirestoreScheduleDay['route']) ?? [],
    placeIds: (data.placeIds as string[]) ?? [],
    updatedAt: timestampToIso(data.updatedAt),
  };
}

function mapPlace(id: string, data: Record<string, unknown>): FirestoreSchedulePlace {
  return {
    id,
    dayId: String(data.dayId ?? ''),
    order: Number(data.order ?? 0),
    name: data.name as FirestoreSchedulePlace['name'],
    description: data.description as FirestoreSchedulePlace['description'],
    historicalStory: data.historicalStory as FirestoreSchedulePlace['historicalStory'],
    imageUrl: data.imageUrl as string | undefined,
    coordinates: data.coordinates as FirestoreSchedulePlace['coordinates'],
    figureIds: (data.figureIds as string[]) ?? [],
    hasAudioGuide: Boolean(data.hasAudioGuide),
    updatedAt: timestampToIso(data.updatedAt),
  };
}

export function subscribeToScheduleDays(
  callback: (days: FirestoreScheduleDay[]) => void,
): Unsubscribe {
  const q = query(collection(getDb(), COLLECTIONS.scheduleDays), orderBy('dayNumber', 'asc'));

  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map((item) => mapDay(item.id, item.data())));
  });
}

export function subscribeToSchedulePlaces(
  callback: (places: FirestoreSchedulePlace[]) => void,
): Unsubscribe {
  const q = query(collection(getDb(), COLLECTIONS.schedulePlaces), orderBy('order', 'asc'));

  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map((item) => mapPlace(item.id, item.data())));
  });
}

export async function upsertScheduleDay(
  day: Omit<FirestoreScheduleDay, 'updatedAt'>,
): Promise<void> {
  await setDoc(
    doc(getDb(), COLLECTIONS.scheduleDays, day.id),
    {
      dayNumber: day.dayNumber,
      date: day.date,
      dateLabel: day.dateLabel,
      route: day.route,
      placeIds: day.placeIds,
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );
}

export async function upsertSchedulePlace(
  place: Omit<FirestoreSchedulePlace, 'updatedAt'>,
): Promise<void> {
  await setDoc(
    doc(getDb(), COLLECTIONS.schedulePlaces, place.id),
    {
      dayId: place.dayId,
      order: place.order,
      name: place.name,
      description: place.description,
      historicalStory: place.historicalStory,
      imageUrl: place.imageUrl ?? null,
      coordinates: place.coordinates ?? null,
      figureIds: place.figureIds,
      hasAudioGuide: place.hasAudioGuide,
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );
}

export async function seedScheduleFromLocal(
  days: Omit<FirestoreScheduleDay, 'updatedAt'>[],
  places: Omit<FirestoreSchedulePlace, 'updatedAt'>[],
): Promise<void> {
  await Promise.all([
    ...days.map((day) => upsertScheduleDay(day)),
    ...places.map((place) => upsertSchedulePlace(place)),
  ]);
}
