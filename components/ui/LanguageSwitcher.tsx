import { Pressable, Text, View } from 'react-native';

import { changeLanguage, getCurrentLanguage, type SupportedLanguage } from '@/i18n';
import { useAppTranslation } from '@/hooks/useAppTranslation';

const languages: { code: SupportedLanguage; label: string }[] = [
  { code: 'ko', label: '한국어' },
  { code: 'en', label: 'English' },
];

export function LanguageSwitcher() {
  const { t } = useAppTranslation();
  const current = getCurrentLanguage();

  return (
    <View className="flex-row items-center gap-2">
      <Text className="text-xs font-medium text-muted">{t('common.language')}</Text>
      {languages.map((language) => {
        const isActive = current === language.code;
        return (
          <Pressable
            key={language.code}
            onPress={() => void changeLanguage(language.code)}
            className={`rounded-full px-3 py-1.5 ${isActive ? 'bg-taeguk-blue' : 'bg-cream'}`}
          >
            <Text className={`text-xs font-semibold ${isActive ? 'text-white' : 'text-navy'}`}>
              {language.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
