import React from 'react';

export default function GameOver({ onRestart, onMenu }: { onRestart: () => void; onMenu: () => void }) {
  return (
    <div className="panel">
      <h1 style={{ color: '#ff6b6b' }}>Смена окончена</h1>
      <div style={{ textAlign: 'center', marginBottom: 24, color: '#9aa3ad' }}>
        Вы не пережили ночь.
      </div>
      <button className="btn primary" onClick={onRestart}>Попробовать ещё раз</button>
      <button className="btn" onClick={onMenu}>Вернуться в меню</button>
    </div>
  );
}
