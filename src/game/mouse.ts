import { emit } from "@/core/event"
import { GameEvent } from "./event-manifest"
import { isGameItem } from "./game-item";

export const initMouse = () => {
  gameGrid.addEventListener('click', (event) => emit(
    GameEvent.GRID_CLICK, { x: event.clientX, y: event.clientY}
  ));

  add.addEventListener('click', () => emit(GameEvent.SPELL_ADD));
  sub.addEventListener('click', () => emit(GameEvent.SPELL_SUB));
  com.addEventListener('click', () => emit(GameEvent.SPELL_COM));

  space1.addEventListener('click', () => emit(
    GameEvent.WORKSPACE_SPACE_CLICK, { el: space1 }
  ));

  space2.addEventListener('click', () => emit(
    GameEvent.WORKSPACE_SPACE_CLICK, { el: space2 }
  ));

  inventory.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    const token = target.dataset.i;
    const item = token && isGameItem(token) ? token : undefined;

    if (item) {
      emit(
        GameEvent.INVENTORY_CLICK, { item, el: target }
      )
    }
  })
}
