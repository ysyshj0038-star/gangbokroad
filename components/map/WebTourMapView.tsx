import { useEffect, useMemo } from 'react';
import { Platform, View } from 'react-native';

import { DAY_MARKER_COLORS } from '@/constants/map';
import { getMapCenter } from '@/lib/geo/distance';
import type { Place } from '@/types/place';

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

    return buildLeafletDocument({
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
        Expo Maps does not support web. This iframe hosts a small Leaflet map
        backed by OpenStreetMap tiles, so the deployed website still has a map.
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
      title="Gwangbok Road OpenStreetMap"
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

function buildLeafletDocument({
  center,
  places,
  selectedPlaceId,
  userLocation,
}: {
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
  const placesJson = serializeForScript(places);
  const userLocationJson = serializeForScript(userLocation);
  const selectedPlaceIdJson = serializeForScript(selectedPlaceId);

  return `<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <link
    rel="stylesheet"
    href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
    integrity="sha256-p4NxAoJBhIINfQyQb/FbMJAUIUuEJdz3x7Lfjr9F0X0="
    crossorigin=""
  />
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
    .popup-button {
      background: #0047A0;
      border: 0;
      border-radius: 999px;
      color: #fff;
      cursor: pointer;
      font-weight: 700;
      padding: 8px 12px;
    }
    .leaflet-popup-content { margin: 12px; }
  </style>
</head>
<body>
  <div id="map"></div>
  <script
    src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
    integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
    crossorigin=""
  ></script>
  <script>
    const places = ${placesJson};
    const userLocation = ${userLocationJson};
    const selectedPlaceId = ${selectedPlaceIdJson};
    const map = L.map('map', { zoomControl: true }).setView(
      [${center.latitude}, ${center.longitude}],
      ${center.zoom}
    );

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const markerBounds = [];

    function selectPlace(placeId) {
      window.parent.postMessage({ type: 'gwangbok-map-place-select', placeId }, '*');
    }

    places.forEach((place) => {
      const dayNumber = place.dayId.replace('day', '') || '•';
      const icon = L.divIcon({
        className: '',
        html: '<div class="marker-dot" style="background:' + place.color + '">' + dayNumber + '</div>',
        iconSize: [28, 28],
        iconAnchor: [14, 28],
        popupAnchor: [0, -28]
      });
      const marker = L.marker([place.latitude, place.longitude], { icon }).addTo(map);
      markerBounds.push([place.latitude, place.longitude]);
      marker.bindPopup(
        '<div class="popup-title">' + place.label + '</div>' +
        '<button class="popup-button" type="button" onclick="selectPlace(\\'' + place.id + '\\')">상세 보기</button>'
      );
      marker.on('click', () => selectPlace(place.id));
      if (selectedPlaceId === place.id) marker.openPopup();
    });

    if (userLocation) {
      L.circleMarker([userLocation.latitude, userLocation.longitude], {
        color: '#0047A0',
        fillColor: '#0047A0',
        fillOpacity: 0.9,
        radius: 7
      }).addTo(map).bindPopup('현재 위치');
      markerBounds.push([userLocation.latitude, userLocation.longitude]);
    }

    if (markerBounds.length > 1) {
      map.fitBounds(markerBounds, { padding: [32, 32], maxZoom: 9 });
    }
  </script>
</body>
</html>`;
}
