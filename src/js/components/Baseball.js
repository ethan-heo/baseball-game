import Component from '../module/component';

function resultTemplate(guess, result) {
  return `
        <li class="list-group-item">
            <span class="guess">${guess}</span>
            <span class="badge result">${result}</span>
        </li>
    `;
}

class Baseball extends Component {
  constructor({ el, state = {} }) {
    super({ state });

    this.el = el;
  }

  render(state) {
    const { guesses, problem, digitNumber } = state;

    this.el.innerHTML = guesses
      .map((guess) => {
        let strike = 0;
        let ball = 0;

        guess.split('').forEach((guessNumber, idx) => {
          if (Number(guessNumber) === problem[idx]) {
            strike += 1;
          } else {
            ball += 1;
          }
        });

        let result = 'OUT';

        if (strike === digitNumber) {
          result = `${strike}S`;
          this.dispatch('done', null, false);
        } else if (ball === digitNumber) {
          result = `${ball}B`;
        } else {
          result = `${strike}S${ball}B`;
        }

        return resultTemplate(guess, result);
      })
      .join('');
  }

  getState() {
    return this.state;
  }
}

export default Baseball;
