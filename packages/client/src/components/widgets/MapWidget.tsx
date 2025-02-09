import 'leaflet/dist/leaflet.css';

import polyline from '@mapbox/polyline';
import { MapContainer, Marker, Polyline, TileLayer } from 'react-leaflet';
import styled from 'styled-components';

import { useConfig } from '@/layout/ConfigContext';
import { Widget } from '@/layout/Widget';
import { useMapQuery } from '@/network/map.network';
import { MapConfig } from '@/types/widget.type.ts';
import { useInterval } from '@/utils/useInterval.ts';
import { useWidgetConfig } from '@/utils/useWidgetConfig.ts';

import { RealCity } from '../RealCity';
import { StopMarker } from './map/StopMarker';

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
          scrollWheelZoom
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://tileserver.realcity.io/styles/kti/{z}/{x}/{y}.png'
          />

          {data?.vehicles.map((vehicle) => (
            <Marker
              key={vehicle.vehicleId + (vehicle.location.lat + vehicle.location.lon)}
              position={[vehicle.location.lat, vehicle.location.lon]}
            />
          ))}
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
        <SponsorText>
          <RealCity size={35} />
        </SponsorText>
      </ContentContainer>
    </Widget>
  );
}

const ContentContainer = styled.div`
  height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
`;

const SponsorText = styled.p`
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border-top-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 5px;
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
`;
