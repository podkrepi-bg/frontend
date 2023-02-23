import { EmotionCache } from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { Theme, ThemeProvider } from '@mui/material/styles'
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { appWithTranslation, useTranslation } from 'next-i18next'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import createEmotionCache from 'common/createEmotionCache'
import theme from 'common/theme'
import useGTM from 'common/util/useGTM'

import { SessionProvider } from 'next-auth/react'
import { queryFn } from 'service/restRequests'
import 'styles/global.scss'

import { Provider } from 'mobx-react'
import { stores } from 'stores/DomainStores/stores'
import NotificationSnackBar from 'components/client/layout/NotificationSnackBar/NotificationSnackBar'
import {
  globalSnackbarProps,
  globalSnackbarContentProps,
} from 'components/client/layout/NotificationSnackBar/props/global'

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
              <Provider {...stores}>
                <Component {...pageProps} />
                <NotificationSnackBar
                  mainProps={globalSnackbarProps}
                  contentProps={globalSnackbarContentProps}
                />
              </Provider>
            </Hydrate>
          </QueryClientProvider>
        </SessionProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}

export default appWithTranslation(CustomApp)
