import { useMemo } from 'react';
import styled from 'styled-components';

import { useConfig } from '../../layout/ConfigContext';
import { Widget } from '../../layout/Widget';
import { useDepartureQuery } from '../../network/departure.network';
import { DeparturesConfig, MapConfig } from '../../types/widget.type';
import { useInterval } from '../../utils/useInterval';
import { useWidgetConfig } from '../../utils/useWidgetConfig';
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
  const mapWidth = '1800px';
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
  return (
    <Widget grid={config.grid}>
      <ContentContainer>
        <IFrameContainer
          src={src.replace('%2C', ',').replace('.html', '.html#')} // # nélkül nem működik, Köszönd Gábornak xd
          style={{
            left: -1420 + 240 * (config.grid.column.end - config.grid.column.start - 1), // haha, fix nem ták :DDD
            top: -430 + 120 * (config.grid.row.end - config.grid.row.start - 1),
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
  width: 2560px;
  /* Width of the iframe */
  height: 1080px;
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
