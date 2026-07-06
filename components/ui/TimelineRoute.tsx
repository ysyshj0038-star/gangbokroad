import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

import { Theme } from '@/constants/theme';

type TimelineRouteProps = {
  stops: string[];
  compact?: boolean;
};

export function TimelineRoute({ stops, compact }: TimelineRouteProps) {
  return (
    <View className="pl-1">
      {stops.map((stop, index) => (
        <View key={`${stop}-${index}`} className="flex-row">
          <View className="mr-3 items-center">
            <View
              className={`rounded-full ${compact ? 'h-2.5 w-2.5' : 'h-3 w-3'} ${index === 0 ? 'bg-taeguk-red' : index === stops.length - 1 ? 'bg-taeguk-blue' : 'bg-navy'}`}
            />
            {index < stops.length - 1 ? (
              <View className="my-0.5 w-0.5 flex-1 bg-border" style={{ minHeight: compact ? 16 : 24 }} />
            ) : null}
          </View>
          <View className={`flex-1 ${index < stops.length - 1 ? 'pb-3' : ''}`}>
            <Text className={`${compact ? 'text-sm' : 'text-base'} font-medium text-navy`}>{stop}</Text>
            {index < stops.length - 1 && !compact ? (
              <View className="mt-1 flex-row items-center">
                <Ionicons name="arrow-down" size={12} color={Theme.colors.muted} />
              </View>
            ) : null}
          </View>
        </View>
      ))}
    </View>
  );
}
