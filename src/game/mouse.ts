import { emit } from "@/core/event"
import { GameEvent } from "./event-manifest"
import { isInteractionLocked } from "./interaction-lock";
import { isGameItem } from "./game-item";

export const initMouse = () => {
  gameGrid.addEventListener('click', (event) => {
    if (isInteractionLocked()) {
      return;
    }
    emit(GameEvent.GRID_CLICK, { x: event.clientX, y: event.clientY});
  });

  add.addEventListener('click', () => {
    if (isInteractionLocked()) {
      return;
    }
    emit(GameEvent.SPELL_ADD);
  });

  sub.addEventListener('click', () => {
    if (isInteractionLocked()) {
      return;
    }
    emit(GameEvent.SPELL_SUB);
  });

  com.addEventListener('click', () => {
    if (isInteractionLocked()) {
      return;
    }
    emit(GameEvent.SPELL_COM);
  });

  space1.addEventListener('click', () => {
    if (isInteractionLocked()) {
      return;
    }
    emit(GameEvent.WORKSPACE_SPACE_CLICK, { el: space1 });
  });

  space2.addEventListener('click', () => {
    if (isInteractionLocked()) {
      return;
    }
    emit(GameEvent.WORKSPACE_SPACE_CLICK, { el: space2 });
  });

  inventory.addEventListener('click', (event) => {
    if (isInteractionLocked()) {
      return;
    }

    // On mobile, taps can originate from nested/generated targets.
    // Resolve to the actual inventory token element carrying data-i.
    const eventTarget = event.target;
    const target = eventTarget instanceof HTMLElement
      ? eventTarget.closest('i[data-i]') as HTMLElement | null
      : null;

    // Some browsers/shadow scenarios require walking the composed path.
    const fallbackFromPath = !target
      ? event.composedPath().find((node): node is HTMLElement => {
        return node instanceof HTMLElement && node.matches('i[data-i]');
      })
      : null;

    const itemEl = target ?? fallbackFromPath;
    const token = itemEl?.dataset.i;
    const item = token && isGameItem(token) ? token : undefined;

    if (item && itemEl) {
      emit(
        GameEvent.INVENTORY_CLICK, { item, el: itemEl }
      )
    }
  })
}
