import React from 'react';

import ExistingEvent from '../existingEvent/ExistingEvent';
import NewEvent from '../newEvent/NewEvent';
import { CreatePopupContainer, Overlay, PopupContainer } from './Popup.styled';

const Popup = ({
  existingEvent,
  newEvent,
  handleOnClick,
  locations,
  formats,
}) => {
  const renderExistingEvent = ({ syntheticEvent }) => {
    const popupStyle = {
      left: `${syntheticEvent.pageX}px`,
      top: `${syntheticEvent.pageY}px`,
    };

    return (
      <>
        <PopupContainer style={popupStyle}>
          <ExistingEvent
            close_popup={handleOnClick}
            event={existingEvent}
            formats={formats}
          />
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
            formats={formats}
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
