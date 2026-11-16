export const RESOURCE_LIMITS = {
  maxEnergy: 100,
  baseDrain: 0.06,
  doorDrain: 0.22,
  lightDrain: 0.16,
  cameraDrain: 0.12,
} as const;

export type ResourceFlags = {
  leftDoor: boolean;
  rightDoor: boolean;
  leftLight: boolean;
  rightLight: boolean;
  cameras: boolean;
};

export function calculateDrain(flags: ResourceFlags) {
  return RESOURCE_LIMITS.baseDrain
    + (flags.leftDoor || flags.rightDoor ? RESOURCE_LIMITS.doorDrain : 0)
    + (flags.leftLight || flags.rightLight ? RESOURCE_LIMITS.lightDrain : 0)
    + (flags.cameras ? RESOURCE_LIMITS.cameraDrain : 0);
}
