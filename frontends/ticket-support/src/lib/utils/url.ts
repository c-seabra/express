import qs from 'qs'

const filterEmptyStrings = (_: unknown, val: string) => val || undefined

const createURL = (state: Record<string, unknown>) =>
  `?${qs.stringify(state, {
    encodeValuesOnly: true,
    filter: filterEmptyStrings,
    skipNulls: true,
  })}`

export const searchStateToUrl = ({
  pathname,
  searchState,
}: {
  pathname: string
  searchState: Record<string, unknown>
}) =>
  searchState !== null &&
  typeof searchState === 'object' &&
  Object.keys(searchState ?? {}).length > 0
    ? `${pathname}${createURL(searchState)}`
    : pathname

export const pathToSearchState = (path: string): Record<string, unknown> =>
  path.includes('?') ? qs.parse(path.substring(path.indexOf('?') + 1)) : {}
