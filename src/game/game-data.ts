import { CountSet } from "@/core/util/count-set";
import { resetInteractionLock } from "./interaction-lock";
import { fruits, FruitItem, GameItem, GemItem, inventoryItems, isFruitItem, isGemItem } from "./game-item";

export interface GameData {
  inventory: Inventory
  stagedFruits: StagedFruits
}

interface Inventory {
  items: CountSet<GameItem>
}

interface StagedFruits {
  items: CountSet<FruitItem>
}

export let gameData!: GameData

const inventoryItemsMap = new Map<GameItem, HTMLElement>();

export const initGameData = (initialInventory: GemItem[] = []) => {
  resetInteractionLock();
  gameData = {
    inventory: {
      items: new CountSet<GameItem>(),
    },
    stagedFruits: {
      items: new CountSet<FruitItem>(),
    }
  };

  for (const gem of initialInventory) {
    gameData.inventory.items.add(gem);
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

export const collectCaughtItem = (item: GameItem) => {
  if (isGemItem(item)) {
    addToInventory(item);
    return;
  }

  if (!isFruitItem(item)) {
    return;
  }

  const staged = gameData.stagedFruits.items;
  staged.add(item);

  if (staged.count(item) >= 3) {
    staged.remove(item);
    staged.remove(item);
    staged.remove(item);
    gameData.inventory.items.add(item);
  }

  renderInventory();
}

const renderInventory = () => {
  const stagedList: FruitItem[] = [];

  for (const item of inventoryItems) {
    const el = inventoryItemsMap.get(item);
    if (!el) {
      continue;
    }

    const total = gameData.inventory.items.count(item);
    if (total > 0) {
      el.classList.remove('hide');
      if (total > 1) {
        el.dataset.count = String(total);
      } else {
        delete el.dataset.count;
      }
    } else {
      el.classList.add('hide');
      el.classList.remove('selected');
      delete el.dataset.count;
    }
  }

  for (const fruit of fruits) {
    const stagedCount = gameData.stagedFruits.items.count(fruit);
    for (let i = 0; i < stagedCount; i++) {
      stagedList.push(fruit);
    }
  }

  const unicornElement = document.getElementById('unicorn');
  if (unicornElement) {
    const stagedCount = stagedList.length;
    const orbitHtml = stagedList
      .map((item, index) => `
        <span class="unicorn-orbiter" style="--index:${index};--count:${stagedCount};">
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
