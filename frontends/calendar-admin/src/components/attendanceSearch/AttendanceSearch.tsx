import useSearchState from '@websummit/glue/src/lib/hooks/useSearchState';
import React, { KeyboardEvent, ReactElement, useEffect, useState } from 'react';

import { Column } from '../../../../investor-portal/src/components/attendanceDashboard/AttendanceListHeader.styled';
import { StyledSearchInput } from '../../../../investor-portal/src/components/attendanceDashboard/AttendanceTable.styled';
import {
  ContainerCard,
  ListItem,
  Select,
} from '../../../../investor-portal/src/lib/components';
import Loader from '../../../../investor-portal/src/lib/Loading';
import Pagination from '../../../../investor-portal/src/lib/Pagination';
import useAttendancesQuery from '../../lib/hooks/useAttendancesQuery';
import { Attendance } from '../../lib/types/index';

type AttendanceSearchState = {
  page: string;
  searchQuery?: string;
  type: string;
};

const AttendanceSearch = (): ReactElement => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selections, setSelections] = useState<Array<Attendance>>([]);

  const processInitialSearchState = (state: AttendanceSearchState) => {
    if (state.searchQuery) setSearchQuery(state.searchQuery);
  };

  const { searchState, setSearchState } = useSearchState<AttendanceSearchState>(
    {
      processInitialSearchState,
    },
  );

  const {
    results,
    currentPage,
    error,
    loading,
    resetPage,
  } = useAttendancesQuery({
    initialPage: searchState.page,
    searchQuery: searchState.searchQuery,
    type: searchState.type,
  });

  useEffect(() => {
    if (currentPage) {
      setSearchState({ ...searchState, page: currentPage });
    }
    // Disabled because additional triggers caused infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const handleSearchKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const element = e.currentTarget as HTMLInputElement;
      setSearchState((prevState) => ({
        ...prevState,
        page: '',
        searchQuery: element.value,
      }));
      setSearchQuery(element.value);
      resetPage();
    }
  };

  const handleSelect = (att: Attendance) => {
    setSelections([...selections, att])
  };

  return (
    <>
      <h1>{selections.length}</h1>
      <StyledSearchInput
        defaultValue={searchQuery}
        list="l"
        placeholder="Search by Attendance name."
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleSearchKey}
      />
      {results?.map((item, i) => (
        <ListItem key={i} onClick={() => handleSelect(item)}>
          {item.name}
        </ListItem>
      ))}

      <h1>Selected Attendees</h1>

      {selections.map((selection) => (
        <ListItem key={selection?.id}>
          <Column>{selection.name}</Column>
        </ListItem>
      ))}
    </>
  );
};

export default AttendanceSearch;
