import React from 'react';

import { Column, ListHeaderItem } from './AttendanceListHeader.styled';

const AttendanceListHeader = () => {
  return (
    <ListHeaderItem>
      <Column>ID</Column>
      <Column>Name</Column>
      <Column>Pending selections</Column>
    </ListHeaderItem>
  );
};

export default AttendanceListHeader;
