import merge from 'deepmerge'
import { useMemo } from 'react'
import getConfig from 'next/config'
import isEqual from 'lodash/isEqual'
import { AppInitialProps } from 'next/app'
import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client'

const {
  publicRuntimeConfig: { GRAPHQL_URL },
} = getConfig()

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'

let apolloClient: ApolloClient<NormalizedCacheObject>

export function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      uri: GRAPHQL_URL,
      fetch,
      credentials: 'same-origin',
    }),
    cache: new InMemoryCache(),
  })
}

export function initializeApollo(initialState = {}) {
  const _apolloClient = apolloClient ?? createApolloClient()

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract()

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) => sourceArray.every((s) => !isEqual(d, s))),
      ],
    })

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data)
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function addApolloState(
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: AppInitialProps['pageProps'],
) {
  if (pageProps) {
    pageProps[APOLLO_STATE_PROP_NAME] = client.cache.extract()
  }
  return pageProps
}

export function useApollo(pageProps: AppInitialProps['pageProps']) {
  const state =
    pageProps && APOLLO_STATE_PROP_NAME in pageProps ? pageProps[APOLLO_STATE_PROP_NAME] : null
  return useMemo(() => initializeApollo(state), [state])
}
