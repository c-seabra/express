import SearchInput from '@websummit/components/src/molecules/SearchInput';
import styled from 'styled-components';

import { CategoryListContainer } from '../../lib/components/molecules/CategoryList';

export const DashboardContainer = styled.div`
  max-width: 1440px;
  margin: auto;
  padding: 1rem;
`;

export const SearchFilters = styled.div`
  display: flex;
  padding-bottom: 1rem;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  select,
  input {
    height: 2rem;
    width: 100%;
  }
`;

export const FiltersSearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-right: 4px;

  & > div {
    margin-left: 1rem;
  }
`;

export const StyledSearchInput = styled(SearchInput)`
  margin-right: calc(2rem + 1px);

  width: 450px;
`;

export const Search = styled(StyledLabel)`
  width: 30%;
  position: relative;
  svg {
    width: 20px;
    height: 20px;
    position: absolute;
    left: 0.5rem;
    top: 0.5rem;
  }
  input {
    padding-left: 2rem;
    border: none;
    border-bottom: 1px solid grey;
  }
`;

export const Filters = styled.div`
  display: flex;
  align-items: flex-start;
`;

export const Select = styled(StyledLabel)`
  margin-right: 1rem;
  select {
    padding-right: 1rem;
  }
`;

export const MultiSelect = styled(StyledLabel)`
  select {
    height: 4rem;
  }
`;

export const PopupFiltersContainer = styled.div`
  display: flex;

  ${CategoryListContainer} {
    margin-right: 0.6rem;
  }

  &:last-child {
    margin-right: 0;
  }
`;
