import Head from 'next/head'
import { useMemo } from 'react'
import { useTranslation } from 'next-i18next'
import { Box, Container, ContainerProps } from '@mui/material'
import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

import { defaultOgImage } from 'common/routes'
import Snackbar from 'components/layout/Snackbar'

import DashboardAppBar from './DashboardAppBar'
import DashboardFooter from './DashboardFooter'

type LayoutProps = React.PropsWithChildren<
  ContainerProps & {
    title?: string
    ogImage?: string
  }
>

const useStyles = makeStyles((theme) =>
  createStyles({
    layout: {
      position: 'relative',
      minHeight: '100vh',
      paddingBottom: 20,
    },
    pageTitle: {
      padding: theme.spacing(4),
    },
    offset: {
      ...theme.mixins.toolbar,
      marginBottom: theme.spacing(6),
      [theme.breakpoints.down('lg')]: {
        marginBottom: theme.spacing(0),
      },
    },
  }),
)

export default function DashboardLayout({
  title,
  ogImage,
  children,
  ...containerProps
}: LayoutProps) {
  const classes = useStyles()
  const { t } = useTranslation()
  const suffix = t('meta.title')
  const metaTitle = useMemo(() => (title ? `${title} | ${suffix}` : suffix), [title, suffix])

  return (
    <Container className={classes.layout} maxWidth={false} disableGutters>
      <Container {...containerProps} maxWidth={false}>
        <Head>
          <title>{metaTitle}</title>
          <meta key="og:title" property="og:title" content={metaTitle} />
          <meta key="og:image" property="og:image" content={ogImage ?? defaultOgImage} />
          <meta key="og:image:width" property="og:image:width" content="1910" />
          <meta key="og:image:height" property="og:image:height" content="1000" />
        </Head>
        <Box
          pt={4}
          sx={{
            paddingTop: '80px',
          }}>
          <Box
            pt={4}
            sx={{
              backgroundColor: '#E9F6FF',
              borderRadius: '10px',
              marginLeft: '194px',
              height: 'calc(100vh - 100px)',
            }}>
            <DashboardAppBar />
            {children}
          </Box>
        </Box>
        <Snackbar />
      </Container>
      <DashboardFooter />
    </Container>
  )
}
