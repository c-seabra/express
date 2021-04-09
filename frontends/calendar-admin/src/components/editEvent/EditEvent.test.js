import React from 'react';
import renderer from 'react-test-renderer';

import EditEvent from './EditEvent';

describe('EditEvent', () => {
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
    const component = renderer.create(<EditEvent />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('renders with props, and no context', () => {
    useContextMock.mockReturnValue({});
    const component = renderer.create(
      <EditEvent
        eventId="1234567"
        setEditActive={false}
        title="Event Title"
        location={{
          type: 'text',
          name: 'Under palm tree',
        }}
        description="Some event description"
        organizerId="1234567"
      />,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('renders with props and context', () => {
    useContextMock.mockReturnValue({
      locations: [
        {
          geography: { type: 'Feature', geometry: null },
          id: 'czxczc',
          name: 'Sunset Summit',
        },
        {
          geography: { type: 'Feature', geometry: null },
          id: 'dsadasd',
          name: 'Surf Summit (Invite-only)',
        },
        {
          geography: { type: 'Feature', geometry: null },
          id: '123456778',
          name: 'FullSTK',
        },
      ],
      rsvps: [
        {
          invitation: { id: 123, response: { response_status: 'accepted' } },
          attendance: { data: { person: { first_name: 'Tomasz' } } },
        },
      ],
      onDeleteEventInvitation: function () {
        return null;
      },
      onUpdateEvent: function () {
        return null;
      },
    });
    const component = renderer.create(
      <EditEvent
        eventId="1234567"
        setEditActive={false}
        title="Event Title"
        location={{
          type: 'text',
          name: 'Under palm tree',
        }}
        description="SOme event description"
        organizerId="1234567"
      />,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
