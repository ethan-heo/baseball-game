import Counter from './components/Counter';

function main() {
  const container = document.querySelector('.container.digit-selector');

  if (!container) {
    console.error(`Not found container`);
    return;
  }

  const counter = new Counter({ el: container.querySelector('#digit-number'), state: 0 });

  counter.addAction('increase', (context, value) => {
    context.state += value;
  });
  counter.addAction('decrease', (context, value) => {
    context.state -= context.state === 0 ? 0 : value;
  });

  counter.render(0);

  container.addEventListener('click', (e) => {
    const target = e.target;

    if (target.closest('#minus-btn')) {
      counter.dispatch('decrease', 1);
    }

    if (target.closest('#plus-btn')) {
      counter.dispatch('increase', 1);
    }

    if (target.closest('#start-btn')) {
      target.closest('#start-btn').href = `./game.html?digit=${counter.state}`;
    }
  });
}

window.addEventListener('DOMContentLoaded', main);
