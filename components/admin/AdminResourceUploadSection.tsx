import * as DocumentPicker from 'expo-document-picker';
import { useState } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';

import { AdminField, AdminSectionTitle } from '@/components/admin/AdminField';
import { AppButton } from '@/components/ui/AppButton';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { createResource, uploadResourceFile } from '@/lib/firebase';
import type { FirestoreResource } from '@/lib/firebase';

type ResourceType = FirestoreResource['type'];

const RESOURCE_TYPES: ResourceType[] = ['reference', 'document', 'video'];

type Props = {
  userId: string;
};

export function AdminResourceUploadSection({ userId }: Props) {
  const { t } = useAppTranslation();
  const [titleKo, setTitleKo] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [descriptionKo, setDescriptionKo] = useState('');
  const [descriptionEn, setDescriptionEn] = useState('');
  const [resourceType, setResourceType] = useState<ResourceType>('document');
  const [pickedFile, setPickedFile] = useState<DocumentPicker.DocumentPickerAsset | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handlePickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: '*/*',
      copyToCacheDirectory: true,
    });

    if (!result.canceled && result.assets[0]) {
      setPickedFile(result.assets[0]);
    }
  };

  const handleUpload = async () => {
    if (!pickedFile) {
      Alert.alert(t('admin.fileRequired'));
      return;
    }

    setIsUploading(true);
    try {
      const response = await fetch(pickedFile.uri);
      const blob = await response.blob();

      const { url } = await uploadResourceFile({
        fileName: pickedFile.name,
        blob,
        contentType: pickedFile.mimeType ?? undefined,
      });

      await createResource({
        title: { ko: titleKo.trim(), en: titleEn.trim() || titleKo.trim() },
        description: {
          ko: descriptionKo.trim(),
          en: descriptionEn.trim() || descriptionKo.trim(),
        },
        type: resourceType,
        fileUrl: url,
        fileName: pickedFile.name,
        fileSize: pickedFile.size,
        uploadedBy: userId,
      });

      setTitleKo('');
      setTitleEn('');
      setDescriptionKo('');
      setDescriptionEn('');
      setPickedFile(null);
      Alert.alert(t('admin.resourceUploaded'));
    } catch {
      Alert.alert(t('common.error'));
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <View className="gap-4 rounded-2xl border border-border bg-surface p-4">
      <AdminSectionTitle title={t('admin.upload')} subtitle={t('admin.uploadHint')} />

      <View className="flex-row flex-wrap gap-2">
        {RESOURCE_TYPES.map((type) => (
          <Pressable
            key={type}
            onPress={() => setResourceType(type)}
            className={`rounded-full px-4 py-2 ${
              resourceType === type ? 'bg-navy' : 'border border-border bg-cream'
            }`}
          >
            <Text
              className={`text-sm font-medium ${
                resourceType === type ? 'text-white' : 'text-navy'
              }`}
            >
              {t(`resources.types.${type}`)}
            </Text>
          </Pressable>
        ))}
      </View>

      <AdminField label={t('admin.resourceTitleKo')} value={titleKo} onChangeText={setTitleKo} />
      <AdminField label={t('admin.resourceTitleEn')} value={titleEn} onChangeText={setTitleEn} />
      <AdminField
        label={t('admin.resourceDescKo')}
        value={descriptionKo}
        onChangeText={setDescriptionKo}
        multiline
      />
      <AdminField
        label={t('admin.resourceDescEn')}
        value={descriptionEn}
        onChangeText={setDescriptionEn}
        multiline
      />

      <AppButton label={t('admin.pickFile')} variant="outline" onPress={() => void handlePickFile()} />

      {pickedFile ? (
        <Text className="text-sm text-muted">
          {t('admin.selectedFile', { name: pickedFile.name })}
        </Text>
      ) : null}

      <AppButton
        label={t('admin.uploadResource')}
        onPress={() => void handleUpload()}
        disabled={isUploading || !titleKo.trim() || !descriptionKo.trim() || !pickedFile}
      />
    </View>
  );
}
