import { State } from '@/core/state';
import { gameStateMachine } from '@/game-state-machine';
import { applySpellIcons, init as initImages } from '@/game/image-generator';
import { initMouse } from '@/game/mouse';
import { applySketchTextFromDataAttr, initSketchFont } from '@/game/sketch-font';
import { initSpellListener } from '@/game/spells';
import { initSprites } from '@/game/sprites';
import { menuState } from './menu.state';

class LoadingState implements State {
  onEnter() {
    loading.classList.toggle('show', true);

    initImages();
    initSprites();
    initMouse();
    initSpellListener();
    initSketchFont();
    applySketchTextFromDataAttr();
    applySpellIcons();

    queueMicrotask(() => gameStateMachine.setState(menuState));
  }

  onLeave() {
    loading.classList.toggle('show', false);
  }

  onUpdate() {}
}

export const loadingState = new LoadingState();
