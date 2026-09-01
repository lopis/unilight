import { drawEngine } from '@/core/draw-engine';
import { clearEvents } from '@/core/event';
import { State } from '@/core/state';
import { initGameData } from '@/game/game-data';
import { GameGrid } from '@/game/game-grid';
import { initInventoryView, renderInventory } from '@/game/inventory';
import { decodeLevel } from '@/game/level-data';
import { initSpellListener } from '@/game/spells';
import { Workspace } from '@/game/workspace';

export class GameState implements State {
  grid!: GameGrid;
  workplace!: Workspace;

  constructor(private readonly level: number) {}

  onEnter() {
    game.classList.toggle('show', true);
    const level = decodeLevel(this.level);
    initGameData(this.level, level.initialInventory);
    initInventoryView();
    renderInventory();
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
