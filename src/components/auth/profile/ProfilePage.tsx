import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  Avatar,
  Box,
  Container,
  Grid,
  Typography,
  Divider,
  createStyles,
  makeStyles,
} from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'

import { routes } from 'common/routes'
import Layout from 'components/layout/Layout'
import { ProfilePageProps } from 'pages/profile'
import LinkButton from 'components/common/LinkButton'

const useStyles = makeStyles((theme) =>
  createStyles({
    avatar: {
      '&>*': {
        margin: '0 auto',
        height: theme.spacing(8),
        width: theme.spacing(8),
      },
    },
  }),
)

export default function ProfilePage({ session }: ProfilePageProps) {
  const classes = useStyles()
  const { t } = useTranslation()
  if (!session) {
    throw new Error('No session')
  }
  const title = `${session.user.name}\n(${session.user.email})`
  return (
    <Layout title={t('nav.profile')}>
      <Box my={6}>
        <Divider />
      </Box>
      <Container maxWidth="xs">
        <Grid container direction="column" spacing={5}>
          <Grid item>
            <Box textAlign="center" margin="0 auto" className={classes.avatar}>
              {session.user.image ? (
                <Avatar title={title} alt={title} src={session.user.image} />
              ) : (
                <AccountCircle />
              )}
            </Box>
          </Grid>

          <Grid item>
            <Typography variant="h3" align="center">
              {session.user.name}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6" align="center">
              {session.user.email}
            </Typography>
          </Grid>
          <Grid item>
            <LinkButton fullWidth color="default" variant="outlined" href={routes.logout}>
              {t('nav.logout')}
            </LinkButton>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  )
}
