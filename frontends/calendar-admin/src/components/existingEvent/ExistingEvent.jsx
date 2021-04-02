import moment from 'moment'
import React, { useContext,useEffect, useState } from 'react'

import AvatarList from '../avatarList/AvatarList'
import Button from '../button/Button'
import { DetailsContext } from '../calendar/Calendar'
import EditEvent from '../editEvent/EditEvent'
import popupStyles from '../popup/Popup.css'
import BinIcon from '../svgs/Bin'
import CloseIcon from '../svgs/Close'
import DescriptionIcon from '../svgs/Description'
import GroupIcon from '../svgs/Group'
import MeetingIcon from '../svgs/Meeting'
import OvalSquare from '../svgs/OvalSquare'
import PenIcon from '../svgs/Pen'
import styles from './ExistingEvent.css'
import ExistingEventItem from './ExistingEventItem'

const ExistingEvent = ({ event, close_popup }) => {
  const {
    id,
    title,
    description,
    location,
    invitations,
    starts_at,
    ends_at,
    can_modify,
    organizer
  } = event

  const {
    currentUserId,
    locations,
    rsvps,
    responseStatuses,
    onUpdateEventInvitationResponse,
    onDeleteEvent
  } = useContext(DetailsContext)

  const [deletePopupActive, setDeletePopupActive] = useState(false)
  const [editPopupActive, setEditPopupActive] = useState(false)
  const [locationName, setLocationName] = useState()
  const [currentUserInvitation, setCurrentUserInvitation] = useState()
  const [eventTime, setEventTime] = useState()

  useEffect(() => {
    // get location name
    location && setLocationName(getLocationName(location))

    // get current user response
    // so we can set RSVP buttons
    const invitation = invitations && invitations.find(invitation => invitation.invitee.id === currentUserId)
    setCurrentUserInvitation(invitation)

    // Format the date to desired layout
    formatDate(starts_at.toString(), ends_at.toString())
  }, [(location && location.id), (location && location.name), invitations, rsvps])

  const handleDelete = () => {
    // open popup overlay
    setDeletePopupActive(true)
  }
  const handleDeleteResponse = deleteResponse => {
    if (deleteResponse) onDeleteEvent(id)
    setDeletePopupActive(false)
  }

  const handleEdit = () => {
    setEditPopupActive(!editPopupActive)
  }

  const getLocationName = () => {
    let currentLocationName

    if (location.type === 'text') {
      currentLocationName = location.name
    } else {
      const currentLocation = locations && locations.find(confLocation => confLocation.id === location.id || confLocation.id === location)
      currentLocationName = currentLocation && currentLocation.name
    }

    return currentLocationName
  }

  const formatDate = (starts_at, ends_at) => {
    const dateFormatted = `${moment(starts_at).utc().format('dddd, DD MMMM - HH:mm')}-${moment(ends_at).format('HH:mm')}`

    setEventTime(dateFormatted)
  }

  return (
    <div className={styles.existingEvent}>

      <div className={popupStyles.topButtons}>
        {can_modify &&
          <React.Fragment>
            {!editPopupActive && <Button className={popupStyles.topButton} onBtnClick={handleEdit}><PenIcon /></Button>}
            <Button className={popupStyles.topButton} onBtnClick={handleDelete}><BinIcon /></Button>
          </React.Fragment>
        }
        <Button className={popupStyles.topButton} onBtnClick={close_popup}><CloseIcon /></Button>
      </div>

      <div className={styles.wrapper}>

        <ExistingEventItem styles={styles} icon={<OvalSquare iconColor='#f40' />}>

          <h2 className={styles.title}>{title}</h2>
          <p className={styles.date}>{eventTime}</p>

        </ExistingEventItem>

        {locationName &&
          <ExistingEventItem styles={styles} icon={<MeetingIcon />}>
            {locationName}
          </ExistingEventItem>
        }

        <ExistingEventItem styles={styles} icon={<GroupIcon />}>
          {rsvps && rsvps.length
            ? <AvatarList avatarList={rsvps} organizerId={organizer.id} listType='rsvps' />
            : 'Loading...'
          }
        </ExistingEventItem>

        {description &&
          <ExistingEventItem styles={styles} icon={<DescriptionIcon />}>
            {description}
          </ExistingEventItem>
        }

      </div>

      {editPopupActive &&
        <div className={`${styles.overlay} ${styles.formWrap}`}>
          <div className={popupStyles.topButtons}>
            <Button className={popupStyles.topButton} onBtnClick={handleDelete}><BinIcon /></Button>
            {/* <Button className={popupStyles.topButton} onBtnClick={handleEdit}><CloseIcon /></Button> */}
          </div>
          <EditEvent eventId={id} organizerId={organizer.id} setEditPopupActive={setEditPopupActive} {...{ title, location, description, rsvps }} />
        </div>
      }

      {deletePopupActive &&
        <div className={styles.overlay}>
          <h3>Are you sure you want to delete this event?</h3>
          <div className={styles.overlayButtons}>
            <button className={`${popupStyles.button} ${styles.overlayButton} ${styles.overlayButton_yes}`} onClick={() => handleDeleteResponse(true)}>Yes</button>
            <button className={`${popupStyles.button} ${styles.overlayButton}`} onClick={() => handleDeleteResponse(false)}>No</button>
          </div>
        </div>
      }

      <div className={styles.userRsvp}>
        <div>Going?</div>
        <div>
          {currentUserInvitation && currentUserInvitation.valid_response_status_ids.map(response => {
            const currentResponse = responseStatuses && responseStatuses.find(responseStatus => responseStatus.id === response)
            return (
              <Button
                key={response}
                className={`${popupStyles.button} ${styles.userRsvp_button} ${(currentUserInvitation.response.response_status === response ? popupStyles.button_active : '')}`}
                onBtnClick={() => currentUserInvitation.response.response_status !== response ? onUpdateEventInvitationResponse(id, response) : ''}>
                {currentResponse && currentResponse.label}
              </Button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
export default ExistingEvent
