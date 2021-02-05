import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'

import AttendanceTable from '../attendanceTable/AttendanceTable'
import DashboardContainer from './AttendanceDashboard.styled'

const AttendanceDashboard = (): ReactElement => {
  return (
    <DashboardContainer>
      <Helmet>
        <title>Attendance control panel</title>
      </Helmet>
      <AttendanceTable />
    </DashboardContainer>
  )
}

export default AttendanceDashboard
