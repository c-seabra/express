import React from 'react';
import renderer from 'react-test-renderer';

import Button from './Button';

describe('Button', () => {
  let realUseContext;
  let useContextMock;

  beforeEach(() => {
    realUseContext = React.useContext;
    React.useContext = jest.fn();
    useContextMock = React.useContext;
  });

  afterEach(() => {
    React.useContext = realUseContext;
  });

  test('renders without props', () => {
    useContextMock.mockReturnValue({});
    const component = renderer.create(<Button />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('renders with props', () => {
    useContextMock.mockReturnValue({});
    const component = renderer.create(
      <Button className="button" onClick={() => null}>
        Some Text
      </Button>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
