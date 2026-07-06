import type { ImageSource } from 'expo-image';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { FigureAvatar } from '@/components/ui/SiteImage';
import { Theme } from '@/constants/theme';

type FigurePortraitCardProps = {
  name: string;
  birthDeath?: string;
  quote: string;
  imageSource?: ImageSource;
  onPress?: () => void;
};

export function FigurePortraitCard({
  name,
  birthDeath,
  quote,
  imageSource,
  onPress,
}: FigurePortraitCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className="overflow-hidden rounded-2xl border border-border bg-surface active:opacity-95"
    >
      <View className="flex-row p-4">
        <FigureAvatar source={imageSource} name={name} size={72} />
        <View className="ml-4 flex-1">
          <Text className="text-lg font-bold text-navy">{name}</Text>
          {birthDeath ? <Text className="mt-0.5 text-sm text-muted">{birthDeath}</Text> : null}
          <Text className="mt-2 text-sm leading-5 text-muted" numberOfLines={2}>
            {quote}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={Theme.colors.muted} style={{ alignSelf: 'center' }} />
      </View>
    </Pressable>
  );
}
