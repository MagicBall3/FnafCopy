import { useGameStore } from '../store/gameStore';
import type { GameState } from '../store/gameStore';
import { POWER } from '../config';

const FIXED_DT = 1 / 60;
let running = false;
let last = 0;
let raf = 0;

export function startGameLoop() {
  if (running) return;
  running = true;
  last = performance.now();
  loop();
}

export function stopGameLoop() {
  running = false;
  cancelAnimationFrame(raf);
}

function loop(now = performance.now()) {
  if (!running) return;
  const dt = Math.min((now - last) / 1000, 0.1);
  last = now;
  step(dt);
  raf = requestAnimationFrame(loop);
}

function step(dt: number) {
  const s = useGameStore.getState();
  if (s.screen !== 'office' || s.isPaused) return;
  s.advanceTime(dt / s.nightConfig.durationSeconds);

  if (s.power > 0 && !s.blackout) {
    const drain =
      POWER.basePerSecond +
      (s.doors.left ? POWER.doorPerSecond : 0) +
      (s.doors.right ? POWER.doorPerSecond : 0) +
      (s.lights.left ? POWER.lightPerSecond : 0) +
      (s.lights.right ? POWER.lightPerSecond : 0) +
      (s.officeLight ? POWER.officeLightPerSecond : 0);
    const next = Math.max(0, s.power - drain * dt);
    const patch: Partial<GameState> = { power: next };
    if (next === 0) {
      patch.blackout = true;
      patch.doors = { left: false, right: false };
      patch.lights = { left: false, right: false };
      patch.officeLight = false;
    }
    useGameStore.setState(patch);
  }

  if (s.gameTime >= 1) {
    useGameStore.setState({ screen: 'nightcomplete' });
  }
}
