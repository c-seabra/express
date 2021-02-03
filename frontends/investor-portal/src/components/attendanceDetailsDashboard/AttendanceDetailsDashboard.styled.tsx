import styled from 'styled-components'

import { CategoryListContainer } from '../../lib/components/molecules/CategoryList'

export const DashboardDetailsContainer = styled.div`
  max-width: 1440px;
  margin: auto;
`

export const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  select,
  input {
    height: 2rem;
    width: 100%;
  }
`

export const Select = styled(StyledLabel)`
  margin-right: 1rem;
  select {
    padding-right: 1rem;
  }
`

export const MultiSelect = styled(StyledLabel)`
  select {
    height: 4rem;
  }
`

export const PopupFiltersContainer = styled.div`
  display: flex;

  ${CategoryListContainer} {
    margin-right: 0.6rem;
  }

  &:last-child {
    margin-right: 0;
  }
`
