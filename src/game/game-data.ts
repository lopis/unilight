import { GameItem } from "./game-item"
import { CountSet } from "@/core/util/count-set";
import { fruits } from "./game-item";

export interface GameData {
  inventory: Inventory
}

interface Inventory {
  fruits: CountSet<GameItem>
}

export let gameData!: GameData

const inventoryItems = new Map<GameItem, HTMLElement>();

export const initGameData = () => {
  gameData = {
    inventory: {
      fruits: new CountSet<GameItem>(),
    }
  }
  initInventoryView();
  renderInventory();
}

export const addToInventory = (fruit: GameItem) => {
  gameData.inventory.fruits.add(fruit);
  renderInventory();
}

export const removeFromInventory = (fruit: GameItem) => {
  const removed = gameData.inventory.fruits.remove(fruit);
  if (removed) {
    renderInventory();
  }
  return removed;
}

const renderInventory = () => {
  const remainderItems: GameItem[] = [];

  for (const fruit of fruits) {
    const el = inventoryItems.get(fruit);
    if (!el) {
      continue;
    }

    const total = gameData.inventory.fruits.count(fruit);
    const groups = Math.floor(total / 3);
    const remainder = total % 3;

    if (groups > 0) {
      el.classList.remove('hide');
      if (groups > 1) {
        el.dataset.count = String(groups);
      } else {
        delete el.dataset.count;
      }
    } else {
      el.classList.add('hide');
      el.classList.remove('selected');
      delete el.dataset.count;
    }

    if (remainder > 0) {
      for (let i = 0; i < remainder; i++) {
        remainderItems.push(fruit);
      }
    }
  }

  const unicornElement = document.getElementById('unicorn');
  if (unicornElement) {
    const remainderCount = remainderItems.length;
    const orbitHtml = remainderItems
      .map((fruit, index) => `
        <span class="unicorn-orbiter" style="--index:${index};--count:${remainderCount};">
          <i class="${fruit} unicorn-orbiter-glyph"></i>
        </span>
      `)
      .join('');

    unicornElement.innerHTML = `<span class="unicorn-core">🦄</span><span class="unicorn-orbit">${orbitHtml}</span>`;
  }
}

const initInventoryView = () => {
  inventoryItems.clear();

  for (const fruit of fruits) {
    const el = inventory.querySelector(`.${CSS.escape(fruit)}`) as HTMLElement | null;
    if (!el) {
      continue;
    }

    inventoryItems.set(fruit, el);
  }
}
