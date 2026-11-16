import React from 'react';
import { useGameStore } from './store/gameStore';
import MainMenu from './components/MainMenu';
import Office from './components/Office';
import HUD from './components/HUD';
import ControlsPanel from './components/ControlsPanel';
import PauseMenu from './components/PauseMenu';
import SettingsPanel from './components/SettingsPanel';
import GameOver from './components/GameOver';
import NightComplete from './components/NightComplete';

export default function App() {
  const { screen, isPaused, volume, brightness } = useGameStore((s) => ({
    screen: s.screen,
    isPaused: s.isPaused,
    volume: s.volume,
    brightness: s.brightness,
  }));
  const setScreen = useGameStore((s) => s.setScreen);
  const setVolume = useGameStore((s) => s.setVolume);
  const setBrightness = useGameStore((s) => s.setBrightness);

  return (
    <div className="app">
      {screen === 'menu' && <MainMenu />}
      {screen === 'office' && (
        <>
          <Office />
          <HUD />
          <ControlsPanel />
          {isPaused && <PauseMenu />}
        </>
      )}
      {screen === 'pause' && <PauseMenu />}
      {screen === 'settings' && (
        <SettingsPanel
          volume={volume}
          brightness={brightness}
          onVolume={setVolume}
          onBrightness={setBrightness}
          onBack={() => setScreen('office')}
        />
      )}
      {screen === 'gameover' && (
        <GameOver
          onRestart={() => useGameStore.getState().restartNight()}
          onMenu={() => setScreen('menu')}
        />
      )}
      {screen === 'nightcomplete' && (
        <NightComplete onNext={() => {}} onMenu={() => setScreen('menu')} />
      )}
    </div>
  );
}
