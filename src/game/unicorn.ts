import { drawEngine } from "@/core/draw-engine";
import { vec2, Vec2 } from "@/core/util/vec2";

export class Unicorn {
  pos: Vec2


  constructor(x: number, y: number) {
    this.pos = vec2(x, y);
  }

  draw(cellSize: number) {
    drawEngine.drawText('🦄', 40, this.pos.x * cellSize + cellSize / 2, this.pos.y * cellSize + cellSize * 0.75);
  }
}


