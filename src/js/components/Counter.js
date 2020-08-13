import Component from '../module/component';

class Counter extends Component {
  constructor({ el, state }) {
    super({ state });

    this.el = el;
  }

  render(state) {
    this.el.innerText = state;
  }
}

export default Counter;
