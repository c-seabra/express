import SearchInput from '@websummit/components/src/molecules/SearchInput';
import styled from 'styled-components';

export const SearchContainer = styled.div`
  align-items: flex-start;
  display: flex;
`;

export const StyledSearch = styled.div`
  flex: 0 1 auto;
  width: 20%;
`;

export const StyledSearchInput = styled(SearchInput)`
  width: 100%;

  & input {
    width: auto;
  }

  & input[type="text" i] {
    padding-left 2rem;
  }
`;

export const ResultsContainer = styled.div`
  background: #fff;
  position: absolute;
  z-index: 2;
  max-width: 355px;
  width: 355px;

  & li {
    cursor: pointer;
    width: auto;

    &:hover {
      cursor: pointer;
    }
  }
`;

export const StyledDisplay = styled.div`
  align-self: auto;
  display: flex;
  flex: 1 1 auto;
  flex-wrap: wrap;
  order: 0;
  justify-content: flex-end;
  width: 80%;
`;

export const ListItem = styled.li`
  background: #fff;
  font-size: 0.9rem;
  list-style: none;
  overflow: hidden;
  padding: 0.5rem;
  margin: 1px;
  text-overflow: ellipsis;
  width: 17%;
  white-space: nowrap;

  & span {
    font-size: 0.8rem;
    font-style: italic;
  }
`;

export const RemoveButton = styled.button`
  background: none;
  border: none;
  font-weight: bold;

  &:hover {
    cursor: pointer;
  }

  &::before {
    content: 'X';
  }
`;
