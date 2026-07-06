import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  type Unsubscribe,
} from 'firebase/firestore';

import { COLLECTIONS, type FirestoreNotice } from '../types';
import { getDb, timestampToIso } from './client';

function mapNotice(id: string, data: Record<string, unknown>): FirestoreNotice {
  return {
    id,
    title: data.title as FirestoreNotice['title'],
    body: data.body as FirestoreNotice['body'],
    isPinned: Boolean(data.isPinned),
    createdBy: String(data.createdBy ?? ''),
    createdAt: timestampToIso(data.createdAt),
    updatedAt: timestampToIso(data.updatedAt),
  };
}

export function subscribeToNotices(callback: (notices: FirestoreNotice[]) => void): Unsubscribe {
  const q = query(collection(getDb(), COLLECTIONS.notices), orderBy('createdAt', 'desc'));

  return onSnapshot(q, (snapshot) => {
    const notices = snapshot.docs.map((item) => mapNotice(item.id, item.data()));
    notices.sort((a, b) => {
      if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    callback(notices);
  });
}

export async function createNotice(params: {
  title: FirestoreNotice['title'];
  body: FirestoreNotice['body'];
  isPinned?: boolean;
  createdBy: string;
}) {
  const docRef = await addDoc(collection(getDb(), COLLECTIONS.notices), {
    title: params.title,
    body: params.body,
    isPinned: params.isPinned ?? false,
    createdBy: params.createdBy,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return docRef.id;
}

export async function updateNotice(
  noticeId: string,
  updates: Partial<Pick<FirestoreNotice, 'title' | 'body' | 'isPinned'>>,
) {
  await updateDoc(doc(getDb(), COLLECTIONS.notices, noticeId), {
    ...updates,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteNotice(noticeId: string) {
  await deleteDoc(doc(getDb(), COLLECTIONS.notices, noticeId));
}
