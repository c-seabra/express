import React, { ReactElement, useRef } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

import useClickOutsideListenerRef from '../../hooks/useClickOutsideListenerRef';

const Popup = styled.div<{ top?: number }>`
  box-sizing: border-box;
  border-radius: 2px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
  padding: 1rem;
  position: absolute;
  margin-top: ${(props) => (props.top || 0) + 4}px;
  z-index: 1000;
  background-color: #fff;
`;

type PopupModalProps = {
  children?: ReactElement | ReactElement[] | string;
  closeModal?: () => void;
  domNode?: HTMLElement | null;
  isOpen?: boolean;
};

const PopupModal = ({
  children,
  domNode,
  isOpen = false,
  closeModal = () => null,
}: PopupModalProps): ReactElement | null => {
  const popupRef = useRef(null);

  useClickOutsideListenerRef(popupRef, closeModal, domNode);
  if (!domNode) return null;

  const { height } = domNode.getBoundingClientRect();

  if (isOpen) {
    return createPortal(
      <Popup ref={popupRef} top={height}>
        {children}
      </Popup>,
      domNode,
    );
  }

  return null;
};

export default PopupModal;
