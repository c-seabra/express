import styled from 'styled-components';

import SearchInput from '../../../../../packages/components/src/molecules/SearchInput';

export const SearchContainer = styled.div`
  width: 100%;
`;

export const DestructiveButton = styled.button`
  border-radius: 50%;
  padding: 0.5em;
  width: 30px;
  height: 30px;
  color: #cb1977;
  background-color: #ffffff;
  border: 1px solid #cb1977;

  &:hover {
    background-color: #cb1977;
    color: #ffffff;
  }

  &::before {
    content: 'X';
  }
`;

export const ListItem = styled.li`
  margin-right: calc(2rem + 20px);
  width: 450px;
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

export const StyledSearch = styled.div`
  width: 50%;
  float: left;
  padding-bottom: 1rem;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export const StyledSearchInput = styled(SearchInput)`
  margin-right: calc(2rem + 20px);
  width: 450px;
`;

export const StyledDisplay = styled.div`
  width: 50%;
  float: right;
  padding-bottom: 2rem;
`;
