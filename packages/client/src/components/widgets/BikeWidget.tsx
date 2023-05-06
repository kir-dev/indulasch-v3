import React from 'react';
import styled from 'styled-components';

import BubiIcon from '../../assets/icons/bubi.png';
import { Widget } from '../../layout/Widget';
import { useBikeQuery } from '../../network/bike.network';
import { BikeConfig } from '../../types/widget.type';
import { GlobalSize } from '../../utils/theme';
import { useInterval } from '../../utils/useInterval';
import { useWidgetConfig } from '../../utils/useWidgetConfig';
import { WidgetDescription, WidgetHeading } from '../Text';

export function BikeWidget() {
  const config = useWidgetConfig<BikeConfig>('bike');
  const { data, error, refetch } = useBikeQuery();

  useInterval(async () => {
    await refetch();
  }, 10000);

  if (!data || error) {
    return (
      <Widget grid={config.grid}>
        <WidgetDescription>Bubi hiba</WidgetDescription>
      </Widget>
    );
  }

  return (
    <Widget grid={config.grid}>
      <StyledImg src={BubiIcon} />
      <WidgetHeading>
        {data.bikes_available_to_rent || 0} / {data.bike_racks || 0}
      </WidgetHeading>
      <WidgetDescription>{data.name}</WidgetDescription>
    </Widget>
  );
}

const StyledImg = styled.img`
  height: ${GlobalSize.widgetImage};
  width: ${GlobalSize.widgetImage};
  max-width: 100%;
  max-height: 100%;
`;
