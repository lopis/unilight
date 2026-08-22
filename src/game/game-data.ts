import { Fruit } from "./game-item"

export interface GameData {
  inventory: Inventory
}

interface Inventory {
  fruits: Fruit[]
}

export let gameData!: GameData

export const initGameData = () => {
  gameData = {
    inventory: {
      fruits: []
    }
  }
  renderInventory();
}

export const addToInventory = (fruit: Fruit) => {
  gameData.inventory.fruits.push(fruit);
  renderInventory();
}

const renderInventory = () => {
  inventory.innerHTML = gameData.inventory.fruits.map(f => `<span>${f}</span>`).join('');
}
