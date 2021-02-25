import React from 'react';

import { Column, ListHeaderItem } from './AttendanceListHeader.styled';

const AttendanceListHeader = () => {
  return (
    <ListHeaderItem>
      <Column>ID</Column>
      <Column>Name</Column>
      <Column>Accepted</Column>
      <Column>Pending</Column>
      <Column>Rejected</Column>
      <Column>Submitted</Column>
    </ListHeaderItem>
  );
};

export default AttendanceListHeader;
