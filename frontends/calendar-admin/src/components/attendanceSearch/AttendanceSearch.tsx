import useSearchState from '@websummit/glue/src/lib/hooks/useSearchState';
import { Attendance } from 'frontends/investor-portal/src/lib/types';
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


type AttendanceSearchState = {
  attendanceAppearanceSelectionsStatus?: string;
  page: string;
  searchQuery?: string;
  type: string;
};

const AttendanceSearch = (): ReactElement => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [selections, setSelections] = useState<Array<Attendance>>([]);
  const attendance = useState<Attendance>()


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
    attendanceAppearanceSelectionsStatus:
      searchState.attendanceAppearanceSelectionsStatus,
    initialPage: searchState.page,
    searchQuery: searchState.searchQuery,
    type: searchState.type,
  });

  useEffect(() => {
    if (currentPage) {
      setSearchState({ ...searchState, page: currentPage });
      setSelectedValues([]);
    }

    console.log("useeff: ", selections)
    // Disabled because additional triggers caused infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, selections]);

  const handleSearchKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const element = e.currentTarget as HTMLInputElement;
      setSearchState((prevState) => ({
        ...prevState,
        page: '',
        searchQuery: element.value,
      }));
      setSearchQuery(element.value);
      setSelectedValues([]);
      setSelections(selections);
      resetPage();
    }
  };

  const handleSelect = (att: Attendance) => {
    selections.push(att)
    setSelections(selections)
  }


  return (
    <>
      <h1>{selections.length}</h1>
      <h1>{selections}</h1>
      <h1>{searchQuery}</h1>
      <StyledSearchInput
        defaultValue={searchQuery}
        placeholder="Search by Attendance name."
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleSearchKey}
      />

      {results?.map((att) => (
        <ListItem key={att.id}>
          <Column onClick={() => handleSelect(att)}>
            {att.name}
          </Column>
        </ListItem>
      ))}

      <h1>Hello</h1>

      {selections.map((selection) => (
        <pre key={selection.id}>
          {selection}
        </pre>
        // <ListItem key={selection?.id}>
        //   <Column>
        //     {selection.name}
        //   </Column>
        // </ListItem>
      ))}
    </>
  );
};

export default AttendanceSearch;
