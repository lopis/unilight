import { on } from "@/core/event";
import { GameEvent } from "./event-manifest";
import { colorBgVar, CK, ColorId, CV, CW, parseColorId } from "./game-item";

export type SpellKind = 'add' | 'sub' | 'com';
export type SpellResult = ColorId;

const colorOf = (id: number): ColorId => id as ColorId;

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
  left: ColorId,
  right: ColorId,
): SpellResult => {
  const a = left;
  const b = right;

  if (a > CV || b > CV) {
    if (a === CW || b === CW) return CW;
    if (a === CK || b === CK) return CK;
    return left;
  }

  return colorOf(addLUT[a][b]);
};

export const lookupSub = (
  left: ColorId,
  right: ColorId,
): SpellResult => {
  const a = left;
  const b = right;

  if (a > CV || b > CV) {
    if (a === b) return CK;
    if (a === CW || b === CW) return left;
    if (a === CK || b === CK) return right;
    return left;
  }

  return colorOf(subLUT[a][b]);
};

export const lookupSpell = (
  kind: SpellKind,
  left: ColorId,
  right: ColorId,
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

const setSpace3Background = (color: ColorId): void => {
  space3.style.background = colorBgVar[color];
};

const runSpell = (lookup: (left: ColorId, right: ColorId) => SpellResult): SpellResult | undefined => {
  const left = space1.dataset.c;
  const right = space2.dataset.c;

  if (!left || !right) return undefined;
  const leftId = parseColorId(left);
  const rightId = parseColorId(right);
  if (leftId === undefined || rightId === undefined) return undefined;

  const result = lookup(leftId, rightId);
  setSpace3Background(result);
  console.log(leftId, rightId, result);
  return result;
}

const spellAdd = () => runSpell(lookupAdd);

const spellSub = () => runSpell(lookupSub);

const spellCom = () => {

}


export const initSpellListener = (): void => {
  on(GameEvent.SPELL_ADD, spellAdd);
  on(GameEvent.SPELL_SUB, spellSub);
  on(GameEvent.SPELL_COM, spellCom);
};


