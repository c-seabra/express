import React from 'react'

const ExistingEventItem = ({ styles, icon, children }) => {
  return (
    children
      ? <div className={styles ? styles.item : ''}>
        {icon && <div className={(styles ? styles.itemIcon : '')}>{icon}</div>}
        <div className={styles ? styles.itemChildren : ''}>{children}</div>
      </div>
      : null
  )
}

export default ExistingEventItem
