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
        description="Some event description"
        eventId="1234567"
        location={{
          name: 'Under palm tree',
          type: 'text',
        }}
        organizerId="1234567"
        setEditActive={false}
        title="Event Title"
      />,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('renders with props and context', () => {
    useContextMock.mockReturnValue({
      locations: [
        {
          geography: { geometry: null, type: 'Feature' },
          id: 'czxczc',
          name: 'Sunset Summit',
        },
        {
          geography: { geometry: null, type: 'Feature' },
          id: 'dsadasd',
          name: 'Surf Summit (Invite-only)',
        },
        {
          geography: { geometry: null, type: 'Feature' },
          id: '123456778',
          name: 'FullSTK',
        },
      ],
      onDeleteEventInvitation () {
        return null;
      },
      onUpdateEvent () {
        return null;
      },
      rsvps: [
        {
          attendance: { data: { person: { first_name: 'Tomasz' } } },
          invitation: { id: 123, response: { response_status: 'accepted' } },
        },
      ],
    });
    const component = renderer.create(
      <EditEvent
        description="SOme event description"
        eventId="1234567"
        location={{
          name: 'Under palm tree',
          type: 'text',
        }}
        organizerId="1234567"
        setEditActive={false}
        title="Event Title"
      />,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
