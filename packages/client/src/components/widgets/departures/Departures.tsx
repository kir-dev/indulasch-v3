import styled from 'styled-components';

import { useDepartureQuery } from '../../../network/departure.network';
import { DeparturesConfig, GridSettings } from '../../../types/widget.type';
import { useColorsOfScheme } from '../../../utils/useColorsOfScheme';
import { useInterval } from '../../../utils/useInterval';
import { useWidgetConfig } from '../../../utils/useWidgetConfig';
import { WidgetHeading } from '../../Text';
import { Field } from './Field';

export function Departures() {
  const config = useWidgetConfig<DeparturesConfig>('departures');
  const { fontPrimary } = useColorsOfScheme();
  const { data, error, refetch } = useDepartureQuery(config);
  useInterval(async () => {
    await refetch();
  }, 5000);

  if (error || !data) {
    return (
      <DeparturesWrapper {...config.grid}>
        <WidgetHeading>
          <i>{error ? 'Hiba történt' : 'Nincs indulás'}</i>
        </WidgetHeading>
      </DeparturesWrapper>
    );
  }
  return (
    <DeparturesWrapper color={fontPrimary} {...config.grid}>
      {data.departures?.map((departure) => (
        <Field key={departure.departureText + departure.headsign} departure={departure} />
      ))}
    </DeparturesWrapper>
  );
}

const DeparturesWrapper = styled.div<{ color?: string } & GridSettings>`
  grid-column: ${({ column }) => `${column.start} / ${column.end}`};
  grid-row: ${({ row }) => `${row.start} / ${row.end}`};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex-flow: column wrap;
  text-align: center;
  ${({ color }) => color && `color:${color}`};
`;
