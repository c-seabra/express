import styled from 'styled-components'

export const PageContainer = styled.section`
  padding: 1rem;
  max-width: 1440px;
  margin: 0 auto;
  font-size: 16px;
`

export const ConfigurationPanel = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
`

export const SpacingBottom = styled.div`
  margin-bottom: 2.5rem;
`

export const SponsorLogo = styled.img`
  width: 50%;
  height: 300px;
  margin: 15px;
  grid-area: 1 / 1 / 2 / 3;
`

export const FormArea = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  align-items: center;
  grid-column-gap: 20px;
  grid-row-gap: 0;
  margin-bottom: 20px;
  width: 100%;

  & .heading {
    grid-area: 1 / 1 / 2 / 4;
    margin-bottom: 0;
  }

  &:first-of-type {
    align-items: flex-start;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr;

    & .file-input {
      grid-area: 1 / 3 / 2 / 4;
    }
  }

  &:last-of-type {
    grid-template-rows: repeat(1, 1fr);
    margin-bottom: 0;

    & .align-right {
      grid-area: 1 / 3 / 2 / 4;
    }
  }
`

export const BorderBottom = styled.div`
  border-bottom: solid;
  border-bottom-width: thin;
  margin-bottom: 20px;
`

export const BreadcrumbsContainer = styled.div`
  display: flex;
  margin: 20px 0 4px;
`
