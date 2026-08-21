import { State } from '@/core/state';
import { drawEngine } from '@/core/draw-engine';
import { gameStateMachine } from '@/game-state-machine';
import { gameState } from './game.state';


class MenuState implements State {
  onEnter() {
    menu.classList.toggle('show', true);
    newGame.addEventListener('click', this.startGame)
  }

  onLeave() {
    menu.classList.toggle('show', false);
    newGame.removeEventListener('click', this.startGame);
  }

  onUpdate() {

  }

  startGame () {
    gameStateMachine.setState(gameState);
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }
}

export const menuState = new MenuState();
