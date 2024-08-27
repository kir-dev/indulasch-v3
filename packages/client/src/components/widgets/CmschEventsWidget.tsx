import styled from 'styled-components';

import { WidgetDescription, WidgetText } from '@/components/Text.tsx';
import { Widget } from '@/layout/Widget.tsx';
import { useCmschEventsQuery } from '@/network/cmsch.network.ts';
import { CMSchEventsConfig } from '@/types/widget.type.ts';
import { getFormattedDate, isEventActive, isEventSoon } from '@/utils/date.ts';
import { GlobalSize, Size } from '@/utils/theme.ts';
import { useColorsOfScheme } from '@/utils/useColorsOfScheme.ts';
import { useWidgetConfig } from '@/utils/useWidgetConfig.ts';

export function CmschEventsWidget() {
  const { fontPrimary } = useColorsOfScheme();

  const config = useWidgetConfig<CMSchEventsConfig>('cmschEvents');
  const { data, error } = useCmschEventsQuery(config);

  if (!data || error) {
    return null;
  }

  if (data.length === 0) {
    return (
      <Widget grid={config.grid}>
        <WidgetDescription color={fontPrimary}>Nincs esemény</WidgetDescription>
      </Widget>
    );
  }

  return (
    <EventsWidget grid={config.grid}>
      {data.map((event) => (
        <EventItem key={event.url}>
          <PulsingDot
            color={isEventActive(event) ? '#86efac' : '#facc15'}
            hidden={!isEventActive(event) && !isEventSoon(event)}
          />
          <WidgetText width='fit-content' flex={1} color={fontPrimary}>
            {event.title}
          </WidgetText>
          <WidgetText width='fit-content'>{getFormattedDate(event.timestampStart)}</WidgetText>
        </EventItem>
      ))}
    </EventsWidget>
  );
}

function PulsingDot({ color, hidden }: { color: string; hidden: boolean }) {
  return (
    <PulseContainer style={{ color }}>
      {!hidden && (
        <svg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'>
          <circle cx='20' cy='20' fill='none' r='10' stroke='currentColor' strokeWidth='4'>
            <animate attributeName='r' from='8' to='20' dur='1.5s' begin='0s' repeatCount='indefinite' />
            <animate attributeName='opacity' from='1' to='0' dur='1.5s' begin='0s' repeatCount='indefinite' />
          </circle>
          <circle cx='20' cy='20' fill='currentColor' r='10' />
        </svg>
      )}
    </PulseContainer>
  );
}

const PulseContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
`;

const EventsWidget = styled(Widget)`
  flex-direction: column;
  flex-flow: column wrap;
  text-align: center;
  justify-content: space-between;
  gap: 10px;
`;

const EventItem = styled.div`
  box-sizing: border-box;
  background: #64748b10;
  border-radius: calc(${GlobalSize.borderRadius} - ${Size.xs});
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 10px;
  text-align: left;
  padding: ${Size.s} ${Size.md} ${Size.s} ${Size.s};
`;
