import React from 'react';

import { BikeWidget } from '../components/widgets/BikeWidget';
import { Departures } from '../components/widgets/departures/Departures';
import { ImageWidget } from '../components/widgets/ImageWidget';
import { QrWidget } from '../components/widgets/QrWidget';
import { SchPincerWidget } from '../components/widgets/SchPincerWidget';
import { WeatherWidget } from '../components/widgets/WeatherWidget';
import { WidgetConfig } from '../types/widget.type';

interface WidgetDistributorProps {
  config: WidgetConfig;
}

export function WidgetDistributor({ config }: WidgetDistributorProps) {
  switch (config.name) {
    case 'departures':
      return <Departures />;
    case 'bike':
      return <BikeWidget />;
    case 'schpincer':
      return <SchPincerWidget />;
    case 'weather':
      return <WeatherWidget />;
    case 'qr':
      return <QrWidget />;
    case 'image':
      return <ImageWidget />;
    default:
      return null;
  }
}
