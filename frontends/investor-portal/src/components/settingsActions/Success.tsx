import React, { ReactElement } from 'react';
import styled from 'styled-components';

const StyledSuccess = styled.div`
  font-style: italic;
  font-size: 0.8em;
  margin-bottom: 0.5rem;
  span {
    background: #3cb371;
    padding: 0.25rem;
    line-height: 1.25rem;
    color: #fff;
  }
`;

const Success = ({ children }: { children: ReactElement | string }) => {
  return (
    <StyledSuccess>
      <span>{children}</span>
    </StyledSuccess>
  );
};

export default Success;
