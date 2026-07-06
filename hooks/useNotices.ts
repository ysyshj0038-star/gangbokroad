import { useEffect, useState } from 'react';

import { isFirebaseConfigured, subscribeToNotices, type FirestoreNotice } from '@/lib/firebase';

export function useNotices() {
  const [notices, setNotices] = useState<FirestoreNotice[]>([]);
  const [isLoading, setIsLoading] = useState(isFirebaseConfigured());
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isFirebaseConfigured()) {
      setIsLoading(false);
      return;
    }

    try {
      const unsubscribe = subscribeToNotices((items) => {
        setNotices(items);
        setIsLoading(false);
      });

      return unsubscribe;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load notices');
      setIsLoading(false);
    }
  }, []);

  return { notices, isLoading, error, isConfigured: isFirebaseConfigured() };
}
