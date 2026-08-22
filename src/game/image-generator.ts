import { createCanvasWithCtx } from '../core/util/canvas';

export const assets: Record<string, HTMLCanvasElement> = {};

function generateAsset(draw: (ctx: CanvasRenderingContext2D) => void): HTMLCanvasElement {
  const [canvas, ctx] = createCanvasWithCtx(128, 128);
  draw(ctx);
  return canvas;
}

const rainbowSprite = (ctx: CanvasRenderingContext2D) => {
  const colors = ['yellow', '#90ee90', 'cyan', 'magenta'];
  const r = 22;
  const overlap = 14;
  const step = r * 2 - overlap;
  const totalWidth = r * 2 + step * (colors.length - 1);
  const startX = (128 - totalWidth) / 2 + r;
  const cy = 64;

  // Clip to canvas bounds so circles never bleed outside
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, 0, 128, 128);
  ctx.clip();

  for (let i = 0; i < colors.length; i++) {
    ctx.beginPath();
    ctx.arc(startX + i * step, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = colors[i];
    ctx.fill();
  }

  ctx.restore();
}

export function init(): void {
  assets['rainbowSprite'] = generateAsset(rainbowSprite);
}
