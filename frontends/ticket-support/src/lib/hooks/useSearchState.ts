import { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import { pathToSearchState, searchStateToUrl } from '../utils/url'

export type SearchState = Record<string, unknown>

type UseSearchStateArgs = {
  processInitialSearchState?: (searchState: SearchState) => void
}

const useSearchState = ({ processInitialSearchState }: UseSearchStateArgs) => {
  const location = useLocation()
  const history = useHistory()
  const { pathname } = location
  const asPath = window.location.href

  const [searchState, setSearchState] = useState<SearchState>(pathToSearchState(asPath))

  useEffect(() => {
    if (processInitialSearchState) {
      processInitialSearchState(searchState)
    }
  }, [])

  useEffect(() => {
    const url = searchStateToUrl({ pathname, searchState })
    history.push(url)
  }, [searchState])

  return {
    searchState,
    setSearchState,
  }
}

export default useSearchState
