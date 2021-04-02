import React, { useContext,useState } from 'react'

import AvatarList from '../avatarList/AvatarList'
import { DetailsContext } from '../calendar/Calendar'
import OvalSquare from '../svgs/OvalSquare'
import styles from './EditEvent.css'

const EditEvent = ({ eventId, setEditPopupActive, title, location, description, organizerId }) => {
  const {
    locations,
    rsvps,
    onDeleteEventInvitation,
    onUpdateEvent
  } = useContext(DetailsContext)

  const [editedEntity, setEditedEntity] = useState({})
  const [deletedInvites, setDeletedInvites] = useState([])
  // // new invitations
  // const [newInvites, setnewInvites] = useState({})

  const handleChange = e => {
    const { value, name } = e.target
    setEditedEntity(editedEntity => ({ ...editedEntity, [name]: value || '' }))
  }

  const handleDeleteInvitation = invitationId => {
    setDeletedInvites(prevState => {
      return [...prevState, invitationId]
    })
  }

  // const onNewInvitation = attendanceID => {
  //     // add invitation edit to local invitees list
  //     setnewInvites([...newInvites, attendanceID]);
  // }

  const handleSubmit = e => {
    e.preventDefault()

    if (Object.keys(editedEntity).length !== 0 && editedEntity.constructor === Object) onUpdateEvent(eventId, editedEntity)

    if (deletedInvites && deletedInvites.length) deletedInvites.map(invite => onDeleteEventInvitation(eventId, invite))

    setEditPopupActive(false)
  }

  return (
    <form className={styles.form} onSubmit={e => handleSubmit(e)}>

      <div className={styles.formEditContent}>
        <div className={styles.formInput}><OvalSquare /><input type='text' value={editedEntity.title !== undefined ? editedEntity.title : title} onChange={e => handleChange(e)} name='title' /></div>

        <div className={styles.formInput}>
          <input type='text' value={editedEntity.location_name !== undefined ? editedEntity.location_name : location.name} onChange={e => handleChange(e)} name='location_name' />
          {locations &&
            <select value={editedEntity.location_id !== undefined ? editedEntity.location_id : location.id} onChange={e => handleChange(e)} name='location_id'>
              <option key='emptySelect' value='' disabled>Select location</option>
              {locations.map(location => <option key={location.id} value={location.id}>{location && location.name}</option>)}
            </select>
          }
        </div>
        <div className={styles.formInput}><textarea value={editedEntity.description !== undefined ? editedEntity.description : description} onChange={e => handleChange(e)} name='description' /></div>
        <button type='submit' className={styles.button}>Save</button>
        <button type='button' className={styles.button} onClick={() => setEditPopupActive(false)}>Cancel</button>
      </div>

      <div className={`${styles.formInput} ${styles.formEditInvitee}`}>
        <AvatarList
          styles={styles.rsvps}

          avatarList={rsvps}
          organizerId={organizerId}
          listType='delete'

          iconActive={true}
          iconClickCallback={handleDeleteInvitation}
        />
      </div>

    </form>
  )
}

export default EditEvent
