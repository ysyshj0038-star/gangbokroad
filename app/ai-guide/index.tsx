import { router } from 'expo-router';
import { useRef, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';

import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { AppButton } from '@/components/ui/AppButton';
import { ExampleChip } from '@/components/ui/ExampleChip';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Theme } from '@/constants/theme';
import { getCurrentLanguage } from '@/i18n';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { askHistoryGuide, isOpenAiConfigured } from '@/lib/openai';

const exampleKeys = ['q1', 'q2', 'q3', 'q4', 'q5'] as const;

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

export default function AiGuideScreen() {
  const { t } = useAppTranslation();
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<ScrollView>(null);

  const sendQuestion = async (text: string) => {
    if (!text.trim()) return;

    if (!isOpenAiConfigured()) {
      setError(t('ai.notConfigured'));
      return;
    }

    setError(null);
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setQuestion('');
    setIsLoading(true);

    try {
      const answer = await askHistoryGuide({
        question: text.trim(),
        language: getCurrentLanguage(),
      });
      setMessages((prev) => [
        ...prev,
        { id: `${Date.now()}-a`, role: 'assistant', content: answer },
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('common.error'));
    } finally {
      setIsLoading(false);
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-cream"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScreenHeader title={t('aiGuide.title')} onBack={() => router.back()} />

      <ScrollView
        ref={scrollRef}
        className="flex-1 px-5"
        contentContainerStyle={{ paddingVertical: 16, paddingBottom: 8 }}
        showsVerticalScrollIndicator={false}
      >
        {messages.length === 0 ? (
          <View className="mb-4 rounded-2xl border border-border bg-surface p-4">
            <View className="mb-3 flex-row">
              <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-taeguk-blue/10">
                <Text className="text-lg">🏛️</Text>
              </View>
              <View className="flex-1 rounded-2xl bg-cream px-4 py-3">
                <Text className="text-sm leading-6 text-navy">{t('aiGuide.placeholder')}</Text>
              </View>
            </View>
            <SectionTitle title={t('aiGuide.examples.title')} />
            <View className="flex-row flex-wrap">
              {exampleKeys.map((key) => (
                <ExampleChip
                  key={key}
                  label={t(`aiGuide.examples.${key}`)}
                  onPress={() => void sendQuestion(t(`aiGuide.examples.${key}`))}
                />
              ))}
            </View>
          </View>
        ) : (
          messages.map((msg) => (
            <View
              key={msg.id}
              className={`mb-3 max-w-[90%] rounded-2xl px-4 py-3 ${
                msg.role === 'user'
                  ? 'ml-auto bg-taeguk-blue'
                  : 'mr-auto border border-border bg-surface'
              }`}
            >
              <Text
                className={`text-sm leading-6 ${msg.role === 'user' ? 'text-white' : 'text-navy'}`}
              >
                {msg.content}
              </Text>
            </View>
          ))
        )}

        {isLoading ? (
          <View className="mr-auto flex-row items-center rounded-2xl border border-border bg-surface px-4 py-3">
            <ActivityIndicator size="small" color={Theme.colors.taegukBlue} />
            <Text className="ml-2 text-sm text-muted">{t('ai.thinking')}</Text>
          </View>
        ) : null}

        {error ? (
          <View className="mt-2 rounded-xl bg-taeguk-red/10 p-3">
            <Text className="text-sm text-taeguk-red">{error}</Text>
          </View>
        ) : null}
      </ScrollView>

      <View className="border-t border-border bg-surface px-5 py-4">
        <TextInput
          value={question}
          onChangeText={setQuestion}
          placeholder={t('aiGuide.placeholder')}
          placeholderTextColor={Theme.colors.muted}
          multiline
          className="mb-3 max-h-28 rounded-2xl border border-border bg-cream px-4 py-3 text-base text-navy"
          style={{ textAlignVertical: 'top' }}
        />
        <AppButton
          label={t('aiGuide.send')}
          onPress={() => void sendQuestion(question)}
          disabled={isLoading || !question.trim()}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
