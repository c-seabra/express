import React, { ReactElement } from 'react';
import { Helmet } from 'react-helmet';

import AttendanceTable from '../attendanceTable/AttendanceTable';
import { PageContainer } from '../settingsDashboard/SettingsDashboard.styled';

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
