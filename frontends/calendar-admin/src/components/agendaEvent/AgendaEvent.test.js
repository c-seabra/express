import React from 'react';
import renderer from 'react-test-renderer';

import AgendaEvent from './AgendaEvent';

describe('AgendaEvent', () => {
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
    const component = renderer.create(<AgendaEvent />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('renders with props, and no context', () => {
    useContextMock.mockReturnValue({});
    const component = renderer.create(
      <AgendaEvent
        event={{
          deep_link: null,
          description: 'This is a calendar event with a predefined location 3',
          ends_at: '2019-06-28T11:21:48.129Z',
          id: '55aa9370-f5ed-499f-b5e0-c87744bce8dc',
          invitations: [
            {
              hidden: false,
              id: 'f0b1e91c-ef95-48d1-b872-42347afd9a1e',
              invitee: {
                id: 'b048f880-0b34-444e-9883-0ce1b5783090',
                type: 'attendance',
              },
              response: {
                responded_at: '2019-06-27T09:48:39.344Z',
                response_status: 'accepted',
              },
              type: 'invitation',
              valid_response_status_ids: (3)[
                ('accepted', 'declined', 'tentative')
              ],
            },
          ],
          invited_by_admin: false,
          location: { name: 'Under palm tree', type: 'text' },
          organizer: {
            id: 'b048f880-0b34-444e-9883-0ce1b5783090',
            type: 'attendance',
          },
          pin_id: null,
          source: { id: 'b46f27e4-9472-4c66-9271-3e6e15f839fe', type: 'user' },
          starts_at: '2019-06-28T11:11:40.586Z',
          title: 'Test Calendar event',
          type: 'calendar_event',
        }}
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
      <AgendaEvent
        event={{
          deep_link: null,
          description: 'This is a calendar event with a predefined location 3',
          ends_at: '2019-06-28T11:21:48.129Z',
          id: '55aa9370-f5ed-499f-b5e0-c87744bce8dc',
          invitations: [
            {
              hidden: false,
              id: 'f0b1e91c-ef95-48d1-b872-42347afd9a1e',
              invitee: {
                id: 'b048f880-0b34-444e-9883-0ce1b5783090',
                type: 'attendance',
              },
              response: {
                responded_at: '2019-06-27T09:48:39.344Z',
                response_status: 'accepted',
              },
              type: 'invitation',
              valid_response_status_ids: (3)[
                ('accepted', 'declined', 'tentative')
              ],
            },
          ],
          invited_by_admin: false,
          location: { name: 'Under palm tree', type: 'text' },
          organizer: {
            id: 'b048f880-0b34-444e-9883-0ce1b5783090',
            type: 'attendance',
          },
          pin_id: null,
          source: { id: 'b46f27e4-9472-4c66-9271-3e6e15f839fe', type: 'user' },
          starts_at: '2019-06-28T11:11:40.586Z',
          title: 'Test Calendar event',
          type: 'calendar_event',
        }}
      />,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
