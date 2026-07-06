import type { LocalizedText } from './index';

export type ScheduleDay = {
  id: string;
  dayNumber: number;
  date: string;
  dateLabel: LocalizedText;
  route: LocalizedText[];
  placeIds: string[];
};

export type SchedulePlace = {
  id: string;
  dayId: string;
  order: number;
  name: LocalizedText;
  description: LocalizedText;
  imageUrl?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  figureIds: string[];
  historicalStory: LocalizedText;
};
