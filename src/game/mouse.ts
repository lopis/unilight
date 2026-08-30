import { emit } from "@/core/event"
import { GameEvent } from "./event-manifest"
import { fruits } from "./game-item";
import { SpellKind } from "./spells";

export const initMouse = () => {
  const emitSpell = (spell: SpellKind) => emit(GameEvent.SPELL_CLICK, { spell });

  gameGrid.addEventListener('click', (event) => emit(
    GameEvent.GRID_CLICK, { x: event.clientX, y: event.clientY}
  ));

  add.addEventListener('click', () => emitSpell('add'));
  sub.addEventListener('click', () => emitSpell('sub'));
  com.addEventListener('click', () => emitSpell('com'));

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
