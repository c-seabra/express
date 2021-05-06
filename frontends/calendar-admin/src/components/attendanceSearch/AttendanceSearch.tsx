import useSearchState from '@websummit/glue/src/lib/hooks/useSearchState';
import React, { ReactElement, useContext, useEffect, useState } from 'react';

import useAttendancesQuery from '../../lib/hooks/useAttendancesQuery';
import { Attendance } from '../../lib/types/index';
import AppContext from '../app/AppContext';
import {
  ListItem,
  RemoveButton,
  SearchContainer,
  StyledDisplay,
  StyledSearch,
  StyledSearchInput,
} from './AttendanceSearch.styled';

type AttendanceSearchState = {
  searchQuery?: string;
};

const AttendanceSearch = (): ReactElement => {
  const { setAttendances } = useContext(AppContext);

  const [searchQuery, setSearchQuery] = useState('');
  const [selections, setSelections] = useState<Array<Attendance>>([]);
  const [display, setDisplay] = useState<boolean>(false);

  const processInitialSearchState = (state: AttendanceSearchState) => {
    if (state.searchQuery) setSearchQuery(state.searchQuery);
  };

  const { setSearchState } = useSearchState<AttendanceSearchState>({
    processInitialSearchState,
  });

  const { results, error, loading } = useAttendancesQuery({
    searchQuery,
  });

  const handleSearch = (query: string) => {
    setDisplay(query.length > 2);
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: query,
    }));
  };

  const handleSelect = (att: Attendance) => {
    if (!selections.find((e) => e.id === att.id))
      setSelections([...selections, att]);
  };

  const handleRemove = (att: Attendance) => {
    const index = selections.indexOf(att);
    selections.splice(index, 1);
    setSelections([...selections]);
    setAttendances?.([...selections]);
  };

  useEffect(() => {
    handleSearch(searchQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  return (
    <SearchContainer>
      <StyledSearch>
        <StyledSearchInput
          defaultValue={searchQuery}
          placeholder="Search by Attendance name."
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {display && !loading && !error && (
          <>
            {results?.map((attendance, i) => (
              <div key={i}>
                {!selections.find((e) => e.id === attendance.id) && (
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
              <RemoveButton onClick={() => handleRemove(selection)} />
            </ListItem>
          </div>
        ))}
      </StyledDisplay>
    </SearchContainer>
  );
};

export default AttendanceSearch;
