import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, Text, TextInput, View } from 'react-native';

import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { AppButton } from '@/components/ui/AppButton';
import { useAuth } from '@/contexts/AuthContext';
import { useAppTranslation } from '@/hooks/useAppTranslation';

export default function LoginScreen() {
  const { t } = useAppTranslation();
  const { isConfigured, signIn, signUp } = useAuth();

  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [organization, setOrganization] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!isConfigured) {
      Alert.alert(t('auth.firebaseNotConfigured'));
      return;
    }

    setIsSubmitting(true);
    try {
      if (mode === 'login') {
        await signIn(email.trim(), password);
        Alert.alert(t('auth.loginSuccess'));
      } else {
        await signUp({
          email: email.trim(),
          password,
          displayName: displayName.trim(),
          organization: organization.trim() || undefined,
        });
        Alert.alert(t('auth.signupSuccess'));
      }
      router.back();
    } catch {
      Alert.alert(t('auth.invalidCredentials'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="flex-1 bg-cream">
      <ScreenHeader
        title={mode === 'login' ? t('auth.login') : t('auth.signup')}
        onBack={() => router.back()}
      />
      <ScreenContainer>
        <View className="gap-4 pt-4">
          {!isConfigured ? (
            <View className="rounded-2xl border border-taeguk-red/30 bg-taeguk-red/10 p-4">
              <Text className="text-sm text-taeguk-red">{t('auth.firebaseNotConfigured')}</Text>
            </View>
          ) : null}

          {mode === 'signup' ? (
            <>
              <AuthField label={t('auth.displayName')} value={displayName} onChangeText={setDisplayName} />
              <AuthField
                label={t('auth.organization')}
                value={organization}
                onChangeText={setOrganization}
              />
            </>
          ) : null}

          <AuthField
            label={t('auth.email')}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <AuthField
            label={t('auth.password')}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <AppButton
            label={mode === 'login' ? t('auth.submitLogin') : t('auth.submitSignup')}
            onPress={() => void handleSubmit()}
            disabled={isSubmitting}
          />

          <Pressable onPress={() => setMode(mode === 'login' ? 'signup' : 'login')}>
            <Text className="text-center text-sm text-taeguk-blue">
              {mode === 'login' ? t('auth.switchToSignup') : t('auth.switchToLogin')}
            </Text>
          </Pressable>
        </View>
      </ScreenContainer>
    </View>
  );
}

function AuthField({
  label,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType,
  autoCapitalize,
}: {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address';
  autoCapitalize?: 'none' | 'sentences';
}) {
  return (
    <View>
      <Text className="mb-2 text-sm font-medium text-navy">{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        className="rounded-xl border border-border bg-surface px-4 py-3 text-base text-navy"
      />
    </View>
  );
}
