import { addTimeEvent } from '@/core/timer';
import { Vec2 } from '@/core/util/vec2';

const HIGHLIGHT_DURATION = 1000;

export function spawnHighlight(cell: Vec2, cellSize: number) {
  const $highlight = document.createElement('div');
  $highlight.className = 'highlight';
  $highlight.style.left = (cellSize * cell.x) + 'px';
  $highlight.style.top = (cellSize * cell.y) + 'px';
  $highlight.style.width = cellSize + 'px';
  $highlight.style.height = cellSize + 'px';
  gameGrid.insertBefore($highlight, gameGrid.firstChild);
  addTimeEvent(() => $highlight.remove(), 0, 0, HIGHLIGHT_DURATION);
}
