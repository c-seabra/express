import React, { ReactElement } from 'react';
import styled from 'styled-components';

import { Spacing } from './components/templates/Spacing';
import { SecondaryButton } from './components/atoms/Button';

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

type PaginationProps = {
  isForwardDisabled: boolean;
  isPreviousDisabled: boolean;
  nextPage: () => void;
  previousPage: () => void;
};

const Pagination = ({
  isPreviousDisabled,
  previousPage,
  nextPage,
  isForwardDisabled,
}: PaginationProps): ReactElement => {
  return (
    <PaginationContainer>
      <Spacing right="24px">
        <SecondaryButton disabled={isPreviousDisabled} onClick={previousPage}>
          Previous
        </SecondaryButton>
      </Spacing>
      <SecondaryButton disabled={isForwardDisabled} onClick={nextPage}>
        Next
      </SecondaryButton>
    </PaginationContainer>
  );
};

export default Pagination;
