import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, View } from 'react-native';

import { HERO_IMAGE } from '@/constants/images';
import { Theme } from '@/constants/theme';

type HeroBannerProps = {
  title: string;
  subtitle: string;
  dDayLabel?: string;
};

export function HeroBanner({ title, subtitle, dDayLabel }: HeroBannerProps) {
  return (
    <View className="overflow-hidden rounded-3xl shadow-lg">
      <View className="relative min-h-[220px]">
        <Image
          source={HERO_IMAGE}
          style={{ position: 'absolute', width: '100%', height: '100%' }}
          contentFit="cover"
        />
        <LinearGradient
          colors={['rgba(15,26,46,0.55)', 'rgba(27,42,74,0.92)']}
          className="px-6 py-10"
        >
          <View className="absolute -right-8 -top-8 h-36 w-36 rounded-full bg-taeguk-red/20" />
          <View className="absolute right-6 top-6 h-14 w-14 overflow-hidden rounded-full border-2 border-white/20">
            <View className="absolute left-0 top-0 h-7 w-full bg-taeguk-red/80" />
            <View className="absolute bottom-0 left-0 h-7 w-full bg-taeguk-blue/80" />
          </View>

          {dDayLabel ? (
            <View className="mb-4 self-start rounded-full bg-taeguk-red px-4 py-1.5 shadow-sm">
              <Text className="text-sm font-bold text-white">{dDayLabel}</Text>
            </View>
          ) : null}

          <Text className="text-3xl font-bold leading-tight text-white">{title}</Text>
          <Text className="mt-3 text-lg leading-7 text-white/90">{subtitle}</Text>
        </LinearGradient>
      </View>
    </View>
  );
}
