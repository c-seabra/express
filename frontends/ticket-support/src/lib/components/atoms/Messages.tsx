import styled from 'styled-components';

export const WarningMessage = styled.div`
  border-radius: 4px;
  background-color: rgb(225, 85, 84, 0.8);
  color: #fff;
  font-size: 0.8rem;
  font-weight: 400;
  padding: 0.8rem;
  margin-bottom: 16px;
`;

export const InfoMessage = styled(WarningMessage)`
  background-color: rgba(0, 103, 233, 0.7);
`;
