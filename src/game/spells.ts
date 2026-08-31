import { on } from "@/core/event";
import { GameEvent } from "./event-manifest";

export type RainbowItem =
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'cyan'
  | 'blue'
  | 'violet'
  | 'black'
  | 'white';

export type SpellKind = 'add' | 'sub' | 'com';
export type SpellResult = RainbowItem;

export const rainbowColors = [
  'red',
  'orange',
  'yellow',
  'green',
  'cyan',
  'blue',
  'violet',
  'black',
  'white',
] as const;

export const rainbowIndex: Record<RainbowItem, number> = {
  red: 0,
  orange: 1,
  yellow: 2,
  green: 3,
  cyan: 4,
  blue: 5,
  violet: 6,
  black: 7,
  white: 8,
};

const colorOf = (id: number): RainbowItem => rainbowColors[id];

const addLUT: Array<Array<number>> = [
  [0, 1, 1, 2, 6, 6, 6],
  [1, 1, 1, 2, 3, 6, 8],
  [1, 1, 2, 3, 3, 3, 8],
  [2, 2, 3, 3, 4, 4, 4],
  [6, 3, 3, 4, 4, 4, 5],
  [6, 6, 3, 4, 4, 5, 6],
  [6, 8, 8, 4, 5, 6, 6],
];

const subLUT: Array<Array<number>> = [
  [7, 0, 0, 0, 0, 0, 0],
  [2, 7, 0, 1, 1, 1, 1],
  [2, 2, 7, 2, 2, 2, 2],
  [3, 3, 4, 7, 2, 3, 3],
  [4, 4, 4, 4, 7, 4, 4],
  [5, 5, 5, 5, 6, 7, 4],
  [4, 6, 6, 6, 0, 6, 7],
];

export const lookupAdd = (
  left: RainbowItem,
  right: RainbowItem,
): SpellResult => {
  const a = rainbowIndex[left];
  const b = rainbowIndex[right];
  return colorOf(addLUT[a][b]);
};

export const lookupSub = (
  left: RainbowItem,
  right: RainbowItem,
): SpellResult => {
  const a = rainbowIndex[left];
  const b = rainbowIndex[right];
  return colorOf(subLUT[a][b]);
};

export const lookupSpell = (
  kind: SpellKind,
  left: RainbowItem,
  right: RainbowItem,
): SpellResult | undefined => {
  switch (kind) {
    case 'add':
      return lookupAdd(left, right);
    case 'sub':
      return lookupSub(left, right);
    case 'com':
      return lookupAdd(left, right);
    default:
      return undefined;
  }
};

const spellAdd = () => {
  const left = space1.dataset.f;
  const right = space2.dataset.f;

  if (!left || !right) return undefined;
  const result = lookupAdd(left, right);
  setSpace3Background(result);
  console.log(left, right, result);
  return result;
}

const spellSub = () => {

}

const spellCom = () => {

}


export const initSpellListener = (): void => {
  on(GameEvent.SPELL_ADD, spellAdd);
  on(GameEvent.SPELL_SUB, spellSub);
  on(GameEvent.SPELL_COM, spellCom);
};


