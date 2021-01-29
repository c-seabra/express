import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { PageContainer } from '../settingsDashboard/SettingsDashboard.styled'

const AttendanceDashboard = (): ReactElement => {
  return (
    <>
      <Helmet>
        <title>Attendance control panel</title>
      </Helmet>
      <PageContainer>
        <h1>Attendance area</h1>
      </PageContainer>
    </>
  )
}

export default AttendanceDashboard
