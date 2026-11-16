import { create } from 'zustand';
import { calculateDrain, RESOURCE_LIMITS } from '../game/resources';

type Screen = 'menu' | 'briefing' | 'office';

type GameState = {
  screen: Screen;
  selectedNight: number;
  elapsed: number;
  energy: number;
  leftDoor: boolean;
  rightDoor: boolean;
  leftLight: boolean;
  rightLight: boolean;
  cameras: boolean;
  isPaused: boolean;
  setScreen: (screen: Screen) => void;
  selectNight: (night: number) => void;
  startNight: () => void;
  tick: (delta: number) => void;
  togglePause: () => void;
  toggleDevice: (device: keyof Omit<GameState, 'toggleDevice' | 'tick' | 'startNight' | 'setScreen' | 'selectNight' | 'togglePause' | 'screen' | 'selectedNight' | 'elapsed' | 'energy' | 'isPaused'>) => void;
};

export const useGameStore = create<GameState>((set) => ({
  screen: 'menu', selectedNight: 1, elapsed: 0, energy: RESOURCE_LIMITS.maxEnergy,
  leftDoor: false, rightDoor: false, leftLight: false, rightLight: false, cameras: false, isPaused: false,
  setScreen: (screen) => set({ screen }),
  selectNight: (selectedNight) => set({ selectedNight }),
  startNight: () => set({ screen: 'office', elapsed: 0, energy: RESOURCE_LIMITS.maxEnergy, leftDoor: false, rightDoor: false, leftLight: false, rightLight: false, cameras: false, isPaused: false }),
  tick: (delta) => set((state) => {
    if (state.isPaused || state.energy <= 0) return { energy: 0, leftDoor: false, rightDoor: false, leftLight: false, rightLight: false, cameras: false };
    const energy = Math.max(0, state.energy - calculateDrain(state) * delta);
    return { elapsed: state.elapsed + delta, energy, ...(energy === 0 ? { leftDoor: false, rightDoor: false, leftLight: false, rightLight: false, cameras: false } : {}) };
  }),
  togglePause: () => set((state) => ({ isPaused: !state.isPaused })),
  toggleDevice: (device) => set((state) => state.energy > 0 ? { [device]: !state[device] } : {}),
}));
