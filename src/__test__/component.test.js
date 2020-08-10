import Component from '../js/module/component';

test('component test', () => {
  const component = new Component({ state: 0 });

  component.addAction('increase', (context) => {
    context.state += 1;
  });
  component.addAction('decrease', (context) => {
    context.state -= 1;
  });

  component.dispatch('increase');
  component.dispatch('increase');

  expect(component.state).toBe(2);

  component.dispatch('decrease');

  expect(component.state).toBe(1);
});
