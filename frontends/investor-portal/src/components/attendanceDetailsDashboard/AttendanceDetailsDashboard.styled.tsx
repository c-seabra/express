import styled from 'styled-components';

export const BorderBottom = styled.div`
  margin-bottom: 20px;
`;

export const DashboardDetailsContainer = styled.div`
  max-width: 1440px;
  margin: auto;
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

export const Select = styled(StyledLabel)`
  margin-right: 1rem;
  select {
    padding-right: 1rem;
  }
`;
