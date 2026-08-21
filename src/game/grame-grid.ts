import { drawEngine } from "@/core/draw-engine";
import { GameItem } from "./game-item";
import { Unicorn } from "./unicorn";

const GRID_WIDTH = 10;
const GRID_HEIGHT = 10;

type GridItem = GameItem | null

export class GameGrid {
  // First coord is Y, second is X
  grid: GridItem[][]
  unicorn: Unicorn

  constructor() {
    this.grid = Array.from({ length: GRID_HEIGHT }, () => Array(GRID_WIDTH).fill(null));

    this.grid[4][4] = { s: "🍇" };
    this.grid[4][5] = { s: "🍓" };
    this.grid[3][3] = { s: "🥝" };

    this.unicorn = new Unicorn(6, 6);
  }

  draw() {
    const cellSize = drawEngine.ctx1.canvas.width / GRID_WIDTH;

    this.grid.forEach((row, y) => {
      row.forEach((gridItem, x) => {

        drawEngine.ctx1.strokeStyle = 'white';
        drawEngine.ctx1.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
        gridItem && drawEngine.drawText(gridItem?.s, 40, x * cellSize + cellSize / 2, y * cellSize + cellSize * 0.75);
      })
    })

    this.unicorn.draw(cellSize);
  }
}
