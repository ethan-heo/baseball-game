class Component {
  constructor({ state }) {
    this.state = state;
    this.actions = {};

    Object.defineProperty(this, 'state', {
      enumerable: false,
    });
  }

  render() {}

  addAction(name, callback) {
    if (!this.actions[name]) {
      this.actions[name] = [];
    }

    this.actions[name].push(callback);
    return this;
  }

  dispatch(name, value, isRender = true) {
    if (!this.actions[name]) {
      return;
    }

    const self = this;

    this.actions[name].forEach((callback) => {
      callback(self, value);
      isRender && self.render(self.state);
    });
    return this;
  }
}

export default Component;
