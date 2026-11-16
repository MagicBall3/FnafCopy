import React from 'react';

export default function NightComplete({ onNext, onMenu }: { onNext: () => void; onMenu: () => void }) {
  return (
    <div className="panel">
      <h1 style={{ color: '#6ee7b7' }}>Ночь пройдена</h1>
      <div style={{ textAlign: 'center', marginBottom: 24, color: '#9aa3ad' }}>
        Утро наступило. Вы в безопасности.
      </div>
      <button className="btn primary" onClick={onNext}>Следующая ночь</button>
      <button className="btn" onClick={onMenu}>В меню</button>
    </div>
  );
}
