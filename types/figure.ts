import type { LocalizedText } from './index';

export type Figure = {
  id: string;
  name: LocalizedText;
  birthDeath?: string;
  biography: LocalizedText;
  achievements: LocalizedText[];
  quote: LocalizedText;
  imageUrl?: string;
  relatedPlaceIds: string[];
  referenceUrls?: string[];
  videoUrls?: string[];
};
