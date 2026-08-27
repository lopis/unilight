import { drawEngine } from '@/core/draw-engine';
import { clearEvents } from '@/core/event';
import { State } from '@/core/state';
import { initGameData, GameData } from '@/game/game-data';
import { GameGrid } from '@/game/game-grid';

class GameState implements State {
  grid!: GameGrid;

  // Make sure ball starts at the same spot when game is entered
  onEnter() {
    game.classList.toggle('show', true);
    this.grid = new GameGrid();
    drawEngine.resizeCanvas();
    initGameData();
  }

  onLeave() {
    game.classList.toggle('show', false);
    clearEvents();
  }

  onUpdate(timeElapsed: number) {
    this.grid.update(timeElapsed);
  }
}

export const gameState = new GameState();
