import { Pressable, Text, View } from 'react-native';

import { Theme } from '@/constants/theme';

type ScheduleDayCardProps = {
  dayNumber: number;
  dateLabel: string;
  routeStops: string[];
  placeCountLabel?: string;
  onPress?: () => void;
};

export function ScheduleDayCard({
  dayNumber,
  dateLabel,
  routeStops,
  placeCountLabel,
  onPress,
}: ScheduleDayCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className="overflow-hidden rounded-2xl border border-border bg-surface active:opacity-95"
    >
      <View className="flex-row">
        <View className="w-20 items-center justify-center bg-navy py-5">
          <Text className="text-xs font-medium text-white/70">DAY</Text>
          <Text className="text-3xl font-bold text-white">{dayNumber}</Text>
        </View>
        <View className="flex-1 p-4">
          <Text className="text-base font-bold text-navy">{dateLabel}</Text>
          <Text className="mt-1 text-sm text-muted" numberOfLines={2}>
            {routeStops.join(' → ')}
          </Text>
          {placeCountLabel ? (
            <View className="mt-2 self-start rounded-full bg-cream px-2.5 py-1">
              <Text className="text-xs font-semibold text-taeguk-blue">{placeCountLabel}</Text>
            </View>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}
