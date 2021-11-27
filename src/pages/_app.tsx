import Head from 'next/head'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { appWithTranslation, useTranslation } from 'next-i18next'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'

// MaterialUI
import { ThemeProvider, Theme, StyledEngineProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider } from '@emotion/react'
import { EmotionCache } from '@emotion/cache'

// NextAuth
import { SessionProvider } from 'next-auth/react'

import theme from 'common/theme'
import useGTM from 'common/util/useGTM'
import { queryFn } from 'common/rest'
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
  pageProps,
}: CustomAppProps) {
  const router = useRouter()
  const { i18n } = useTranslation()
  const { initialize, trackEvent } = useGTM()
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { queryFn },
          // mutations: { mutationFn },
        },
      }),
  )

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles)
    }

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
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <SessionProvider
            // Provider options are not required but can be useful in situations where
            // you have a short session maxAge time. Shown here with default values.
            options={{
              // Stale Time controls how often the useSession in the client should
              // contact the server to sync the session state. Value in seconds.
              // e.g.
              // * 0  - Disabled (always use cache value)
              // * 60 - Sync session state with server if it's older than 60 seconds
              staleTime: 0,
              // Refetch Interval tells windows / tabs that are signed in to keep sending
              // a keep alive request (which extends the current session expiry) to
              // prevent sessions in open windows from expiring. Value in seconds.
              //
              // Note: If a session has expired when keep alive is triggered, all open
              // windows / tabs will be updated to reflect the user is signed out.
              refetchInterval: 0,
            }}
            session={pageProps.session}>
            {/* <SSRKeycloakProvider
            LoadingComponent={<LinearProgress />}
            onEvent={(e, err) => console.log(e, err)}
            keycloakConfig={keycloakConfig}
            persistor={SSRCookies(pageProps?.keyCookies ?? {})}> */}
            <QueryClientProvider client={queryClient}>
              <Hydrate state={pageProps.dehydratedState}>
                <Component {...pageProps} />
              </Hydrate>
            </QueryClientProvider>
            {/* </SSRKeycloakProvider> */}
          </SessionProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </CacheProvider>
  )
}

export default appWithTranslation(CustomApp)
