import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

import { Theme } from '@/constants/theme';
import type { LocalizedText } from '@/types';
import { useLocalizedText } from '@/hooks/useAppTranslation';

type PracticalSectionCardProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: LocalizedText;
  items: LocalizedText[];
};

export function PracticalSectionCard({ icon, title, items }: PracticalSectionCardProps) {
  const localize = useLocalizedText();

  return (
    <View className="rounded-2xl border border-border bg-surface p-4">
      <View className="mb-3 flex-row items-center">
        <View className="mr-3 h-10 w-10 items-center justify-center rounded-xl bg-taeguk-blue/10">
          <Ionicons name={icon} size={20} color={Theme.colors.taegukBlue} />
        </View>
        <Text className="text-lg font-bold text-navy">{localize(title)}</Text>
      </View>
      {items.map((item, index) => (
        <View key={index} className="mb-2 flex-row">
          <Text className="mr-2 text-taeguk-blue">•</Text>
          <Text className="flex-1 text-sm leading-6 text-navy">{localize(item)}</Text>
        </View>
      ))}
    </View>
  );
}
