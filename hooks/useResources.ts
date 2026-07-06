import { useEffect, useState } from 'react';

import { isFirebaseConfigured, subscribeToResources, type FirestoreResource } from '@/lib/firebase';

export function useResources() {
  const [resources, setResources] = useState<FirestoreResource[]>([]);
  const [isLoading, setIsLoading] = useState(isFirebaseConfigured());
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isFirebaseConfigured()) {
      setIsLoading(false);
      return;
    }

    try {
      const unsubscribe = subscribeToResources((items) => {
        setResources(items);
        setIsLoading(false);
      });

      return unsubscribe;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load resources');
      setIsLoading(false);
    }
  }, []);

  return { resources, isLoading, error, isConfigured: isFirebaseConfigured() };
}
