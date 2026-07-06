import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

import { Theme } from '@/constants/theme';

type AudioGuideButtonProps = {
  label: string;
  onPress?: () => void;
  disabled?: boolean;
};

export function AudioGuideButton({ label, onPress, disabled }: AudioGuideButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className="overflow-hidden rounded-2xl active:opacity-90"
    >
      <LinearGradient
        colors={[Theme.colors.taegukRed, '#A82430']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="flex-row items-center justify-center px-6 py-5"
      >
        <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-white/20">
          <Ionicons name="headset" size={22} color="#fff" />
        </View>
        <Text className="flex-1 text-lg font-bold text-white">{label}</Text>
        <Ionicons name="play-circle" size={28} color="#fff" />
      </LinearGradient>
    </Pressable>
  );
}
