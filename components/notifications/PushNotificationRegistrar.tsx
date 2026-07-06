import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';

import { useAuth } from '@/contexts/AuthContext';
import { isFirebaseConfigured, registerPushToken } from '@/lib/firebase';
import { registerForPushNotificationsAsync } from '@/lib/notifications/register';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export function PushNotificationRegistrar() {
  const { user, isConfigured } = useAuth();

  useEffect(() => {
    if (!isConfigured || !isFirebaseConfigured()) return;

    void (async () => {
      try {
        const token = await registerForPushNotificationsAsync();
        if (!token) return;

        await registerPushToken({
          token,
          userId: user?.uid,
        });
      } catch {
        // Push registration is optional; ignore failures in dev/Expo Go.
      }
    })();
  }, [isConfigured, user?.uid]);

  return null;
}
