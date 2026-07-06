import { AppleMaps, GoogleMaps } from 'expo-maps';
import { Platform, View, Text } from 'react-native';

import { DAY_MARKER_COLORS } from '@/constants/map';
import { Theme } from '@/constants/theme';
import { getMapCenter } from '@/lib/geo/distance';
import type { Place } from '@/types/place';

type MapPlace = Place & { label: string };

type TourMapViewProps = {
  places: MapPlace[];
  selectedPlaceId?: string | null;
  userLocation?: { latitude: number; longitude: number } | null;
  onPlaceSelect: (placeId: string) => void;
};

export function TourMapView({
  places,
  selectedPlaceId,
  userLocation,
  onPlaceSelect,
}: TourMapViewProps) {
  if (Platform.OS === 'web') {
    return null;
  }

  const camera = getMapCenter(places.map((p) => p.coordinates));
  const cameraPosition = {
    coordinates: { latitude: camera.latitude, longitude: camera.longitude },
    zoom: camera.zoom,
  };

  if (Platform.OS === 'ios') {
    const markers: AppleMaps.Marker[] = places.map((place) => ({
      id: place.id,
      coordinates: place.coordinates,
      title: place.label,
      tintColor: DAY_MARKER_COLORS[place.dayId] ?? Theme.colors.taegukBlue,
      systemImage: selectedPlaceId === place.id ? 'mappin.circle.fill' : 'mappin',
    }));

    return (
      <AppleMaps.View
        style={{ flex: 1 }}
        cameraPosition={cameraPosition}
        markers={markers}
        properties={{ isMyLocationEnabled: true }}
        uiSettings={{ myLocationButtonEnabled: true, compassEnabled: true }}
        onMarkerClick={(event) => {
          if (event.id) onPlaceSelect(event.id);
        }}
      />
    );
  }

  if (Platform.OS === 'android') {
    const markers: GoogleMaps.Marker[] = places.map((place) => ({
      id: place.id,
      coordinates: place.coordinates,
      title: place.label,
      snippet: place.label,
      showCallout: true,
    }));

    return (
      <GoogleMaps.View
        style={{ flex: 1 }}
        cameraPosition={cameraPosition}
        markers={markers}
        properties={{ isMyLocationEnabled: true }}
        uiSettings={{ myLocationButtonEnabled: true, compassEnabled: true }}
        userLocation={
          userLocation
            ? { coordinates: userLocation, followUserLocation: false }
            : undefined
        }
        onMarkerClick={(event) => {
          if (event.id) onPlaceSelect(event.id);
        }}
      />
    );
  }

  return (
    <View className="flex-1 items-center justify-center bg-cream">
      <Text className="text-navy">Map not supported</Text>
    </View>
  );
}
