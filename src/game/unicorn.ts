import { vec2, Vec2 } from "@/core/util/vec2";

export class Unicorn {
  pos: Vec2
  private startPos: Vec2
  private targetPos: Vec2
  private moveTime = 0
  readonly moveDuration = 300
  angle = 0

  constructor(x: number, y: number) {
    this.pos = vec2(x, y);
    this.startPos = vec2(x, y);
    this.targetPos = vec2(x, y);
  }

  moveTo(x: number, y: number) {
    this.angle = Math.atan2(y - this.pos.y, x - this.pos.x);
    this.startPos = { ...this.pos };
    this.targetPos = vec2(x, y);
    this.moveTime = 0;
  }

  update(delta: number) {
    if (this.moveTime < this.moveDuration) {
      this.moveTime = Math.min(this.moveTime + delta, this.moveDuration);
      const t = this.moveTime / this.moveDuration;
      const ease = 1 - (1 - t) * (1 - t); // ease-out quad
      this.pos = vec2(
        this.startPos.x + (this.targetPos.x - this.startPos.x) * ease,
        this.startPos.y + (this.targetPos.y - this.startPos.y) * ease,
      );
    }
  }
}


