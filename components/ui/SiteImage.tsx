import { Image, type ImageSource } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { Theme } from '@/constants/theme';

type SiteImageProps = {
  source?: ImageSource;
  title?: string;
  subtitle?: string;
  gradient?: [string, string];
  height?: number;
  style?: StyleProp<ViewStyle>;
  showIcon?: boolean;
  rounded?: boolean;
};

export function SiteImage({
  source,
  title,
  subtitle,
  gradient = [Theme.colors.navyDark, Theme.colors.navy],
  height = 220,
  style,
  showIcon = true,
  rounded = false,
}: SiteImageProps) {
  const containerClass = rounded ? 'overflow-hidden rounded-2xl' : 'overflow-hidden';

  if (source) {
    return (
      <View className={containerClass} style={[{ height }, style]}>
        <Image source={source} style={{ width: '100%', height: '100%' }} contentFit="cover" />
        <LinearGradient
          colors={['transparent', 'rgba(15,26,46,0.85)']}
          className="absolute inset-0 justify-end px-5 pb-6"
        >
          {showIcon ? (
            <View className="mb-3 h-10 w-10 items-center justify-center rounded-xl bg-white/15">
              <Ionicons name="image" size={20} color="#fff" />
            </View>
          ) : null}
          {title ? <Text className="text-2xl font-bold text-white">{title}</Text> : null}
          {subtitle ? (
            <Text className="mt-2 text-sm leading-5 text-white/85" numberOfLines={3}>
              {subtitle}
            </Text>
          ) : null}
        </LinearGradient>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[{ height }, style]}
      className={`justify-end ${containerClass} px-5 pb-6`}
    >
      <View className="absolute -right-6 top-4 h-24 w-24 rounded-full bg-taeguk-red/20" />
      <View className="absolute left-4 top-6 h-16 w-16 rounded-full bg-taeguk-blue/20" />
      {showIcon ? (
        <View className="mb-3 h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
          <Ionicons name="location" size={24} color="#fff" />
        </View>
      ) : null}
      {title ? <Text className="text-2xl font-bold text-white">{title}</Text> : null}
      {subtitle ? (
        <Text className="mt-2 text-sm leading-5 text-white/85" numberOfLines={3}>
          {subtitle}
        </Text>
      ) : null}
    </LinearGradient>
  );
}

type FigureAvatarProps = {
  source?: ImageSource;
  name: string;
  size?: number;
  color?: string;
};

export function FigureAvatar({ source, name, size = 64, color = Theme.colors.taegukBlue }: FigureAvatarProps) {
  if (source) {
    return (
      <Image
        source={source}
        style={{ width: size, height: size, borderRadius: 16 }}
        contentFit="cover"
      />
    );
  }

  return (
    <View
      className="items-center justify-center rounded-2xl"
      style={{ width: size, height: size, backgroundColor: `${color}18` }}
    >
      <Text className="text-2xl font-bold" style={{ color }}>
        {name.charAt(0)}
      </Text>
    </View>
  );
}
