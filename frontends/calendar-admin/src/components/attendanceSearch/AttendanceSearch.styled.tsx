import styled from 'styled-components';

import SearchInput from '../../../../../packages/components/src/molecules/SearchInput';

export const ListItem = styled.li`
  font-size: 0.85rem;
  display: flex;
  padding: 0.75rem;
  background-color: #fff;
  justify-content: space-between;
  margin-left: 10px;
  margin-right: 425px;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #dde0e5;
    cursor: pointer;
  }
`;

export const ColumnStyles = styled.div`
  display: flex;
  align-items: center;
  padding: 0 0.25rem;
  word-break: break-word;
`;
export const Column = styled(ColumnStyles)`
  width: 15%;
`;

export const StyledSearchInput = styled(SearchInput)`
  // Remove these offsets
  margin-left: 8px;
  margin-top: 24px;
  margin-right: calc(2rem + 1px);

  width: 450px;
`;
