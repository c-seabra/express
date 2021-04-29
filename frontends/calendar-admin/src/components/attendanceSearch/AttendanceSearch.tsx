import useSearchState from '@websummit/glue/src/lib/hooks/useSearchState';
import React, { KeyboardEvent, ReactElement, useEffect, useState } from 'react';

import useAttendancesQuery from '../../lib/hooks/useAttendancesQuery';
import { Attendance } from '../../lib/types/index';
import {
  DestructiveButton,
  ListItem,
  SearchContainer,
  StyledDisplay,
  StyledSearch,
  StyledSearchInput,
} from './AttendanceSearch.styled';

type AttendanceSearchState = {
  searchQuery?: string;
};

const AttendanceSearch = (): ReactElement => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selections, setSelections] = useState<Array<Attendance>>([]);
  const [display, setDisplay] = useState<boolean>(false);

  const processInitialSearchState = (state: AttendanceSearchState) => {
    if (state.searchQuery) setSearchQuery(state.searchQuery);
  };

  const { searchState, setSearchState } = useSearchState<AttendanceSearchState>(
    {
      processInitialSearchState,
    },
  );

  const { results, error, loading } = useAttendancesQuery({
    searchQuery: searchState.searchQuery,
  });

  const handleSearchKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (searchQuery === '') setDisplay(false);
      else {
        setDisplay(true);
        const element = e.currentTarget as HTMLInputElement;
        setSearchState((prevState) => ({
          ...prevState,
          searchQuery: element.value,
        }));
        setSearchQuery(element.value);
      }
    }
  };

  const handleSelect = (att: Attendance) => {
    if (!selections.includes(att)) setSelections([...selections, att]);
  };

  const handleRemove = (att: Attendance) => {
    const index = selections.indexOf(att);
    selections.splice(index, 1);
    setSelections([...selections]);
  };

  return (
    <SearchContainer>
      <StyledSearch>
        <StyledSearchInput
          defaultValue={searchQuery}
          placeholder="Search by Attendance name."
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearchKey}
        />
        {display && !loading && !error && (
          <>
            {results?.map((attendance, i) => (
              <div key={i}>
                {!selections.includes(attendance) && (
                  <ListItem key={i} onClick={() => handleSelect(attendance)}>
                    {attendance.name} - {attendance.bookingRef}
                  </ListItem>
                )}
              </div>
            ))}
          </>
        )}
      </StyledSearch>
      <StyledDisplay>
        {selections.map((selection) => (
          <div key={selection?.id}>
            <ListItem key={selection?.id}>
              {selection.name} - {selection.bookingRef}
              <DestructiveButton onClick={() => handleRemove(selection)} />
            </ListItem>
          </div>
        ))}
      </StyledDisplay>
    </SearchContainer>
  );
};

export default AttendanceSearch;
