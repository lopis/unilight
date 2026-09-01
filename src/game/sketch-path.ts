export type SamplePoint = {
  x: number;
  y: number;
  tx: number;
  ty: number;
};

const hash = (i: number, pass: number, frame: number): number => {
  const n = Math.sin(i * 127.1 + pass * 311.7 + frame * 74.7) * 43758.5453;
  return (n - Math.floor(n)) * 2 - 1;
};

const pathNoise = (i: number, pass: number, frame: number): number => {
  const r1 = hash(i, pass, frame);
  const r2 = hash(i + 29, pass + 7, frame + 1);
  return r1 * 0.7 + r2 * 0.3;
};

export const samplePathData = (d: string, count: number): SamplePoint[] => {
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

export const drawSketchStroke = (
  targetCtx: CanvasRenderingContext2D,
  samples: SamplePoint[],
  frame: number,
  pass: number,
  color: string,
  width: number,
  amp: number,
  close: boolean = true,
): void => {
  const points: Array<{ x: number; y: number }> = [];

  for (let i = 0; i < samples.length; i++) {
    const s = samples[i]!;
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
  targetCtx.moveTo(points[0]!.x, points[0]!.y);

  if (close) {
    for (let i = 0; i < points.length; i++) {
      const a = points[i]!;
      const b = points[(i + 1) % points.length]!;
      const mx = (a.x + b.x) * 0.5;
      const my = (a.y + b.y) * 0.5;
      targetCtx.quadraticCurveTo(a.x, a.y, mx, my);
    }
    targetCtx.closePath();
  } else {
    for (let i = 1; i < points.length - 1; i++) {
      const a = points[i]!;
      const b = points[i + 1]!;
      const mx = (a.x + b.x) * 0.5;
      const my = (a.y + b.y) * 0.5;
      targetCtx.quadraticCurveTo(a.x, a.y, mx, my);
    }
    targetCtx.lineTo(points[points.length - 1]!.x, points[points.length - 1]!.y);
  }

  targetCtx.lineJoin = "round";
  targetCtx.lineCap = "round";
  targetCtx.strokeStyle = color;
  targetCtx.lineWidth = width;
  targetCtx.stroke();
};
