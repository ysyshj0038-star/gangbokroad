import { router } from 'expo-router';
import * as Speech from 'expo-speech';
import { useState } from 'react';
import { ActivityIndicator, Pressable, Text, TextInput, View } from 'react-native';

import { ScreenContainer } from '@/components/layout/ScreenContainer';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { AppButton } from '@/components/ui/AppButton';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Theme } from '@/constants/theme';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { isOpenAiConfigured, translateText } from '@/lib/openai';

const languageKeys = ['ko', 'zh', 'ru', 'en'] as const;
type LangKey = (typeof languageKeys)[number];

const SPEECH_LOCALES: Record<LangKey, string> = {
  ko: 'ko-KR',
  en: 'en-US',
  zh: 'zh-CN',
  ru: 'ru-RU',
};

export default function AiTranslateScreen() {
  const { t } = useAppTranslation();
  const [sourceLang, setSourceLang] = useState<LangKey>('ko');
  const [targetLang, setTargetLang] = useState<LangKey>('zh');
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const swapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setInputText(outputText);
    setOutputText(inputText);
  };

  const handleTranslate = async () => {
    if (!inputText.trim()) return;

    if (!isOpenAiConfigured()) {
      setError(t('ai.notConfigured'));
      return;
    }

    setIsTranslating(true);
    setError(null);

    try {
      const result = await translateText({
        text: inputText.trim(),
        sourceLang,
        targetLang,
      });
      setOutputText(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('common.error'));
    } finally {
      setIsTranslating(false);
    }
  };

  const handleSpeak = (text: string, lang: LangKey) => {
    if (!text.trim()) return;
    Speech.stop();
    Speech.speak(text, {
      language: SPEECH_LOCALES[lang],
      rate: 0.9,
    });
  };

  return (
    <View className="flex-1 bg-cream">
      <ScreenHeader title={t('aiTranslate.title')} onBack={() => router.back()} />
      <ScreenContainer>
        <View className="gap-5 pt-4">
          <LanguagePicker
            label={t('aiTranslate.sourceLanguage')}
            selected={sourceLang}
            onSelect={setSourceLang}
            t={t}
          />

          <Pressable
            onPress={swapLanguages}
            className="self-center rounded-full border border-border bg-surface p-3 active:opacity-80"
          >
            <Text className="text-xl text-taeguk-blue">⇅</Text>
          </Pressable>

          <LanguagePicker
            label={t('aiTranslate.targetLanguage')}
            selected={targetLang}
            onSelect={setTargetLang}
            t={t}
          />

          <View>
            <TextInput
              value={inputText}
              onChangeText={setInputText}
              placeholder={t('aiTranslate.inputPlaceholder')}
              placeholderTextColor={Theme.colors.muted}
              multiline
              numberOfLines={5}
              className="min-h-[120px] rounded-2xl border border-border bg-surface px-4 py-3 text-base text-navy"
              style={{ textAlignVertical: 'top' }}
            />
            {inputText ? (
              <Pressable onPress={() => handleSpeak(inputText, sourceLang)} className="mt-2 self-end">
                <Text className="text-sm text-taeguk-blue">🔊 {t('aiTranslate.speak')}</Text>
              </Pressable>
            ) : null}
          </View>

          <AppButton
            label={isTranslating ? t('ai.thinking') : t('aiTranslate.translate')}
            onPress={() => void handleTranslate()}
            disabled={isTranslating || !inputText.trim()}
          />

          {isTranslating ? <ActivityIndicator color={Theme.colors.taegukBlue} /> : null}

          {outputText ? (
            <View className="rounded-2xl border border-taeguk-blue/30 bg-taeguk-blue/5 p-4">
              <Text className="text-base leading-7 text-navy">{outputText}</Text>
              <Pressable onPress={() => handleSpeak(outputText, targetLang)} className="mt-3 self-end">
                <Text className="text-sm text-taeguk-blue">🔊 {t('aiTranslate.speak')}</Text>
              </Pressable>
            </View>
          ) : null}

          {error ? (
            <View className="rounded-xl bg-taeguk-red/10 p-3">
              <Text className="text-sm text-taeguk-red">{error}</Text>
            </View>
          ) : null}
        </View>
      </ScreenContainer>
    </View>
  );
}

function LanguagePicker({
  label,
  selected,
  onSelect,
  t,
}: {
  label: string;
  selected: LangKey;
  onSelect: (lang: LangKey) => void;
  t: (key: string) => string;
}) {
  return (
    <View>
      <SectionTitle title={label} />
      <View className="flex-row flex-wrap gap-2">
        {languageKeys.map((key) => (
          <Pressable
            key={key}
            onPress={() => onSelect(key)}
            className={`rounded-full px-4 py-2 ${selected === key ? 'bg-taeguk-blue' : 'border border-border bg-surface'}`}
          >
            <Text className={`text-sm font-medium ${selected === key ? 'text-white' : 'text-navy'}`}>
              {t(`aiTranslate.languages.${key}`)}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
