import React from 'react';
import { useGameStore } from '../store/gameStore';

export default function ControlsPanel() {
  const { doors, lights, officeLight, blackout } = useGameStore((s) => ({
    doors: s.doors,
    lights: s.lights,
    officeLight: s.officeLight,
    blackout: s.blackout,
  }));
  const toggleDoor = useGameStore((s) => s.toggleDoor);
  const toggleLight = useGameStore((s) => s.toggleLight);
  const toggleOfficeLight = useGameStore((s) => s.toggleOfficeLight);

  const ctrl = (label: string, active: boolean, onClick: () => void) => (
    <button className={`btn compact ${active ? 'primary' : ''}`} onClick={onClick} disabled={blackout}>
      {label} {active ? 'ON' : 'off'}
    </button>
  );

  return (
    <div className="controls">
      <div className="col">
        <div className="kicker">Дверь левая</div>
        <div className="kicker" style={{ color: doors.left ? '#ffb3b3' : '#666' }}>
          {doors.left ? 'ЗАКРЫТА' : 'открыта'}
        </div>
        {ctrl('Дверь L', doors.left, () => toggleDoor('left'))}
      </div>
      <div className="col">
        <div className="kicker">Дверь правая</div>
        <div className="kicker" style={{ color: doors.right ? '#ffb3b3' : '#666' }}>
          {doors.right ? 'ЗАКРЫТА' : 'открыта'}
        </div>
        {ctrl('Дверь R', doors.right, () => toggleDoor('right'))}
      </div>
      <div className="col">
        <div className="kicker">Свет слева</div>
        {ctrl('Свет L', lights.left, () => toggleLight('left'))}
      </div>
      <div className="col">
        <div className="kicker">Свет справа</div>
        {ctrl('Свет R', lights.right, () => toggleLight('right'))}
      </div>
      <div className="col">
        <div className="kicker">Свет офиса</div>
        {ctrl('Свет', officeLight, toggleOfficeLight)}
      </div>
      {blackout && (
        <div style={{ marginLeft: '0.8rem', color: '#ff6b6b', fontWeight: 700, fontSize: '0.85rem', whiteSpace: 'nowrap' }}>
          Энергия исчерпана — двери и свет отключены
        </div>
      )}
    </div>
  );
}
