import Head from 'next/head'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { EmotionCache } from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { SessionProvider } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { appWithTranslation, useTranslation } from 'next-i18next'
import { CssBaseline, ThemeProvider, Theme } from '@mui/material'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'

import theme from 'common/theme'
import useGTM from 'common/util/useGTM'
import createEmotionCache from 'common/createEmotionCache'

import 'styles/global.scss'
import { queryFn } from 'service/restRequests'

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

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            queryFn,
            staleTime: 25000,
          },
        },
      }),
  )

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Podkrepi.bg</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <SessionProvider session={session} refetchInterval={60} refetchOnWindowFocus={true}>
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
