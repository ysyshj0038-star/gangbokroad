import { Text, View } from 'react-native';

type PlaceholderScreenProps = {
  title: string;
  description: string;
  emoji?: string;
};

export function PlaceholderScreen({ title, description, emoji = '📍' }: PlaceholderScreenProps) {
  return (
    <View className="flex-1 items-center justify-center bg-cream px-8">
      <Text className="text-5xl">{emoji}</Text>
      <Text className="mt-4 text-center text-2xl font-bold text-navy">{title}</Text>
      <Text className="mt-3 text-center text-base leading-6 text-muted">{description}</Text>
    </View>
  );
}
