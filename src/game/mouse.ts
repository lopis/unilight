import { emit } from "@/core/event"
import { GameEvent } from "./event-manifest"
import { fruits } from "./game-item";
import { SpellKind } from "./spells";

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
    const fruit = Array.from(target.classList).find((name) => fruits.includes(name as (typeof fruits)[number])) as (typeof fruits)[number] | undefined;

    if (fruit) {
      emit(
        GameEvent.INVENTORY_CLICK, { fruit, el: target }
      )
    }
  })
}
