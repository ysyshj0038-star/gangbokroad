export const OPENAI_API_URL = 'https://api.openai.com/v1';

export const OPENAI_MODELS = {
  chat: 'gpt-4o-mini',
  tts: 'tts-1',
  ttsVoice: 'nova' as const,
};

export function isOpenAiConfigured(): boolean {
  return Boolean(process.env.EXPO_PUBLIC_OPENAI_API_KEY);
}

export function getOpenAiApiKey(): string {
  const key = process.env.EXPO_PUBLIC_OPENAI_API_KEY;
  if (!key) {
    throw new Error('OpenAI API key is not configured. Add EXPO_PUBLIC_OPENAI_API_KEY to .env');
  }
  return key;
}
