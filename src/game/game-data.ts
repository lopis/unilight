import { CountSet } from "@/core/util/count-set";
import { resetInteractionLock } from "./interaction-lock";
import { FruitItem, GameItem, GemItem } from "./game-item";

export interface GameData {
  inventory: CountSet<GameItem>
  stagedFruits: CountSet<FruitItem>
  level: number
  dash: number
  spells: number
}

export let gameData!: GameData

let dashEl: HTMLElement | null = null;
let spellEl: HTMLElement | null = null;

const renderStats = () => {
  dashEl ??= document.getElementById('d');
  spellEl ??= document.getElementById('s');
  if (dashEl) dashEl.textContent = String(gameData.dash);
  if (spellEl) spellEl.textContent = String(gameData.spells);
};

export const initGameData = (level: number, initialInventory: GemItem[] = []) => {
  resetInteractionLock();
  gameData = {
    inventory: new CountSet<GameItem>(),
    stagedFruits: new CountSet<FruitItem>(),
    level,
    dash: 0,
    spells: 0,
  };

  for (const gem of initialInventory) {
    gameData.inventory.add(gem);
  }

  renderStats();
}

export const addDash = () => {
  gameData.dash++;
  renderStats();
};

export const addSpell = () => {
  gameData.spells++;
  renderStats();
};
