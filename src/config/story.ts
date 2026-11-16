export const story = {
  title: 'КАЛЬДЕРА-9',
  subtitle: 'Ночная вахта',
  location: 'Диспетчерский узел · сектор глубинных скважин',
  operator: 'Илья Воронцов',
  dispatcher: 'Марта Клин',
  threats: ['Скоба', 'Люмен', 'Шов', 'Эхо'],
} as const;

export const nights = [
  { number: 1, title: 'Первый протокол', status: 'ДОСТУПНА', detail: 'Проверка узла · 00:00—06:00' },
  { number: 2, title: 'Гул в шахте', status: 'ЗАКРЫТА', detail: 'Откройте первую смену' },
  { number: 3, title: 'Ложный сигнал', status: 'ЗАКРЫТА', detail: 'Откройте вторую смену' },
  { number: 4, title: 'Точка разрыва', status: 'ЗАКРЫТА', detail: 'Откройте третью смену' },
  { number: 5, title: 'Последний журнал', status: 'ЗАКРЫТА', detail: 'Откройте четвёртую смену' },
] as const;
