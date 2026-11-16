import React from 'react';
import { useGameStore } from '../store/gameStore';

function fmtTime(fraction: number) {
  const totalMinutes = Math.floor(fraction * 360);
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

export default function HUD() {
  const { night, gameTime, power, doors, lights, officeLight, nightConfig } = useGameStore((s) => ({
    night: s.night,
    gameTime: s.gameTime,
    power: s.power,
    doors: s.doors,
    lights: s.lights,
    officeLight: s.officeLight,
    nightConfig: s.nightConfig,
  }));

  const pct = Math.round(Math.max(0, Math.min(100, power)));

  return (
    <div className="hud">
      <div className="chip">
        <span>{nightConfig.name}</span>
        <span className="value">{fmtTime(gameTime)}</span>
      </div>
      <div className="chip">
        <span>Энергия</span>
        <div className="powerbar">
          <div className="powerfill" style={{ width: `${pct}%`, background: pct > 25 ? '#6ee7b7' : pct > 10 ? '#fbbf24' : '#ff6b6b' }} />
        </div>
        <span className="value">{pct}%</span>
      </div>
      <div className="chip">
        <span>Двери</span>
        <span className="value">{`L ${doors.left ? 'ЗАКР' : 'откр'}  R ${doors.right ? 'ЗАКР' : 'откр'}`}</span>
      </div>
      <div className="chip">
        <span>Свет</span>
        <span className="value">{`${officeLight ? 'вкл' : 'выкл'}  L ${lights.left ? 'вкл' : 'выкл'}  R ${lights.right ? 'вкл' : 'выкл'}`}</span>
      </div>
    </div>
  );
}
