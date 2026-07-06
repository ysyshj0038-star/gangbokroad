import type { LocalizedText } from './index';

export type Notice = {
  id: string;
  title: LocalizedText;
  body: LocalizedText;
  createdAt: string;
  isPinned?: boolean;
};

export type Resource = {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  fileUrl?: string;
  type: 'reference' | 'document' | 'video';
};
