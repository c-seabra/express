import React from 'react'

import Accepted from '../svgs/Accepted'
import AvatarIcon from '../svgs/AvatarIcon'
import Declined from '../svgs/Declined'
import Tentative from '../svgs/Tentative'
import { AvatarContainer, AvatarImg, Content, ContentSubtitle, ContentTitle, Icon } from './Avatar.styled'

const Avatar = ({
  title,
  subTitle,
  src,
  alt,
  avatarType,
  response,
  invitationId,
  organizer,
  iconActive,
  listType,
  iconClickCallback,
  defaultSrc = 'https://s3-eu-west-1.amazonaws.com/assets.cilabs.com/images/person.svg'
}) => {
  // Will be updated with coresponding types/colors once we get color codes for different avatar types
  const avatarColor = avatarType === 'attendee' ? 'red' : 'transparent'

  let responseElem
  switch (response) {
    case 'accepted':
      responseElem = <Accepted />
      break
    case 'declined':
      responseElem = <Declined />
      break
    default:
      responseElem = <Tentative />
      break
  }

  const avatarSubTitle = subTitle || organizer ? subTitle || 'Organizer' : ''

  return (
    <AvatarContainer>
      <AvatarImg>
        <object
          data={src || defaultSrc}
          type='image/png'
        >
          <img src={defaultSrc} alt={alt} style={{ borderColor: avatarColor }} />
        </object>
        {responseElem}
      </AvatarImg>

      <Content>
        {title && <ContentTitle>{title}</ContentTitle>}
        {avatarSubTitle && <ContentSubtitle>{avatarSubTitle}</ContentSubtitle>}
      </Content>
      {!organizer && iconActive && (
        <Icon onClick={() => iconClickCallback(invitationId)}>
          <AvatarIcon iconType={listType} />
        </Icon>
      )}
    </AvatarContainer>
  )
}

export default Avatar
