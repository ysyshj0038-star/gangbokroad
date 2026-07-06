import { Text, View } from 'react-native';

type QuoteBlockProps = {
  quote: string;
  author?: string;
};

export function QuoteBlock({ quote, author }: QuoteBlockProps) {
  return (
    <View className="rounded-2xl border-l-4 border-taeguk-red bg-taeguk-red/5 px-5 py-4">
      <Text className="text-base italic leading-7 text-navy">"{quote}"</Text>
      {author ? <Text className="mt-2 text-sm font-semibold text-taeguk-red">— {author}</Text> : null}
    </View>
  );
}
