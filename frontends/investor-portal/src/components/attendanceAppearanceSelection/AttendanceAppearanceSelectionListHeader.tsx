import React from 'react';

import Column from './AttendanceAppearanceSelectionColumn.styled';
import ListHeaderItem from './AttendanceAppearanceSelectionListHeader.styled';

const AttendanceAppearanceSelectionListHeader = () => {
  return (
    <ListHeaderItem>
      <Column>Company Name</Column>
      <Column>Updated At</Column>
      <Column>Status</Column>
    </ListHeaderItem>
  );
};

export default AttendanceAppearanceSelectionListHeader;
