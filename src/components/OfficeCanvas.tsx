import { useEffect, useRef } from 'react';
import { FixedLoop } from '../game/fixedLoop';

type OfficeCanvasProps = {
  leftLight: boolean;
  rightLight: boolean;
  leftDoor: boolean;
  rightDoor: boolean;
};

export function OfficeCanvas({ leftLight, rightLight, leftDoor, rightDoor }: OfficeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    let time = 0;
    const draw = (delta: number) => {
      time += delta;
      const width = canvas.width;
      const height = canvas.height;
      const flicker = 0.92 + Math.sin(time * 19) * 0.025;
      context.fillStyle = '#080b0e';
      context.fillRect(0, 0, width, height);
      const glow = context.createRadialGradient(width * 0.5, height * 0.51, 20, width * 0.5, height * 0.51, width * 0.7);
      glow.addColorStop(0, `rgba(131, 145, 133, ${0.18 * flicker})`);
      glow.addColorStop(1, 'rgba(10, 14, 16, 0)');
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);
      context.fillStyle = leftDoor ? '#111817' : '#1a2121';
      context.fillRect(width * 0.08, height * 0.12, width * 0.84, height * 0.58);
      context.fillStyle = leftDoor ? '#56635c' : '#101615';
      context.fillRect(width * 0.08, height * 0.2, width * 0.06, height * 0.42);
      context.fillStyle = rightDoor ? '#56635c' : '#101615';
      context.fillRect(width * 0.86, height * 0.2, width * 0.06, height * 0.42);
      context.fillStyle = '#0c1112';
      context.fillRect(width * 0.13, height * 0.18, width * 0.74, height * 0.45);
      if (leftLight) {
        context.fillStyle = `rgba(174, 208, 157, ${0.14 * flicker})`;
        context.fillRect(width * 0.08, height * 0.2, width * 0.24, height * 0.42);
      }
      if (rightLight) {
        context.fillStyle = `rgba(174, 208, 157, ${0.14 * flicker})`;
        context.fillRect(width * 0.68, height * 0.2, width * 0.24, height * 0.42);
      }
      context.strokeStyle = '#4a5550';
      context.lineWidth = 3;
      context.strokeRect(width * 0.13, height * 0.18, width * 0.74, height * 0.45);
      context.fillStyle = '#222d2b';
      context.fillRect(width * 0.18, height * 0.68, width * 0.64, height * 0.06);
      context.fillStyle = '#0a0e10';
      context.beginPath();
      context.moveTo(width * 0.27, height);
      context.lineTo(width * 0.35, height * 0.72);
      context.lineTo(width * 0.65, height * 0.72);
      context.lineTo(width * 0.73, height);
      context.fill();
      context.fillStyle = `rgba(199, 218, 184, ${0.38 * flicker})`;
      context.fillRect(width * 0.43, height * 0.33, width * 0.14, 3);
      context.fillStyle = 'rgba(255,255,255,0.035)';
      for (let y = 0; y < height; y += 5) context.fillRect(0, y, width, 1);
    };
    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio, 2);
      canvas.width = canvas.clientWidth * ratio;
      canvas.height = canvas.clientHeight * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);
    const loop = new FixedLoop((delta) => draw(delta));
    const stop = loop.start();
    return () => { stop(); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas className="office-canvas" ref={canvasRef} aria-label="Процедурный вид диспетчерского узла" />;
}
