import styled from 'styled-components';

import { Widget } from '@/layout/Widget';
import { useWeatherQuery } from '@/network/weather.network';
import { WeatherConfig } from '@/types/widget.type';
import { useInterval } from '@/utils/useInterval';
import { useWidgetConfig } from '@/utils/useWidgetConfig';

import { WidgetHeading } from '../Text';

export function WeatherWidget() {
  const config = useWidgetConfig<WeatherConfig>('weather');
  const { data, isError, refetch } = useWeatherQuery(config);

  useInterval(async () => {
    await refetch();
  }, 60000);

  if (!data || isError) {
    return (
      <Widget grid={config.grid}>
        <WidgetHeading>
          <i>Időjárás hiba</i>
        </WidgetHeading>
      </Widget>
    );
  }
  const icon = data.weather?.[0].icon;
  return (
    <Widget grid={config.grid}>
      {icon && <WeatherIconForId id={icon} />}
      <WidgetHeading>
        {Math.round(data.main.temp) - 273}°
        {(data.snow || data.rain) && ` | ${data.snow?.['1h'] || data.rain?.['1h'] || 0}mm`}
      </WidgetHeading>
    </Widget>
  );
}

function WeatherIconForId({ id }: { id: string }) {
  return <StyledImg src={`https://openweathermap.org/img/wn/${id}@4x.png`} alt='Weather icon' />;
}

const StyledImg = styled.img`
  height: 10rem;
  width: 10rem;
  max-width: 100%;
  max-height: 100%;
`;
