import { useCallback, useEffect, useRef, useState } from 'react';
import { Audio, AVPlaybackStatus } from 'expo-av';

export type PlaybackSpeed = 0.8 | 1 | 1.2 | 1.5;

const SPEEDS: PlaybackSpeed[] = [0.8, 1, 1.2, 1.5];

export function useAudioPlayer() {
  const soundRef = useRef<Audio.Sound | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [positionMs, setPositionMs] = useState(0);
  const [durationMs, setDurationMs] = useState(0);
  const [speed, setSpeed] = useState<PlaybackSpeed>(1);
  const [error, setError] = useState<string | null>(null);

  const onStatusUpdate = useCallback((status: AVPlaybackStatus) => {
    if (!status.isLoaded) return;
    setPositionMs(status.positionMillis);
    setDurationMs(status.durationMillis ?? 0);
    setIsPlaying(status.isPlaying);
    if (status.didJustFinish) {
      setIsPlaying(false);
    }
  }, []);

  const unload = useCallback(async () => {
    if (soundRef.current) {
      await soundRef.current.unloadAsync();
      soundRef.current = null;
    }
    setIsLoaded(false);
    setIsPlaying(false);
    setPositionMs(0);
    setDurationMs(0);
  }, []);

  const loadAudio = useCallback(
    async (uri: string) => {
      await unload();
      setError(null);
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
      });

      const { sound } = await Audio.Sound.createAsync(
        { uri },
        { shouldPlay: false, rate: speed, shouldCorrectPitch: true },
        onStatusUpdate,
      );
      soundRef.current = sound;
      setIsLoaded(true);
    },
    [onStatusUpdate, speed, unload],
  );

  const play = useCallback(async () => {
    await soundRef.current?.playAsync();
  }, []);

  const pause = useCallback(async () => {
    await soundRef.current?.pauseAsync();
  }, []);

  const togglePlay = useCallback(async () => {
    if (isPlaying) await pause();
    else await play();
  }, [isPlaying, pause, play]);

  const seekBy = useCallback(async (offsetMs: number) => {
    const next = Math.max(0, Math.min(positionMs + offsetMs, durationMs));
    await soundRef.current?.setPositionAsync(next);
  }, [positionMs, durationMs]);

  const seekTo = useCallback(async (ms: number) => {
    await soundRef.current?.setPositionAsync(ms);
  }, []);

  const replay = useCallback(async () => {
    await soundRef.current?.setPositionAsync(0);
    await play();
  }, [play]);

  const cycleSpeed = useCallback(async () => {
    const idx = SPEEDS.indexOf(speed);
    const next = SPEEDS[(idx + 1) % SPEEDS.length];
    setSpeed(next);
    await soundRef.current?.setRateAsync(next, true);
  }, [speed]);

  useEffect(() => {
    return () => {
      void unload();
    };
  }, [unload]);

  return {
    isLoaded,
    isPlaying,
    positionMs,
    durationMs,
    speed,
    error,
    setError,
    loadAudio,
    unload,
    play,
    pause,
    togglePlay,
    seekBy,
    seekTo,
    replay,
    cycleSpeed,
  };
}

export function formatTime(ms: number) {
  const totalSec = Math.floor(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return `${min}:${sec.toString().padStart(2, '0')}`;
}
