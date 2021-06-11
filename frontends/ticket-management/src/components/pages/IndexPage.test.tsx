import { cleanup, render } from '@testing-library/react';
import { Button } from '@websummit/components/src/atoms/Button';
import React from 'react';

import BlockMessage from '../../../../../packages/components/src/molecules/BlockMessage';
import BoxMessage from '../../../../../packages/components/src/molecules/BoxMessage';
import OrdersDashboard from '../../../../ticket-support/src/components/ordersDashboard/OrdersDashboard';
import IndexPage from './IndexPage';

afterEach(cleanup);

describe('This will test IndexPage', () => {
  test('renders message', () => {
    const { getByText } = render(<IndexPage />);
    const text = 'Test';
    const output = getByText(text);

    expect(output).toHaveTextContent(text);
  });
  test('renders button with message', () => {
    const { getByText } = render(<Button>CLICK ME!</Button>);

    const text2 = 'CLICK ME!';
    const output2 = getByText(text2);

    expect(output2).toHaveTextContent(text2);
  });
  xtest('renders complex component', () => {
    const { getByText } = render(<OrdersDashboard />);

    const text2 = 'block msg test';
    const output2 = getByText(text2);

    expect(output2).toHaveTextContent(text2);
  });
});
