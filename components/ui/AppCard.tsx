import { Pressable, Text, View, type PressableProps } from 'react-native';

type AppCardProps = PressableProps & {
  title: string;
  subtitle?: string;
  badge?: string;
  children?: React.ReactNode;
};

export function AppCard({ title, subtitle, badge, children, className, ...props }: AppCardProps) {
  return (
    <Pressable
      className={`rounded-2xl border border-border bg-surface p-4 shadow-sm active:opacity-95 ${className ?? ''}`}
      {...props}
    >
      <View className="flex-row items-start justify-between">
        <View className="flex-1 pr-3">
          <Text className="text-lg font-bold text-navy">{title}</Text>
          {subtitle ? <Text className="mt-1 text-sm text-muted">{subtitle}</Text> : null}
        </View>
        {badge ? (
          <View className="rounded-full bg-cream px-3 py-1">
            <Text className="text-xs font-semibold text-taeguk-blue">{badge}</Text>
          </View>
        ) : null}
      </View>
      {children ? <View className="mt-3">{children}</View> : null}
    </Pressable>
  );
}
