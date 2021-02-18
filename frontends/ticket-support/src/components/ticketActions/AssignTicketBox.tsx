import React from 'react';
import styled from 'styled-components';

import Icon from '../../lib/components/atoms/Icon';
import { Button } from '../../lib/components/atoms/Button';
import { Spacing } from '../templates/Spacing';

const BoxNode = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #F8F8F8;
  border-radius: 5px 5px 0 0;

  & > * {
    margin-right: 1rem;
  }
`;

const StyledMessage = styled.div`
  color: #333333;
  font-size: 18px;
  letter-spacing: 0;
  line-height: 26px;
  text-align: center;
`;

const StyledHeader = styled(StyledMessage)`
  font-weight: 500;
`;

const IconWrapper = styled.div`
  > .material-icons {
    font-size: 48px;
    color: #0067E9;
  }
`;

const AssignTicketBox = () => {
  return (
    <BoxNode>
      <Spacing top="65px" bottom="16px">
        <IconWrapper>
          <Icon>info</Icon>
        </IconWrapper>
      </Spacing>

      <Spacing bottom="16px">
        <StyledHeader>Assign your ticket</StyledHeader>
        <StyledMessage>
          Please assign this ticket to see the user account details
        </StyledMessage>
      </Spacing>

      <Spacing bottom="90px">
      <Button>Assign now</Button>
      </Spacing>
    </BoxNode>
  );
};

export default AssignTicketBox;
