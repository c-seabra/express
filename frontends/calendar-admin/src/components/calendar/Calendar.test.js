import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import Calendar from './Calendar';

describe('Calendar', () => {
  test("doesn't render without props", () => {
    const renderer = new ShallowRenderer();
    renderer.render(<Calendar />);
    const component = renderer.getRenderOutput();
    expect(component).toMatchSnapshot();
  });
  test('does render with token', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<Calendar token="123abc" env="mock" />);
    const component = renderer.getRenderOutput();
    expect(component).toMatchSnapshot();
  });
});
