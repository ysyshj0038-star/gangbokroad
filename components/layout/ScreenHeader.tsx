import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Theme } from '@/constants/theme';

type ScreenHeaderProps = {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  rightSlot?: React.ReactNode;
};

export function ScreenHeader({ title, subtitle, onBack, rightSlot }: ScreenHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View className="border-b border-border bg-surface px-5 pb-4" style={{ paddingTop: insets.top + 8 }}>
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center flex-1">
          {onBack ? (
            <Pressable onPress={onBack} className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-cream">
              <Ionicons name="chevron-back" size={22} color={Theme.colors.navy} />
            </Pressable>
          ) : null}
          <View className="flex-1">
            <Text className="text-2xl font-bold text-navy">{title}</Text>
            {subtitle ? <Text className="mt-1 text-sm text-muted">{subtitle}</Text> : null}
          </View>
        </View>
        {rightSlot}
      </View>
    </View>
  );
}
