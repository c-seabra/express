import { useAppContext } from '../../components/app/AppContext'
import { INVESTORS_LIST } from '../../operations/queries/Investors'
import { Investor } from '../types'
import usePaginatedQuery from './usePaginatedQuery'

const INVESTORS_PER_PAGE = 5

const useInvestorsQuery = ({
  initialPage,
  perPage = INVESTORS_PER_PAGE,
  searchQuery,
  status,
  ticketTypeIds = [],
}: {
  initialPage: string
  perPage?: number
  searchQuery?: string
  status?: string
  ticketTypeIds?: string[]
}) => {
  const { conferenceSlug, token } = useAppContext()

  const context = {
    slug: conferenceSlug,
    token,
  }

  const filter = {
    status,
    ticketTypeIds: ticketTypeIds?.length > 0 ? ticketTypeIds : undefined,
  }

  const variables = {
    filter,
    first: perPage,
    searchQuery,
  }

  return usePaginatedQuery<Investor, 'investors', typeof variables, typeof context>({
    context,
    initialPage,
    query: INVESTORS_LIST,
    variables,
  })
}

export default useInvestorsQuery
