import 'leaflet/dist/leaflet.css';

import polyline from '@mapbox/polyline';
import { MapContainer, Polyline, TileLayer } from 'react-leaflet';
import styled from 'styled-components';

import { useConfig } from '@/layout/ConfigContext';
import { Widget } from '@/layout/Widget';
import { useMapQuery } from '@/network/map.network';
import { MapConfig } from '@/types/widget.type.ts';
import { useInterval } from '@/utils/useInterval.ts';
import { useWidgetConfig } from '@/utils/useWidgetConfig.ts';

import { StopMarker } from './map/StopMarker';
import { VehicleMarker } from './map/VehicleMarker';

export function MapWidget() {
  const config = useWidgetConfig<MapConfig>('map');
  const mapConfig = useWidgetConfig<MapConfig>('map');
  const { data, refetch } = useMapQuery(mapConfig);
  useInterval(async () => {
    await refetch();
  }, 5000);
  const {
    config: {
      meta: { coordinates },
    },
  } = useConfig();

  return (
    <Widget grid={config.grid}>
      <ContentContainer>
        <MapContainer
          style={{ width: '100%', height: '100%' }}
          center={[coordinates.lat, coordinates.lon]}
          zoom={config.zoom}
          scrollWheelZoom={false}
          zoomControl={false}
          attributionControl={false}
          dragging={false}
          doubleClickZoom={false}
          touchZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://tileserver.realcity.io/styles/kti/{z}/{x}/{y}.png'
          />

          {data?.vehicles.map((vehicle) => <VehicleMarker key={vehicle.vehicleId} vehicle={vehicle} />)}
          {data?.stops.map((stop) => <StopMarker key={stop.id} stop={stop} />)}

          {data?.routes.map((route) => {
            return route.variants.map((variant) => {
              const points = polyline.decode(variant.polyline.points);
              return (
                <Polyline key={variant.name + variant.headsign} positions={points} color={`#${route.style.color}`} />
              );
            });
          })}
        </MapContainer>
      </ContentContainer>
    </Widget>
  );
}

const ContentContainer = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
`;
