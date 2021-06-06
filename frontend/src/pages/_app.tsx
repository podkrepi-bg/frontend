import Head from 'next/head'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import { Provider as SessionProvider } from 'next-auth/client'
import { appWithTranslation, useTranslation } from 'next-i18next'

import theme from 'common/theme'
import useGTM from 'common/util/useGTM'

import 'styles/global.scss'

function CustomApp(props: AppProps) {
  const { Component, pageProps } = props
  const router = useRouter()
  const { i18n } = useTranslation()
  const { initialize, trackEvent } = useGTM()

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  useEffect(() => {
    // Setup GTM
    initialize({
      events: { user_lang: i18n.language },
    })

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
    <React.Fragment>
      <Head>
        <title>Podkrepi.bg</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <SessionProvider session={pageProps.session}>
          <Component {...pageProps} />
        </SessionProvider>
      </ThemeProvider>
    </React.Fragment>
  )
}

export default appWithTranslation(CustomApp)
