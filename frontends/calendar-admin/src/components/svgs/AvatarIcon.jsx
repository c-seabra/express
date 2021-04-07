import React from 'react'

import Accepted from './Accepted'
import CalendarPlus from './CalendarPlus'
import Declined from './Declined'

const AvatarIcon = ({ iconType }) => {
    if (iconType === 'accepted') return <Accepted />
    if (iconType === 'delete') return <Declined />
    if (iconType === 'pending') return <CalendarPlus />
    return null
};

export default AvatarIcon;
