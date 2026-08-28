import { on } from "@/core/event";
import { GameEvent } from "./event-manifest";
import { Fruit, fruits } from "./game-item";
import { addToInventory, removeFromInventory } from "./game-data";

const fruitSpaceColors: Record<Fruit, string> = {
  '🍓': 'var(--red)',
  '🌸': 'var(--pink)',
  '🌽': 'var(--yellow)',
  '🥝': 'var(--green)',
  '💧': 'var(--blue)',
  '🫐': 'var(--indigo)',
  '🍇': 'var(--violet)',
};

export class Workspace {
  selectedFruit: Fruit | null = null;

  constructor() {
    on(GameEvent.INVENTORY_CLICK, ({ fruit, el }: { fruit: Fruit, el: HTMLElement }) => {
      const isSelected = el.classList.contains('selected');

      for (const item of inventory.querySelectorAll('span.selected')) {
        item.classList.remove('selected');
      }

      if (!isSelected) {
        el.classList.add('selected');
        this.selectedFruit = fruit;
        return;
      }

      this.selectedFruit = null;
    });

    on(GameEvent.WORKSPACE_SPACE_CLICK, ({ el }: { el: HTMLElement }) => {
      if (!this.selectedFruit) {
        return;
      }

      const fruit = this.selectedFruit;
      const removed = removeFromInventory(fruit);
      if (!removed) {
        return;
      }

      const previous = (el.textContent ?? '').trim() as Fruit;
      if (fruits.includes(previous)) {
        addToInventory(previous);
      }

      el.textContent = fruit;
      el.style.background = fruitSpaceColors[fruit];

      for (const item of inventory.querySelectorAll('span.selected')) {
        item.classList.remove('selected');
      }

      this.selectedFruit = null;
    })
  }
}
