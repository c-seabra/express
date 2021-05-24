import React from 'react';

import ExistingEvent from '../existingEvent/ExistingEvent';
import NewEvent from '../newEvent/NewEvent';
import { CreatePopupContainer, Overlay, PopupContainer } from './Popup.styled';

const Popup = ({ existingEvent, newEvent, handleOnClick, locations }) => {
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
    return (
      <>
        <CreatePopupContainer>
          <NewEvent
            closePopup={handleOnClick}
            event={newEvent}
            locations={locations}
          />
        </CreatePopupContainer>
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
