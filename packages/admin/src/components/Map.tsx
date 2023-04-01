import 'leaflet/dist/leaflet.css';

import { Box } from '@chakra-ui/react';
import L, { LatLngExpression, LatLngLiteral } from 'leaflet';
import { Controller, FieldPath, useFormContext } from 'react-hook-form';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';

import { Coordinates } from '../types/kiosk.types';

export function MapField<T extends { coordinates: Coordinates }, K extends FieldPath<T>>({ name }: { name: K }) {
  const { control } = useFormContext<T>();
  return (
    <Controller
      render={({ field: { value, onChange } }) => <Map value={value as Coordinates} onChange={onChange} />}
      name={name}
      control={control}
    />
  );
}

interface MapProps {
  onChange: (coords: Coordinates) => void;
  value: Coordinates;
}

function Map({ onChange, value }: MapProps) {
  const center: LatLngLiteral = { lat: parseFloat(value.lat), lng: parseFloat(value.lon) };
  const zoom = 13;
  return (
    <Box w='100%' h='40rem'>
      <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%' }}>
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
        <DraggableMarker
          onDragEnd={({ lat, lng }) => {
            onChange({ lat: lat.toString(), lon: lng.toString() });
          }}
          defaultPos={center}
        />
      </MapContainer>
    </Box>
  );
}

interface DraggableMarkerProps {
  onDragEnd: (latLng: LatLngLiteral) => void;
  defaultPos: LatLngExpression;
}

function DraggableMarker({ onDragEnd, defaultPos }: DraggableMarkerProps) {
  return (
    <Marker
      draggable={true}
      icon={markerIcon}
      eventHandlers={{ dragend: (evt) => onDragEnd(evt.target._latlng) }}
      position={defaultPos}
    />
  );
}

const markerIcon = new L.Icon({
  iconUrl: '/icons/pin.svg',
  iconRetinaUrl: '/icons/pin.svg',
  iconSize: new L.Point(44, 44),
  iconAnchor: new L.Point(22, 40),
});
