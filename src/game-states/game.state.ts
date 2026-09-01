import { drawEngine } from '@/core/draw-engine';
import { clearEvents } from '@/core/event';
import { State } from '@/core/state';
import { initGameData, GameData } from '@/game/game-data';
import { GameGrid } from '@/game/game-grid';
import { decodeLevel } from '@/game/level-data';
import { initSpellListener } from '@/game/spells';
import { Workspace } from '@/game/workspace';

class GameState implements State {
  grid!: GameGrid;
  workplace!: Workspace;

  onEnter() {
    game.classList.toggle('show', true);
    const level = decodeLevel(0);
    initGameData(level.initialInventory);
    this.grid = new GameGrid(level);
    this.workplace = new Workspace();
    drawEngine.resizeCanvas();
    initSpellListener();
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
