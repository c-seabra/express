import React, { ReactElement, useRef, useState } from 'react';
import styled from 'styled-components';

import { Button } from '../atoms/Button';
import PopupModal from '../atoms/PopupModal';

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
`;

type PopupButtonProps = {
  buttonText?: string;
  children?: ReactElement | ReactElement[] | string;
  noPadding?: boolean;
  renderButton?: ({
    isOpen,
    onClick,
  }: {
    isOpen: boolean;
    onClick: () => void;
  }) => ReactElement;
  renderContents?: ({
    closePopup,
    isOpen,
  }: {
    closePopup: () => void;
    isOpen: boolean;
  }) => ReactElement;
};

const PopupButton = ({
  buttonText,
  renderButton,
  children,
  renderContents,
  noPadding = false,
}: PopupButtonProps) => {
  const [isOpen, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const togglePopup = () => setOpen((p) => !p);
  const closePopup = () => setOpen(false);

  return (
    <Container ref={containerRef}>
      {!renderButton || renderButton({ isOpen, onClick: togglePopup }) || (
        <Button type="button" onClick={togglePopup}>
          {buttonText}
        </Button>
      )}
      <PopupModal
        closeModal={closePopup}
        domNode={containerRef?.current}
        isOpen={isOpen}
        noPadding={noPadding}
      >
        {renderContents ? renderContents({ closePopup, isOpen }) : children}
      </PopupModal>
    </Container>
  );
};

export default PopupButton;
