import GuessInput from './components/GuessInput';
import Baseball from './components/Baseball';
import App from './components/App';
import { getRandomInt } from './utils';
import { storage } from './module/storage';

function main() {
  const params = new URLSearchParams(location.search);
  const baseball = new Baseball({ el: document.querySelector('.result-container') });
  const guessInput = new GuessInput({ el: document.querySelector('#guess') });

  baseball
    .addAction('init', (context, value) => {
      context.state = value;
    })
    .addAction('makeProblem', (context, value) => {
      context.state.problem = new Array(value).fill(0).reduce((result) => {
        let randomNumber;

        while (true) {
          randomNumber = getRandomInt(0, value);

          if (!result.some((r) => r === randomNumber)) {
            break;
          }
        }

        result.push(randomNumber);

        return result;
      }, []);
    })
    .addAction('result', (context, value) => {
      const state = context.state;
      state.guesses.push(value);
      storage.save(state.id, state);
    })
    .addAction('done', () => {
      app.done();
    });

  guessInput
    .addAction('init', (context, value) => {
      context.state.digitNumber = value;
      context.el.addEventListener('keydown', (e) => {
        if (e.keyCode === 13) {
          try {
            const values = Array.from(e.target.value).map((v) => Number(v));

            if (values.length !== context.state.digitNumber) {
              throw new Error('자릿수가 맞지 않습니다.');
            }

            context.dispatch('guess', e.target.value).dispatch('clear');
          } catch (e) {
            context.dispatch('error', e);
          }
        }
      });
    })
    .addAction('clear', (context) => {
      context.el.value = '';
    })
    .addAction('guess', (_, value) => {
      baseball.dispatch('result', value);
    })
    .addAction('error', (_, error) => {
      alert(error.message);
    });

  const app = new App({
    id: params.get('id'),
    digitNumber: Number(params.get('digit')),
    saveFile: storage.load(params.get('id')),
    guessInput,
    baseball,
  });

  app.start();
}

window.addEventListener('DOMContentLoaded', main);
