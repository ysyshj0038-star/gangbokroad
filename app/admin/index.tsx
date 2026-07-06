import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Switch, Text, View } from 'react-native';

import { AdminField } from '@/components/admin/AdminField';
import { AdminPushSection } from '@/components/admin/AdminPushSection';
import { AdminResourceUploadSection } from '@/components/admin/AdminResourceUploadSection';
import { AdminScheduleSection } from '@/components/admin/AdminScheduleSection';
import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { AppButton } from '@/components/ui/AppButton';
import { AppCard } from '@/components/ui/AppCard';
import { FirebaseBanner } from '@/components/ui/FirebaseBanner';
import { useAuth } from '@/contexts/AuthContext';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useScheduleData } from '@/hooks/useScheduleData';
import { createNotice } from '@/lib/firebase';

export default function AdminScreen() {
  const { t } = useAppTranslation();
  const { isConfigured, isLoading, user, profile, isAdmin, signOut } = useAuth();
  const { days } = useScheduleData();

  const [titleKo, setTitleKo] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [bodyKo, setBodyKo] = useState('');
  const [bodyEn, setBodyEn] = useState('');
  const [isPinned, setIsPinned] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const handlePublishNotice = async () => {
    if (!user) return;

    setIsPublishing(true);
    try {
      await createNotice({
        title: { ko: titleKo.trim(), en: titleEn.trim() || titleKo.trim() },
        body: { ko: bodyKo.trim(), en: bodyEn.trim() || bodyKo.trim() },
        isPinned,
        createdBy: user.uid,
      });
      setTitleKo('');
      setTitleEn('');
      setBodyKo('');
      setBodyEn('');
      setIsPinned(false);
      Alert.alert(t('admin.noticePublished'));
    } catch {
      Alert.alert(t('common.error'));
    } finally {
      setIsPublishing(false);
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 bg-cream">
        <ScreenHeader title={t('admin.title')} onBack={() => router.back()} />
        <View className="flex-1 items-center justify-center">
          <Text className="text-muted">{t('common.loading')}</Text>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-cream">
      <ScreenHeader title={t('admin.title')} onBack={() => router.back()} />
      <ScreenContainer>
        <View className="gap-4 pt-4">
          {!isConfigured ? <FirebaseBanner /> : null}

          {!user ? (
            <AppCard
              title={t('admin.loginRequired')}
              subtitle={t('admin.goToLogin')}
              onPress={() => router.push('/auth/login')}
            />
          ) : !isAdmin ? (
            <AppCard
              title={t('admin.adminRequired')}
              subtitle={t('admin.loggedInAs', { name: profile?.displayName ?? user.email ?? '' })}
            />
          ) : (
            <>
              <AppCard
                title={t('admin.loggedInAs', { name: profile?.displayName ?? '' })}
                subtitle={profile?.email}
              />
              <AppButton label={t('admin.logout')} variant="outline" onPress={() => void signOut()} />

              <Text className="text-base font-bold text-navy">{t('admin.notices')}</Text>
              <AdminField label={t('admin.noticeTitleKo')} value={titleKo} onChangeText={setTitleKo} />
              <AdminField label={t('admin.noticeTitleEn')} value={titleEn} onChangeText={setTitleEn} />
              <AdminField
                label={t('admin.noticeBodyKo')}
                value={bodyKo}
                onChangeText={setBodyKo}
                multiline
              />
              <AdminField
                label={t('admin.noticeBodyEn')}
                value={bodyEn}
                onChangeText={setBodyEn}
                multiline
              />
              <View className="flex-row items-center justify-between rounded-xl border border-border bg-surface px-4 py-3">
                <Text className="text-sm text-navy">{t('admin.pinNotice')}</Text>
                <Switch value={isPinned} onValueChange={setIsPinned} />
              </View>
              <AppButton
                label={t('admin.publishNotice')}
                onPress={() => void handlePublishNotice()}
                disabled={isPublishing || !titleKo.trim() || !bodyKo.trim()}
              />

              <AdminScheduleSection days={days} />
              <AdminResourceUploadSection userId={user.uid} />
              <AdminPushSection />
            </>
          )}
        </View>
      </ScreenContainer>
    </View>
  );
}
