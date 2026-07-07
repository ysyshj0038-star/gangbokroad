import { useEffect, useMemo } from 'react';
import { Platform, View } from 'react-native';

import { DAY_MARKER_COLORS } from '@/constants/map';
import { getMapCenter } from '@/lib/geo/distance';
import type { Place } from '@/types/place';

const GOOGLE_MAPS_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY ?? '';

type WebMapPlace = Place & { label: string };

type WebTourMapViewProps = {
  places: WebMapPlace[];
  selectedPlaceId?: string | null;
  userLocation?: { latitude: number; longitude: number } | null;
  onPlaceSelect: (placeId: string) => void;
};

type MapMessage = {
  type: 'gwangbok-map-place-select';
  placeId: string;
};

function serializeForScript(value: unknown) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

export function WebTourMapView({
  places,
  selectedPlaceId,
  userLocation,
  onPlaceSelect,
}: WebTourMapViewProps) {
  useEffect(() => {
    if (Platform.OS !== 'web' || typeof window === 'undefined') return undefined;

    const handleMessage = (event: MessageEvent<MapMessage>) => {
      if (event.data?.type === 'gwangbok-map-place-select') {
        onPlaceSelect(event.data.placeId);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onPlaceSelect]);

  const source = useMemo(() => {
    const center = getMapCenter(places.map((place) => place.coordinates));
    const markerPlaces = places.map((place) => ({
      id: place.id,
      label: place.label,
      dayId: place.dayId,
      latitude: place.coordinates.latitude,
      longitude: place.coordinates.longitude,
      color: DAY_MARKER_COLORS[place.dayId] ?? '#0047A0',
    }));

    return buildGoogleMapsDocument({
      apiKey: GOOGLE_MAPS_API_KEY,
      center,
      places: markerPlaces,
      selectedPlaceId,
      userLocation,
    });
  }, [places, selectedPlaceId, userLocation]);

  if (Platform.OS !== 'web') {
    return null;
  }

  return (
    <View className="flex-1 overflow-hidden bg-cream">
      {/*
        Expo Maps does not support web. This iframe hosts Google Maps JS API
        while native platforms keep using expo-maps.
      */}
      {createIframe(source)}
    </View>
  );
}

function createIframe(source: string) {
  return (
    // React Native Web allows raw DOM elements through React.createElement.
    // The iframe keeps Leaflet DOM/CSS isolated from native screens.
    // eslint-disable-next-line react/no-unknown-property
    <iframe
      title="Gwangbok Road Google Map"
      srcDoc={source}
      style={{
        border: 0,
        height: '100%',
        minHeight: 480,
        width: '100%',
      }}
    />
  );
}

function buildGoogleMapsDocument({
  apiKey,
  center,
  places,
  selectedPlaceId,
  userLocation,
}: {
  apiKey: string;
  center: { latitude: number; longitude: number; zoom: number };
  places: Array<{
    id: string;
    label: string;
    dayId: string;
    latitude: number;
    longitude: number;
    color: string;
  }>;
  selectedPlaceId?: string | null;
  userLocation?: { latitude: number; longitude: number } | null;
}) {
  if (!apiKey) {
    return buildMissingApiKeyDocument();
  }

  const placesJson = serializeForScript(places);
  const userLocationJson = serializeForScript(userLocation);
  const selectedPlaceIdJson = serializeForScript(selectedPlaceId);
  const scriptUrl = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&callback=initMap&v=weekly`;

  return `<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <style>
    html, body, #map { height: 100%; margin: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
    .marker-dot {
      align-items: center;
      border: 2px solid #fff;
      border-radius: 999px;
      box-shadow: 0 6px 14px rgba(27, 42, 74, 0.28);
      color: #fff;
      display: flex;
      font-size: 12px;
      font-weight: 800;
      height: 28px;
      justify-content: center;
      width: 28px;
    }
    .popup-title { color: #1B2A4A; font-size: 14px; font-weight: 800; margin-bottom: 8px; }
    .popup-day { color: #6B7280; font-size: 12px; margin-bottom: 10px; }
    .popup-button {
      background: #0047A0;
      border: 0;
      border-radius: 999px;
      color: #fff;
      cursor: pointer;
      font-weight: 700;
      padding: 8px 12px;
    }
  </style>
</head>
<body>
  <div id="map"></div>
  <script>
    const places = ${placesJson};
    const userLocation = ${userLocationJson};
    const selectedPlaceId = ${selectedPlaceIdJson};

    function selectPlace(placeId) {
      window.parent.postMessage({ type: 'gwangbok-map-place-select', placeId }, '*');
    }

    function buildMarkerIcon(place) {
      const dayNumber = place.dayId.replace('day', '') || '';
      const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="44" viewBox="0 0 36 44">' +
        '<path fill="' + place.color + '" stroke="white" stroke-width="2" d="M18 1C8.6 1 1 8.6 1 18c0 13.1 17 25 17 25s17-11.9 17-25C35 8.6 27.4 1 18 1Z"/>' +
        '<text x="18" y="23" fill="white" font-size="14" font-family="Arial" font-weight="700" text-anchor="middle">' + dayNumber + '</text>' +
        '</svg>';

      return {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg),
        scaledSize: new google.maps.Size(36, 44),
        anchor: new google.maps.Point(18, 44)
      };
    }

    function createInfoContent(place) {
      const wrapper = document.createElement('div');
      const title = document.createElement('div');
      const day = document.createElement('div');
      const button = document.createElement('button');

      title.className = 'popup-title';
      title.textContent = place.label;
      day.className = 'popup-day';
      day.textContent = 'Day ' + place.dayId.replace('day', '');
      button.className = 'popup-button';
      button.type = 'button';
      button.textContent = '상세 보기';
      button.addEventListener('click', () => selectPlace(place.id));

      wrapper.appendChild(title);
      wrapper.appendChild(day);
      wrapper.appendChild(button);
      return wrapper;
    }

    window.initMap = function initMap() {
      const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: ${center.latitude}, lng: ${center.longitude} },
        zoom: ${center.zoom},
        mapTypeControl: false,
        fullscreenControl: true,
        streetViewControl: false,
        clickableIcons: true
      });

      const bounds = new google.maps.LatLngBounds();
      const infoWindow = new google.maps.InfoWindow();

      places.forEach((place) => {
        const position = { lat: place.latitude, lng: place.longitude };
        const marker = new google.maps.Marker({
          map,
          position,
          title: place.label,
          icon: buildMarkerIcon(place)
        });

        bounds.extend(position);
        marker.addListener('click', () => {
          infoWindow.setContent(createInfoContent(place));
          infoWindow.open({ anchor: marker, map });
          selectPlace(place.id);
        });

        if (selectedPlaceId === place.id) {
          infoWindow.setContent(createInfoContent(place));
          infoWindow.open({ anchor: marker, map });
        }
      });

      if (userLocation) {
        const userPosition = { lat: userLocation.latitude, lng: userLocation.longitude };
        new google.maps.Marker({
          map,
          position: userPosition,
          title: '현재 위치',
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: '#0047A0',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 2,
            scale: 8
          }
        });
        bounds.extend(userPosition);
      }

      if (places.length > 1) {
        map.fitBounds(bounds, 32);
        google.maps.event.addListenerOnce(map, 'bounds_changed', () => {
          if (map.getZoom() > 9) map.setZoom(9);
        });
      }
    };
  </script>
  <script src="${scriptUrl}" async defer></script>
</body>
</html>`;
}

function buildMissingApiKeyDocument() {
  return `<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <style>
    html, body { height: 100%; margin: 0; }
    body {
      align-items: center;
      background: #F7F1E5;
      color: #1B2A4A;
      display: flex;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      justify-content: center;
      padding: 24px;
      text-align: center;
    }
    .card {
      background: #fff;
      border: 1px solid #E3D8C6;
      border-radius: 24px;
      box-shadow: 0 12px 30px rgba(27, 42, 74, 0.12);
      max-width: 480px;
      padding: 24px;
    }
    .title { font-size: 20px; font-weight: 800; margin-bottom: 10px; }
    .body { color: #6B7280; font-size: 14px; line-height: 1.7; }
    code {
      background: #F7F1E5;
      border-radius: 8px;
      color: #C8102E;
      padding: 2px 6px;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="title">Google Maps API 키가 필요합니다</div>
    <div class="body">
      Vercel 또는 로컬 <code>.env</code>에
      <code>EXPO_PUBLIC_GOOGLE_MAPS_API_KEY</code>를 설정한 뒤 다시 배포하세요.
    </div>
  </div>
</body>
</html>`;
}
