import SearchInput from '@websummit/components/src/molecules/SearchInput';
import styled from 'styled-components';

export const SearchContainer = styled.div`
  width: 62%;
  margin-left: 50px;
  margin-bottom: 40px;
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
  z-index: 5;
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
