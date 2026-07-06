import { ScrollView, View, type ScrollViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type ScreenContainerProps = ScrollViewProps & {
  padded?: boolean;
  footer?: React.ReactNode;
};

export function ScreenContainer({
  children,
  padded = true,
  footer,
  contentContainerStyle,
  ...props
}: ScreenContainerProps) {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-cream">
      <ScrollView
        {...props}
        contentContainerStyle={[
          {
            paddingHorizontal: padded ? 20 : 0,
            paddingBottom: insets.bottom + 24,
            flexGrow: 1,
          },
          contentContainerStyle,
        ]}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
      {footer}
    </View>
  );
}
