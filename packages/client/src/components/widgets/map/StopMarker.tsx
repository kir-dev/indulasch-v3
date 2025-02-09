import L from 'leaflet';
import { useEffect, useMemo } from 'react';
import { Marker } from 'react-leaflet';

import { Stop } from '@/types/widget/map.type';
import { createStopIcon } from '@/utils/createStopIcon';
import { updateImage } from '@/utils/stopIconHelper';

/**
 * A React component that renders a single stop
 * with the custom arcs + rotating black triangle icon.
 */
// eslint-disable-next-line no-undef
export function StopMarker({ stop }: { stop: Stop }) {
  // Build the Leaflet icon only once per stop in a stable manner.
  // If the direction changes or something else changes frequently,
  // you may want to include it in the deps array or adjust logic.
  const icon = useMemo(() => {
    return createStopIcon(stop.id, stop.direction ?? '');
  }, [stop.id, stop.direction]);

  // Once the component has mounted/updated, run the arc-drawing code:
  useEffect(() => {
    // If the stop has style.colors, paint the arcs
    if (stop.style?.colors?.length) {
      updateImage(`stop-${stop.id}`, stop.style.colors, true);
    }
  }, [stop.id, stop.style?.colors]);

  return <Marker position={[stop.lat, stop.lon]} icon={icon as L.Icon} />;
}
