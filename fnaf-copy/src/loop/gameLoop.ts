import { useGameStore } from '../store/gameStore';

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
  if (s.gameTime >= 1) {
    useGameStore.setState({ screen: 'nightcomplete' });
  }
}
