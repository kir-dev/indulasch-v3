import L from 'leaflet';
import ReactDOMServer from 'react-dom/server';

import { VehicleMapIcon } from '@/components/widgets/departures/VehicleIcon';

export function createVehicleIcon(vehicleIconName: string, direction: number | string) {
  const dir = Number(direction) || 0;
  const isHidden = !direction || direction === '';

  // Render the VehicleIcon component to a string
  const vehicleIconHtml = ReactDOMServer.renderToString(VehicleMapIcon({ name: vehicleIconName }));

  const html = `
    <div class="orbit-marker-container" style=" position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 22px; height: 22px; z-index: 10;>
        <!-- Center icon that never rotates -->
        <div class="center-icon">
            ${vehicleIconHtml}
        </div>
        <!-- Orbiting wrapper (rotates around the container center), containing the triangle -->
        <div 
            class="orbit-wrapper"
            style="position: absolute; top: 32.5%; left: 32.5%; transform-origin: center center; transform: rotate(${dir - 90}deg) translateX(15px);"
        >
            <div class="black-triangle" style="width: 0; height: 0; border-left: 5px solid black; border-top: 5px solid transparent; border-right: 5px solid transparent; border-bottom: 5px solid transparent; ${isHidden ? 'display: none' : ''}"></div>
        </div>
    </div>
  `;

  return L.divIcon({
    className: 'vehicle-marker',
    html,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
}
