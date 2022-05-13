import Head from 'next/head'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { EmotionCache } from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { SessionProvider } from 'next-auth/react'
import React, { useEffect, useCallback } from 'react'
import { appWithTranslation, useTranslation } from 'next-i18next'
import { CssBaseline, ThemeProvider, Theme } from '@mui/material'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'

import theme from 'common/theme'
import useGTM from 'common/util/useGTM'
import { routes } from 'common/routes'
import { queryFn } from 'service/restRequests'
import { isAxiosError } from 'service/apiErrors'
import createEmotionCache from 'common/createEmotionCache'

import 'styles/global.scss'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

interface CustomAppProps extends AppProps {
  emotionCache?: EmotionCache
}
function CustomApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps: { session, dehydratedState, ...pageProps },
}: CustomAppProps) {
  const router = useRouter()
  const { i18n } = useTranslation()
  const { initialize, trackEvent } = useGTM()
  const onError = useCallback((error: unknown) => {
    if (error && isAxiosError(error)) {
      // Redirect to login
      if (error.response?.status === 401) {
        router.push({
          pathname: routes.login,
          query: { callbackUrl: router.asPath },
        })
      }
    }
  }, [])

  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            queryFn,
            onError,
            staleTime: 25000,
          },
          mutations: { onError },
        },
      }),
  )

  useEffect(() => {
    // Init GTM
    initialize({
      events: { user_lang: i18n.language },
    })
  }, [])

  // Register route change complete event handlers
  useEffect(() => {
    const onRouteChange = (url: string) => {
      trackEvent({
        event: 'page_view',
        user_lang: i18n.language,
        page_title: document.title,
        page_pathname: url,
        page_location:
          document.location.protocol +
          '//' +
          document.location.hostname +
          document.location.pathname +
          document.location.search,
      })
    }

    router.events.on('routeChangeComplete', onRouteChange)
    return () => router.events.off('routeChangeComplete', onRouteChange)
  }, [i18n.language])

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Podkrepi.bg</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <SessionProvider session={session} refetchInterval={60}>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={dehydratedState}>
              <Component {...pageProps} />
            </Hydrate>
          </QueryClientProvider>
        </SessionProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}

export default appWithTranslation(CustomApp)
