import { useEffect, useState } from 'react';
import { Alert, Text, View } from 'react-native';

import { AdminField, AdminSectionTitle } from '@/components/admin/AdminField';
import { AppButton } from '@/components/ui/AppButton';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { getAllPushTokens, subscribeToPushTokens } from '@/lib/firebase';
import { sendExpoPushNotifications } from '@/lib/notifications/send';

export function AdminPushSection() {
  const { t } = useAppTranslation();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tokenCount, setTokenCount] = useState(0);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToPushTokens((tokens) => {
      setTokenCount(tokens.length);
    });

    return unsubscribe;
  }, []);

  const handleSend = async () => {
    setIsSending(true);
    try {
      const tokens = await getAllPushTokens();
      const pushTokens = tokens.map((item) => item.token).filter(Boolean);

      if (pushTokens.length === 0) {
        Alert.alert(t('admin.noPushTokens'));
        return;
      }

      const result = await sendExpoPushNotifications(pushTokens, title.trim(), body.trim());
      Alert.alert(
        t('admin.pushSent'),
        t('admin.pushSentDetail', { sent: result.sent, failed: result.failed }),
      );
      setTitle('');
      setBody('');
    } catch {
      Alert.alert(t('common.error'));
    } finally {
      setIsSending(false);
    }
  };

  return (
    <View className="gap-4 rounded-2xl border border-border bg-surface p-4">
      <AdminSectionTitle
        title={t('admin.push')}
        subtitle={t('admin.pushHint', { count: tokenCount })}
      />

      <AdminField label={t('admin.pushTitle')} value={title} onChangeText={setTitle} />
      <AdminField
        label={t('admin.pushBody')}
        value={body}
        onChangeText={setBody}
        multiline
      />

      <Text className="text-xs text-muted">{t('admin.pushNote')}</Text>

      <AppButton
        label={t('admin.sendPush')}
        onPress={() => void handleSend()}
        disabled={isSending || !title.trim() || !body.trim()}
      />
    </View>
  );
}
