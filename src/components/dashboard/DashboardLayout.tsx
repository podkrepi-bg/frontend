import Head from 'next/head'
import { useMemo } from 'react'
import { useTranslation } from 'next-i18next'
import { Box, Container, ContainerProps, Theme } from '@mui/material'
import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'
import { styled } from '@mui/material/styles'

import { defaultOgImage } from 'common/routes'
import Snackbar from 'components/layout/Snackbar'
import { DashboardStore } from 'stores/DashboardStore'

import DashboardAppBar from './DashboardAppBar'
import DashboardFooter from './DashboardFooter'
import DashboardDrawer, { drawerWidth } from './DashboardDrawer'
import { observer } from 'mobx-react'

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

export default observer(function DashboardLayout({
  title,
  ogImage,
  children,
  ...containerProps
}: LayoutProps) {
  const classes = useStyles()
  const { t } = useTranslation()
  const suffix = t('meta.title')
  const metaTitle = useMemo(() => (title ? `${title} | ${suffix}` : suffix), [title, suffix])

  const { drawerOpen } = DashboardStore

  const Main = styled('main', { shouldForwardProp: (prop: any) => prop !== 'open' })<{
    open?: boolean
  }>(({ theme, open }: { theme: Theme; open: boolean }) => ({
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
    paddingLeft: '18px',
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: `${drawerWidth}`,
      paddingLeft: 0,
    }),
  }))

  return (
    <Container className={classes.layout} maxWidth={false} disableGutters>
      <Container
        {...containerProps}
        maxWidth={false}
        disableGutters
        sx={{
          paddingRight: '18px',
        }}>
        <Head>
          <title>{metaTitle}</title>
          <meta key="og:title" property="og:title" content={metaTitle} />
          <meta key="og:image" property="og:image" content={ogImage ?? defaultOgImage} />
          <meta key="og:image:width" property="og:image:width" content="1910" />
          <meta key="og:image:height" property="og:image:height" content="1000" />
        </Head>
        <DashboardAppBar />
        <DashboardDrawer />
        <Main open={drawerOpen}>
          <Box
            sx={{
              paddingTop: '80px',
            }}>
            <Box
              sx={{
                padding: '18px',
                backgroundColor: '#E9F6FF',
                borderRadius: '10px 10px 0 0',
                height: 'calc(100vh - 100px)',
              }}>
              <Box
                sx={{
                  padding: '18px',
                  backgroundColor: '#FFF',
                  borderRadius: '10px',
                  height: '100%',
                }}>
                {children}
              </Box>
            </Box>
          </Box>
        </Main>
        <Snackbar />
      </Container>
      <DashboardFooter />
    </Container>
  )
})
