import { gameItem, GameItem, GridItem } from "./game-item";
import { addDash } from "./game-data";
import { player } from "./unicorn";
import { vec2, Vec2, bresenham } from "@/core/util/vec2";
import { collectCaughtItem } from "./inventory";
import { Trail } from "./trail";
import { spawnHighlight } from "./highlight";
import { on } from "@/core/event";
import { GameEvent } from "./event-manifest";
import { isInteractionLocked } from "./interaction-lock";
import { DecodedLevel } from "./level-data";
import { GRID_COLS, GRID_ROWS } from "./constants";

export class GameGrid {
  // First coord is Y, second is X
  grid: Array<Array<GridItem | null>>
  trail = new Trail()
  gridPos: Vec2 = vec2(6, 6)

  constructor(level: DecodedLevel) {
    this.grid = Array.from({ length: GRID_ROWS }, (_, y) =>
      Array.from({ length: GRID_COLS }, (_, x) => {
        const item = level.map[y][x] as GameItem | null;
        return item ? gameItem(x, y, item) : null;
      }),
    );

    player.snapTo(level.unicornPos.x, level.unicornPos.y);
    this.gridPos = vec2(level.unicornPos.x, level.unicornPos.y);

    this.grid.forEach((row, y) => {
      row.forEach((gridItem, x) => {
        const $item = document.createElement('i');
        $item.id = `i-${x}${y}`;
        this.placeAtGridCell($item, x, y);
        if (gridItem) {
          $item.classList.add(gridItem.s);
          $item.dataset['i'] = gridItem.s;
        }
        gameGrid.appendChild($item)
      })
    });

    this.placeUnicorn(player.pos.x, player.pos.y);

    on(GameEvent.GRID_CLICK, (pos) => this.moveUnicorn(pos))
  }

  private placeAtGridCell(element: HTMLElement, x: number, y: number) {
    element.style.gridColumn = `${Math.round(x) + 1}`;
    element.style.gridRow = `${Math.round(y) + 1}`;
  }

  private placeUnicorn(x: number, y: number) {
    unicorn.style.left = `${((x + 0.5) / GRID_COLS) * 100}%`;
    unicorn.style.top = `${((y + 0.5) / GRID_ROWS) * 100}%`;
    unicorn.style.setProperty('--ux', player.facingRight ? '-1' : '1');
  }

  moveUnicorn(pos: {x: number, y: number}) {
    if (isInteractionLocked()) {
      return;
    }

    const rect = gameGrid.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const relX = Math.max(0, Math.min(rect.width - 0.0001, pos.x - rect.left));
    const relY = Math.max(0, Math.min(rect.height - 0.0001, pos.y - rect.top));
    const targetGX = Math.floor((relX / rect.width) * GRID_COLS);
    const targetGY = Math.floor((relY / rect.height) * GRID_ROWS);
    const clampedX = Math.max(0, Math.min(GRID_COLS - 1, targetGX));
    const clampedY = Math.max(0, Math.min(GRID_ROWS - 1, targetGY));

    const path = bresenham(this.gridPos.x, this.gridPos.y, clampedX, clampedY);
    // skip first cell (already standing there)
    const newCells = path.slice(1);
    if (newCells.length === 0) return;
    addDash();

    for (const cell of newCells) {
      spawnHighlight(cell);

      // fruit collection
      const item = this.grid[cell.y]?.[cell.x];
      if (item && !item.taken) {
        item.taken = true;
        collectCaughtItem(item.s);
        const $item = document.getElementById(item.id);
        if ($item) {
          $item.textContent = '';
          $item.classList.remove(item.s);
          delete $item.dataset['i'];
        }
      }
    }

    this.gridPos = vec2(clampedX, clampedY);
    player.moveTo(clampedX, clampedY);
    this.placeUnicorn(clampedX, clampedY);
  }

  update(delta: number) {
    const cellSize = gameGrid.clientWidth / GRID_COLS;

    player.update(delta);

    this.trail.draw(cellSize);
  }
}
