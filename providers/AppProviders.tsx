import '@/i18n';
import '../global.css';

import { PropsWithChildren } from 'react';
import { I18nextProvider } from 'react-i18next';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { PushNotificationRegistrar } from '@/components/notifications/PushNotificationRegistrar';
import { AuthProvider } from '@/contexts/AuthContext';
import i18n from '@/i18n';

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <SafeAreaProvider>
      <I18nextProvider i18n={i18n}>
        <AuthProvider>
          <PushNotificationRegistrar />
          {children}
        </AuthProvider>
      </I18nextProvider>
    </SafeAreaProvider>
  );
}
