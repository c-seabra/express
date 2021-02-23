import React, { ReactElement } from 'react';
import styled from 'styled-components';

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const PaginationButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid grey;
  background: white;
  color: #000;
  cursor: pointer;
  margin: 0.5rem;
  transition: all 0.3s;
  &:hover {
    background-color: grey;
    color: white;
  }
  &:disabled {
    background: white;
    color: grey;
    cursor: not-allowed;
  }
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
      <PaginationButton disabled={isPreviousDisabled} onClick={previousPage}>
        Previous
      </PaginationButton>
      <PaginationButton disabled={isForwardDisabled} onClick={nextPage}>
        Next
      </PaginationButton>
    </PaginationContainer>
  );
};

export default Pagination;
