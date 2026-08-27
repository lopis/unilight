import { vec2, Vec2 } from "@/core/util/vec2";

export type Fruit = '🍓' | '🌸' | '🌽' | '🥝' | '💧' | '🫐' | '🍇';

export const fruits: Fruit[] = ['🍓', '🌸', '🌽', '🥝', '💧', '🫐', '🍇'];

export interface GameItem {
  s: Fruit;
  pos: Vec2,
  id: string,
  taken?: boolean,
}

export const gameItem = (x: number, y: number, s: Fruit): GameItem => ({ pos: vec2(x, y), s, id: `i-${x}${y}` });
