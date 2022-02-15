import Head from 'next/head'
import Link from 'next/link'
import { useMemo } from 'react'
import { useTranslation } from 'next-i18next'
import { Box, Container, ContainerProps, IconButton, Typography } from '@mui/material'
import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'
import HomeIcon from '@mui/icons-material/Home'

import { defaultOgImage, routes } from 'common/routes'

import DashboardSnackbar from './Snackbar'
import DashboardAppBar from './DashboardAppBar'
import DashboardFooter from './DashboardFooter'
import DashboardDrawer from './DashboardDrawer'

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
    path: {
      display: 'flex',
      marginLeft: 'auto',
      marginRight: '10px',
      alignItems: 'flex-end',
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
        <Box
          sx={{
            display: 'flex',
          }}>
          <DashboardDrawer />
          <Box
            component="main"
            sx={{
              paddingTop: '66px',
              flexGrow: 1,
            }}>
            <Box
              sx={{
                padding: '17px 21px 40px 21px',
                backgroundColor: '#E9F6FF',
                borderRadius: '10px 10px 0 0',
                height: 'calc(100vh - 105px)',
              }}>
              <Box
                sx={{
                  backgroundColor: '#FFF',
                  borderRadius: '10px',
                  height: '100%',
                }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'space-between',
                    alignContent: 'flex-end',
                    boxShadow: 'inset 0px -1px 0px #E0E0E0',
                    marginBottom: '20px',
                    padding: '9px 0 9px 26px',
                  }}>
                  <Typography sx={{ fontSize: '24px', lineHeight: '1' }} color="primary">
                    {title}
                  </Typography>
                  <section className={classes.path}>
                    <Link href={routes.dashboard.index}>
                      <IconButton
                        size="small"
                        sx={{
                          marginBottom: '-10px',
                        }}>
                        <HomeIcon color="action" />
                      </IconButton>
                    </Link>
                    <Typography
                      variant="inherit"
                      color="text.secondary"
                      sx={{
                        fontSize: '14px',
                        lineHeight: '1',
                      }}>
                      {' '}
                      / {title}
                    </Typography>
                  </section>
                </Box>
                {children}
              </Box>
            </Box>
          </Box>
        </Box>
        <DashboardSnackbar />
      </Container>
      <DashboardFooter />
    </Container>
  )
}
