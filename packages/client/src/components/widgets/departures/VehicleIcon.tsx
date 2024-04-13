import styled from 'styled-components';

import AirplaneIcon from '@/assets/icons/airplane.svg?react';
import BusIcon from '@/assets/icons/bus.svg?react';
import ChairliftIcon from '@/assets/icons/chairlift.svg?react';
import FerryIcon from '@/assets/icons/ferry.svg?react';
import MavIcon from '@/assets/icons/mav.svg?react';
import NightBusIcon from '@/assets/icons/night-bus.svg?react';
import SikloIcon from '@/assets/icons/siklo.svg?react';
import SuburbanRailwayIcon from '@/assets/icons/suburban-railway.svg?react';
import SubwayIcon from '@/assets/icons/subway.svg?react';
import TramIcon from '@/assets/icons/tram.svg?react';
import TrolleybusIcon from '@/assets/icons/trolleybus.svg?react';
import { VehicleIcons } from '@/types/widget/departures.type.ts';

function VehicleIconSelector(vehicleIcon: string) {
  switch (vehicleIcon) {
    case VehicleIcons.BUS:
      return <BusIcon />;
    case VehicleIcons.TRAM:
      return <TramIcon />;
    case VehicleIcons.SUBWAY:
      return <SubwayIcon />;
    case VehicleIcons.SUBURBAN_RAILWAY:
      return <SuburbanRailwayIcon />;
    case VehicleIcons.NIGHT_BUS:
      return <NightBusIcon />;
    case VehicleIcons.TROLLEYBUS:
      return <TrolleybusIcon />;
    case VehicleIcons.FERRY:
      return <FerryIcon />;
    case VehicleIcons.AIRPLANE:
      return <AirplaneIcon />;
    case VehicleIcons.CHAIRLIFT:
      return <ChairliftIcon />;
    case VehicleIcons.SIKLO:
      return <SikloIcon />;
    case VehicleIcons.RAIL:
      return <MavIcon />;
    default:
      return <BusIcon />;
  }
}

export function VehicleIcon({ name }: { name: string }) {
  return <FieldIconWrapper>{VehicleIconSelector(name)}</FieldIconWrapper>;
}

const FieldIconWrapper = styled.div`
  svg {
    height: 60px;
  }
`;
