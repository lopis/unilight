import { drawEngine } from "@/core/draw-engine";
import { gameItem, GameItem } from "./game-item";
import { Unicorn } from "./unicorn";
import { vec2, Vec2 } from "@/core/util/vec2";
import { assets } from "./image-generator";
import { addTimeEvent } from "@/core/timer";

const GRID_WIDTH = 10;
const GRID_HEIGHT = 10;

type GridItem = GameItem | null

const TRAIL_DURATION = 200; // ms a sprite stays visible
const SPAWN_INTERVAL = 2;   // ms between trail sprite spawns

type TrailSprite = {
  pos: Vec2
  angle: number
  born: number
}

export class GameGrid {
  // First coord is Y, second is X
  grid: GridItem[][]
  unicorn: Unicorn
  $unicorn: HTMLElement
  trail: TrailSprite[] = []

  constructor() {
    this.grid = Array.from({ length: GRID_HEIGHT }, () => Array(GRID_WIDTH).fill(null));

    this.grid[4][4] = gameItem( 4, 4, "🍇" );
    this.grid[4][5] = gameItem( 5, 4, "🍓" );
    this.grid[3][3] = gameItem( 3, 3, "🥝" );
    this.grid[1][2] = gameItem( 1, 2, "🌽" );
    this.grid[7][2] = gameItem( 7, 2, "🥕" );
    this.grid[8][7] = gameItem( 8, 7, "🫐" );

    this.unicorn = new Unicorn(6, 6);

    const cellSize = game.clientWidth / GRID_WIDTH;

    this.grid.forEach((row, y) => {
      row.forEach((gridItem, x) => {
        const $item = document.createElement('i');
        $item.id = `i-${x}${y}`;
        if(gridItem) {
          $item.innerText = gridItem?.s;
          $item.style.left = (cellSize * gridItem?.pos.x) + 'px';
          $item.style.top = (cellSize * gridItem?.pos.y) + 'px';
        }
        gameGrid.appendChild($item)
      })
    });

    this.$unicorn = document.createElement('i');
    this.$unicorn.id = 'unicorn';
    this.$unicorn.innerText = '🦄';
    this.$unicorn.style.left = (cellSize * this.unicorn.pos.x) + 'px';
    this.$unicorn.style.top = (cellSize * this.unicorn.pos.y) + 'px';
    gameGrid.appendChild(this.$unicorn);

    gameGrid.addEventListener('click', (event) => this.onClick(event.offsetX, event.offsetY))
  }

  onClick(x: number, y: number) {
    const cellSize = game.clientWidth / GRID_WIDTH;
    const targetX = (x - cellSize * 0.5) / cellSize;
    const targetY = (y - cellSize * 0.5) / cellSize;
    this.unicorn.moveTo(targetX, targetY);

    const spawnCount = Math.ceil(this.unicorn.moveDuration / SPAWN_INTERVAL);
    for (let i = 0; i < spawnCount; i++) {
      addTimeEvent(() => {
        this.trail.push({ pos: { ...this.unicorn.pos }, angle: this.unicorn.angle, born: performance.now() });
      }, 0, 0, i * SPAWN_INTERVAL);
    }
  }

  update(delta: number) {
    const cellSize = game.clientWidth / GRID_WIDTH;
    const now = performance.now();

    this.unicorn.update(delta);
    this.$unicorn.style.left = (cellSize * this.unicorn.pos.x) + 'px';
    this.$unicorn.style.top = (cellSize * this.unicorn.pos.y) + 'px';

    this.trail = this.trail.filter(s => now - s.born < TRAIL_DURATION);

    const sprite = assets['rainbowSprite'];
    if (sprite) {
      const ctx = drawEngine.ctx4;
      for (const s of this.trail) {
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
}
