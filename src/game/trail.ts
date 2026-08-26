import { drawEngine } from '@/core/draw-engine';
import { Vec2 } from '@/core/util/vec2';
import { assets } from './image-generator';
import { unicorn } from './unicorn';

const TRAIL_DURATION = 200;
const TRAIL_SPACING = 0.04;

type TrailSprite = {
  pos: Vec2
  angle: number
  born: number
}

export class Trail {
  private sprites: TrailSprite[] = [];
  private prevPos: Vec2 | null = null;
  private distanceSinceLastSpawn = 0;

  draw(cellSize: number) {
    if (!this.prevPos) {
      this.prevPos = { ...unicorn.pos };
    }

    // Generate sprites
    if (unicorn.moving) {
      const dx = unicorn.pos.x - this.prevPos.x;
      const dy = unicorn.pos.y - this.prevPos.y;
      const segmentLength = Math.hypot(dx, dy);

      if (segmentLength > 0) {
        this.distanceSinceLastSpawn += segmentLength;

        while (this.distanceSinceLastSpawn >= TRAIL_SPACING) {
          const overshoot = this.distanceSinceLastSpawn - TRAIL_SPACING;
          const traveledOnSegment = segmentLength - overshoot;
          const alpha = traveledOnSegment / segmentLength;

          this.sprites.push({
            pos: {
              x: this.prevPos.x + dx * alpha,
              y: this.prevPos.y + dy * alpha,
            },
            angle: unicorn.angle,
            born: performance.now(),
          });

          this.distanceSinceLastSpawn = overshoot;
        }
      }
    }

    this.prevPos = { ...unicorn.pos };

    // Draw Sprites
    const now = performance.now();
    this.sprites = this.sprites.filter(s => now - s.born < TRAIL_DURATION);
    const sprite = assets['rainbowSprite'];
    const ctx = drawEngine.ctx4;
    for (const s of this.sprites) {
      const opacity = 1 - (now - s.born) / TRAIL_DURATION;
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.translate(cellSize * s.pos.x + cellSize / 2, cellSize * s.pos.y + cellSize / 2);
      ctx.rotate(s.angle - Math.PI / 2);
      ctx.drawImage(sprite, -cellSize / 2, -cellSize / 2, cellSize, cellSize);
      ctx.restore();
    }
  }
}
