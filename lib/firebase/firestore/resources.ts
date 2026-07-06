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

import { COLLECTIONS, type FirestoreResource } from '../types';
import { getDb, timestampToIso } from './client';

function mapResource(id: string, data: Record<string, unknown>): FirestoreResource {
  return {
    id,
    title: data.title as FirestoreResource['title'],
    description: data.description as FirestoreResource['description'],
    type: data.type as FirestoreResource['type'],
    fileUrl: data.fileUrl as string | undefined,
    fileName: data.fileName as string | undefined,
    fileSize: data.fileSize as number | undefined,
    uploadedBy: String(data.uploadedBy ?? ''),
    createdAt: timestampToIso(data.createdAt),
    updatedAt: timestampToIso(data.updatedAt),
  };
}

export function subscribeToResources(
  callback: (resources: FirestoreResource[]) => void,
): Unsubscribe {
  const q = query(collection(getDb(), COLLECTIONS.resources), orderBy('createdAt', 'desc'));

  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map((item) => mapResource(item.id, item.data())));
  });
}

export async function createResource(params: {
  title: FirestoreResource['title'];
  description: FirestoreResource['description'];
  type: FirestoreResource['type'];
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  uploadedBy: string;
}) {
  const docRef = await addDoc(collection(getDb(), COLLECTIONS.resources), {
    ...params,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return docRef.id;
}

export async function updateResource(
  resourceId: string,
  updates: Partial<
    Pick<FirestoreResource, 'title' | 'description' | 'type' | 'fileUrl' | 'fileName' | 'fileSize'>
  >,
) {
  await updateDoc(doc(getDb(), COLLECTIONS.resources, resourceId), {
    ...updates,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteResource(resourceId: string) {
  await deleteDoc(doc(getDb(), COLLECTIONS.resources, resourceId));
}
