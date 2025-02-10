import L from 'leaflet';

export function createStopIcon(stopId: string, direction: number | string) {
  // We store a direction-based rotation. If direction is a string, parse it if you want,
  // or simply default to 0 if empty:
  const dir = Number(direction) || 0;

  // The orbiting triangle is hidden if direction is empty (like your original code).
  const isHidden = !direction || direction === '';

  const html = `
    <div class="orbit-marker-container" style="position: relative; width: 40px; height: 40px;">
      <!-- Center icon with the arcs canvas -->
      <div class="center-icon" style="
        position: absolute;
        top: 50%; left: 50%;
        transform: translate(-42.5%, -42.5%);
        width: 22px; height: 22px;
        z-index: 8;
      ">
        <canvas id="stop-${stopId}" width="24" height="24"></canvas>
      </div>

      <!-- Orbiting wrapper with black triangle -->
      <div
        class="orbit-wrapper"
        style="
          position: absolute;
          top: 37.5%; left: 37.5%;
          transform-origin: center center;
          transform: rotate(${dir - 90}deg) translateX(14px);
        "
      >
        <div class="black-triangle" style="
          width: 0; height: 0;
          border-left: 5px solid black;
          border-top: 5px solid transparent;
          border-right: 5px solid transparent;
          border-bottom: 5px solid transparent;
          ${isHidden ? 'display: none;' : ''}
        "></div>
      </div>
    </div>
  `;

  return L.divIcon({
    className: 'stop-marker', // you can keep your existing CSS classes
    html,
    iconSize: [24, 24],
    iconAnchor: [24, 24], // or whatever anchor you prefer
  });
}
