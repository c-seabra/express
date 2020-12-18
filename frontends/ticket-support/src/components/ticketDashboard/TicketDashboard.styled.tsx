import styled from 'styled-components'

export const StyledList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  overflow: hidden;
  border-radius: 4px;
  border: 1px solid grey;
`

export const SearchFilters = styled.div`
  display: flex;
  padding-bottom: 1rem;
  align-items: center;
  justify-content: space-between;
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
`

export const Filters = styled.div`
  display: flex;
  align-items: flex-start;
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
