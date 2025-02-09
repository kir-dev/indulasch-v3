/**
 * Convert a fraction [0..1] into an angle (radians), offset so 0 = top (like the old code).
 */
export function ratioToAngle(ratio: number) {
  // 0 => π/2 (which is 90° on a unit circle, i.e. top)
  // 1 => 2π + π/2
  return ratio * 2 * Math.PI + Math.PI / 2;
}

/**
 * Convert a #RRGGBB (or #RGB) string to rgba() with an alpha channel.
 */
export function colorWithHexString(hex: string, alpha = 1) {
  let cleanHex = hex.replace(/^#/, '');

  // Convert #RGB => #RRGGBB
  if (cleanHex.length === 3) {
    cleanHex = cleanHex[0] + cleanHex[0] + cleanHex[1] + cleanHex[1] + cleanHex[2] + cleanHex[2];
  }

  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Draw the ring arcs onto the given canvas identified by `canvasId`.
 * The `colors` array is used to sequentially stroke arcs around the circle.
 */
export function updateImage(canvasId: string, colors: string[], needToConvert: boolean) {
  const canvas = document.getElementById(canvasId) as HTMLCanvasElement | null;
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const length = colors.length;
  const INNER_RATIO = 0.7;
  const centerX = 10;
  const centerY = 10;
  const radius = (10 * (1.0 + INNER_RATIO)) / 2.0; // 8.5
  const lineWidth = 10 * (1.0 - INNER_RATIO); // 3

  for (let i = 0; i < length; i++) {
    ctx.beginPath();
    const startAngle = ratioToAngle(i / length);
    const endAngle = ratioToAngle(1); // full circle to ratio=1

    ctx.arc(centerX, centerY, radius, startAngle, endAngle, false);
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'butt';

    // Fill with the "background color".
    ctx.fillStyle = '#F0F0F0';
    ctx.fill();

    let strokeColor = colors[i];
    if (needToConvert) {
      strokeColor = colorWithHexString(strokeColor, 1.0);
    }
    ctx.strokeStyle = strokeColor;
    ctx.stroke();
  }
}
