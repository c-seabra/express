import React from 'react'

import Avatar from '../avatar/Avatar'
import styles from './AvatarList.css'

const AvatarList = ({ iconActive, listType, iconClickCallback, avatarList, organizerId }) => (
  avatarList
    ? <ul className={styles.avatarList}>
      {avatarList.map(({ invitation, attendance }) => {
        return <li key={`${listType}_${invitation.id}`}>

          <Avatar
            src={attendance.data.person.avatar_url}
            alt='Invitee avatar'
            title={attendance.data.person.first_name + ' ' + attendance.data.person.last_name}
            response={invitation.response.response_status}
            invitationId={invitation.id}
            organizer={organizerId === (invitation.invitee && invitation.invitee.id)}
            {...{
              iconActive,
              listType,
              iconClickCallback
            }}
          />

        </li>
      }

      )}
    </ul>
    : null
)

export default AvatarList
