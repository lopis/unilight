import { Fruit } from "./game-item"
import { CountSet } from "@/core/util/count-set";

export interface GameData {
  inventory: Inventory
}

interface Inventory {
  fruits: CountSet<Fruit>
}

export let gameData!: GameData

export const initGameData = () => {
  gameData = {
    inventory: {
      fruits: new CountSet<Fruit>(),
    }
  }
  renderInventory();
}

export const addToInventory = (fruit: Fruit) => {
  gameData.inventory.fruits.add(fruit);
  renderInventory();
}

const renderInventory = () => {
  let inventoryHtml = '';
  const remainderItems: Fruit[] = [];

  for (const fruit of gameData.inventory.fruits) {
    const total = gameData.inventory.fruits.count(fruit);
    const groups = Math.floor(total / 3);
    const remainder = total % 3;

    if (groups > 0) {
      const countAttribute = groups > 1 ? ` data-count="${groups}"` : '';
      inventoryHtml += `<span${countAttribute} class="${fruit}">${fruit}</span>`;
    }

    if (remainder > 0) {
      for (let i = 0; i < remainder; i++) {
        remainderItems.push(fruit);
      }
    }
  }

  inventory.innerHTML = inventoryHtml;

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
