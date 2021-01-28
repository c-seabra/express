import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'

const AttendeeControlPanel = (): ReactElement => {
  return (
    <>
      <Helmet>
        <title>Attendee control panel</title>
      </Helmet>
      <div>Attendee dashboard</div>
    </>
  )
}

export default AttendeeControlPanel
