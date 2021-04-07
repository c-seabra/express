import React from 'react'

import { Item, ItemChildren, ItemIcon } from './ExistingEvent.styled'

const ExistingEventItem = ({ icon, children }) => {
  return (
    children
      ? <Item>
        {icon && <ItemIcon>{icon}</ItemIcon>}
        <ItemChildren>{children}</ItemChildren>
      </Item>
      : null
  )
}

export default ExistingEventItem
