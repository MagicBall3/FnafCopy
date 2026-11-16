import React from 'react';
import { useGameStore } from '../store/gameStore';

export default function MainMenu() {
  const startNight = useGameStore((s) => s.startNight);
  const setScreen = useGameStore((s) => s.setScreen);
  const setVolume = useGameStore((s) => s.setVolume);

  return (
    <div className="panel">
      <h1>Кальдера-9</h1>
      <div style={{ textAlign: 'center', color: '#9aa3ad', marginBottom: 24 }}>
        Ночная смена &middot; Контрольная комната &middot; Версия 0.1.0
      </div>
      <button className="btn primary" onClick={() => startNight(1)}>
        Начать смену — Ночь 1
      </button>
      <button className="btn" onClick={() => setScreen('settings')}>
        Настройки
      </button>
      <button className="btn" onClick={() => setVolume(0)}>
        Звук: выкл.
      </button>
    </div>
  );
}
