import Head from 'next/head'
import { AppProps } from 'next/app'
import React, { useEffect } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import { Provider as SessionProvider } from 'next-auth/client'
import { appWithTranslation, useTranslation } from 'next-i18next'

import theme from 'common/theme'
import useGTM from 'common/util/useGTM'
import { initSentry } from 'common/sentry'

import 'styles/global.scss'

initSentry()

function CustomApp(props: AppProps) {
  const { Component, pageProps } = props
  const { i18n } = useTranslation()

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles)
    }

    // Init GTM
    useGTM().initialize({
      events: { user_lang: i18n.language },
    })
  }, [])

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
