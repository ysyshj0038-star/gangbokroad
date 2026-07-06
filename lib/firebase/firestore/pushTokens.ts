import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  serverTimestamp,
  setDoc,
  type Unsubscribe,
} from 'firebase/firestore';
import { Platform } from 'react-native';

import { COLLECTIONS, type FirestorePushToken } from '../types';
import { getDb, timestampToIso } from './client';

export function pushTokenDocId(token: string): string {
  return token.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 200);
}

function mapToken(id: string, data: Record<string, unknown>): FirestorePushToken {
  return {
    id,
    token: String(data.token ?? ''),
    userId: data.userId as string | undefined,
    platform: (data.platform as FirestorePushToken['platform']) ?? 'unknown',
    updatedAt: timestampToIso(data.updatedAt),
  };
}

export async function registerPushToken(params: {
  token: string;
  userId?: string;
}): Promise<void> {
  const docId = pushTokenDocId(params.token);
  await setDoc(
    doc(getDb(), COLLECTIONS.pushTokens, docId),
    {
      token: params.token,
      userId: params.userId ?? null,
      platform: Platform.OS,
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );
}

export function subscribeToPushTokens(
  callback: (tokens: FirestorePushToken[]) => void,
): Unsubscribe {
  return onSnapshot(collection(getDb(), COLLECTIONS.pushTokens), (snapshot) => {
    callback(snapshot.docs.map((item) => mapToken(item.id, item.data())));
  });
}

export async function getAllPushTokens(): Promise<FirestorePushToken[]> {
  const snapshot = await getDocs(collection(getDb(), COLLECTIONS.pushTokens));
  return snapshot.docs.map((item) => mapToken(item.id, item.data()));
}
