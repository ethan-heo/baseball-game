export default class App {
  constructor({ guessInput, baseball }) {
    this.guessInput = guessInput;
    this.baseball = baseball;
  }

  start({ digitNumber, saveFile }) {
    this.guessInput.dispatch('init', digitNumber);
    this.baseball.dispatch('init', { ...(saveFile || { problem: '', guesses: [] }), digitNumber });

    if (!saveFile) {
      this.baseball.dispatch('makeProblem', digitNumber);
    }
  }
}
