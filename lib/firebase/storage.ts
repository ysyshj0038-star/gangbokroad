import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  type UploadResult,
} from 'firebase/storage';

import { getFirebaseApp, isFirebaseConfigured } from './config';
import { STORAGE_PATHS } from './types';

export function getFirebaseStorage() {
  if (!isFirebaseConfigured()) {
    throw new Error('Firebase Storage requires configuration.');
  }
  return getStorage(getFirebaseApp());
}

export async function uploadFile(params: {
  path: string;
  blob: Blob;
  contentType?: string;
}): Promise<{ url: string; fullPath: string }> {
  const storageRef = ref(getFirebaseStorage(), params.path);
  const result: UploadResult = await uploadBytes(storageRef, params.blob, {
    contentType: params.contentType,
  });
  const url = await getDownloadURL(result.ref);
  return { url, fullPath: result.ref.fullPath };
}

export async function uploadResourceFile(params: {
  fileName: string;
  blob: Blob;
  contentType?: string;
}) {
  const safeName = params.fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
  const path = `${STORAGE_PATHS.resources}/${Date.now()}_${safeName}`;
  return uploadFile({ path, blob: params.blob, contentType: params.contentType });
}

export async function uploadImage(params: {
  fileName: string;
  blob: Blob;
  contentType?: string;
}) {
  const safeName = params.fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
  const path = `${STORAGE_PATHS.images}/${Date.now()}_${safeName}`;
  return uploadFile({ path, blob: params.blob, contentType: params.contentType });
}

export async function deleteFile(path: string) {
  await deleteObject(ref(getFirebaseStorage(), path));
}

export { STORAGE_PATHS };
