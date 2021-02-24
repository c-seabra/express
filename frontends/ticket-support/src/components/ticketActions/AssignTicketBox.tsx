import React from 'react';
import styled from 'styled-components';

import { Button } from '../../lib/components/atoms/Button';
import Icon from '../../lib/components/atoms/Icon';
import { Spacing } from '../templates/Spacing';

const BoxNode = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f8f8f8;
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

const StyledButton = styled(Button)`
  min-width: 200px;
`;

const IconWrapper = styled.div`
  > .material-icons {
    font-size: 48px;
    color: #0067e9;
  }
`;

type AssignTicketBoxProps = {
  onClickAction: () => void;
};

const AssignTicketBox = ({ onClickAction }: AssignTicketBoxProps) => {
  return (
    <BoxNode>
      <Spacing bottom="16px" top="65px">
        <IconWrapper>
          <Icon>info</Icon>
        </IconWrapper>
      </Spacing>

      <Spacing bottom="28px">
        <StyledHeader>Assign your ticket</StyledHeader>
        <StyledMessage>
          Please assign this ticket to see the user account details
        </StyledMessage>
      </Spacing>

      <Spacing bottom="90px">
        <StyledButton onClick={onClickAction}>Assign now</StyledButton>
      </Spacing>
    </BoxNode>
  );
};

export default AssignTicketBox;
