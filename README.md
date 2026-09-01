# Unilight Dash

## Game Rules

### Catching Items

* Tap the grid to move the Unicorn
* The Unicorn dashes to the tapped position and catches items on the path
* Each gem that is caught is added directly to inventory
* Gems never appear in orbit
* Each fruit that is caught is staged in the Unicorn orbit
* Fruits stay in orbit until there are 3 staged of the same kind
* Every 3 staged fruits of the same kind convert into 1 inventory fruit

### Spells

* Fruits and Gems can be used in spells
* There are 3 spells: ADD, SUB, COM
* ADD adds colors together
* SUB subtracts colors
* COM is TBD
* Placing an item into a spell space deducts it from inventory immediately
* Replacing an item in a spell space returns the previous item to inventory
* Pressing a spell button activates the spell
* The result is always a gem
* During spell animation, all interactions are locked:
* No Unicorn movement
* No inventory interaction
* No spell casting
* After animation resolves, the resulting gem is added to inventory

### Winning

* Win by obtaining the 7 rainbow gems: R, O, Y, G, C, B, V
* Black and white gems do not count toward winning
