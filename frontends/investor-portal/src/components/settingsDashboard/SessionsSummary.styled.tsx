import styled from 'styled-components'

export const SpacingBottom = styled.div`
  margin-bottom: 2.5rem;
`

export const StyledGridContainer = styled.section`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(4, 1fr);
  align-items: center;
`

export const StyledColumnContainer = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 0.75rem;
  border-radius: 3px;
  border: 1px solid #0067e9;
  letter-spacing: 0;
  color: #0067e9;
  background-color: rgba(0, 103, 233, 0.1);

  & > span {
    padding: 0.25rem 0;
  }

  &.full {
    background-color: #0067e9;
    color: #fff;
  }
`
