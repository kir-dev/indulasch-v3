import React from 'react';
import styled from 'styled-components';

import { useWidgetConfig } from '../../utils/useWidgetConfig';
import { BikeConfig } from '../../types/widget.type';
import { Widget } from '../../layout/Widget';
import { WidgetDescription, WidgetHeading } from '../Text';
import { useBikeQuery } from '../../network/bike.network';
import BubiIcon from '../../assets/icons/bubi.png';
import { GlobalSize } from '../../utils/theme';

export function BikeWidget() {
  const config = useWidgetConfig<BikeConfig>('bike');
  const { data, error } = useBikeQuery();
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
