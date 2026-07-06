import { Pressable, Text, View, type PressableProps } from 'react-native';

type AppButtonProps = PressableProps & {
  label: string;
  variant?: 'primary' | 'secondary' | 'outline';
  icon?: React.ReactNode;
};

const variantStyles = {
  primary: 'bg-taeguk-blue active:bg-navy-light',
  secondary: 'bg-taeguk-red active:opacity-90',
  outline: 'bg-transparent border-2 border-taeguk-blue active:bg-cream',
};

const textStyles = {
  primary: 'text-white',
  secondary: 'text-white',
  outline: 'text-taeguk-blue',
};

export function AppButton({
  label,
  variant = 'primary',
  icon,
  className,
  ...props
}: AppButtonProps) {
  return (
    <Pressable
      className={`flex-row items-center justify-center rounded-2xl px-5 py-4 ${variantStyles[variant]} ${className ?? ''}`}
      {...props}
    >
      {icon ? <View className="mr-2">{icon}</View> : null}
      <Text className={`text-base font-semibold ${textStyles[variant]}`}>{label}</Text>
    </Pressable>
  );
}
