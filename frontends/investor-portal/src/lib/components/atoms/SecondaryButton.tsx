import styled from 'styled-components';

import { Button } from '..';

const SecondaryButton = styled(Button)`
  color: #0067e9;
  background-color: #ffffff;

  &:hover {
    background-color: #2269bf;
    color: #ffffff;
  }
`;

export default SecondaryButton;
