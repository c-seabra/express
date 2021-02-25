import React, { ReactElement } from 'react';
import { Helmet } from 'react-helmet';

import { PageContainer } from '../settingsDashboard/SettingsDashboard.styled';
import AttendanceTable from './AttendanceTable';

const AttendanceDashboard = (): ReactElement => {
  return (
    <PageContainer>
      <Helmet>
        <title>Attendance control panel</title>
      </Helmet>
      <AttendanceTable />
    </PageContainer>
  );
};

export default AttendanceDashboard;
