import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Auth,
  User,
  createUserWithEmailAndPassword,
  getAuth,
  initializeAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';

import { getFirebaseApp, isFirebaseConfigured } from './config';
import { createUserProfile, getUserProfile } from './firestore/users';
import type { UserRole } from './types';

function getRnPersistence() {
  const { getReactNativePersistence } = require('@firebase/auth/dist/rn/index.js') as {
    getReactNativePersistence: (storage: typeof AsyncStorage) => import('firebase/auth').Persistence;
  };
  return getReactNativePersistence(AsyncStorage);
}

let auth: Auth | null = null;

export function getFirebaseAuth(): Auth {
  if (!isFirebaseConfigured()) {
    throw new Error('Firebase Auth requires configuration.');
  }

  if (!auth) {
    const app = getFirebaseApp();
    try {
      auth = initializeAuth(app, {
        persistence: getRnPersistence(),
      });
    } catch {
      auth = getAuth(app);
    }
  }

  return auth;
}

export function subscribeToAuthState(callback: (user: User | null) => void) {
  if (!isFirebaseConfigured()) {
    callback(null);
    return () => {};
  }

  return onAuthStateChanged(getFirebaseAuth(), callback);
}

export async function signIn(email: string, password: string) {
  const result = await signInWithEmailAndPassword(getFirebaseAuth(), email, password);
  return result.user;
}

export async function signUp(params: {
  email: string;
  password: string;
  displayName: string;
  organization?: string;
  role?: UserRole;
}) {
  const result = await createUserWithEmailAndPassword(
    getFirebaseAuth(),
    params.email,
    params.password,
  );

  await updateProfile(result.user, { displayName: params.displayName });

  await createUserProfile({
    uid: result.user.uid,
    email: params.email,
    displayName: params.displayName,
    organization: params.organization,
    role: params.role ?? 'participant',
  });

  return result.user;
}

export async function signOutUser() {
  await signOut(getFirebaseAuth());
}

export async function getCurrentUserProfile() {
  const user = getFirebaseAuth().currentUser;
  if (!user) return null;
  return getUserProfile(user.uid);
}

export async function isCurrentUserAdmin() {
  const profile = await getCurrentUserProfile();
  return profile?.role === 'admin';
}
