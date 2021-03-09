import React from 'react';

import {
  Column,
  ListHeaderItem,
  NarrowColumn,
} from './AttendanceListHeader.styled';

const AttendanceListHeader = ({
  isChecked,
  isDisabled,
  onCheckboxChange,
}: {
  isChecked: boolean;
  isDisabled: boolean;
  onCheckboxChange: (e: React.FormEvent<HTMLInputElement>) => void;
}) => {
  return (
    <ListHeaderItem>
      <NarrowColumn>
        <input
          checked={isChecked}
          disabled={isDisabled}
          name="select"
          type="checkbox"
          onChange={onCheckboxChange}
        />
      </NarrowColumn>
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
