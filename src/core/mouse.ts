import { vec2, Vec2 } from "./util/vec2";

interface MouseController {
  pos: Vec2,
  init: () => void,
}

interface Surface {
  pos: Vec2,
  size: Vec2,
  events: MouseEvent[],
}

export const Mouse: MouseController = {
  pos: vec2(-1, -1),

  init() {
    document.body.addEventListener('mousemove', (event: MouseEvent) => {
      this.pos = vec2(event.clientX, event.clientY)
    });
  }
}
