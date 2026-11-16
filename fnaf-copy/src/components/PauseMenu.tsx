import React from 'react';
import { useGameStore } from '../store/gameStore';

export default function PauseMenu() {
  const setPaused = useGameStore((s) => s.setPaused);
  const setScreen = useGameStore((s) => s.setScreen);
  const restartNight = useGameStore((s) => s.restartNight);

  return (
    <div className="panel">
      <h1>Пауза</h1>
      <button className="btn primary" onClick={() => setPaused(false)}>Продолжить смену</button>
      <button className="btn" onClick={restartNight}>Перезапустить ночь</button>
      <button className="btn" onClick={() => setScreen('settings')}>Настройки</button>
      <button className="btn" onClick={() => { setPaused(false); setScreen('menu'); }}>Выйти в меню</button>
    </div>
  );
}
