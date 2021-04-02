import React from 'react'

import ExistingEvent from '../existingEvent/ExistingEvent'
import NewEvent from '../newEvent/NewEvent'
import styles from './Popup.css'

const Popup = ({ existingEvent, newEvent, handleOnClick }) => {

  const renderExistingEvent = ({ syntheticEvent }) => {
    const popupStyle = {
      top: `${syntheticEvent.pageY}px`,
      left: `${syntheticEvent.pageX}px`
    }

    return (
      <React.Fragment>
        <div className={styles.popup} style={popupStyle}>
          <ExistingEvent
            event={existingEvent}
            close_popup={handleOnClick}
          />
        </div>
        <div className={styles.overlay} onClick={handleOnClick} />
      </React.Fragment>
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
      <React.Fragment>
        <div className={styles.popup} style={popupStyle}>
          <NewEvent
            starts_at={starts_at} />
        </div>
        <div className={styles.overlay} onClick={handleOnClick} />
      </React.Fragment>
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
