import { on } from "@/core/event";
import { GameEvent } from "./event-manifest";
import { GameItem, fruits } from "./game-item";
import { addToInventory, removeFromInventory } from "./game-data";

const fruitSpaceColors: Record<GameItem, string> = {
  strawberry: 'var(--red)',
  orange: 'var(--yellow2)',
  banana: 'var(--yellow)',
  kiwi: 'var(--green2)',
  water: 'var(--cyan)',
  blueberry: 'var(--blue)',
  grape: 'var(--magenta)',

  hedge: 'var(--green)',
  hand: 'var(--white)',
};

export class Workspace {
  selectedFruit: GameItem | null = null;

  constructor() {
    on(GameEvent.INVENTORY_CLICK, ({ fruit, el }: { fruit: GameItem, el: HTMLElement }) => {
      const isSelected = el.classList.contains('selected');

      for (const item of inventory.querySelectorAll('.selected')) {
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
      const $i: HTMLElement | null = el.querySelector('i');
      if (!$i) {
        return;
      }

      const previous = Array.from($i.classList).find((name) => fruits.includes(name as GameItem)) as GameItem | undefined;

      const removed = removeFromInventory(fruit);
      if (!removed) {
        return;
      }

      if (previous) {
        addToInventory(previous);
      }

      $i.className = `${fruit} ${el.className}`.trim();
      el.style.background = fruitSpaceColors[fruit];

      for (const item of inventory.querySelectorAll('.selected')) {
        item.classList.remove('selected');
      }

      this.selectedFruit = null;
    })
  }
}
