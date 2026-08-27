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
  ctx4: CanvasRenderingContext2D;

  // Canvas dimensions (cached for performance)
  canvasWidth = 0;
  canvasHeight = 0;

  constructor() {
    this.ctx4 = getCtx(c4);
    window.addEventListener('resize', () => this.resizeCanvas());
    window.addEventListener('orientationchange', () => this.resizeCanvas());
    this.resizeCanvas();
  }

  resizeCanvas() {
    this.canvasWidth = gameGrid.clientWidth;
    this.canvasHeight = gameGrid.clientHeight;
    this.ctx4.canvas.width = this.canvasWidth;
    this.ctx4.canvas.height = this.canvasHeight;
    this.ctx4.imageSmoothingEnabled = false;
  }

  clear() {
    this.ctx4.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  }
}

export const drawEngine = new DrawEngine();
