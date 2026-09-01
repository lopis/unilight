let interactionLockCount = 0;

export const lockInteractions = (): void => {
  interactionLockCount++;
};

export const unlockInteractions = (): void => {
  interactionLockCount = Math.max(0, interactionLockCount - 1);
};

export const isInteractionLocked = (): boolean => interactionLockCount > 0;

export const resetInteractionLock = (): void => {
  interactionLockCount = 0;
};
