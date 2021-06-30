import React, { ReactNode } from 'react';

const mockContext = { slug: '123', token: '132' };
const MockAppContext = ({ children }: { children: ReactNode }) => {
  jest.mock('useAppContext', () => mockContext);
  jest.mock('useRequestContext', () => mockContext);

  return <>{children}</>;
};

export default MockAppContext;
