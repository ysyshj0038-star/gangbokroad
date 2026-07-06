import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { LayoutChangeEvent, Modal, Pressable, ScrollView, Text, View } from 'react-native';

import { Theme } from '@/constants/theme';
import { formatTime, useAudioPlayer } from '@/hooks/useAudioPlayer';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type AudioGuidePlayerProps = {
  audioUri: string;
  script: string;
  title: string;
};

const FONT_SIZES = [14, 16, 18, 22] as const;

export function AudioGuidePlayer({ audioUri, script, title }: AudioGuidePlayerProps) {
  const { t } = useAppTranslation();
  const player = useAudioPlayer();
  const [barWidth, setBarWidth] = useState(0);
  const [fontSize, setFontSize] = useState<number>(16);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    void player.loadAudio(audioUri);
  }, [audioUri]);

  const progress = player.durationMs > 0 ? player.positionMs / player.durationMs : 0;
  const remaining = Math.max(0, player.durationMs - player.positionMs);

  const handleSeek = (event: { nativeEvent: { locationX: number } }) => {
    if (barWidth <= 0 || player.durationMs <= 0) return;
    const ratio = event.nativeEvent.locationX / barWidth;
    void player.seekTo(ratio * player.durationMs);
  };

  const cycleFontSize = () => {
    const idx = FONT_SIZES.indexOf(fontSize as (typeof FONT_SIZES)[number]);
    setFontSize(FONT_SIZES[(idx + 1) % FONT_SIZES.length]);
  };

  return (
    <View className="gap-4">
      <View className="rounded-2xl border border-border bg-surface p-4">
        <Text className="mb-4 text-center text-lg font-bold text-navy">{title}</Text>

        {/* Seek bar */}
        <Pressable
          onPress={handleSeek}
          onLayout={(e: LayoutChangeEvent) => setBarWidth(e.nativeEvent.layout.width)}
          className="mb-2 h-2 overflow-hidden rounded-full bg-cream"
        >
          <View
            className="h-full rounded-full bg-taeguk-blue"
            style={{ width: `${progress * 100}%` }}
          />
        </Pressable>

        <View className="mb-4 flex-row justify-between">
          <Text className="text-xs text-muted">{formatTime(player.positionMs)}</Text>
          <Text className="text-xs text-muted">-{formatTime(remaining)}</Text>
        </View>

        {/* Controls */}
        <View className="flex-row items-center justify-center gap-4">
          <ControlButton icon="play-back" label={t('audioGuide.backward')} onPress={() => void player.seekBy(-10000)} />
          <Pressable
            onPress={() => void player.togglePlay()}
            className="h-14 w-14 items-center justify-center rounded-full bg-taeguk-blue"
          >
            <Ionicons name={player.isPlaying ? 'pause' : 'play'} size={28} color="#fff" />
          </Pressable>
          <ControlButton icon="play-forward" label={t('audioGuide.forward')} onPress={() => void player.seekBy(10000)} />
        </View>

        <View className="mt-4 flex-row justify-center gap-3">
          <SmallButton label={t('audioGuide.replay')} onPress={() => void player.replay()} />
          <SmallButton label={`${player.speed}x`} onPress={() => void player.cycleSpeed()} />
        </View>
      </View>

      {/* Subtitles */}
      <View className="rounded-2xl border border-border bg-surface p-4">
        <View className="mb-3 flex-row items-center justify-between">
          <Text className="text-sm font-bold text-navy">{t('audioGuide.subtitle')}</Text>
          <View className="flex-row gap-2">
            <SmallButton label={t('audioGuide.fontSize')} onPress={cycleFontSize} />
            <SmallButton label={t('audioGuide.fullscreen')} onPress={() => setFullscreen(true)} />
          </View>
        </View>
        <ScrollView style={{ maxHeight: 200 }} showsVerticalScrollIndicator>
          <Text className="leading-7 text-navy" style={{ fontSize }}>
            {script}
          </Text>
        </ScrollView>
      </View>

      <Modal visible={fullscreen} animationType="slide" presentationStyle="pageSheet">
        <View className="flex-1 bg-cream px-6 pt-12">
          <View className="mb-4 flex-row items-center justify-between">
            <Text className="text-xl font-bold text-navy">{title}</Text>
            <Pressable onPress={() => setFullscreen(false)} className="rounded-full bg-surface p-2">
              <Ionicons name="close" size={24} color={Theme.colors.navy} />
            </Pressable>
          </View>
          <ScrollView showsVerticalScrollIndicator>
            <Text className="leading-8 text-navy" style={{ fontSize: fontSize + 4 }}>
              {script}
            </Text>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

function ControlButton({
  icon,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} className="h-10 w-10 items-center justify-center rounded-full bg-cream">
      <Ionicons name={icon} size={22} color={Theme.colors.navy} />
    </Pressable>
  );
}

function SmallButton({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} className="rounded-full bg-cream px-3 py-1.5">
      <Text className="text-xs font-semibold text-taeguk-blue">{label}</Text>
    </Pressable>
  );
}
