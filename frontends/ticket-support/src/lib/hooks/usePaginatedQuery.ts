import { DocumentNode, useQuery } from '@apollo/client'
import { TypedDocumentNode } from '@graphql-typed-document-node/core'
import { useEffect, useState } from 'react'

import { PageInfo } from '../types'

type PaginatedQuery<NodeType, key> = {
  [key: string]: {
    edges: [
      {
        node: NodeType
      }
    ]
    pageInfo: PageInfo
  }
}

type UsePaginatedQueryArgs<TData, TVariables extends { after?: string }, TContext> = {
  context?: TContext
  initialPage?: string
  query: DocumentNode | TypedDocumentNode<TData, TVariables>
  variables?: TVariables & { after?: string }
}

const usePaginatedQuery = <TData, key, TVariables, TContext = unknown>({
  initialPage = '',
  context,
  query,
  variables,
}: UsePaginatedQueryArgs<TData, TVariables, TContext>) => {
  const [afterCursor, setAfterCursor] = useState<string | undefined>(initialPage)

  const queryVariablesWithCursor = variables && {
    ...variables,
    after: afterCursor,
  }

  const { loading, error, data } = useQuery<
    PaginatedQuery<TData, key>,
    TVariables & { after?: string }
  >(query, {
    context,
    variables: queryVariablesWithCursor,
  })
  const [cursorStack, setCursorStack] = useState<string[]>([])

  const [isForwardDisabled, setForwardDisabled] = useState(true)
  const [isBackwardsDisabled, setBackwardsDisabled] = useState(true)
  const [pageInfo, setPageInfo] = useState<PageInfo>()
  const [results, setResults] = useState<TData[]>([])

  useEffect(() => {
    if (data) {
      const [dataKey] = Object.keys(data)
      const { pageInfo: resultPageInfo, edges } = data[dataKey]

      setPageInfo(resultPageInfo)
      setResults(edges.map(edge => edge.node))
      setForwardDisabled(!pageInfo?.hasNextPage)
      setBackwardsDisabled(cursorStack.length <= 0)
    }
  }, [cursorStack.length, data, pageInfo?.hasNextPage])

  const nextPage = () => {
    if (pageInfo) {
      const { endCursor } = pageInfo

      setCursorStack(prevState => [...prevState, endCursor])
      setAfterCursor(endCursor)
    }
  }

  const previousPage = () => {
    const nextToLastItem = cursorStack[cursorStack.length - 2]
    setCursorStack(prevState => {
      prevState.pop()

      return prevState
    })
    setAfterCursor(nextToLastItem)
  }

  const resetPage = () => {
    setCursorStack([])
    setAfterCursor(undefined)
  }

  return {
    currentPage: pageInfo?.endCursor,
    error,
    isBackwardsDisabled,
    isForwardDisabled,
    loading,
    nextPage,
    previousPage,
    resetPage,
    results,
  }
}

export default usePaginatedQuery
