import React from 'react'
import { useTranslation } from 'next-i18next'
import {
  // Avatar,
  // Box,
  // Divider,
  // Typography,
  // createStyles,
  // makeStyles,
  Container,
  Grid,
} from '@mui/material'
// import { AccountCircle } from '@mui/icons-material'

import Layout from 'components/layout/Layout'
import { useSession } from 'common/util/useSession'
// import LinkButton from 'components/common/LinkButton'
// import LocaleSwitcher from 'components/layout/LocaleSwitcher'

// const useStyles = makeStyles((theme) =>
//   createStyles({
//     avatar: {
//       '&>*': {
//         margin: '0 auto',
//         height: theme.spacing(8),
//         width: theme.spacing(8),
//       },
//     },
//   }),
// )

export default function ProfilePage() {
  // const classes = useStyles()
  const { t } = useTranslation()

  const { keycloak, session } = useSession()

  if (!keycloak?.authenticated) {
    return (
      <Layout
        title={t('nav.profile')}
        githubUrl="https://github.com/podkrepi-bg/frontend/tree/master/src/components/auth/profile/ProfilePage.tsx"
        figmaUrl="https://www.figma.com/file/MmvFKzUv6yE5U2wrOpWtwS/Podkrepi.bg?node-id=5987%3A21094">
        Not authenticated
      </Layout>
    )
  }

  return (
    <Layout
      title={t('nav.profile')}
      githubUrl="https://github.com/podkrepi-bg/frontend/tree/master/src/components/auth/profile/ProfilePage.tsx"
      figmaUrl="https://www.figma.com/file/MmvFKzUv6yE5U2wrOpWtwS/Podkrepi.bg?node-id=5987%3A21094">
      <Container maxWidth="xl">
        <Grid container direction="row" justifyContent="space-between">
          <Grid item>
            <ul>
              <li>
                <span className="font-weight-bold mr-1">Username: </span>
                <span className="text-muted">{session?.preferred_username ?? ''}</span>
              </li>
              <li>
                <span className="font-weight-bold mr-1">Email: </span>
                <span className="text-muted">{session?.email ?? ''}</span>
              </li>
              <li>
                <span className="font-weight-bold mr-1">First Name: </span>
                <span className="text-muted">{session?.given_name ?? ''}</span>
              </li>
              <li>
                <span className="font-weight-bold mr-1">Last Name: </span>
                <span className="text-muted">{session?.family_name ?? ''}</span>
              </li>
            </ul>
          </Grid>
          <Grid item>
            <pre>JWT: {keycloak.token?.substring(0, 30)}...</pre>
            <pre>{JSON.stringify(session, null, 2)}</pre>
            <pre>{JSON.stringify(keycloak, null, 2)}</pre>
          </Grid>
        </Grid>

        {/* <Grid container direction="column" spacing={5}>
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
            <LocaleSwitcher />
          </Grid>
          <Grid item>
            <LinkButton fullWidth color="default" variant="outlined" href={routes.logout}>
              {t('nav.logout')}
            </LinkButton>
          </Grid>
        </Grid> */}
      </Container>
    </Layout>
  )
}
