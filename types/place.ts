import type { LocalizedText } from './index';

export type Place = {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  historicalStory: LocalizedText;
  imageUrl?: string;
  imageGradient?: [string, string];
  coordinates: {
    latitude: number;
    longitude: number;
  };
  figureIds: string[];
  dayId: string;
  order: number;
  hasAudioGuide: boolean;
};
