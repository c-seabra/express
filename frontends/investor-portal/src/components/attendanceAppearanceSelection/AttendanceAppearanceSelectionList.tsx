import { ApolloError } from '@apollo/client';
import React, { ReactElement } from 'react';

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
    </>
  );
};

export default AttendanceAppearanceSelectionList;
