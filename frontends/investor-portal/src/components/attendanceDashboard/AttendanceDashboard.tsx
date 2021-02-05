import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'

import AttendanceTable from '../attendanceTable/AttendanceTable'
import InvestorPermission from '../investorPermission/InvestorPermission'
import { PageContainer } from '../settingsDashboard/SettingsDashboard.styled'

const AttendanceDashboard = (): ReactElement => {
  return (
    <PageContainer>
      <Helmet>
        <title>Attendance control panel</title>
      </Helmet>
      <InvestorPermission />
      <AttendanceTable />
    </PageContainer>
  )
}

export default AttendanceDashboard
