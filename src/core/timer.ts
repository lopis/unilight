type TimeEventHandler = {
  callback: (() => void)
  time: number
  timeLeft: number
  repeat: number
}

let timeEvents: TimeEventHandler[] = [];

export function addTimeEvent (callback: () => void, time: number, repeat = 0, delay = 0) {
  timeEvents.push({callback, time, timeLeft: time + delay, repeat});
}

export function clearTimers() {
  timeEvents = [];
}

/**
 * Updates the time events, checking if any should be executed.
 * @param delta The time in milliseconds since the last update.
 */
export function updateTimeEvents(delta: number) {
  for (let i = timeEvents.length - 1; i >= 0; i--) {
    const timeEvent = timeEvents[i];
    if (!timeEvent) {
      return;
    }
    timeEvent.timeLeft -= delta;
    if (timeEvent.timeLeft <= 0) {
      const shouldRemove = timeEvent.repeat-- <= 0;
      timeEvent.callback();

      const idx = timeEvents.indexOf(timeEvent);
      if (idx === -1) {
        continue;
      }

      if (shouldRemove) {
        timeEvents.splice(idx, 1);
        continue;
      }

      timeEvent.timeLeft = timeEvent.time;
    }
  }
}
