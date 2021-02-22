import styled from 'styled-components';

import { ListItem } from '../../lib/components';

export const ColumnStyles = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  padding: 0 0.25rem;
  word-break: break-word;
`;
export const Column = styled(ColumnStyles)`
  width: 15%;
`;

export const NarrowColumn = styled(ColumnStyles)`
  width: 3%;
`

export const ListHeaderItem = styled(ListItem)`
  font-weight: 600;
  text-align: center;
  margin-top: 1rem;

  &:hover {
    background-color: white;
    cursor: initial;
  }
`;
