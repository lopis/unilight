import { gameItem, GridItem, spawnItems } from "./game-item";
import { unicorn } from "./unicorn";
import { vec2, Vec2, bresenham } from "@/core/util/vec2";
import { addToInventory } from "./game-data";
import { Trail } from "./trail";
import { spawnHighlight } from "./highlight";
import { on } from "@/core/event";
import { GameEvent } from "./event-manifest";

const gridCols = 10;
const gridRows = 10;

export class GameGrid {
  // First coord is Y, second is X
  grid: GridItem[][]
  $unicorn: HTMLElement
  trail = new Trail()
  gridPos: Vec2 = vec2(6, 6)

  constructor() {
    this.grid = Array.from({ length: gridRows }, () => Array(gridCols).fill(null));
    this.fillGridWithRandomFruit();

    unicorn.snapTo(6, 6);

    this.grid.forEach((row, y) => {
      row.forEach((gridItem, x) => {
        const $item = document.createElement('i');
        $item.id = `i-${x}${y}`;
        this.placeAtGridCell($item, x, y);
        if (gridItem) {
          $item.classList.add(gridItem.s);
          $item.dataset.i = gridItem.s;
        }
        gameGrid.appendChild($item)
      })
    });

    const unicornElement = document.getElementById('unicorn');
    if (!unicornElement) {
      throw new Error('Missing #unicorn element');
    }

    this.$unicorn = unicornElement;
    this.placeUnicorn(unicorn.pos.x, unicorn.pos.y);

    on(GameEvent.GRID_CLICK, (pos) => this.moveUnicorn(pos))
  }

  private fillGridWithRandomFruit() {
    for (let y = 0; y < gridRows; y++) {
      for (let x = 0; x < gridCols; x++) {
        const item = spawnItems[Math.floor(Math.random() * spawnItems.length)];
        this.grid[y][x] = gameItem(x, y, item);
      }
    }
  }

  private placeAtGridCell(element: HTMLElement, x: number, y: number) {
    element.style.gridColumn = `${Math.round(x) + 1}`;
    element.style.gridRow = `${Math.round(y) + 1}`;
  }

  private placeUnicorn(x: number, y: number) {
    this.$unicorn.style.left = `${((x + 0.5) / gridCols) * 100}%`;
    this.$unicorn.style.top = `${((y + 0.5) / gridRows) * 100}%`;
    this.$unicorn.style.setProperty('--ux', unicorn.facingRight ? '-1' : '1');
  }

  moveUnicorn(pos: {x: number, y: number}) {
    const rect = gameGrid.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const relX = Math.max(0, Math.min(rect.width - 0.0001, pos.x - rect.left));
    const relY = Math.max(0, Math.min(rect.height - 0.0001, pos.y - rect.top));
    const targetGX = Math.floor((relX / rect.width) * gridCols);
    const targetGY = Math.floor((relY / rect.height) * gridRows);
    const clampedX = Math.max(0, Math.min(gridCols - 1, targetGX));
    const clampedY = Math.max(0, Math.min(gridRows - 1, targetGY));

    const path = bresenham(this.gridPos.x, this.gridPos.y, clampedX, clampedY);
    // skip first cell (already standing there)
    const newCells = path.slice(1);

    for (const cell of newCells) {
      spawnHighlight(cell);

      // fruit collection
      const item = this.grid[cell.y]?.[cell.x];
      if (item && !item.taken) {
        item.taken = true;
        addToInventory(item.s);
        const $item = document.getElementById(item.id);
        if ($item) {
          $item.textContent = '';
          $item.classList.remove(item.s);
          delete $item.dataset.i;
        }
      }
    }

    this.gridPos = vec2(clampedX, clampedY);
    unicorn.moveTo(clampedX, clampedY);
    this.placeUnicorn(clampedX, clampedY);
  }

  update(delta: number) {
    const cellSize = gameGrid.clientWidth / gridCols;

    unicorn.update(delta);

    this.trail.draw(cellSize);
  }
}
