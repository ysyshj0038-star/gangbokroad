import type { ImageSource } from 'expo-image';

export type PlaceImageCategory = 'memorial' | 'museum' | 'school' | 'landscape' | 'market';

export const HERO_IMAGE = require('@/assets/images/hero/hero-banner.png') as ImageSource;

export const FIGURE_IMAGES: Record<string, ImageSource> = {
  'an-huije': require('@/assets/images/figures/figure-an-huije.png'),
  'lee-sangseol': require('@/assets/images/figures/figure-lee-sangseol.png'),
  'choi-jaehyung': require('@/assets/images/figures/figure-choi-jaehyung.png'),
  'jo-myeonghui': require('@/assets/images/figures/figure-jo-myeonghui.png'),
};

export const PLACE_CATEGORY_IMAGES: Record<PlaceImageCategory, ImageSource> = {
  memorial: require('@/assets/images/places/place-memorial.png'),
  museum: require('@/assets/images/places/place-museum.png'),
  school: require('@/assets/images/places/place-school.png'),
  landscape: require('@/assets/images/places/place-landscape.png'),
  market: require('@/assets/images/places/place-market.png'),
};

export const PLACE_IMAGE_CATEGORIES: Record<string, PlaceImageCategory> = {
  'an-huije-house': 'school',
  'balhaejin-school': 'school',
  'balhae-farm': 'school',
  'lee-sangseol-memorial': 'memorial',
  'choi-jaehyung-museum': 'museum',
  'choi-jaehyung-monument': 'memorial',
  'balhae-ruins': 'landscape',
  'yukseongchon': 'school',
  'koryo-culture-center': 'museum',
  'korean-congress-site': 'memorial',
  'ussuriysk-museum': 'museum',
  'koryo-market': 'market',
  'sinhanchon-monument': 'memorial',
  'gaecheokri-site': 'landscape',
  'korean-migration-150': 'memorial',
  'jo-myeonghui-literary': 'memorial',
  'eagle-viewpoint': 'landscape',
};

export function getFigureImage(figureId: string): ImageSource | undefined {
  return FIGURE_IMAGES[figureId];
}

export function getPlaceImage(placeId: string, remoteUrl?: string): ImageSource | undefined {
  if (remoteUrl) return { uri: remoteUrl };
  const category = PLACE_IMAGE_CATEGORIES[placeId];
  return category ? PLACE_CATEGORY_IMAGES[category] : undefined;
}

export function getPlaceImageCategory(placeId: string): PlaceImageCategory | undefined {
  return PLACE_IMAGE_CATEGORIES[placeId];
}
