import { GameList } from './components/GameList';
import { storage } from './module/storage';

function main() {
  const gameList = new GameList({ el: document.querySelector('.row'), state: [] });

  gameList
    .addAction('init', (context, value) => {
      context.state = value;
      context.el.addEventListener('click', (e) => {
        const target = e.target;

        if (target.closest('.btn-delete-game')) {
          const id = target.dataset.id;

          context.dispatch('remove', id);
        }
      });
    })
    .addAction('remove', (context, id) => {
      context.state = context.state.filter((game) => game.id !== id);
      storage.delete(id);
    });

  gameList.dispatch('init', Object.values(storage.getAll()));
}

window.addEventListener('DOMContentLoaded', main);
