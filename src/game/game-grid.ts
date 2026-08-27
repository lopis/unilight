import { gameItem, GameItem, Fruit } from "./game-item";
import { unicorn } from "./unicorn";
import { vec2, Vec2, bresenham } from "@/core/util/vec2";
import { addToInventory } from "./game-data";
import { Trail } from "./trail";
import { spawnHighlight } from "./highlight";

const gridCols = 10;
const gridRows = 10;
const fruits: Fruit[] = ['🍓', '🌸', '🌽', '🥝', '💧', '🫐', '🍇'];

type GridItem = GameItem | null

export class GameGrid {
  // First coord is Y, second is X
  grid: GridItem[][]
  $unicorn: HTMLElement
  trail = new Trail()
  gridPos: Vec2 = vec2(6, 6)

  constructor() {
    this.grid = Array.from({ length: gridRows }, () => Array(gridCols).fill(null));
    this.fillGridWithRandomFruit();

    unicorn.moveTo(6, 6);

    this.grid.forEach((row, y) => {
      row.forEach((gridItem, x) => {
        const $item = document.createElement('i');
        $item.id = `i-${x}${y}`;
        this.placeAtGridCell($item, x, y);
        if(gridItem) {
          $item.innerText = gridItem?.s;
        }
        gameGrid.appendChild($item)
      })
    });

    this.$unicorn = document.createElement('i');
    this.$unicorn.id = 'unicorn';
    this.$unicorn.innerText = '🦄';
    this.placeAtGridCell(this.$unicorn, unicorn.pos.x, unicorn.pos.y);
    gameGrid.appendChild(this.$unicorn);

    gameGrid.addEventListener('click', (event) => this.moveUnicorn(event))
  }

  private fillGridWithRandomFruit() {
    for (let y = 0; y < gridRows; y++) {
      for (let x = 0; x < gridCols; x++) {
        const fruit = fruits[Math.floor(Math.random() * fruits.length)];
        this.grid[y][x] = gameItem(x, y, fruit);
      }
    }
  }

  private placeAtGridCell(element: HTMLElement, x: number, y: number) {
    element.style.gridColumn = `${Math.round(x) + 1}`;
    element.style.gridRow = `${Math.round(y) + 1}`;
  }

  moveUnicorn(event: MouseEvent) {
    const rect = gameGrid.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const relX = Math.max(0, Math.min(rect.width - 0.0001, event.clientX - rect.left));
    const relY = Math.max(0, Math.min(rect.height - 0.0001, event.clientY - rect.top));
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
        if ($item) $item.innerText = '';
      }
    }

    this.gridPos = vec2(clampedX, clampedY);
    unicorn.moveTo(clampedX, clampedY);
  }

  update(delta: number) {
    const cellSize = gameGrid.clientWidth / gridCols;

    unicorn.update(delta);
    this.placeAtGridCell(this.$unicorn, unicorn.pos.x, unicorn.pos.y);

    this.trail.draw(cellSize);
  }
}
