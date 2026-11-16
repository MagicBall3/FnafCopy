export type FixedLoopListener = (delta: number) => void;

export class FixedLoop {
  private accumulator = 0;
  private previous = performance.now();
  private frame = 0;
  private readonly step = 1 / 30;

  constructor(private readonly listener: FixedLoopListener) {}

  start() {
    this.previous = performance.now();
    this.frame = requestAnimationFrame(this.tick);
    return () => cancelAnimationFrame(this.frame);
  }

  private tick = (now: number) => {
    const delta = Math.min((now - this.previous) / 1000, 0.1);
    this.previous = now;
    this.accumulator += delta;
    while (this.accumulator >= this.step) {
      this.listener(this.step);
      this.accumulator -= this.step;
    }
    this.frame = requestAnimationFrame(this.tick);
  };
}
