import React from 'react';
import renderer from 'react-test-renderer';

import AvatarList from './AvatarList';

describe('AvatarList', () => {
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
    const component = renderer.create(<AvatarList />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('renders with props', () => {
    useContextMock.mockReturnValue({});
    const component = renderer.create(
      <AvatarList
        iconActive
        avatarList={[
          {
            attendance: { data: { person: { first_name: 'Tomasz' } } },
            invitation: { id: 123, response: { response_status: 'accepted' } },
          },
        ]}
        iconClickCallback={null}
        iconType="delete"
        organizerId="123456"
        styles="styles"
      />,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
