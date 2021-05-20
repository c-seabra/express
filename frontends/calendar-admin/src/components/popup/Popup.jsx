import React from 'react';

import ExistingEvent from '../existingEvent/ExistingEvent';
import NewEvent from '../newEvent/NewEvent';
import { Overlay, PopupContainer } from './Popup.styled';

const Popup = ({ existingEvent, newEvent, handleOnClick }) => {
  const renderExistingEvent = ({ syntheticEvent }) => {
    const popupStyle = {
      top: `${syntheticEvent.pageY}px`,
      left: `${syntheticEvent.pageX}px`,
    };

    return (
      <>
        <PopupContainer style={popupStyle}>
          <ExistingEvent close_popup={handleOnClick} event={existingEvent} />
        </PopupContainer>
        <Overlay onClick={handleOnClick} />
      </>
    );
  };

  const renderNewEvent = () => {
    const popupStyle = {
      top: '200px',
      left: '200px',
    };
    return (
      <>
        <PopupContainer style={popupStyle}>
          <NewEvent event={newEvent} />
        </PopupContainer>
        <Overlay onClick={handleOnClick} />
      </>
    );
  };

  if (existingEvent) {
    return renderExistingEvent(existingEvent);
  }

  if (newEvent) {
    return renderNewEvent(newEvent);
  }

  return null;
};

export default Popup;
