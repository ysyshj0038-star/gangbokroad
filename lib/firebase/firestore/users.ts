import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';

import { COLLECTIONS, type FirestoreUser, type UserRole } from '../types';
import { getDb, timestampToIso } from './client';

export async function createUserProfile(params: {
  uid: string;
  email: string;
  displayName: string;
  organization?: string;
  role?: UserRole;
}) {
  const now = new Date().toISOString();
  const profile: Omit<FirestoreUser, 'uid'> & { uid: string } = {
    uid: params.uid,
    email: params.email,
    displayName: params.displayName,
    organization: params.organization,
    role: params.role ?? 'participant',
    createdAt: now,
    updatedAt: now,
  };

  await setDoc(doc(getDb(), COLLECTIONS.users, params.uid), {
    ...profile,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return profile;
}

export async function getUserProfile(uid: string): Promise<FirestoreUser | null> {
  const snapshot = await getDoc(doc(getDb(), COLLECTIONS.users, uid));
  if (!snapshot.exists()) return null;

  const data = snapshot.data();
  return {
    uid: snapshot.id,
    email: data.email,
    displayName: data.displayName,
    role: data.role,
    organization: data.organization,
    createdAt: timestampToIso(data.createdAt),
    updatedAt: timestampToIso(data.updatedAt),
  };
}

export async function updateUserProfile(
  uid: string,
  updates: Partial<Pick<FirestoreUser, 'displayName' | 'organization' | 'role'>>,
) {
  await updateDoc(doc(getDb(), COLLECTIONS.users, uid), {
    ...updates,
    updatedAt: serverTimestamp(),
  });
}
