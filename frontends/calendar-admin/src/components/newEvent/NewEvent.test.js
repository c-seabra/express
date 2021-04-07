import React from 'react';
import renderer from 'react-test-renderer';

import NewEvent from './NewEvent';

describe('NewEvent', () => {
  test('renders', () => {
    const component = renderer.create(
      <NewEvent />,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('with props renders with placeholder', () => {
    const component = renderer.create(
      <NewEvent starts_at='Wednesday' />,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
