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

    if (target.closest('.btn-link.minus')) {
      counter.dispatch('decrease', 1);
    }

    if (target.closest('.btn-link.plus')) {
      counter.dispatch('increase', 1);
    }
  });
}

window.addEventListener('DOMContentLoaded', main);
