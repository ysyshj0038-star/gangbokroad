import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

import { PlaceImageHeader } from '@/components/ui/PlaceImageHeader';
import { getPlaceImage } from '@/constants/images';
import { Theme } from '@/constants/theme';
import type { Place } from '@/types/place';
import { useLocalizedText } from '@/hooks/useAppTranslation';

type PlaceTimelineCardProps = {
  place: Place;
  isLast?: boolean;
  onPress?: () => void;
};

export function PlaceTimelineCard({ place, isLast, onPress }: PlaceTimelineCardProps) {
  const localize = useLocalizedText();

  return (
    <View className="flex-row">
      <View className="mr-3 w-6 items-center">
        <View className="h-3 w-3 rounded-full bg-taeguk-blue" />
        {!isLast ? <View className="mt-1 w-0.5 flex-1 bg-border" /> : null}
      </View>
      <Pressable
        onPress={onPress}
        className={`flex-1 overflow-hidden rounded-2xl border border-border bg-surface active:opacity-95 ${isLast ? '' : 'mb-4'}`}
      >
        <PlaceImageHeader
          title={localize(place.name)}
          subtitle={localize(place.description)}
          imageSource={getPlaceImage(place.id, place.imageUrl)}
          gradient={place.imageGradient}
          height={160}
          rounded
        />
        <View className="flex-row items-center justify-between p-4">
          <Text className="flex-1 text-sm leading-5 text-muted" numberOfLines={2}>
            {localize(place.historicalStory)}
          </Text>
          <Ionicons name="chevron-forward" size={18} color={Theme.colors.muted} />
        </View>
      </Pressable>
    </View>
  );
}
