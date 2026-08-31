import { createCanvasWithCtx } from '../core/util/canvas';
import { Color, colors } from './colors';

export const assets: Record<string, HTMLCanvasElement> = {};

const generateAsset = (draw: (ctx: CanvasRenderingContext2D) => void): HTMLCanvasElement => {
  const [canvas, ctx] = createCanvasWithCtx(128, 128);
  draw(ctx);
  return canvas;
};

const rainbowSprite = (ctx: CanvasRenderingContext2D) => {
  const rainbow = [colors.yellow, colors.green, colors.cyan, colors.magenta2];
  const r = 22;
  const overlap = 14;
  const step = r * 2 - overlap;
  const totalWidth = r * 2 + step * (rainbow.length - 1);
  const startX = (128 - totalWidth) / 2 + r;
  const cy = 64;

  // Clip to canvas bounds so circles never bleed outside
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, 0, 128, 128);
  ctx.clip();

  for (let i = 0; i < rainbow.length; i++) {
    ctx.beginPath();
    ctx.arc(startX + i * step, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = rainbow[i];
    ctx.fill();
  }

  ctx.restore();
}

export const init = (): void => {
  assets['rainbowSprite'] = generateAsset(rainbowSprite);
};

const createSpellIcon = (colors1: Color[], colors2: GlobalCompositeOperation, size = 160) => {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  const radius = size * 0.28;
  const positions = [
    { x: size * 0.35, y: size * 0.35 },
    { x: size * 0.65, y: size * 0.35 },
    { x: size * 0.5,  y: size * 0.65 }
  ];

  ctx.globalCompositeOperation = 'source-over';
  positions.forEach((pos, i) => {
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
    ctx.fillStyle = colors1[i];
    ctx.globalCompositeOperation = i === 0 ? 'source-over' : colors2;
    ctx.fill();
  });

  return canvas.toDataURL();
};

export const applySpellIcons = () => {
  const additiveIcon = createSpellIcon([colors.red2, colors.green2, colors.blue2], 'lighter');
  const subtractiveIcon = createSpellIcon([colors.cyan2, colors.magenta2, colors.yellow2], 'multiply');

  add.style.backgroundImage = `url(${additiveIcon})`;
  sub.style.backgroundImage = `url(${subtractiveIcon})`;
};
