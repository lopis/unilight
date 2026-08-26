import { gameItem, GameItem } from "./game-item";
import { unicorn, Unicorn } from "./unicorn";
import { vec2, Vec2, bresenham } from "@/core/util/vec2";
import { addToInventory } from "./game-data";
import { Trail } from "./trail";
import { spawnHighlight } from "./highlight";

const gridCols = 10;
const gridRows = 10;

type GridItem = GameItem | null

export class GameGrid {
  // First coord is Y, second is X
  grid: GridItem[][]
  $unicorn: HTMLElement
  trail = new Trail()
  gridPos: Vec2 = vec2(6, 6)

  constructor() {
    this.grid = Array.from({ length: gridRows }, () => Array(gridCols).fill(null));

    this.grid[4][4] = gameItem( 4, 4, "🍇" );
    this.grid[4][5] = gameItem( 5, 4, "🌽" );
    this.grid[3][3] = gameItem( 3, 3, "🥝" );
    this.grid[1][2] = gameItem( 2, 1, "🍓" );
    this.grid[7][2] = gameItem( 2, 7, "🥕" );
    this.grid[8][7] = gameItem( 7, 8, "🫐" );

    unicorn.moveTo(6, 6);

    const cellSize = game.clientWidth / gridCols;

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
    this.$unicorn.style.left = (cellSize * unicorn.pos.x) + 'px';
    this.$unicorn.style.top = (cellSize * unicorn.pos.y) + 'px';
    gameGrid.appendChild(this.$unicorn);

    gameGrid.addEventListener('click', (event) => this.moveUnicorn(event.offsetX, event.offsetY))
  }

  moveUnicorn(x: number, y: number) {
    const cellSize = game.clientWidth / gridCols;
    const targetGX = Math.round((x - cellSize * 0.5) / cellSize);
    const targetGY = Math.round((y - cellSize * 0.5) / cellSize);
    const clampedX = Math.max(0, Math.min(gridCols - 1, targetGX));
    const clampedY = Math.max(0, Math.min(gridRows - 1, targetGY));

    const path = bresenham(this.gridPos.x, this.gridPos.y, clampedX, clampedY);
    // skip first cell (already standing there)
    const newCells = path.slice(1);

    for (const cell of newCells) {
      spawnHighlight(cell, cellSize);

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
    unicorn.moveTo(clampedX, clampedY);
  }

  update(delta: number) {
    const cellSize = game.clientWidth / gridCols;

    unicorn.update(delta);
    this.$unicorn.style.left = (cellSize * unicorn.pos.x) + 'px';
    this.$unicorn.style.top = (cellSize * unicorn.pos.y) + 'px';

    this.trail.draw(cellSize);
  }
}
