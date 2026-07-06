export const COLLECTIONS = {
  users: 'users',
  notices: 'notices',
  resources: 'resources',
  scheduleDays: 'scheduleDays',
  schedulePlaces: 'schedulePlaces',
  pushTokens: 'pushTokens',
} as const;

export const STORAGE_PATHS = {
  resources: 'resources',
  images: 'images',
  profilePhotos: 'profilePhotos',
} as const;

export type UserRole = 'admin' | 'participant';

export type FirestoreUser = {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  organization?: string;
  createdAt: string;
  updatedAt: string;
};

export type FirestoreNotice = {
  id: string;
  title: { ko: string; en: string };
  body: { ko: string; en: string };
  isPinned: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
};

export type FirestoreResource = {
  id: string;
  title: { ko: string; en: string };
  description: { ko: string; en: string };
  type: 'reference' | 'document' | 'video';
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  uploadedBy: string;
  createdAt: string;
  updatedAt: string;
};

export type FirestoreScheduleDay = {
  id: string;
  dayNumber: number;
  date: string;
  dateLabel: { ko: string; en: string };
  route: { ko: string; en: string }[];
  placeIds: string[];
  updatedAt: string;
};

export type FirestoreSchedulePlace = {
  id: string;
  dayId: string;
  order: number;
  name: { ko: string; en: string };
  description: { ko: string; en: string };
  historicalStory: { ko: string; en: string };
  imageUrl?: string;
  coordinates?: { latitude: number; longitude: number };
  figureIds: string[];
  hasAudioGuide: boolean;
  updatedAt: string;
};

export type FirestorePushToken = {
  id: string;
  token: string;
  userId?: string;
  platform: 'ios' | 'android' | 'web' | 'unknown';
  updatedAt: string;
};
