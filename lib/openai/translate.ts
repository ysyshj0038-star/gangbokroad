import { createChatCompletion } from './client';

const LANGUAGE_NAMES: Record<string, string> = {
  ko: 'Korean',
  en: 'English',
  zh: 'Chinese (Simplified)',
  ru: 'Russian',
};

export async function translateText(params: {
  text: string;
  sourceLang: string;
  targetLang: string;
}): Promise<string> {
  if (!params.text.trim()) return '';
  if (params.sourceLang === params.targetLang) return params.text;

  const source = LANGUAGE_NAMES[params.sourceLang] ?? params.sourceLang;
  const target = LANGUAGE_NAMES[params.targetLang] ?? params.targetLang;

  return createChatCompletion({
    messages: [
      {
        role: 'system',
        content: `You are a professional translator for a historical tour in Manchuria and Primorye.
Translate accurately from ${source} to ${target}.
Preserve historical names and terms. Output only the translation, no explanations.`,
      },
      { role: 'user', content: params.text },
    ],
    temperature: 0.3,
    maxTokens: 1500,
  });
}

export { LANGUAGE_NAMES };
