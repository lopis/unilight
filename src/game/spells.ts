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
  [7, 7, 1, 0, 6, 0, 5],
  [2, 7, 0, 0, 0, 1, 5],
  [7, 2, 7, 3, 2, 2, 2],
  [3, 7, 5, 7, 3, 3, 3],
  [4, 4, 4, 4, 7, 4, 4],
  [5, 5, 5, 7, 5, 7, 5],
  [5, 5, 0, 5, 5, 0, 7],
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

export const initSpellListener = (): void => {
  // intentionally empty; listener registration belongs elsewhere
};


