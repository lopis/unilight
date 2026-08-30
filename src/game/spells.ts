/**
 * Additive:
 *
 * red + blue = magenta
 * blue + green = cyan
 * green + red = yellow
 *
 * yellow + blue = white
 * cyan + red = white
 * magenta + green = white
 *
 * What about:
 * yellow + red?
 * yellow + green?
 * magenta + red?
 * magenta + blue?
 * cyan + green?
 * cyan + blue?
 */

/**
 * Subtractive
 *
 * yellow + cyan = green
 * cyan + magenta = blue
 * magenta + yellow = red
 *
 * red + cyan = black
 * blue + yellow = black
 * green + magenta = black
 */
import { GameItem } from "./game-item";
import { on } from "@/core/event";
import { GameEvent } from "./event-manifest";

export type RainbowItem =
	| 'strawberry'
	| 'orange'
	| 'banana'
  | 'green'
	| 'water'
	| 'blueberry'
	| 'grape';

export type SpellKind = 'add' | 'sub' | 'com';

export const initSpellListener = (): void => {

};


