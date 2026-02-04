"use client";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";
import L from "leaflet";

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface LocationMapProps {
  onLocationSelect: (lat: number, lon: number) => void;
  initialLat?: number;
  initialLon?: number;
}

function LocationMarker({
  onLocationSelect,
}: {
  onLocationSelect: (lat: number, lon: number) => void;
}) {
  const [position, setPosition] = useState<[number, number] | null>(null);

  const map = useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      onLocationSelect(lat, lng);
    },
  });

  return position === null ? null : <Marker position={position} />;
}

export default function LocationMap({
  onLocationSelect,
  initialLat = 19.54,
  initialLon = -99.17,
}: LocationMapProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="h-[400px] bg-gray-800 rounded-xl flex items-center justify-center">
        <p className="text-gray-400">Loading map...</p>
      </div>
    );
  }

  return (
    <div className="h-[400px] rounded-xl overflow-hidden shadow-lg">
      <MapContainer
        center={[initialLat, initialLon]}
        zoom={10}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker onLocationSelect={onLocationSelect} />
      </MapContainer>
    </div>
  );
}
