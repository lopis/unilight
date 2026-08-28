import { emit } from "@/core/event"
import { GameEvent } from "./event-manifest"
import { fruits } from "./game-item";

export const initMouse = () => {
  gameGrid.addEventListener('click', (event) => emit(
    GameEvent.GRID_CLICK, { x: event.clientX, y: event.clientY}
  ));

  space1.addEventListener('click', () => emit(
    GameEvent.WORKSPACE_SPACE_CLICK, { el: space1 }
  ));

  space2.addEventListener('click', () => emit(
    GameEvent.WORKSPACE_SPACE_CLICK, { el: space2 }
  ));

  inventory.addEventListener('click', (event) => {
    const id = (event.target as HTMLElement).id
    const fruit = id as (typeof fruits)[number]

    if (fruits.includes(fruit)) {
      emit(
        GameEvent.INVENTORY_CLICK, { fruit, el: event.target }
      )
    }
  })
}
