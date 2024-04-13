import { useMemo } from 'react';
import styled from 'styled-components';

import { useConfig } from '@/layout/ConfigContext';
import { Widget } from '@/layout/Widget';
import { useDepartureQuery } from '@/network/departure.network.ts';
import { DeparturesConfig, MapConfig } from '@/types/widget.type.ts';
import { useInterval } from '@/utils/useInterval.ts';
import { useWidgetConfig } from '@/utils/useWidgetConfig.ts';

import { RealCity } from '../RealCity';
import { WidgetHeading } from '../Text';

const mapSrc = 'https://futar.bkk.hu/ride-gui/sign.html';

export function MapWidget() {
  const config = useWidgetConfig<MapConfig>('map');
  const departuresConfig = useWidgetConfig<DeparturesConfig>('departures');
  const { data, error, refetch } = useDepartureQuery(departuresConfig);
  useInterval(async () => {
    await refetch();
  }, 5000);
  const mapWidth = '2000px';
  const {
    config: {
      meta: { coordinates },
    },
  } = useConfig();

  const src = useMemo(() => {
    const url = new URL(mapSrc);
    data?.departures?.map((departure) => departure.stopId).forEach((stop) => url.searchParams.append('stop', stop));
    url.searchParams.set('mapZoom', config.zoom.toString());
    url.searchParams.set('mapBoundsRadiusMeters', config.radius.toString());
    url.searchParams.set('display-coordinates', `${coordinates.lon},${coordinates.lat}`);
    url.searchParams.set('mapWidth', mapWidth);
    return url.toString();
  }, [data]);
  if (error || !data) {
    return (
      <Widget grid={config.grid}>
        <WidgetHeading>
          <i>{error ? 'Hiba történt' : 'Nincs indulás'}</i>
        </WidgetHeading>
      </Widget>
    );
  }
  const leftBaseOffset = -760 * devicePixelRatio;
  const topBaseOffset = -300 * devicePixelRatio;
  const leftZoomOffset = 1050 * (devicePixelRatio / 2 - 1);
  const topZoomOffset = 210 * (devicePixelRatio / 2 - 1);
  const leftColumnOffset =
    (devicePixelRatio > 1.75 ? 120 : 160) * (config.grid.column.end - config.grid.column.start - 1) * devicePixelRatio;
  const topRowOffset = 70 * (config.grid.row.end - config.grid.row.start - 1) * devicePixelRatio;

  return (
    <Widget grid={config.grid}>
      <ContentContainer>
        <IFrameContainer
          src={src.replace('%2C', ',').replace('.html', '.html#')} // # nélkül nem működik, Köszönd Gábornak xd
          style={{
            left: leftBaseOffset + leftZoomOffset + leftColumnOffset + Number(config.xOffset), // haha, fix nem ták :DDD
            top: topBaseOffset + topZoomOffset + topRowOffset + Number(config.yOffset),
          }}
        />
        <SponsorText>
          <RealCity size={35} />
        </SponsorText>
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
const IFrameContainer = styled.iframe`
  position: absolute;
  /* Adjust this value to crop from the left half */
  width: 2760px;
  /* Width of the iframe */
  height: 1440px;
  /* Height of the iframe */
  border: none;
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
