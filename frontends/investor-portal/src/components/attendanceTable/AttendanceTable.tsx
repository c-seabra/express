import React, { KeyboardEvent, ReactElement, useEffect, useState } from 'react'

import { Button, ContainerCard, Heading } from '../../lib/components'
import useAttendancesQuery from '../../lib/hooks/useAttendancesQuery'
import useSearchState from '../../lib/hooks/useSearchState'
import Loader from '../../lib/Loading'
import Pagination from '../../lib/Pagination'
import AttendanceItem from '../attendanceItem/AttendanceItem'
import AttendanceListHeader from '../attendanceListHeader/AttendanceListHeader'
import { FiltersSearchContainer, SearchFilters, StyledSearchInput } from './AttendanceTable.styled'

type AttendanceSearchState = {
  page: string
  searchQuery?: string
  type: string
}

const AttendanceTable = (): ReactElement => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedValues, setSelectedValues] = useState<string[]>([])
  const [queriedIds, setQueriedIds] = useState<string[]>([])
  const [headerCheckbox, setHeaderCheckbox] = useState(false)

  const processInitialSearchState = (state: AttendanceSearchState) => {
    if (state.searchQuery) setSearchQuery(state.searchQuery)
  }

  const onCheckboxChange = ({ target: { value } }) => {
    const a = (selectedValues.includes(value) && selectedValues.filter(item => item !== value)) || [
      ...selectedValues,
      value,
    ]
    setSelectedValues(a)
  }

  const onHeaderCheckboxChange = () => {
    setHeaderCheckbox(!headerCheckbox)
    if (!headerCheckbox) {
      setSelectedValues(queriedIds)
    } else {
      setSelectedValues([])
    }
  }

  const { searchState, setSearchState } = useSearchState<AttendanceSearchState>({
    processInitialSearchState,
  })

  const {
    results,
    currentPage,
    error,
    loading,
    isForwardDisabled,
    isBackwardsDisabled,
    nextPage,
    previousPage,
  } = useAttendancesQuery({
    initialPage: searchState.page,
    searchQuery: searchState.searchQuery,
    type: searchState.type,
  })

  useEffect(() => {
    if (currentPage) {
      setSearchState({ ...searchState, page: currentPage })
    }
  }, [currentPage, searchState, setSearchState])

  useEffect(() => {
    if (results.length > 0) {
      setQueriedIds(results.map(result => result.id))
    }
  }, [results])

  useEffect(() => {
    if (queriedIds.length > 0 && queriedIds.length === selectedValues.length) {
      setHeaderCheckbox(true)
    } else {
      setHeaderCheckbox(false)
    }
  }, [selectedValues, queriedIds])

  const handleSearchKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const element = e.currentTarget as HTMLInputElement
      setSearchState(prevState => ({ ...prevState, searchQuery: element.value }))
      setSearchQuery(element.value)
    }
  }

  console.log('sel', selectedValues)

  const loadingComponent = () => {
    if (loading) {
      return <Loader />
    }
  }

  return (
    <>
      <SearchFilters>
        <Heading>Attendance area</Heading>
        <FiltersSearchContainer>
          <Button onClick={() => console.log('click')} />
          <StyledSearchInput
            defaultValue={searchQuery}
            placeholder="Search by Attendance name."
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchKey}
          />
        </FiltersSearchContainer>
      </SearchFilters>
      <ContainerCard noPadding>
        <AttendanceListHeader isChecked={headerCheckbox} onCheckboxChange={onHeaderCheckboxChange} />
        {results.map(attendance => (
          <AttendanceItem
            key={attendance.id}
            attendance={attendance}
            isChecked={selectedValues.includes(attendance.id)}
            onCheckboxChange={onCheckboxChange}
          />
        ))}
      </ContainerCard>
      {!loading && !error && (
        <Pagination
          isForwardDisabled={isForwardDisabled}
          isPreviousDisabled={isBackwardsDisabled}
          nextPage={nextPage}
          previousPage={previousPage}
        />
      )}
    </>
  )
}

export default AttendanceTable
