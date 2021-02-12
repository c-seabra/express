/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */

// Heavily inspired by example at https://github.com/HaNdTriX/next.js/blob/73f6e04b6bfe02c95eeffd7d113eedcb82da9300/examples/with-apollo/lib/apollo.js

import { ApolloProvider } from '@apollo/client'
import { NextPage, NextPageContext } from 'next'
import Head from 'next/head'
import React from 'react'

import initApollo, { ApolloClientType, ApolloStateType } from './apolloClient'
import { isServer } from './ssrMode'

type InitialProps = {
  apolloClient?: ApolloClientType
  apolloState?: ApolloStateType
} & Record<string, any>

type WithApolloPageContext = {
  apolloClient: ApolloClientType
} & NextPageContext

export default function withApollo(PageComponent: NextPage, { ssr = true } = {}) {
  const WithApollo = ({ apolloClient, apolloState, ...pageProps }: InitialProps) => {
    const client = apolloClient || initApollo(apolloState)
    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    )
  }

  if (process.env.NODE_ENV !== 'production') {
    const displayName = PageComponent.displayName || PageComponent.name || 'Component'

    if (displayName === 'App') {
      console.warn('This withApollo HOC only works with PageComponents.')
    }

    WithApollo.displayName = `withApollo(${displayName})`
  }

  if (ssr || PageComponent.getInitialProps) {
    WithApollo.getInitialProps = async (ctx: WithApolloPageContext): Promise<InitialProps> => {
      const { AppTree } = ctx
      const apolloClient = ctx.apolloClient || initApollo()

      let pageProps = {}
      if (PageComponent.getInitialProps) {
        pageProps = await PageComponent.getInitialProps(ctx)
      }

      if (isServer) {
        if (ctx.res?.finished) {
          return pageProps
        }

        if (ssr) {
          try {
            const { getDataFromTree } = await import('@apollo/react-ssr')
            await getDataFromTree(
              <AppTree
                pageProps={{
                  ...pageProps,
                  apolloClient,
                }}
              />
            )
          } catch (error) {
            console.error('Error while running `getDataFromTree`', error)
          }

          Head.rewind()
        }
      }

      const apolloState = apolloClient.cache.extract()

      return {
        ...pageProps,
        apolloClient: ctx.apolloClient,
        apolloState,
      }
    }
  }

  return WithApollo
}
