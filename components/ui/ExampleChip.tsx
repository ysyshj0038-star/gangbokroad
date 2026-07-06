import { Pressable, Text } from 'react-native';

type ExampleChipProps = {
  label: string;
  onPress?: () => void;
};

export function ExampleChip({ label, onPress }: ExampleChipProps) {
  return (
    <Pressable
      onPress={onPress}
      className="mb-2 mr-2 rounded-full border border-taeguk-blue/30 bg-surface px-4 py-2.5 active:bg-cream"
    >
      <Text className="text-sm text-navy">{label}</Text>
    </Pressable>
  );
}
