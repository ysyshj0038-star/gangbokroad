import { ActivityIndicator, Text, View } from 'react-native';

type LoadingPulseProps = {
  message: string;
};

export function LoadingPulse({ message }: LoadingPulseProps) {
  return (
    <View className="items-center justify-center py-12">
      <ActivityIndicator size="large" color="#0047A0" />
      <Text className="mt-4 text-center text-base text-navy">{message}</Text>
      <View className="mt-6 flex-row gap-2">
        {[0, 1, 2].map((i) => (
          <View
            key={i}
            className="h-2 w-2 rounded-full bg-taeguk-blue/40"
            style={{ opacity: 0.4 + i * 0.2 }}
          />
        ))}
      </View>
    </View>
  );
}
