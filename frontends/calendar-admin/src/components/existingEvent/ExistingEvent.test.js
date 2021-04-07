import React from 'react';
import renderer from 'react-test-renderer';

import ExistingEvent from './ExistingEvent';

describe('ExistingEvent', () => {
  let realUseContext;
  let useContextMock;

  beforeEach(() => {
    realUseContext = React.useContext;
    React.useContext = jest.fn()
    useContextMock = React.useContext;
  });

  afterEach(() => {
    React.useContext = realUseContext;
  });

  test('renders without props or context', () => {
    useContextMock.mockReturnValue({});
    const component = renderer.create(
      <ExistingEvent />,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('renders with props, and no context', () => {
    useContextMock.mockReturnValue({});
    const component = renderer.create(
      <ExistingEvent
        title={'some title'}
        starts_at={'2019-04-11T06:15:06.078Z'}
        description={'catching up'}
      />,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('renders with props and context', () => {
    useContextMock.mockReturnValue({
      location: {
        name: 'mock location name',
        id: 1234
      },
      rsvps: [
        {
          invitation: { id: 123, response: { response_status: 'accepted' } },
          attendance: { data: { person: { first_name: 'Tomasz' } } }
        }
      ]
    });
    const component = renderer.create(
      <ExistingEvent
        title={'some title'}
        starts_at={'2019-04-11T06:15:06.078Z'}
        description={'catching up'}
      />,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
