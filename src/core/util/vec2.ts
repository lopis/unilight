export interface Vec2 {
  x: number,
  y: number,
}

export const vec2 = (x: number, y: number): Vec2 => ({x, y})

export function bresenham(x0: number, y0: number, x1: number, y1: number): Vec2[] {
  const cells: Vec2[] = [];
  const dx = Math.abs(x1 - x0), sx = x0 < x1 ? 1 : -1;
  const dy = -Math.abs(y1 - y0), sy = y0 < y1 ? 1 : -1;
  let err = dx + dy;
  let x = x0, y = y0;
  while (true) {
    cells.push(vec2(x, y));
    if (x === x1 && y === y1) break;
    const e2 = 2 * err;
    if (e2 >= dy) { err += dy; x += sx; }
    if (e2 <= dx) { err += dx; y += sy; }
  }
  return cells;
}
