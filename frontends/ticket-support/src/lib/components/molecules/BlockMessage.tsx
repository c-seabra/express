import React from 'react';
import styled from 'styled-components';

import { Button } from '../atoms/Button';
import Icon from '../atoms/Icon';
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

const InnerBox = styled(Spacing)`
  display: flex;
  justify-content: center;
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

type BlockMessageProps = {
  buttonText?: string;
  header: string;
  iconName?: string;
  message: string;
  onClickAction?: () => void;
};

const BlockMessage = ({
  header,
  message,
  iconName = 'info',
  onClickAction,
  buttonText,
}: BlockMessageProps) => {
  return (
    <BoxNode>
      <Spacing bottom="90px">
        <InnerBox bottom="16px" top="65px">
          <IconWrapper>
            <Icon>{iconName}</Icon>
          </IconWrapper>
        </InnerBox>

        <Spacing bottom="28px">
          <StyledHeader>{header}</StyledHeader>
          <StyledMessage>{message}</StyledMessage>
        </Spacing>

        {onClickAction && (
          <StyledButton onClick={onClickAction}>{buttonText}</StyledButton>
        )}
      </Spacing>
    </BoxNode>
  );
};

export default BlockMessage;
