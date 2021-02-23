import styled from 'styled-components';

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ExitActionContainer = styled.div<{ noPadding?: boolean }>`
  display: flex;
  align-items: center;
  padding: ${(props) =>
    props.noPadding
      ? '16px'
      : '0'}; // Adjust only action header when no padding
`;

export const ModalHeader = styled.div<{ title?: string }>`
  display: flex;
  justify-content: ${(props) => (props.title ? 'space-between' : 'flex-end')};
`;

export const ModalTitle = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 1.2rem;
`;

export const ModalDescription = styled.div`
  display: flex;
  justify-content: flex-center;
  align-items: center;
  white-space: pre;
  margin-top: 10%;
  margin-top: 10%;
  font-size: 1rem;
`;

export const ModalFooter = styled.div`
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  display: flex;
  justify-content: flex-end;
`;

export const DefaultFooterSpacer = styled.div`
  margin-top: 30px;
  width: 100%;
  height: 2rem;
`;
