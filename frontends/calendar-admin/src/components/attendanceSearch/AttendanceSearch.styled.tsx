import SearchInput from '@websummit/components/src/molecules/SearchInput';
import { device } from '@websummit/components/src/utils/mediaQueries';
import styled from 'styled-components';

export const SearchContainer = styled.div`
  position: relative;
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;

  @media ${device.tablet} {
    flex-direction: row;
  }
`;

export const StyledSearchInput = styled(SearchInput)`
  width: 100%;

  margin: 0 0 0.25rem;

  @media ${device.tablet} {
    width: 50%;
    padding-right: 8px;
  }
`;

export const ResultsContainer = styled.div`
  background: transparent;
  position: absolute;
  left: 0;
  top: 34px;
  z-index: 5;
  width: 100%;

  & li {
    cursor: pointer;
    width: auto;
    margin-bottom: 1px;

    &.full-width {
      width: calc(100% - 2px);
      max-width: 100%;
      margin-left: 0;
      margin-right: 0;

      @media ${device.tablet} {
        width: calc(50% - 8px);
        max-width: 50%;
      }
    }

    &:hover {
      cursor: pointer;
    }
  }
`;

export const StyledDisplay = styled.div`
  align-self: auto;
  display: flex;
  order: 0;
  color: #747474;
  flex-wrap: wrap;
`;

export const ListItem = styled.li`
  background: #fff;
  font-size: 0.75rem;
  list-style: none;
  overflow: hidden;
  padding: 0 0.75rem 1px;
  text-overflow: ellipsis;
  margin: 0 0.25rem 0.25rem;
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
  }
`;
