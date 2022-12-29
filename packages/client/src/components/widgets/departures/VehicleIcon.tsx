import React from 'react';
import styled from 'styled-components';

import { VehicleIcons } from '../../../types/widget/departures.type';
import { ReactComponent as TramIcon } from '../../../assets/icons/tram.svg';
import { ReactComponent as BusIcon } from '../../../assets/icons/bus.svg';
import { ReactComponent as SubwayIcon } from '../../../assets/icons/subway.svg';
import { ReactComponent as SuburbanRailwayIcon } from '../../../assets/icons/suburban-railway.svg';
import { ReactComponent as NightBusIcon } from '../../../assets/icons/night-bus.svg';
import { ReactComponent as TrolleybusIcon } from '../../../assets/icons/trolleybus.svg';
import { ReactComponent as AirplaneIcon } from '../../../assets/icons/airplane.svg';
import { ReactComponent as FerryIcon } from '../../../assets/icons/ferry.svg';
import { ReactComponent as ChairliftIcon } from '../../../assets/icons/chairlift.svg';
import { ReactComponent as SikloIcon } from '../../../assets/icons/siklo.svg';
import { ReactComponent as MavIcon } from '../../../assets/icons/mav.svg';

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
