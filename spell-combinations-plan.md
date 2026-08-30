# Spell Combination Plan

This file is the canonical rule set for spell color logic.

Scope:

* Use only the 7 rainbow colors as craftable gem colors.
* Each rainbow color maps to one fruit.
* Water is a separate input type.
* Only Additive and Subtractive equations are supported.
* Complement is removed from the game.

Implementation note:

* Treat the equations below as explicit supported rules.
* Do not infer extra equations beyond this list.

## Additive

Addition is commutative.
Primary color A + secondary B that includes A = B, barring exceptions like blue + green = cyan.
Additive outcomes stay in pigment colors and should not resolve to white.

* red + yellow = orange
* red + blue = violet
* blue + yellow = green
* blue + green = cyan
* green + red = yellow
* green + orange = yellow
* red + orange = orange
* red + violet = violet
* yellow + orange = orange
* yellow + green = green
* cyan + yellow = green
* cyan + green = cyan
* cyan + orange = green
* blue + orange = violet
* blue + violet = violet
* violet + orange = red
* violet + yellow = red
* violet + green = cyan
* violet + cyan = blue
* blue + cyan = cyan -> primary color A + secondary B that includes A = B
* red + cyan = violet

## Subtractive

Subtractive mixing is directional (not commutative).
Interpret subtraction as A - B (left operand minus right operand).

* red - orange = yellow
* red - yellow = orange
* violet - blue = red
* violet - red = blue
* green - blue = yellow
* green - yellow = blue
* cyan - blue = green
* cyan - green = blue
* red - green - violet = black
* blue - green = black -> because blue is green - yellow

