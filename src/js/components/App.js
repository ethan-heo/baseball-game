import { storage } from '../module/storage';

export default class App {
  constructor({ id, digitNumber, saveFile, guessInput, baseball }) {
    this.id = id;
    this.digitNumber = digitNumber;
    this.saveFile = saveFile;
    this.guessInput = guessInput;
    this.baseball = baseball;
  }

  start() {
    const { id, digitNumber, saveFile } = this;

    this.guessInput.dispatch('init', digitNumber);

    if (saveFile) {
      this.baseball.dispatch('init', {
        ...saveFile,
        digitNumber,
      });
    } else {
      this.baseball.dispatch('init', {
        ...{ id, problem: [], guesses: [], status: 'doing' },
        digitNumber,
      });
      this.baseball.dispatch('makeProblem', digitNumber);
      storage.save(id, this.baseball.getState());
    }

    if (saveFile.status === 'done') {
      this.done();
      return;
    }
  }

  done() {
    const { guessInput } = this;

    guessInput.el.type = 'text';
    guessInput.el.value = '정답을 맞추었습니다.';
    guessInput.el.disabled = true;

    storage.done(this.id);
  }
}
