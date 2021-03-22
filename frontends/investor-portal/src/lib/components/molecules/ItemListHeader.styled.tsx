import styled from 'styled-components';

import { ListItem } from '..';

const ListHeaderItem = styled(ListItem)`
  font-weight: 600;
  text-align: center;
  margin-top: 1rem;

  &:hover {
    background-color: white;
    cursor: initial;
  }
`;

export default ListHeaderItem;
