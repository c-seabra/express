import styled from 'styled-components';

export const SpacingBottom = styled.div`
  margin-bottom: 2.5rem;
`;

export const StyledGridForm = styled.form`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  grid-column-gap: 20px;
  grid-row-gap: 20px;

  & .align-right {
    grid-area: 2 / 3 / 3 / 4;
  }
`;
