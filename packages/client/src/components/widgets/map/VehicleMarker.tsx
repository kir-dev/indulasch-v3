import L from 'leaflet';
import { useMemo } from 'react';
import { Marker } from 'react-leaflet';

import { Vehicle } from '@/types/widget/map.type';
import { createVehicleIcon } from '@/utils/createVehicleIcon';

/**
 * A React component that renders a single stop
 * with the custom arcs + rotating black triangle icon.
 */
// eslint-disable-next-line no-undef
export function VehicleMarker({ vehicle }: { vehicle: Vehicle }) {
  // Build the Leaflet icon only once per stop in a stable manner.
  // If the direction changes or something else changes frequently,
  // you may want to include it in the deps array or adjust logic.
  const icon = useMemo(() => {
    return createVehicleIcon(vehicle.style.icon.name ?? 'bus', vehicle.bearing ?? '');
  }, [vehicle.vehicleId, vehicle.bearing]);

  return <Marker position={[vehicle.location.lat, vehicle.location.lon]} icon={icon as L.Icon} />;
}
