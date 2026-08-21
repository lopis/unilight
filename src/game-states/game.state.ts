import { State } from '@/core/state';
import { GameGrid } from '@/game/grame-grid';

class GameState implements State {
  grid!: GameGrid;

  // Make sure ball starts at the same spot when game is entered
  onEnter() {
    game.classList.toggle('show', true);
    this.grid = new GameGrid();
  }

  onLeave() {
    game.classList.toggle('show', false);
  }

  onUpdate() {
    this.grid.update();
  }
}

export const gameState = new GameState();
