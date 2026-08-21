import { drawEngine } from "@/core/draw-engine";
import { gameItem, GameItem } from "./game-item";
import { Unicorn } from "./unicorn";
import { vec2 } from "@/core/util/vec2";

const GRID_WIDTH = 10;
const GRID_HEIGHT = 10;

type GridItem = GameItem | null

export class GameGrid {
  // First coord is Y, second is X
  grid: GridItem[][]
  unicorn: Unicorn
  $unicorn: HTMLElement

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
    this.unicorn.pos = vec2((x - cellSize*0.5) / cellSize, (y - cellSize*0.5) / cellSize);
  }

  update() {
    const cellSize = game.clientWidth / GRID_WIDTH;

    this.unicorn.update(cellSize);
    this.$unicorn.style.left = (cellSize * this.unicorn.pos.x) + 'px';
    this.$unicorn.style.top = (cellSize * this.unicorn.pos.y) + 'px';
  }
}
