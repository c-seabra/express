import React from 'react'

import ExistingEvent from '../existingEvent/ExistingEvent'
import NewEvent from '../newEvent/NewEvent'
import { Overlay, PopupContainer } from './Popup.styled'


const Popup = ({ existingEvent, newEvent, handleOnClick }) => {
  const renderExistingEvent = ({ syntheticEvent }) => {
    const popupStyle = {
      top: `${syntheticEvent.pageY}px`,
      left: `${syntheticEvent.pageX}px`
    }

    return (
      <>
        <PopupContainer style={popupStyle}>
          <ExistingEvent
            close_popup={handleOnClick}
            event={existingEvent}
          />
        </PopupContainer>
        <Overlay onClick={handleOnClick} />
      </>
    )
  }

  const renderNewEvent = ({ allDay, event, starts_at }) => {
    let popupStyle

    if (allDay) {
      popupStyle = {
        top: '200px',
        left: '200px'
      }
    } else {
      const e = event
      const x = e.action === 'click' ? 'box' : 'bounds'
      popupStyle = {
        top: `${e[x].y}px`,
        left: `${e[x].x}px`
      }
    }

    return (
      <>
        <PopupContainer style={popupStyle}>
          <NewEvent
            starts_at={starts_at} />
        </PopupContainer>
        <Overlay onClick={handleOnClick} />
      </>
    )
  }

  if (existingEvent) {
    return renderExistingEvent(existingEvent)
  }

  if (newEvent) {
    return renderNewEvent(newEvent)
  }

  return null
}

export default Popup
