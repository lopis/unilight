import { drawText } from './font';
import { colors } from './util/color';
import { getCtx } from './util/canvas';

const makeCircle = (
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radiusX: number,
  radiusY: number,
  skew = 0,
) => {
  // Draw ellipse using scaled circle algorithm
  for (let y = -radiusY; y <= radiusY; y++) {
    // Calculate the half-width at this y position using ellipse equation
    const normalizedY = y / radiusY;
    const halfWidth = Math.round(radiusX * Math.sqrt(1 - normalizedY * normalizedY));

    if (halfWidth > 0) {
      const offset = Math.round(skew * Math.abs(y));
      const currentY = centerY + y;

      if (y >= 0) {
        ctx.rect(centerX - halfWidth - offset, currentY, halfWidth * 2, 1);
      } else {
        ctx.rect(centerX - halfWidth + offset, currentY, halfWidth * 2, 1);
      }
    }
  }
};

class DrawEngine {
  ctx1: CanvasRenderingContext2D;
  ctx2: CanvasRenderingContext2D;
  ctx3: CanvasRenderingContext2D;
  ctx4: CanvasRenderingContext2D;

  // Canvas dimensions (cached for performance)
  canvasWidth = 0;
  canvasHeight = 0;

  // Camera properties
  cameraX = 0;
  cameraY = 0;
  zoom = 1;
  targetCameraX = 0;
  targetCameraY = 0;
  targetZoom = 1;
  cameraLerpSpeed = 0.08; // Adjust for faster/slower camera
  moveCameraLinearly = false;

  constructor() {
    this.ctx1 = getCtx(c1);
    this.ctx2 = getCtx(c2);
    this.ctx3 = getCtx(c3);
    this.ctx4 = getCtx(c4);
    window.addEventListener('resize', () => this.resizeCanvas());
    window.addEventListener('orientationchange', () => this.resizeCanvas());
    this.resizeCanvas();
  }

  resizeCanvas() {
    // const aspectRatio = 4 / 3;
    // const gameWidth = 1200;
    // const gameHeight = Math.round(gameWidth / aspectRatio);
    this.canvasWidth = document.body.clientWidth;
    this.canvasHeight = document.body.clientHeight;
    const ctxs: CanvasRenderingContext2D[] = [this.ctx1, this.ctx2, this.ctx3, this.ctx4];
    for (const ctx of ctxs) {
      // eslint-disable-next-line id-denylist
      ctx.canvas.width = this.canvasWidth;
      // eslint-disable-next-line id-denylist
      ctx.canvas.height = this.canvasHeight;
      ctx.imageSmoothingEnabled = false;
    }
  }

  clear() {
    this.ctx1.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.ctx1.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.ctx2.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.ctx3.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  }


  drawText(text: string, fontSize: number, x: number, y: number, color = 'white', textAlign: 'center' | 'left' | 'right' = 'center') {
    this.ctx2.font = `${fontSize}px Impact, sans-serif-black`;
    this.ctx2.textAlign = textAlign;
    this.ctx2.strokeStyle = 'black';
    this.ctx2.lineWidth = 4;
    this.ctx2.strokeText(text, x, y);
    this.ctx2.fillStyle = color;
    this.ctx2.fillText(text, x, y);
  }
}

export const drawEngine = new DrawEngine();
