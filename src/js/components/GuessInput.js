import Component from '../module/component';

class GuessInput extends Component {
  constructor({ el, state = {} }) {
    super({ state });

    this.el = el;
  }
}

export default GuessInput;
