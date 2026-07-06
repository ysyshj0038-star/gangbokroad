import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

import { PlaceImageHeader } from '@/components/ui/PlaceImageHeader';
import { getPlaceImage } from '@/constants/images';
import { AppButton } from '@/components/ui/AppButton';
import { Theme } from '@/constants/theme';
import type { Place } from '@/types/place';

type PlaceMapSheetProps = {
  place: Place;
  placeName: string;
  placeDescription: string;
  distanceLabel?: string;
  onClose: () => void;
  onViewDetails: () => void;
  onAskAi: () => void;
  onAudioGuide?: () => void;
  viewDetailsLabel: string;
  askAiLabel: string;
  audioGuideLabel?: string;
  distanceTitle: string;
};

export function PlaceMapSheet({
  place,
  placeName,
  placeDescription,
  distanceLabel,
  onClose,
  onViewDetails,
  onAskAi,
  onAudioGuide,
  viewDetailsLabel,
  askAiLabel,
  audioGuideLabel,
  distanceTitle,
}: PlaceMapSheetProps) {
  return (
    <View className="absolute bottom-0 left-0 right-0 rounded-t-3xl border border-border bg-surface shadow-lg">
      <View className="items-center py-2">
        <View className="h-1 w-10 rounded-full bg-border" />
      </View>

      <Pressable onPress={onClose} className="absolute right-4 top-4 z-10 rounded-full bg-cream p-2">
        <Ionicons name="close" size={20} color={Theme.colors.navy} />
      </Pressable>

      <PlaceImageHeader
        title={placeName}
        subtitle={placeDescription}
        imageSource={getPlaceImage(place.id, place.imageUrl)}
        gradient={place.imageGradient}
        height={120}
      />

      <View className="gap-3 p-4">
        {distanceLabel ? (
          <View className="flex-row items-center rounded-xl bg-cream px-3 py-2">
            <Ionicons name="navigate" size={16} color={Theme.colors.taegukBlue} />
            <Text className="ml-2 text-sm text-navy">
              {distanceTitle}: <Text className="font-bold">{distanceLabel}</Text>
            </Text>
          </View>
        ) : null}

        {place.hasAudioGuide && onAudioGuide && audioGuideLabel ? (
          <AppButton label={audioGuideLabel} variant="secondary" onPress={onAudioGuide} />
        ) : null}

        <AppButton label={viewDetailsLabel} onPress={onViewDetails} />
        <AppButton label={askAiLabel} variant="outline" onPress={onAskAi} />
      </View>
    </View>
  );
}
