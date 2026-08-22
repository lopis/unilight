import { drawEngine } from "@/core/draw-engine";
import { gameItem, GameItem } from "./game-item";
import { Unicorn } from "./unicorn";
import { vec2, Vec2 } from "@/core/util/vec2";
import { assets } from "./image-generator";
import { addTimeEvent } from "@/core/timer";
import { addToInventory } from "./game-data";

const GRID_WIDTH = 10;
const GRID_HEIGHT = 10;

type GridItem = GameItem | null

const TRAIL_DURATION = 200; // ms a sprite stays visible
const SPAWN_INTERVAL = 2;   // ms between trail sprite spawns
const HIGHLIGHT_DURATION = 1000; // ms a cell highlight stays visible

function bresenham(x0: number, y0: number, x1: number, y1: number): Vec2[] {
  const cells: Vec2[] = [];
  const dx = Math.abs(x1 - x0), sx = x0 < x1 ? 1 : -1;
  const dy = -Math.abs(y1 - y0), sy = y0 < y1 ? 1 : -1;
  let err = dx + dy;
  let x = x0, y = y0;
  while (true) {
    cells.push(vec2(x, y));
    if (x === x1 && y === y1) break;
    const e2 = 2 * err;
    if (e2 >= dy) { err += dy; x += sx; }
    if (e2 <= dx) { err += dx; y += sy; }
  }
  return cells;
}

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
  gridPos: Vec2 = vec2(6, 6)

  constructor() {
    this.grid = Array.from({ length: GRID_HEIGHT }, () => Array(GRID_WIDTH).fill(null));

    this.grid[4][4] = gameItem( 4, 4, "🍇" );
    this.grid[4][5] = gameItem( 5, 4, "🌽" );
    this.grid[3][3] = gameItem( 3, 3, "🥝" );
    this.grid[1][2] = gameItem( 2, 1, "🍓" );
    this.grid[7][2] = gameItem( 2, 7, "🥕" );
    this.grid[8][7] = gameItem( 7, 8, "🫐" );

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
    const targetGX = Math.round((x - cellSize * 0.5) / cellSize);
    const targetGY = Math.round((y - cellSize * 0.5) / cellSize);
    const clampedX = Math.max(0, Math.min(GRID_WIDTH - 1, targetGX));
    const clampedY = Math.max(0, Math.min(GRID_HEIGHT - 1, targetGY));

    const path = bresenham(this.gridPos.x, this.gridPos.y, clampedX, clampedY);
    // skip first cell (already standing there)
    const newCells = path.slice(1);

    for (const cell of newCells) {
      // highlight
      const $highlight = document.createElement('div');
      $highlight.className = 'highlight';
      $highlight.style.left = (cellSize * cell.x) + 'px';
      $highlight.style.top = (cellSize * cell.y) + 'px';
      $highlight.style.width = cellSize + 'px';
      $highlight.style.height = cellSize + 'px';
      gameGrid.insertBefore($highlight, gameGrid.firstChild);
      addTimeEvent(() => $highlight.remove(), 0, 0, HIGHLIGHT_DURATION);

      // fruit collection
      const item = this.grid[cell.y]?.[cell.x];
      if (item && !item.taken) {
        item.taken = true;
        addToInventory(item.s);
        const $item = document.getElementById(item.id);
        if ($item) $item.innerText = '';
      }
    }

    this.gridPos = vec2(clampedX, clampedY);
    this.unicorn.moveTo(clampedX, clampedY);

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
