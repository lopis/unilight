import { State } from '@/core/state';
import { GameGrid } from '@/game/grame-grid';

class GameState implements State {
  grid: GameGrid;

  constructor() {
    this.grid = new GameGrid();
  }

  // Make sure ball starts at the same spot when game is entered
  onEnter() {

  }

  onUpdate() {
    this.grid.draw();
  }
}

export const gameState = new GameState();
