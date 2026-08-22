import { drawEngine } from '@/core/draw-engine';
import { addTimeEvent } from '@/core/timer';
import { Vec2 } from '@/core/util/vec2';
import { assets } from './image-generator';
import { Unicorn } from './unicorn';

const TRAIL_DURATION = 200;
const SPAWN_INTERVAL = 2;

type TrailSprite = {
  pos: Vec2
  angle: number
  born: number
}

export class Trail {
  private sprites: TrailSprite[] = [];

  scheduleSpawns(unicorn: Unicorn) {
    const spawnCount = Math.ceil(unicorn.moveDuration / SPAWN_INTERVAL);
    for (let i = 0; i < spawnCount; i++) {
      addTimeEvent(() => {
        this.sprites.push({ pos: { ...unicorn.pos }, angle: unicorn.angle, born: performance.now() });
      }, 0, 0, i * SPAWN_INTERVAL);
    }
  }

  draw(cellSize: number) {
    const now = performance.now();
    this.sprites = this.sprites.filter(s => now - s.born < TRAIL_DURATION);

    const sprite = assets['rainbowSprite'];
    if (!sprite) return;

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
