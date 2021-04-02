import React from 'react';
import renderer from 'react-test-renderer';
import Error from './Error.jsx';

describe('Error', () => {
  test('renders single error message', () => {
    const component = renderer.create(
      <Error errors={['Bad request']} />,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('renders two error messages', () => {
    const component = renderer.create(
      <Error errors={['Bad request', 'Fetch failed']} />,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('with empty props doesn\'t render', () => {
    const component = renderer.create(
      <Error errors={[]} />,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('without props doesn\'t render', () => {
    const component = renderer.create(
      <Error />,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
})
