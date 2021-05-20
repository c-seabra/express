import React from 'react';
import renderer from 'react-test-renderer';

import ExistingEvent from './ExistingEvent';

describe('ExistingEvent', () => {
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

  test('renders without props or context', () => {
    useContextMock.mockReturnValue({});
    const component = renderer.create(<ExistingEvent />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('renders with props, and no context', () => {
    useContextMock.mockReturnValue({});
    const component = renderer.create(
      <ExistingEvent
        description="catching up"
        starts_at="2019-04-11T06:15:06.078Z"
        title="some title"
      />,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('renders with props and context', () => {
    useContextMock.mockReturnValue({
      location: {
        id: 1234,
        name: 'mock location name',
      },
      rsvps: [
        {
          attendance: { data: { person: { first_name: 'Tomasz' } } },
          invitation: { id: 123, response: { response_status: 'accepted' } },
        },
      ],
    });
    const component = renderer.create(
      <ExistingEvent
        description="catching up"
        starts_at="2019-04-11T06:15:06.078Z"
        title="some title"
      />,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
