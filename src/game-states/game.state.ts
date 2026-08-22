import { State } from '@/core/state';
import { initGameData, GameData } from '@/game/game-data';
import { GameGrid } from '@/game/grame-grid';

class GameState implements State {
  grid!: GameGrid;

  // Make sure ball starts at the same spot when game is entered
  onEnter() {
    game.classList.toggle('show', true);
    this.grid = new GameGrid();
    initGameData();
  }

  onLeave() {
    game.classList.toggle('show', false);
  }

  onUpdate(timeElapsed: number) {
    this.grid.update(timeElapsed);
  }
}

export const gameState = new GameState();
