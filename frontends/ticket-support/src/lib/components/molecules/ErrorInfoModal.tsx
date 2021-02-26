import React from 'react';
import styled from 'styled-components';

import { Spacing } from '../templates/Spacing';
import { ErrorButton } from '../atoms/Button';
import Icon from '../atoms/Icon';
import Modal from './Modal';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0 0;
  font-size: 0.85rem;
  font-weight: 400;
  min-width: 640px;
`;

const Text = styled.div`
  font-size: 16px;
  letter-spacing: 0;
  line-height: 28px;
  max-width: 580px;
`;

const HeaderText = styled.div`
  font-size: 26px;
  font-weight: 500;
  letter-spacing: -0.5px;
  line-height: 40px;
`;

const AlertText = styled(HeaderText)`
  color: #e15554;
`;

const StyledErrorButton = styled(ErrorButton)`
  padding-left: 3.75rem;
  padding-right: 3.75rem;
`;

const IconWrapper = styled.div`
  > .material-icons {
    font-size: 36px;
    color: #e15554;
  }
`;

type ErrorInfoModalProps = {
  alertHeader: string;
  alertText: string;
  closeModal: () => void;
  headerText: string;
  isOpen: boolean;
};

const ErrorInfoModal = ({
  isOpen,
  closeModal,
  headerText,
  alertHeader,
  alertText,
}: ErrorInfoModalProps) => {
  return (
    <Modal key={isOpen.toString()} isOpen={isOpen} onRequestClose={closeModal}>
      <Wrapper>
        <Spacing bottom="10px">
          <IconWrapper>
            <Icon>error</Icon>
          </IconWrapper>
        </Spacing>

        <HeaderText>{headerText}</HeaderText>

        <Spacing bottom="40px">
          <AlertText>{alertHeader}</AlertText>
        </Spacing>

        <Spacing bottom="40px" top="24px">
          <Text>{alertText}</Text>
        </Spacing>
        <Spacing bottom="50px">
          <StyledErrorButton onClick={closeModal}>OK</StyledErrorButton>
        </Spacing>
      </Wrapper>
    </Modal>
  );
};

export default ErrorInfoModal;
