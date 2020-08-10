class Component {
  constructor({ state }) {
    this.state = state;
    this.actions = {};
  }

  render() {}

  addAction(name, callback) {
    if (!this.actions[name]) {
      this.actions[name] = [];
    }

    this.actions[name].push(callback);
  }

  dispatch(name, value) {
    if (!this.actions[name]) {
      return;
    }

    const self = this;

    this.actions[name].forEach((callback) => {
      callback(self, value);
      this.render(this.state);
    });
  }
}

export default Component;
