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
  inventory.innerHTML = [...gameData.inventory.fruits]
    .map((fruit) => {
      const count = gameData.inventory.fruits.count(fruit);
      const countAttribute = count > 1 ? ` data-count="${count}"` : '';
      return `<span${countAttribute} class="${fruit}">${fruit}</span>`;
    })
    .join('');
}
