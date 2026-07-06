import type { ImageSource } from 'expo-image';

import { SiteImage } from '@/components/ui/SiteImage';

type PlaceImageHeaderProps = {
  title: string;
  subtitle?: string;
  imageSource?: ImageSource;
  gradient?: [string, string];
  height?: number;
  rounded?: boolean;
};

export function PlaceImageHeader({
  title,
  subtitle,
  imageSource,
  gradient,
  height = 220,
  rounded,
}: PlaceImageHeaderProps) {
  return (
    <SiteImage
      source={imageSource}
      title={title}
      subtitle={subtitle}
      gradient={gradient}
      height={height}
      rounded={rounded}
    />
  );
}
