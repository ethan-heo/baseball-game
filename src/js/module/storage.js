const localStorage = window.localStorage;

export const storage = {
  save: (id, gameInfo) => {
    const games = JSON.parse(localStorage.getItem('games')) || {};

    games[id] = gameInfo;

    localStorage.removeItem('games');
    localStorage.setItem('games', JSON.stringify(games));
  },
  load: (id) => {
    const games = JSON.parse(localStorage.getItem('games')) || {};

    return games[id];
  },
  done: (id) => {
    const games = JSON.parse(localStorage.getItem('games')) || {};

    localStorage.removeItem('games');

    games[id].status = 'done';

    localStorage.setItem('games', JSON.stringify(games));
  },
  delete: (id) => {
    const games = JSON.parse(localStorage.getItem('games')) || {};

    localStorage.removeItem('games');

    delete games[id];

    localStorage.setItem('games', JSON.stringify(games));
  },
  getAll: () => {
    return JSON.parse(localStorage.getItem('games')) || {};
  },
  getNextGameId: () => {
    return Object.keys(JSON.parse(localStorage.getItem('games')) || {}).length + 1;
  },
};
