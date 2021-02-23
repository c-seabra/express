import { ApolloError } from '@apollo/client';
import React, { ReactElement } from 'react';

import { Button } from '../../lib/components';
import { useAttendanceAppearanceSelectionsUpdateMutation } from '../../lib/hooks';
import Loader from '../../lib/Loading';
import { AttendanceAppearanceSelection } from '../../lib/types';
import AttendanceAppearanceSelectionItem from './AttendanceAppearanceSelectionItem';
import AttendanceAppearanceSelectionListHeader from './AttendanceAppearanceSelectionListHeader';

type AtendanceAppearanceSelectionListProps = {
  error?: ApolloError;
  list: AttendanceAppearanceSelection[];
  loading: boolean;
};

const AttendanceAppearanceSelectionList = ({
  list = [],
  loading,
  error,
}: AtendanceAppearanceSelectionListProps): ReactElement => {
  const ids = list.map((item) => (
    item.appearance.id
  ))

  const {
    attendanceAppearanceSelectionsUpdateMutation,
  } = useAttendanceAppearanceSelectionsUpdateMutation({
    attendanceIds: ids
  });

  const submit = async () => {
    await attendanceAppearanceSelectionsUpdateMutation();
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <>{error.message}</>;
  }

  return (
    <>
      <AttendanceAppearanceSelectionListHeader />
      {list.map((selection) => (
        <AttendanceAppearanceSelectionItem
          key={selection.id}
          selection={selection}
        />
      ))}
      <Button onClick={submit}>Submit</Button>
    </>
  );
};

export default AttendanceAppearanceSelectionList;
