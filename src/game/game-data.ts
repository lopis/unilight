import { CountSet } from "@/core/util/count-set";
import { resetInteractionLock } from "./interaction-lock";
import { FruitItem, GameItem, GemItem } from "./game-item";
import { setSketchText } from "./sketch-font";

export interface GameData {
  inventory: CountSet<GameItem>
  stagedFruits: CountSet<FruitItem>
  level: number
  dash: number
  spells: number
  victoryTriggered: boolean
  onVictory: (() => void) | null
}

export let gameData!: GameData

let dashEl: HTMLElement | null = null;
let spellEl: HTMLElement | null = null;

const renderStats = () => {
  dashEl ??= document.getElementById('d');
  spellEl ??= document.getElementById('s');
  if (dashEl) setSketchText(dashEl, String(gameData.dash));
  if (spellEl) setSketchText(spellEl, String(gameData.spells));
};

export const initGameData = (level: number, initialInventory: GemItem[] = []) => {
  resetInteractionLock();
  gameData = {
    inventory: new CountSet<GameItem>(),
    stagedFruits: new CountSet<FruitItem>(),
    level,
    dash: 0,
    spells: 0,
    victoryTriggered: false,
    onVictory: null,
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
