import { colors } from "./colors";

export type SpriteLayer = {
  fill: string;
  d: string;
};

export type SpriteRegistry = Record<string, SpriteLayer[]>;

// Using ['strawberry'] is important to avoid minification!
export const sprites: SpriteRegistry = {
  ['strawberry']: [
    { fill: colors.red2, d: "M 51.5 16.7 C 63 28.3 64.4 53.4 58.9 58.9 C 53.4 64.4 28.5 63 16.9 51.4 C 8.4 42.9 12.4 30 21.2 21.1 C 30.1 12.2 43 8.2 51.5 16.7" },
    { fill: colors.green2, d: "M 35.7 2 C 35.7 2 29.7 6 26.1 9.7 C 22.3 6.9 18 4.3 18 4.3 C 18 4.3 16.5 11.5 16.6 16.6 C 11.4 16.6 4.3 18 4.3 18 C 4.3 18 6.9 22.4 9.7 26.2 C 6 29.8 2 35.9 2 35.9 C 2 35.9 14.8 39.3 18.7 37.9 C 22.1 36.6 24 33 23.2 29.4 C 23.7 28.8 24.1 28.2 24.4 27.4 C 24.7 26.7 24.9 25.9 25 25.2 C 25.7 25.1 26.5 24.9 27.2 24.6 C 28 24.3 28.7 23.8 29.3 23.3 C 32.8 24 36.4 22.2 37.7 18.7 C 39.1 14.9 35.7 2 35.7 2 z" }
  ],
  ['banana']: [
    { fill: colors.yellow, d: "M 7 54 C 4.7 53.5 1 54.1 0.5 51.1 C 0.2 48.1 4 47.5 6.3 47.3 C 16.8 46.3 27.6 44 36.7 38.4 c 4.6 -3.7 8.5 -8.4 11 -13.7 c 2 -4.3 2.8 -9.2 2.1 -13.9 c 0.8 -1.7 3.7 -2.7 5.6 -2.2 c 2 1.8 3.7 4 2.8 6.8 c -1.1 10.5 -4 21.5 -11.6 29.2 c -4.5 4.6 -10.7 7 -17 7.8 c -7.5 1.1 -15.1 2 -22.7 1.7 z" },
    { fill: colors.yellow2, d: "M 53.3 0.5 C 50.3 0.2 45.2 2.1 48.2 5.7 C 49.7 7.6 48.7 12.1 52 10.3 C 55.8 10.9 55.7 7.2 54.8 4.7 C 54.2 3.3 55.5 0.8 53.3 0.5 Z M 58.2 11.6 c 0.6 4.7 -0.9 9.4 -2.1 13.9 C 53.1 35.7 45.9 44.9 36.1 49.3 C 25.3 54.2 12.9 54.7 1.5 52.4 C 1.3 54 5 57.5 7.1 59 C 14.2 64.1 23.6 64.5 31.7 61.9 C 45.8 57.7 58.6 47 62.7 32.5 c 1.6 -6.4 1.3 -13.8 -3 -19.2 c -0.5 -0.6 -1 -1.1 -1.5 -1.7 z" },
  ],
  ['blueberry']: [
    { fill: colors.indigo, d: "m47.8 17.2a15.5 14.2 29.4 0 0-12.8 6.9 15.5 14.2 29.4 0 0 6.5 20 15.5 14.2 29.4 0 0 20.5-4.8 15.5 14.2 29.4 0 0-6.5-20 15.5 14.2 29.4 0 0-7.7-2.2z" },
    { fill: colors.indigo, d: "m21.8 17.3a17.7 19.3 51.2 0 0-13.9 4.5 17.7 19.3 51.2 0 0-4 25.9 17.7 19.3 51.2 0 0 26.2 1.7 17.7 19.3 51.2 0 0 4-25.9 17.7 19.3 51.2 0 0-12.3-6.2z" },
    { fill: colors.indigo2, d: "m18.1 24.2c-2.8 1-5.7 2-8.5 3 0.4 3.1 0.8 6.3 1.1 9.4 2.8 0.6 5.6 1.2 8.4 1.9 1.6-2.8 3.2-5.5 4.9-8.3-1.9-2-3.8-4-5.7-6l-0.10z" }
  ],
  ['peach']: [
    { fill: colors.green, d: "m33.5 28.6c-3.1-0.8-2.5-1-5.1-6.6-2.2-4.9-6.7-6.4-2.6-10.6 3.5-3.5 6.9 4.4 8 6.5 0 0-0.8-6.2 5.3-11.7 6.1-5.6 17.4-5.7 17.4-5.7s-1.9 10.4-8 15.9c-6.2 5.5-13.4 4.1-13.4 4.1 2.3 5.1 1.5 8.8-1.6 8z" },
    { fill: colors.pink2, d: "m19.1 21.5c-9.7 2-15.1 14.2-11.3 25 3.8 10.9 24.3 16.9 24.3 16.9s20.5-6.1 24.3-16.9c3.8-10.9-1.9-22.9-11.3-25s-13 2.7-13 2.7-3.3-4.7-13-2.7z" }
  ],
  ['grape']: [
    { fill: colors.green, d: "m17.4 0.5c-3.7-0.1-7.8 0.8-8.9 4.7-2.2 7.9 2.7 9.1 3.2 13.8 0.5 4.7 0.1 11.5 0.1 11.5s19.2-13.5 19.3-13.5-9.4-0.4-12.9-2.4c-3.5-2-5.4-4.9-4-7.7 1.5-2.8 8.9-0.1 8.9-0.1l1.5-5.1s-3.5-1.1-7.2-1.2z" },
    { fill: colors.violet2, d: "m32 15.7c-5-4.2-15.8 0-12.3 8.3-7.3-4.4-15 3.7-10.3 9.7-7.6 3.5-5.1 20.4 7.1 15.2-1.4 6.1 7.5 9.4 12.8 6.4-1.5 7.1 11 11.1 14.8 4.6 4.8 9.5 20.6-2.4 12.3-9.4 1.9-0.5 6.3-12.5-5.4-13.6 3.3-4.4 0.3-11.8-5.3-12.5 9.3-9.4-11-19.3-13.8-8.7z" }
  ],
  ['hand']: [
    { fill: colors.yellow, d: "m4.5 7.5c3.6 8 11.8 23.5 11.8 23.5-6.5-4.6-12.6-2.8-13.2 0.9-0.6 3.7 3.8 3.7 5.7 5.4 4.2 2.7 6.7 7.4 10.3 10.7 11.4 13.5 12.8 1 16.2 11.4s28.2-1.3 25.5-11.3c-2.3-8.5-5.6-3.5-7-15.8-4.2-20.2-15.9-14-30.4-10.3-3.4-6.7-6.8-12.9-11.1-19.1-4.9-6-10.1 0.1-7.7 4.5z" }
  ]
};

export type SpriteName = keyof typeof sprites;

export type SamplePoint = {
  x: number;
  y: number;
  tx: number;
  ty: number;
};

export type BuiltSpriteLayer = {
  fill: string;
  path: Path2D;
  samples: SamplePoint[];
};

export type BuiltSprite = {
  name: string;
  layers: BuiltSpriteLayer[];
};

export type SketchSettings = {
  strokeWidth: number;
  strokeAmp: number;
  strokeSamples: number;
};

export type SpriteSheetAsset = {
  name: string;
  sprite: BuiltSprite;
  sheet: HTMLCanvasElement;
  frameWidth: number;
  frameHeight: number;
};

const SPRITE_SIZE = 64;
const SPRITE_PADDING = 4;
const STROKE_COLOR = colors.black;
const RENDER_SCALE = 2;
const SPRITE_FRAME_COUNT = 5;

const hash = (i: number, pass: number, frame: number): number => {
  const n = Math.sin(i * 127.1 + pass * 311.7 + frame * 74.7) * 43758.5453;
  return (n - Math.floor(n)) * 2 - 1;
};

const pathNoise = (i: number, pass: number, frame: number): number => {
  const r1 = hash(i, pass, frame);
  const r2 = hash(i + 29, pass + 7, frame + 1);
  return r1 * 0.7 + r2 * 0.3;
};

const samplePathData = (d: string, count: number): SamplePoint[] => {
  const out: SamplePoint[] = [];
  mp.setAttribute("d", d);
  const len = mp.getTotalLength();
  const delta = len / count;

  for (let i = 0; i < count; i++) {
    const at = i * delta;
    const p = mp.getPointAtLength(at);
    const prev = mp.getPointAtLength((at - 1 + len) % len);
    const next = mp.getPointAtLength((at + 1) % len);
    out.push({ x: p.x, y: p.y, tx: next.x - prev.x, ty: next.y - prev.y });
  }

  return out;
};

export const buildSprite = (name: SpriteName, sampleCount: number = 100): BuiltSprite => {
  const source = sprites[name];
  return {
    name,
    layers: source.map((layer) => ({
      fill: layer.fill,
      path: new Path2D(layer.d),
      samples: samplePathData(layer.d, sampleCount),
    })),
  };
};

const drawSketchStroke = (
  targetCtx: CanvasRenderingContext2D,
  samples: SamplePoint[],
  frame: number,
  pass: number,
  color: string,
  width: number,
  amp: number,
): void => {
  const points: Array<{ x: number; y: number }> = [];

  for (let i = 0; i < samples.length; i++) {
    const s = samples[i];
    const len = Math.hypot(s.tx, s.ty) || 1;
    const nx = -s.ty / len;
    const ny = s.tx / len;
    const n = (
      pathNoise(i - 2, pass, frame) +
      pathNoise(i - 1, pass, frame) * 2 +
      pathNoise(i, pass, frame) * 3 +
      pathNoise(i + 1, pass, frame) * 2 +
      pathNoise(i + 2, pass, frame)
    ) / 9;

    points.push({ x: s.x + nx * n * amp, y: s.y + ny * n * amp });
  }

  targetCtx.beginPath();
  targetCtx.moveTo(points[0].x, points[0].y);

  for (let i = 0; i < points.length; i++) {
    const a = points[i];
    const b = points[(i + 1) % points.length];
    const mx = (a.x + b.x) * 0.5;
    const my = (a.y + b.y) * 0.5;
    targetCtx.quadraticCurveTo(a.x, a.y, mx, my);
  }

  targetCtx.closePath();
  targetCtx.lineJoin = "round";
  targetCtx.lineCap = "round";
  targetCtx.strokeStyle = color;
  targetCtx.lineWidth = width;
  targetCtx.stroke();
};

const drawSpriteToContext = (
  targetCtx: CanvasRenderingContext2D,
  sprite: BuiltSprite,
  frame: number,
  settings: SketchSettings,
  offsetX: number = 0,
): void => {
  targetCtx.save();
  targetCtx.translate(offsetX + SPRITE_PADDING * RENDER_SCALE, SPRITE_PADDING * RENDER_SCALE);
  targetCtx.scale(RENDER_SCALE, RENDER_SCALE);

  for (let i = 0; i < sprite.layers.length; i++) {
    const layer = sprite.layers[i];
    targetCtx.fillStyle = layer.fill;
    targetCtx.fill(layer.path);
    drawSketchStroke(targetCtx, layer.samples, frame, i, STROKE_COLOR, settings.strokeWidth, settings.strokeAmp);
  }

  targetCtx.restore();
};

export const buildSpriteSheet = (sprite: BuiltSprite, settings: SketchSettings): HTMLCanvasElement => {
  const tile = (SPRITE_SIZE + SPRITE_PADDING * 2) * RENDER_SCALE;
  const sheet = document.createElement("canvas");
  sheet.width = tile * SPRITE_FRAME_COUNT;
  sheet.height = tile;
  const sheetCtx = sheet.getContext("2d");

  if (!sheetCtx) {
    throw new Error("Canvas 2D context unavailable");
  }

  for (let frame = 0; frame < SPRITE_FRAME_COUNT; frame++) {
    drawSpriteToContext(sheetCtx, sprite, frame, settings, frame * tile);
  }

  return sheet;
};

export const defaultSpriteSettings: SketchSettings = {
  strokeWidth: 4,
  strokeAmp: 2,
  strokeSamples: 100,
};

export const buildSpriteAssets = (
  settings: Partial<SketchSettings> = {},
): Record<string, SpriteSheetAsset> => {
  const finalSettings: SketchSettings = {
    ...defaultSpriteSettings,
    ...settings,
  };

  const out: Record<string, SpriteSheetAsset> = {};

  for (const name of Object.keys(sprites) as SpriteName[]) {
    const sprite = buildSprite(name, finalSettings.strokeSamples);
    const sheet = buildSpriteSheet(sprite, finalSettings);
    out[name] = {
      name,
      sprite,
      sheet,
      frameWidth: (SPRITE_SIZE + SPRITE_PADDING * 2) * RENDER_SCALE,
      frameHeight: (SPRITE_SIZE + SPRITE_PADDING * 2) * RENDER_SCALE,
    };
  }

  return out;
};

export const spriteAssets: SpriteSheetAsset[] = [];

export const initSprites = () => {
  if (spriteAssets.length > 0) {
    return spriteAssets;
  }

  const built = buildSpriteAssets();
  for (const name of Object.keys(built) as SpriteName[]) {
    spriteAssets.push(built[name]);
    const base64ImageData = built[name].sheet.toDataURL("image/png");
    document.body.style.setProperty(`--b-${name}`, `url(${base64ImageData})`);
  }
};
