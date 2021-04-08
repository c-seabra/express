import React from 'react'

import Avatar from '../avatar/Avatar'
import { AvatarListContainer } from './AvatarList.styled'

const AvatarList = ({ iconActive, listType, iconClickCallback, avatarList, organizerId }) => (
  avatarList
    ? <AvatarListContainer>
      {avatarList.map(({ invitation, attendance }) => {
        return <li key={`${listType}_${invitation.id}`}>

          <Avatar
            alt='Invitee avatar'
            invitationId={invitation.id}
            organizer={organizerId === (invitation.invitee && invitation.invitee.id)}
            response={invitation.response.response_status}
            src={attendance.data.person.avatar_url}
            title={attendance.data.person.first_name + ' ' + attendance.data.person.last_name}
            {...{
              iconActive,
              iconClickCallback,
              listType
            }}
          />

        </li>
      }

      )}
    </AvatarListContainer>
    : null
)

export default AvatarList
