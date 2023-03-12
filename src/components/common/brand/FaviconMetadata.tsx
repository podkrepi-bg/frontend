import theme from 'common/theme'

/**
 * Generated with https://realfavicongenerator.net/
 */
export default function FaviconMetadata() {
  return (
    <>
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color={theme.palette.primary.main} />
      <link rel="shortcut icon" href="/favicon.ico" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      <meta name="theme-color" content={theme.palette.primary.main} />
    </>
  )
}
