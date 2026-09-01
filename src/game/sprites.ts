import { colors } from "./colors";
import { GameItem } from "./game-item";

export type SpriteLayer = {
  fill: string;
  d: string;
};

export type SpriteName = GameItem | 'UN';
export type SpriteEntry = readonly [SpriteName, ...string[]];
export type SpriteRegistry = SpriteEntry[];

const gemOuterPath = 'm13 9-12 15 31 35 31-35-12-15z';
const gemInnerPath = 'm13 9-12 15h15l16 35 16-35h15l-12-15h-15l11 15h-31l11-15h-15z';

const gemFill = [
  colors.red,
  colors.orange,
  colors.yellow,
  colors.green,
  colors.cyan,
  colors.blue,
  colors.magenta,
  colors.black,
  colors.white,
];

const gemSprite = (fill: string): string[] => [
  fill, gemOuterPath,
  '#ffffff88', gemInnerPath,
];

export const sprites: SpriteRegistry = [
  ['UN',
    colors.white, 'm4 0.3-2 1 7 11c-14 14-2 19 8 12 3 13 2 25 2 38h5v-17h2v14h5v-14l6 0.02v17h5v-17l2-0.03v14h5c-0.7-25 6-30-16-29l-13-19 2-5-3-0.7-3 6 1-6-3-0.5-1 4z',
    colors.magenta3, 'm5 13 11-4 23 4-4 6h6l-8 13-13-18-13 3z',
    colors.magenta3, 'm51 28c8-1 4 8 10 18-10-0.5-18-17-10-18z'
  ],
  ['FR',
    colors.red2, "M 52 17 C 63 28 64 53 59 59 C 53 64 29 63 17 51 C 8 43 12 30 21 21 C 30 12 43 8 52 17",
    colors.green2, "M 36 2 C 36 2 30 6 26 10 C 22 7 18 4 18 4 C 18 4 17 12 17 17 C 11 17 4 18 4 18 C 4 18 7 22 10 26 C 6 30 2 36 2 36 C 2 36 15 39 19 38 C 22 37 24 33 23 29 C 24 29 24 28 24 27 C 25 27 25 26 25 25 C 26 25 27 25 27 25 C 28 24 29 24 29 23 C 33 24 36 22 38 19 C 39 15 36 2 36 2 z"
  ],
  ['FY',
    colors.yellow, "M 7 54 C 5 54 1 54 1 51 C 0 48 4 48 6 47 C 17 46 28 44 37 38 c 5 -4 9 -8 11 -14 c 2 -4 3 -9 2 -14 c 1 -2 4 -3 6 -2 c 2 2 4 4 3 7 c -1 11 -4 22 -12 29 c -4 5 -11 7 -17 8 c -7 1 -15 2 -23 2 z",
    colors.yellow2, "M 53 1 C 50 0 45 2 48 6 C 50 8 49 12 52 10 C 56 11 56 7 55 5 C 54 3 56 1 53 1 Z M 58 12 c 1 5 -1 9 -2 14 C 53 36 46 45 36 49 C 25 54 13 55 2 52 C 1 54 5 58 7 59 C 14 64 24 65 32 62 C 46 58 59 47 63 33 c 2 -6 1 -14 -3 -19 c 0 -1 -1 -1 -1 -2 z"
  ],
  ['FB',
    colors.blue, "m48 17a16 14 29 0 0 -13 7 16 14 29 0 0 7 20 16 14 29 0 0 21 -5 16 14 29 0 0 -6 -20 16 14 29 0 0 -8 -2z",
    colors.blue, "m22 17a18 19 51 0 0 -14 5 18 19 51 0 0 -4 26 18 19 51 0 0 26 2 18 19 51 0 0 4 -26 18 19 51 0 0 -12 -6z",
    colors.blue2, "m18 24c-3 1 -6 2 -8 3 0 3 1 6 1 9 3 1 6 1 8 2 2 -3 3 -5 5 -8 -2 -2 -4 -4 -6 -6l0z"
  ],
  ['FO',
    colors.green, "m34 29c-3 -1 -2 -1 -5 -7 -2 -5 -7 -6 -3 -11 4 -3 7 4 8 7 0 0 -1 -6 5 -12 6 -6 17 -6 17 -6s-2 10 -8 16c-6 6 -13 4 -13 4 2 5 2 9 -2 8z",
    colors.orange, "m19 22c-10 2 -15 14 -11 25 4 11 24 17 24 17s21 -6 24 -17c4 -11 -2 -23 -11 -25s-13 3 -13 3 -3 -5 -13 -3z"
  ],
  ['FV',
    colors.green2, "m17 1c-4 0 -8 1 -9 5 -2 8 3 9 3 14 1 5 0 12 0 12s19 -13 19 -13 -9 0 -13 -2c-3 -2 -5 -5 -4 -8 2 -3 9 0 9 0l2 -5s-3 -1 -7 -1z",
    colors.magenta3, "m32 16c-5 -4 -16 0 -12 8 -7 -4 -15 4 -10 10 -8 4 -5 20 7 15 -1 6 8 9 13 6 -1 7 11 11 15 5 5 10 21 -2 12 -9 2 0 6 -12 -5 -14 3 -4 0 -12 -5 -12 9 -9 -11 -19 -14 -9z"
  ],
  ['HN',
    colors.yellow, "m5 8c4 8 12 24 12 24 -6 -5 -13 -3 -13 1 -1 4 4 4 6 5 4 3 7 7 10 11 11 14 13 1 16 11s28 -1 26 -11c-2 -8 -6 -3 -7 -16 -4 -20 -16 -14 -30 -10 -3 -7 -7 -13 -11 -19 -5 -6 -10 0 -8 5z"
  ],
  ['FG',
    colors.orange2, 'm12 18c-33 42 21 60 43 33 21-27-9-75-43-33z',
    colors.green2, 'm14 20c-23 30 4 50 27 20 23-30-4-50-27-20z',
    colors.white, 'm35 21-12 5-2 13 12-5z'
  ],
  ['HD',
    colors.green, 'm0 45v19h64v-19z',
    colors.green2, 'm0 0v45h64v-45z'
  ],
  ['FC'],
  ['GR', ...gemSprite(gemFill[0])],
  ['GO', ...gemSprite(gemFill[1])],
  ['GY', ...gemSprite(gemFill[2])],
  ['GG', ...gemSprite(gemFill[3])],
  ['GC', ...gemSprite(gemFill[4])],
  ['GB', ...gemSprite(gemFill[5])],
  ['GV', ...gemSprite(gemFill[6])],
  ['GK', ...gemSprite(gemFill[7])],
  ['GW', ...gemSprite(gemFill[8])],
];

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
  size: number;
  scale: number;
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
const UNICORN_SPRITE_SIZE = 80;
const SPRITE_PADDING = 4;
const STROKE_COLOR = colors.black;
const RENDER_SCALE = 2;
const SPRITE_FRAME_COUNT = 5;
const SHADE_TOP_ALPHA = 0;
const SHADE_BOTTOM_ALPHA = 0.0;

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

const getSpriteSize = (name: SpriteName): number => (name === 'UN' ? UNICORN_SPRITE_SIZE : SPRITE_SIZE);
const getSpriteScale = (name: SpriteName): number => (name === 'UN' ? UNICORN_SPRITE_SIZE / SPRITE_SIZE : 1);

export const buildSprite = (name: SpriteName, sampleCount: number = 100): BuiltSprite => {
  const source = sprites.find(([id]) => id === name) ?? [name];
  const layers: BuiltSpriteLayer[] = [];

  for (let i = 1; i + 1 < source.length; i += 2) {
    const fill = source[i];
    const d = source[i + 1];
    layers.push({
      fill,
      path: new Path2D(d),
      samples: samplePathData(d, sampleCount),
    });
  }

  return {
    name,
    size: getSpriteSize(name),
    scale: getSpriteScale(name),
    layers,
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
  targetCtx.scale(sprite.scale, sprite.scale);

  const drawSize = sprite.size / sprite.scale;

  const fillShade = targetCtx.createLinearGradient(0, 0, 0, drawSize);
  fillShade.addColorStop(0.5, `rgba(0, 0, 0, ${SHADE_TOP_ALPHA})`);
  fillShade.addColorStop(1, `rgba(0, 0, 0, ${SHADE_BOTTOM_ALPHA})`);

  for (let i = 0; i < sprite.layers.length; i++) {
    const layer = sprite.layers[i];
    targetCtx.fillStyle = layer.fill;
    targetCtx.fill(layer.path);

    targetCtx.save();
    targetCtx.clip(layer.path);
    targetCtx.fillStyle = fillShade;
    targetCtx.fillRect(0, 0, drawSize, drawSize);
    targetCtx.restore();

    drawSketchStroke(
      targetCtx,
      layer.samples,
      frame,
      i,
      STROKE_COLOR,
      settings.strokeWidth / sprite.scale,
      settings.strokeAmp,
    );
  }

  targetCtx.restore();
};

export const buildSpriteSheet = (sprite: BuiltSprite, settings: SketchSettings): HTMLCanvasElement => {
  const tile = (sprite.size + SPRITE_PADDING * 2) * RENDER_SCALE;
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
): SpriteSheetAsset[] => {
  const finalSettings: SketchSettings = {
    ...defaultSpriteSettings,
    ...settings,
  };

  const out: SpriteSheetAsset[] = [];

  for (const [name] of sprites) {
    const sprite = buildSprite(name, finalSettings.strokeSamples);
    const sheet = buildSpriteSheet(sprite, finalSettings);
    out.push({
      name,
      sprite,
      sheet,
      frameWidth: (sprite.size + SPRITE_PADDING * 2) * RENDER_SCALE,
      frameHeight: (sprite.size + SPRITE_PADDING * 2) * RENDER_SCALE,
    });
  }

  return out;
};

export const spriteAssets: SpriteSheetAsset[] = [];

export const initSprites = () => {
  if (spriteAssets.length > 0) {
    return spriteAssets;
  }

  const built = buildSpriteAssets();
  for (const asset of built) {
    spriteAssets.push(asset);
    const base64ImageData = asset.sheet.toDataURL("image/png");
    document.body.style.setProperty(`--b-${asset.name}`, `url(${base64ImageData})`);
  }
};
