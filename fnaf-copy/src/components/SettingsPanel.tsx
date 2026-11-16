import React from 'react';

export default function SettingsPanel({ volume, brightness, onVolume, onBrightness, onBack }: {
  volume: number; brightness: number;
  onVolume: (v: number) => void; onBrightness: (b: number) => void; onBack: () => void;
}) {
  return (
    <div className="panel">
      <h1>Настройки</h1>
      <div className="setting">
        <label>Громкость</label>
        <input type="range" min="0" max="1" step="0.05" value={volume} onChange={(e) => onVolume(parseFloat(e.target.value))} />
        <span style={{ width: 30, fontSize: '0.85rem' }}>{Math.round(volume * 100)}%</span>
      </div>
      <div className="setting">
        <label>Яркость</label>
        <input type="range" min="0.3" max="1.5" step="0.05" value={brightness} onChange={(e) => onBrightness(parseFloat(e.target.value))} />
        <span style={{ width: 40, fontSize: '0.85rem' }}>{Math.round(brightness * 100)}%</span>
      </div>
      <button className="btn primary" onClick={onBack}>Назад</button>
    </div>
  );
}
