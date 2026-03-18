import { CssBaseline } from '@mui/material'
import { Theme, ThemeProvider } from '@mui/material/styles'
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { appWithTranslation, useTranslation } from 'next-i18next'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

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
import { getCookieConsentValue, Cookies } from 'react-cookie-consent'
import CookieConsentPopup from 'components/common/CookieConsentPopup'
import { AppCacheProvider } from '@mui/material-nextjs/v15-pagesRouter'
// Client-side cache, shared for the whole session of the user in the browser.

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

function CustomApp(props: AppProps) {
  const router = useRouter()
  const { i18n } = useTranslation()
  const { initialize, trackEvent } = useGTM()
  const { Component, pageProps } = props

  const handleAcceptCookie = () => {
    initialize({
      events: { user_lang: i18n.language },
    })
  }

  const handleDeclineCookie = () => {
    Cookies.remove('_ga')
    Cookies.remove('_gat')
    Cookies.remove('_gid')
  }

  useEffect(() => {
    const isConsent = getCookieConsentValue()
    // Init GTM
    if (isConsent === 'true') {
      handleAcceptCookie()
    }
  }, [])

  // Register route change complete event handlers
  useEffect(() => {
    const onRouteChange = (url: string) => {
      trackEvent({
        event: 'page_view',
        user_lang: i18n?.language,
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
  }, [i18n?.language])

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
    <AppCacheProvider {...props}>
      <Head>
        <title>Podkrepi.bg</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <SessionProvider
          session={pageProps.session}
          refetchInterval={60}
          refetchOnWindowFocus={true}>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
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
      <CookieConsentPopup
        handleAcceptCookie={handleAcceptCookie}
        handleDeclineCookie={handleDeclineCookie}
      />
    </AppCacheProvider>
  )
}

export default appWithTranslation(CustomApp)
