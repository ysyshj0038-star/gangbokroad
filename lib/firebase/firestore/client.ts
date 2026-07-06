import { getFirestore, type Firestore } from 'firebase/firestore';

import { getFirebaseApp, isFirebaseConfigured } from '../config';

let db: Firestore | null = null;

export function getDb(): Firestore {
  if (!isFirebaseConfigured()) {
    throw new Error('Firestore requires Firebase configuration.');
  }

  if (!db) {
    db = getFirestore(getFirebaseApp());
  }

  return db;
}

export function timestampToIso(value: unknown): string {
  if (value && typeof value === 'object' && 'toDate' in value) {
    return (value as { toDate: () => Date }).toDate().toISOString();
  }
  if (typeof value === 'string') return value;
  return new Date().toISOString();
}
