import styled from 'styled-components';

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

export const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
