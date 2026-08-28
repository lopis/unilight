import { Fruit } from "./game-item"
import { CountSet } from "@/core/util/count-set";
import { fruits } from "./game-item";

export interface GameData {
  inventory: Inventory
}

interface Inventory {
  fruits: CountSet<Fruit>
}

export let gameData!: GameData

const inventoryItems = new Map<Fruit, HTMLSpanElement>();

export const initGameData = () => {
  gameData = {
    inventory: {
      fruits: new CountSet<Fruit>(),
    }
  }
  initInventoryView();
  renderInventory();
}

export const addToInventory = (fruit: Fruit) => {
  gameData.inventory.fruits.add(fruit);
  renderInventory();
}

export const removeFromInventory = (fruit: Fruit) => {
  const removed = gameData.inventory.fruits.remove(fruit);
  if (removed) {
    renderInventory();
  }
  return removed;
}

const renderInventory = () => {
  const remainderItems: Fruit[] = [];

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
          <span class="unicorn-orbiter-glyph">${fruit}</span>
        </span>
      `)
      .join('');

    unicornElement.innerHTML = `<span class="unicorn-core">🦄</span><span class="unicorn-orbit">${orbitHtml}</span>`;
  }
}

const initInventoryView = () => {
  inventoryItems.clear();

  for (const fruit of fruits) {
    const el = document.getElementById(fruit) as HTMLSpanElement | null;
    if (!el) {
      continue;
    }

    inventoryItems.set(fruit, el);
  }
}
