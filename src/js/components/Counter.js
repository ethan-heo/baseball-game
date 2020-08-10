import Component from '../module/component';

class Counter extends Component {
  constructor({ el, state }) {
    super({ state });

    if (!el) {
      throw Error('el가 없습니다.');
    }

    this.el = el;
  }

  render(state) {
    this.el.innerText = state;
  }
}

export default Counter;
