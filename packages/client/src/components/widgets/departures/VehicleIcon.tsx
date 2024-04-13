import styled from 'styled-components';

import AirplaneIcon from '@/assets/icons/airplane.svg';
import BusIcon from '@/assets/icons/bus.svg';
import ChairliftIcon from '@/assets/icons/chairlift.svg';
import FerryIcon from '@/assets/icons/ferry.svg';
import MavIcon from '@/assets/icons/mav.svg';
import NightBusIcon from '@/assets/icons/night-bus.svg';
import SikloIcon from '@/assets/icons/siklo.svg';
import SuburbanRailwayIcon from '@/assets/icons/suburban-railway.svg';
import SubwayIcon from '@/assets/icons/subway.svg';
import TramIcon from '@/assets/icons/tram.svg';
import TrolleybusIcon from '@/assets/icons/trolleybus.svg';
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
