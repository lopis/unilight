import { drawEngine } from '@/core/draw-engine';
import { clearEvents } from '@/core/event';
import { addTimeEvent } from '@/core/timer';
import { State } from '@/core/state';
import { gameData, initGameData } from '@/game/game-data';
import { GameGrid } from '@/game/game-grid';
import { initInventoryView, renderInventory } from '@/game/inventory';
import { decodeLevel } from '@/game/level-data';
import { initSpellListener } from '@/game/spells';
import { lockInteractions } from '@/game/interaction-lock';
import { Workspace } from '@/game/workspace';
import { Levels } from '@/game/level-data';
import { gameStateMachine } from '@/game-state-machine';

export class GameState implements State {
  grid!: GameGrid;
  workplace!: Workspace;
  private victoryStarted = false;

  constructor(private readonly level: number) {}

  onEnter() {
    game.classList.toggle('show', true);
    const level = decodeLevel(this.level);
    initGameData(this.level, level.initialInventory);
    initInventoryView();
    gameData.onVictory = () => this.startVictorySequence();
    renderInventory();
    this.grid = new GameGrid(level);
    this.workplace = new Workspace();
    drawEngine.resizeCanvas();
    initSpellListener();
  }

  onLeave() {
    game.classList.toggle('show', false);
    inventory.classList.remove('animate');
    win.classList.add('hide');
    win.classList.remove('animate');
    gameData.onVictory = null;
    clearEvents();
  }

  onUpdate(timeElapsed: number) {
    this.grid.update(timeElapsed);
  }

  private startVictorySequence() {
    if (this.victoryStarted) {
      return;
    }

    this.victoryStarted = true;
    lockInteractions();

    addTimeEvent(() => {
      inventory.classList.add('animate');
      win.classList.remove('hide');
      win.classList.add('animate');
    }, 0, 0, 1000);

    addTimeEvent(() => {
      const nextLevel = (gameData.level + 1) % Levels.length;
      gameStateMachine.setState(new GameState(nextLevel));
    }, 0, 0, 4000);
  }
}
