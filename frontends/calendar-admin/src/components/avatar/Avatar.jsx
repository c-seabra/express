import React from 'react'

import Accepted from '../svgs/Accepted'
import AvatarIcon from '../svgs/AvatarIcon'
import Declined from '../svgs/Declined'
import Tentative from '../svgs/Tentative'
import styles from './Avatar.css'

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
    <div className={styles.avatar}>
      <div className={styles.avatarImg}>
        <object
          data={src || defaultSrc}
          type='image/png'
        >
          <img src={defaultSrc} alt={alt} style={{ borderColor: avatarColor }} />
        </object>
        {responseElem}
      </div>

      <div className={styles.content}>
        {title && <p className={styles.contentTitle}>{title}</p>}
        {avatarSubTitle && <p className={styles.contentSubtitle}>{avatarSubTitle}</p>}
      </div>
      {!organizer && iconActive && (
        <span className={styles.icon} onClick={() => iconClickCallback(invitationId)}>
          <AvatarIcon iconType={listType} />
        </span>
      )}
    </div>
  )
}

export default Avatar
