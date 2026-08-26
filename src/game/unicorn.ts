import { easeOut } from "@/core/util/util";
import { vec2, Vec2 } from "@/core/util/vec2";

export class Unicorn {
  pos: Vec2
  private startPos: Vec2
  private targetPos: Vec2
  private moveTime = 0
  readonly moveDuration = 200
  prevT = 0;
  t = 0;
  moving = false
  angle = 0

  constructor() {
    this.pos = vec2(0, 0);
    this.startPos = vec2(0, 0);
    this.targetPos = vec2(0, 0);
  }

  moveTo(x: number, y: number) {
    this.angle = Math.atan2(y - this.pos.y, x - this.pos.x);
    this.startPos = { ...this.pos };
    this.targetPos = vec2(x, y);
    this.moveTime = 0;
  }

  update(delta: number) {
    if (this.moveTime < this.moveDuration) {
      this.moving = true;
      this.moveTime = Math.min(this.moveTime + delta, this.moveDuration);
      const t = this.moveTime / this.moveDuration;
      this.prevT = this.t;
      this.t = easeOut(t); // ease-out quad
      this.pos = vec2(
        this.startPos.x + (this.targetPos.x - this.startPos.x) * this.t,
        this.startPos.y + (this.targetPos.y - this.startPos.y) * this.t,
      );
    } else {
      this.moving = false;
    }
  }
}

export const unicorn = new Unicorn();
