import { cleanup, render, waitFor } from '@testing-library/react';
import TestProvider from '@websummit/glue/src/lib/testUtils/TestProvider';
import AppContext from '@websummit/graphql/src/utils/AppContext';
import { setupServer } from 'msw/node';
import React from 'react';

import { queries } from '../../../mocks/mockRequestHandlers';
import TicketTypePage from './TicketTypePage';

const server = setupServer(...queries);

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

afterEach(cleanup);

describe('TicketTypePage test suite', () => {
  test('renders Ticket type page', async () => {
    const { getByText } = render(
      <TestProvider
        apollo
        router
        snackbar
        appContext={AppContext}
        props={{
          router: {
            initialEntries: 'ticket-type/350e9704-a252-4652-a993-cbd2536ad2c5',
            path: 'ticket-type/:id',
          },
        }}
      >
        <TicketTypePage />
      </TestProvider>,
    );
    const output = await waitFor(() => getByText('Test attendee'));

    expect(output).toHaveTextContent('Test attendee');
  });
});
