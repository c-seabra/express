import SearchInput from '@websummit/components/src/molecules/SearchInput';
import { device } from '@websummit/components/src/utils/mediaQueries';
import styled from 'styled-components';

export const SearchContainer = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;

  @media ${device.tablet} {
    flex-direction: row;
  }

  > * {
    width: 100%;
  }
`;

export const StyledSearch = styled.div``;

export const StyledSearchInput = styled(SearchInput)`
  width: 100%;
`;

export const ResultsContainer = styled.div`
  background: #fff;
  position: absolute;
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

export const StyledDisplay = styled.div`
  align-self: auto;
  display: flex;
  order: 0;
  justify-content: flex-end;
`;

export const ListItem = styled.li`
  background: #fff;
  font-size: 1rem;
  list-style: none;
  overflow: hidden;
  padding: 0.75rem;
  margin: 1px 0.5rem 1px 0.5rem;
  text-overflow: ellipsis;
  width: 20%;
  min-width: 100px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  border-radius: 4px;

  &:first-child {
    margin-left: 1px;
  }

  &:last-child {
    margin-right: 1px;
  }

  svg {
    padding: 0 0.5rem;
  }

  & span {
    font-size: 1rem;
    margin-left: 0.1rem;
    font-style: italic;
  }
`;