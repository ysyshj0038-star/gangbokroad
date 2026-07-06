import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

import { Theme } from '@/constants/theme';

export type MenuItem = {
  key: string;
  label: string;
  href: string;
  icon: keyof typeof Ionicons.glyphMap;
  color?: string;
};

type MenuGridProps = {
  items: MenuItem[];
  onPress: (item: MenuItem) => void;
};

export function MenuGrid({ items, onPress }: MenuGridProps) {
  return (
    <View className="flex-row flex-wrap gap-3">
      {items.map((item) => (
        <Pressable
          key={item.key}
          onPress={() => onPress(item)}
          className="w-[47%] rounded-2xl border border-border bg-surface p-4 active:opacity-90"
        >
          <View
            className="mb-3 h-11 w-11 items-center justify-center rounded-xl"
            style={{ backgroundColor: `${item.color ?? Theme.colors.taegukBlue}15` }}
          >
            <Ionicons
              name={item.icon}
              size={22}
              color={item.color ?? Theme.colors.taegukBlue}
            />
          </View>
          <Text className="text-base font-semibold text-navy">{item.label}</Text>
        </Pressable>
      ))}
    </View>
  );
}
