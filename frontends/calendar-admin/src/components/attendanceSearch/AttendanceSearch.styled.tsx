import SearchInput from '@websummit/components/src/molecules/SearchInput';
import { device } from '@websummit/components/src/utils/mediaQueries';
import styled from 'styled-components';

export const SearchContainer = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  width: 100%;

  @media ${device.tablet} {
    flex-direction: row;
  }

  > * {
    width: 100%;
  }
`;

export const StyledSearchInput = styled(SearchInput)`
  width: 100%;

  margin: 0 0 0.25rem;

  @media ${device.tablet} {
    margin: 0;
  }
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
  color: #747474;
`;

export const ListItem = styled.li`
  background: #fff;
  font-size: 0.75rem;
  list-style: none;
  overflow: hidden;
  padding: 0 0.75rem 1px;
  text-overflow: ellipsis;
  margin: 0 0.25rem;
  max-width: 25%;
  width: auto;
  height: 2rem;
  min-width: 110px;
  white-space: nowrap;
  display: flex;
  align-items: center;
  border-radius: 4px;
  text-align: center;

  &:first-child {
    margin-left: 1px;
  }

  &:last-child {
    margin-right: 1px;
  }

  div {
    height: 50%;
    margin-bottom: -1px;
  }

  svg {
    min-width: 12px;
    padding: 0 0.25rem 0 0;
    position: relative;
    left: 0;
    height: 100%;
  }

  .span {
    margin-left: 0.1rem;
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media ${device.tablet} {
    margin: 0 0.25rem;
  }
`;
