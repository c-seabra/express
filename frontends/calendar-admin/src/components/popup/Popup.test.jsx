import moment from 'moment';
import React from 'react';
import renderer from 'react-test-renderer';

import Popup from './Popup';

describe('Popup', () => {
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

  test("doesn't render without props", () => {
    const component = renderer.create(<Popup />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('renders Popup with ExistingEvent', () => {
    useContextMock.mockReturnValue({
      locations: [
        {
          geography: {
            geometry: null,
            properties: {},
            type: 'Feature',
          },
          id: '595fdfc7-e447-44b7-b40e-92d56c61a90d',
          name: 'binate.io',
        },
      ],
    });
    const existingEvent = {
      ends_at: moment('2019-04-11T06:16:06.078Z').toDate(),
      location: {
        id: 111,
      },
      organizer: {
        id: '123456',
      },
      starts_at: moment('2019-04-11T06:15:06.078Z').toDate(),
      syntheticEvent: {
        pageX: 333,
        pageY: 222,
      },
    };
    const component = renderer.create(<Popup existingEvent={existingEvent} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('renders Popup with NewEvent', () => {
    useContextMock.mockReturnValue({});
    const newEvent = {
      event: {
        action: 'click',
        box: {
          x: 66,
          y: 55,
        },
      },
    };
    const component = renderer.create(<Popup newEvent={newEvent} />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
