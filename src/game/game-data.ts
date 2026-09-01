import { GameItem } from "./game-item"
import { CountSet } from "@/core/util/count-set";
import { inventoryItems } from "./game-item";

export interface GameData {
  inventory: Inventory
}

interface Inventory {
  items: CountSet<GameItem>
}

export let gameData!: GameData

const inventoryItemsMap = new Map<GameItem, HTMLElement>();

export const initGameData = () => {
  gameData = {
    inventory: {
      items: new CountSet<GameItem>(),
    }
  }
  initInventoryView();
  renderInventory();
}

export const addToInventory = (item: GameItem) => {
  gameData.inventory.items.add(item);
  renderInventory();
}

export const removeFromInventory = (item: GameItem) => {
  const removed = gameData.inventory.items.remove(item);
  if (removed) {
    renderInventory();
  }
  return removed;
}

const renderInventory = () => {
  const remainderList: GameItem[] = [];

  for (const item of inventoryItems) {
    const el = inventoryItemsMap.get(item);
    if (!el) {
      continue;
    }

    const total = gameData.inventory.items.count(item);
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
        remainderList.push(item);
      }
    }
  }

  const unicornElement = document.getElementById('unicorn');
  if (unicornElement) {
    const remainderCount = remainderList.length;
    const orbitHtml = remainderList
      .map((item, index) => `
        <span class="unicorn-orbiter" style="--index:${index};--count:${remainderCount};">
          <i class="${item} unicorn-orbiter-glyph"></i>
        </span>
      `)
      .join('');

    unicornElement.innerHTML = `<span class="unicorn-core"></span><span class="unicorn-orbit">${orbitHtml}</span>`;
  }
}

const initInventoryView = () => {
  inventoryItemsMap.clear();

  for (const item of inventoryItems) {
    const el = inventory.querySelector(`.${CSS.escape(item)}`) as HTMLElement | null;
    if (!el) {
      continue;
    }

    inventoryItemsMap.set(item, el);
  }
}
