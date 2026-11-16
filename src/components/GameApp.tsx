import { useEffect, useState } from 'react';
import { nights, story } from '../config/story';
import { useGameStore } from '../state/useGameStore';
import { OfficeCanvas } from './OfficeCanvas';

function requestMobileMode() {
  const root = document.documentElement as HTMLElement & { requestFullscreen?: () => Promise<void> };
  root.requestFullscreen?.().catch(() => undefined);
  const orientation = screen.orientation as ScreenOrientation & { lock?: (mode: string) => Promise<void> };
  orientation.lock?.('landscape').catch(() => undefined);
}

export function GameApp() {
  const { screen, selectedNight, setScreen, selectNight, startNight } = useGameStore();
  const [mobileHint, setMobileHint] = useState(false);

  useEffect(() => {
    const isMobile = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 700;
    if (isMobile && screen === 'menu') setMobileHint(true);
  }, [screen]);

  if (screen === 'office') {
    return <main className="game-shell"><OfficeCanvas /><div className="office-overlay"><span>СМЕНА {selectedNight} · 00:00</span><button className="pause-button" onClick={() => useGameStore.getState().togglePause()}>ПАУЗА</button></div><div className="touch-controls"><button>ЛЕВЫЙ СВЕТ</button><button>КАМЕРЫ</button><button>ПРАВЫЙ СВЕТ</button></div></main>;
  }

  return <main className="menu-shell">
    <section className="menu-card">
      <p className="eyebrow">ДИСПЕТЧЕРСКИЙ УЗЕЛ · 1998</p>
      <h1>{story.title}</h1><h2>{story.subtitle}</h2>
      {screen === 'menu' && <>
        <p className="logline">Смена начинается после полуночи.<br />Слушай. Смотри. Не отвечай шуму.</p>
        <button className="primary-button" onClick={() => { requestMobileMode(); setScreen('briefing'); }}>НАЧАТЬ ВАХТУ</button>
        <p className="microcopy">ИГРА РАССЧИТАНА НА АЛЬБОМНЫЙ РЕЖИМ</p>
      </>}
      {screen === 'briefing' && <>
        <div className="briefing"><span>СООБЩЕНИЕ ОТ: {story.dispatcher}</span><p>«Илья, узел давно не обслуживали. Проверь питание, не доверяй тишине и дотяни до шести утра.»</p></div>
        <h3>ВЫБОР СМЕНЫ</h3><div className="night-grid">{nights.map((night) => <button className={`night-card ${night.number === selectedNight ? 'selected' : ''} ${night.status === 'ЗАКРЫТА' ? 'locked' : ''}`} key={night.number} disabled={night.status === 'ЗАКРЫТА'} onClick={() => selectNight(night.number)}><b>0{night.number}</b><span>{night.title}</span><small>{night.detail}</small></button>)}</div>
        <div className="actions"><button className="secondary-button" onClick={() => setScreen('menu')}>НАЗАД</button><button className="primary-button" onClick={startNight}>ВЫЙТИ В УЗЕЛ</button></div>
      </>}
    </section>
    {mobileHint && <div className="orientation-hint" role="dialog"><div><b>ПОВЕРНИТЕ УСТРОЙСТВО</b><p>Для лучшего обзора разверните телефон горизонтально. Полный экран включится после нажатия.</p><button className="primary-button" onClick={() => { requestMobileMode(); setMobileHint(false); }}>ПОНЯТНО</button></div></div>}
  </main>;
}
