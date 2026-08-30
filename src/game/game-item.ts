import { vec2, Vec2 } from "@/core/util/vec2";

export type GameItem =
  | 'strawberry'
  | 'orange'
  | 'banana'
  | 'kiwi'
  | 'water'
  | 'blueberry'
  | 'grape'
  | 'hand'
  | 'hedge'
;

export const fruits: GameItem[] = [
  'strawberry',
  'orange',
  'banana',
  'kiwi',
  'water',
  'blueberry',
  'grape',
  'hedge',
];

export interface GridItem {
  s: GameItem;
  pos: Vec2,
  id: string,
  taken?: boolean,
}

export const gameItem = (x: number, y: number, s: GameItem): GridItem => ({ pos: vec2(x, y), s, id: `i-${x}${y}` });
