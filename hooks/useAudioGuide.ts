import { useCallback, useState } from 'react';

import { getCurrentLanguage } from '@/i18n';
import {
  generatePlaceNarration,
  isOpenAiConfigured,
  synthesizeSpeech,
} from '@/lib/openai';

export type AudioGuideState = 'idle' | 'generating-script' | 'generating-audio' | 'ready' | 'error';

export function useAudioGuide() {
  const [state, setState] = useState<AudioGuideState>('idle');
  const [script, setScript] = useState('');
  const [audioUri, setAudioUri] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generate = useCallback(
    async (params: {
      placeId: string;
      placeName: string;
      description: string;
      historicalStory: string;
      relatedFigures: string[];
    }) => {
      if (!isOpenAiConfigured()) {
        setError('OpenAI not configured');
        setState('error');
        return;
      }

      setState('generating-script');
      setError(null);
      setScript('');
      setAudioUri(null);

      try {
        const lang = getCurrentLanguage();
        const narration = await generatePlaceNarration({
          placeName: params.placeName,
          description: params.description,
          historicalStory: params.historicalStory,
          relatedFigures: params.relatedFigures,
          language: lang,
        });

        setScript(narration);
        setState('generating-audio');

        const uri = await synthesizeSpeech({
          text: narration,
          fileName: `guide_${params.placeId}.mp3`,
        });

        setAudioUri(uri);
        setState('ready');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to generate audio guide');
        setState('error');
      }
    },
    [],
  );

  const reset = useCallback(() => {
    setState('idle');
    setScript('');
    setAudioUri(null);
    setError(null);
  }, []);

  return {
    state,
    script,
    audioUri,
    error,
    generate,
    reset,
    isConfigured: isOpenAiConfigured(),
  };
}
