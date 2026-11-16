import { create } from 'zustand';
import type { GameScreen, NightId, Side } from '../types';
import { NIGHTS, INITIAL_POWER, type NightConfig } from '../config';

export interface GameState {
  screen: GameScreen;
  night: NightId;
  gameTime: number;
  power: number;
  maxPower: number;
  powerDrainRate: number;
  blackout: boolean;
  doors: { left: boolean; right: boolean };
  lights: { left: boolean; right: boolean };
  officeLight: boolean;
  isPaused: boolean;
  volume: number;
  brightness: number;
  nightConfig: NightConfig;
  gameOverReason: string | null;
  startNight: (id: NightId) => void;
  toggleDoor: (side: Side) => void;
  setDoor: (side: Side, closed: boolean) => void;
  toggleLight: (side: Side) => void;
  setLight: (side: Side, on: boolean) => void;
  toggleOfficeLight: () => void;
  setPaused: (paused: boolean) => void;
  setScreen: (screen: GameScreen) => void;
  setVolume: (volume: number) => void;
  setBrightness: (brightness: number) => void;
  advanceTime: (fraction: number) => void;
  gameOver: (reason: string) => void;
  restartNight: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  screen: 'menu',
  night: 1,
  gameTime: 0,
  power: INITIAL_POWER,
  maxPower: INITIAL_POWER,
  powerDrainRate: 0,
  blackout: false,
  doors: { left: false, right: false },
  lights: { left: false, right: false },
  officeLight: true,
  isPaused: false,
  volume: 0.7,
  brightness: 1.0,
  nightConfig: NIGHTS[0],
  gameOverReason: null,

  startNight: (id) => {
    const cfg = NIGHTS.find((n) => n.id === id)!;
    set({
      screen: 'office',
      night: id,
      gameTime: 0,
      power: INITIAL_POWER,
      maxPower: cfg.startingPower,
      powerDrainRate: 0,
      doors: { left: false, right: false },
      lights: { left: false, right: false },
      officeLight: true,
      isPaused: false,
      nightConfig: cfg,
      gameOverReason: null,
    });
  },

  toggleDoor: (side) => {
    if (get().blackout) return;
    set((s) => ({ doors: { ...s.doors, [side]: !s.doors[side] } }));
  },

  setDoor: (side, closed) => {
    if (get().blackout) return;
    set((s) => ({ doors: { ...s.doors, [side]: closed } }));
  },

  toggleLight: (side) => {
    if (get().blackout) return;
    set((s) => ({ lights: { ...s.lights, [side]: !s.lights[side] } }));
  },

  setLight: (side, on) => {
    if (get().blackout) return;
    set((s) => ({ lights: { ...s.lights, [side]: on } }));
  },

  toggleOfficeLight: () => {
    if (get().blackout) return;
    set((s) => ({ officeLight: !s.officeLight }));
  },

  setPaused: (paused) =>
    set({ isPaused: paused, screen: paused ? 'pause' : 'office' }),

  setScreen: (screen) => set({ screen }),

  setVolume: (volume) => set({ volume }),

  setBrightness: (brightness) => set({ brightness }),

  advanceTime: (fraction) =>
    set((s) => ({ gameTime: Math.min(1, s.gameTime + fraction) })),

  gameOver: (reason) => set({ screen: 'gameover', gameOverReason: reason }),

  restartNight: () => {
    const { night } = get();
    get().startNight(night);
  },
}));
