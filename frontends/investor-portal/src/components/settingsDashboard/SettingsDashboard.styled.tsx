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

  & > div {
    min-width: 30%;
    margin-bottom: 8px;
  }
`

export const SpacingBottom = styled.div`
  margin-bottom: 2.5rem;
`

export const SponsorLogo = styled.img`
    width: 50%;
    height: 300px;
    margin: 15px;
`;

export const FormArea = styled.div`
  width: 100%;
  border-top: 1px solid gray;
`;

