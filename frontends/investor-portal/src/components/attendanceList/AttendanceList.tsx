import { ApolloError } from '@apollo/client';
import React, { ReactElement } from 'react';

import Loader from '../../lib/Loading';
import { Attendance } from '../../lib/types';
import AttendanceItem from '../attendanceItem/AttendanceItem';
import AttendanceListHeader from '../attendanceListHeader/AttendanceListHeader';

type AttendanceListProps = {
  error?: ApolloError;
  list: Attendance[];
  loading: boolean;
};

const AttendanceList = ({
  list = [],
  loading,
  error,
}: AttendanceListProps): ReactElement => {
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <>{error.message}</>;
  }

  return (
    <>
      <AttendanceListHeader />
      {list.map((attendance) => (
        <AttendanceItem key={attendance.id} attendance={attendance} />
      ))}
    </>
  );
};

export default AttendanceList;
