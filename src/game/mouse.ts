import { emit } from "@/core/event"
import { GameEvent } from "./event-manifest"

export const initMouse = () => {
  gameGrid.addEventListener('click', (event) => emit(
    GameEvent.GRID_CLICK, { x: event.clientX, y: event.clientY}
  ));
}
