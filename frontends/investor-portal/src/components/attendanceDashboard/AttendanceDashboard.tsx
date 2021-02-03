import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'

import InvestorTable from '../investorTable/InvestorTable'
import DashboardContainer from './AttendanceDashboard.styled'

const AttendanceDashboard = (): ReactElement => {
  return (
    <DashboardContainer>
      <Helmet>
        <title>Attendance control panel</title>
      </Helmet>
      <InvestorTable />
    </DashboardContainer>
  )
}

export default AttendanceDashboard
