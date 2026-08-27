import { on } from "@/core/event";
import { GameEvent } from "./event-manifest";
import { Fruit } from "./game-item";

export class Workspace {
  constructor() {
    on(GameEvent.INVENTORY_CLICK, ({ fruit, el }: { fruit: Fruit, el: HTMLElement }) => {
      const isSelected = el.classList.contains('selected');

      for (const item of inventory.querySelectorAll('span.selected')) {
        item.classList.remove('selected');
      }

      if (!isSelected) {
        el.classList.add('selected');
      }
    })
  }
}
