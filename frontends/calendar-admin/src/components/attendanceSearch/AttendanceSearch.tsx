import useSearchState from '@websummit/glue/src/lib/hooks/useSearchState';
import React, { KeyboardEvent, ReactElement, useEffect, useState } from 'react';

import useAttendancesQuery from '../../lib/hooks/useAttendancesQuery';
import { Attendance } from '../../lib/types/index';
import { Column, ListItem, StyledSearchInput } from './AttendanceSearch.styled';

type AttendanceSearchState = {
  searchQuery?: string;
};

const AttendanceSearch = (): ReactElement => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selections, setSelections] = useState<Array<Attendance>>([]);
  const [display, setDisplay] = useState<boolean>(false)

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
    error,
    loading,
  } = useAttendancesQuery({
    searchQuery: searchState.searchQuery,
  });

  useEffect(() => {
    setDisplay(false)
  }, []);

  const handleSearchKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (searchQuery === '') setDisplay(false)
    if (e.key === 'Enter') {
      setDisplay(true)
      const element = e.currentTarget as HTMLInputElement;
      setSearchState((prevState) => ({
        ...prevState,
        searchQuery: element.value,
      }));
      setSearchQuery(element.value);
    }
  };

  const handleSelect = (att: Attendance) => {
    if(!selections.includes(att))
      setSelections([...selections, att]);
  };

  return (
    <>
      <StyledSearchInput
        defaultValue={searchQuery}
        placeholder="Search by Attendance name."
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleSearchKey}
      />
      {display && !loading && !error ? (
        <>
          {results?.map((attendance, i) => (
            <ListItem key={i} onClick={() => handleSelect(attendance)}>
              {attendance.name}
            </ListItem>
          ))}
        </>
      ) : (<></>)}

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
