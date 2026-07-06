import { Text, View } from 'react-native';

type DDayBadgeProps = {
  label: string;
};

export function DDayBadge({ label }: DDayBadgeProps) {
  return (
    <View className="rounded-full border border-taeguk-red/30 bg-taeguk-red/10 px-4 py-2">
      <Text className="text-sm font-bold text-taeguk-red">{label}</Text>
    </View>
  );
}
