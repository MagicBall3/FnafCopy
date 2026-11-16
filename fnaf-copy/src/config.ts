import type { NightId } from './types';

export type AnimId = 'ash' | 'siren' | 'glitch' | 'warden';

export interface Location {
  id: string;
  name: string;
}

export interface Animatronic {
  id: AnimId;
  name: string;
  color: string;
  route: string[];
  weakness: string;
}

export interface NightConfig {
  id: NightId;
  name: string;
  durationSeconds: number;
  aiLevels: Record<AnimId, number>;
  startingPower: number;
}

export const LOCATIONS: Location[] = [
  { id: 'office', name: 'Офис' },
  { id: 'corridor', name: 'Главный коридор' },
  { id: 'server', name: 'Серверная' },
  { id: 'cafeteria', name: 'Кафетерий' },
  { id: 'storage', name: 'Подсобка' },
  { id: 'cold', name: 'Холодильная камера' },
  { id: 'elevator', name: 'Лифтовый щахт' },
  { id: 'ventA', name: 'Вентиляция A' },
  { id: 'ventB', name: 'Вентиляция B' },
];

export const ANIMATRONICS: Animatronic[] = [
  {
    id: 'ash',
    name: 'Пепел',
    color: '#88c1d0',
    route: ['cold', 'storage', 'ventB', 'office'],
    weakness: 'Яркий свет и закрытая вентиляция',
  },
  {
    id: 'siren',
    name: 'Сирена',
    color: '#e8a0d4',
    route: ['cafeteria', 'corridor', 'office'],
    weakness: 'Закрытая дверь не даёт пройти',
  },
  {
    id: 'glitch',
    name: 'Глюк',
    color: '#a8ffb0',
    route: ['server', 'elevator', 'office'],
    weakness: 'Выключение камеры и двери',
  },
  {
    id: 'warden',
    name: 'Хранитель',
    color: '#ff9966',
    route: ['corridor', 'server', 'cafeteria', 'cold', 'office'],
    weakness: 'Нет специфической слабости',
  },
];

const aiBase: Record<AnimId, number> = { ash: 4, siren: 6, glitch: 5, warden: 8 };

export const NIGHTS: NightConfig[] = [
  {
    id: 1,
    name: 'Первая ночь',
    durationSeconds: 360,
    aiLevels: { ...aiBase },
    startingPower: 100,
  },
  {
    id: 2,
    name: 'Вторая ночь',
    durationSeconds: 360,
    aiLevels: { ash: 8, siren: 10, glitch: 9, warden: 12 },
    startingPower: 100,
  },
  {
    id: 3,
    name: 'Третья ночь',
    durationSeconds: 360,
    aiLevels: { ash: 11, siren: 13, glitch: 12, warden: 15 },
    startingPower: 100,
  },
  {
    id: 4,
    name: 'Четвертая ночь',
    durationSeconds: 300,
    aiLevels: { ash: 14, siren: 16, glitch: 15, warden: 18 },
    startingPower: 90,
  },
  {
    id: 5,
    name: 'Пятая ночь',
    durationSeconds: 300,
    aiLevels: { ash: 17, siren: 19, glitch: 18, warden: 20 },
    startingPower: 80,
  },
  {
    id: 6,
    name: 'Шестая ночь (настройка)',
    durationSeconds: 300,
    aiLevels: { ash: 20, siren: 20, glitch: 20, warden: 20 },
    startingPower: 70,
  },
];

export const INITIAL_POWER = 100;
